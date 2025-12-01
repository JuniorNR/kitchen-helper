import moment from 'moment';
import * as motion from 'motion/react-client';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUser } from '@/entities';
import type { ChatMessage } from '@/entities/chat/model/chat.types';
import { customizeString } from '@/shared/lib/helpers';
import { Alert, Typography } from '@/shared/ui';
import type { ChatMessagesWindowProps } from '../model/chat.types';
import { ChatSendControlPanel } from './ChatSendControlPanel';
import styles from './chat.module.scss';

const safeId = (rawId: string) => rawId.replace(/[^a-zA-Z0-9_-]/g, '');

export const ChatMessagesWindow = ({
	chats,
	activeChatId,
	localMessages,
	isSending,
	isBlockFetch,
	sendMessageData,
	loadOldestMessages,
}: ChatMessagesWindowProps) => {
	const scrollableId = safeId(`chat-scroll-${useId()}`);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const hasMessages = localMessages?.length > 0;
	const lastScrolledChatIdRef = useRef<number | null>(null);
	const usersCount = `${chats?.find((chat) => chat.id === activeChatId)?.usersCount || 0} `;

	const { t: tChats, i18n } = useTranslation('chats');

	const { user } = useUser();
	const [message, setMessage] = useState<string>('');

	useLayoutEffect(() => {
		const container = messagesContainerRef.current;
		const hasRenderedMessages = Boolean(localMessages?.length);

		if (!container || !hasRenderedMessages) {
			return;
		}

		if (activeChatId === null) {
			lastScrolledChatIdRef.current = null;
			return;
		}

		const chatChanged = lastScrolledChatIdRef.current !== activeChatId;
		if (!chatChanged) {
			return;
		}

		container.scrollTop = container.scrollHeight;
		lastScrolledChatIdRef.current = activeChatId;
	}, [activeChatId, localMessages?.length]);

	return (
		<div className="flex flex-shrink-1 flex-grow-1 overflow-hidden min-w-[400px] max-w-3/4 pt-5 flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-[0_20px_60px_rgba(148,163,184,0.25)] dark:bg-none dark:border-slate-800 dark:bg-slate-950 dark:shadow-[inset_0_1px_0_rgba(15,23,42,0.4)]">
			{activeChatId && (
				<header className="flex items-start justify-between border-b border-slate-200 px-4 pb-4 dark:border-slate-800">
					<div>
						<Typography
							component="h2"
							className="text-base font-semibold text-slate-700 dark:text-white"
						>
							{chats?.find((chat) => chat.id === activeChatId)?.name || ''}
						</Typography>
						<p className="text-sm text-slate-500 dark:text-slate-400">
							{usersCount}
							{customizeString(tChats('member'), {
								language: i18n.language,
								ended: {
									countTrigger: Number(usersCount),
									russian: {
										zero: 'ов',
										fromTwoToFour: 'а',
										fromFiveToTen: 'ов',
										fromElevenToNineteen: 'ов',
									},
									english: {
										moreThatOne: 's',
									},
								},
							}).toLowerCase()}
						</p>
					</div>
				</header>
			)}
			{activeChatId ? (
				<>
					<div
						ref={messagesContainerRef}
						id={scrollableId}
						className={`flex flex-col-reverse flex-grow-1 flex-shrink-1 overflow-y-auto h-auto ${styles.scrollbar}`}
					>
						{hasMessages ? (
							<InfiniteScroll
								className={`p-6`}
								dataLength={localMessages?.length ?? 0}
								next={() => {
									loadOldestMessages?.();
								}}
								hasMore={!isBlockFetch}
								scrollableTarget={scrollableId}
								inverse
								scrollThreshold={0.1}
								loader={<span className="hidden">Loading...</span>}
							>
								<ul className="space-y-4">
									{localMessages?.map((message: ChatMessage) => (
										<motion.li
											key={message.id}
											initial={{ opacity: 0, scale: 0 }}
											animate={{ opacity: 1, scale: 1 }}
											transition={{
												duration: 0.4,
												scale: {
													type: 'spring',
													visualDuration: 0.4,
													bounce: 0.2,
												},
											}}
											className={`flex ${message.user.id === user?.id ? 'justify-end' : 'justify-start'}`}
										>
											<div
												className={`max-w-[100%] rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
													message.user.id === user?.id
														? 'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 text-emerald-900 shadow-[0_10px_25px_rgba(16,185,129,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.005] hover:border-emerald-300 hover:shadow-[0_20px_45px_rgba(16,185,129,0.25)] dark:bg-none dark:border-emerald-400/30 dark:bg-emerald-500/20 dark:text-emerald-100 dark:hover:border-emerald-400/60 dark:hover:shadow-[0_20px_45px_rgba(16,185,129,0.35)]'
														: 'border-slate-200 bg-white/95 text-slate-800 shadow-[0_15px_35px_rgba(15,23,42,0.12)] transition-all duration-200 hover:-translate-y-0.5 hover:scale-[1.005] hover:border-slate-300 hover:shadow-[0_22px_55px_rgba(15,23,42,0.2)] dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:shadow-[0_22px_55px_rgba(15,23,42,0.45)]'
												}`}
											>
												<div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide">
													<Typography
														component="span"
														className={
															message.user.id === user?.id
																? 'text-emerald-500 dark:text-emerald-300'
																: 'text-slate-600 dark:text-slate-400'
														}
													>
														{message.user.name}
													</Typography>
													<Typography
														component="span"
														className="ml-5 text-slate-500 dark:text-slate-500"
													>
														{moment(message.createdAt).format(
															'DD.MM.YYYY HH:mm',
														)}
													</Typography>
												</div>
												<Typography className="mt-2 overflow-hidden">
													{message.content}
												</Typography>
											</div>
										</motion.li>
									))}
								</ul>
							</InfiniteScroll>
						) : (
							<div className="shrink-1 grow-1 py-20 px-40">
								<Alert
									className="h-full"
									status="info"
									title={tChats('alerts.titles.no_messages')}
									description={tChats('alerts.descriptions.no_messages')}
								/>
							</div>
						)}
					</div>

					<ChatSendControlPanel
						message={message}
						setMessage={setMessage}
						sendMessage={sendMessageData}
						isSending={isSending}
					/>
				</>
			) : (
				<div className="flex justify-center items-center h-full">
					<Alert
						status="info"
						title={tChats('alerts.titles.select_chat')}
						description={tChats('alerts.descriptions.select_chat')}
					/>
				</div>
			)}
		</div>
	);
};
