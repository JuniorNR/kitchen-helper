import moment from 'moment';
import * as motion from 'motion/react-client';
import { useEffect, useRef, useState } from 'react';
import { useUser } from '@/entities';
import type { ChatMessage } from '@/entities/chat/model/chat.types';
import { Alert, Typography } from '@/shared/ui';
import type { ChatMessagesWindowProps } from '../model/chat.types';
import { ChatSendControlPanel } from './ChatSendControlPanel';
import styles from './chat.module.scss';

export const ChatMessagesWindow = ({
	chats,
	activeChatId,
	localMessages,
	sendMessageData,
	isSending,
}: ChatMessagesWindowProps) => {
	const messagesContainerRef = useRef<HTMLUListElement>(null);
	const { user } = useUser();
	const [message, setMessage] = useState<string>('');
	const hasMessages = (localMessages?.length ?? 0) > 0;

	useEffect(() => {
		// Scroll to bottom when new messages are added
		if (!messagesContainerRef.current) {
			return;
		}

		const totalMessages = localMessages?.length ?? 0;
		if (totalMessages === 0) {
			return;
		}

		messagesContainerRef.current.scrollTop =
			messagesContainerRef.current.scrollHeight;
	}, [localMessages]);

	return (
		<div className="flex flex-shrink-1 flex-grow-1 overflow-y-auto min-w-[400px] max-w-3/4 pt-5 flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-[0_20px_60px_rgba(148,163,184,0.25)] dark:bg-none dark:border-slate-800 dark:bg-slate-950 dark:shadow-[inset_0_1px_0_rgba(15,23,42,0.4)]">
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
							{chats?.find((chat) => chat.id === activeChatId)?.usersCount || 0}{' '}
							участника
						</p>
					</div>
				</header>
			)}
			{activeChatId ? (
				<>
					<ul
						ref={messagesContainerRef}
						className={`space-y-4 flex-grow-1 flex-shrink-1 overflow-y-auto h-auto py-6 px-6 ${styles.scrollbar}`}
					>
						{hasMessages ? (
							localMessages?.map((message: ChatMessage) => (
								<motion.li
									key={message.id}
									initial={{ opacity: 0, scale: 0 }}
									animate={{ opacity: 1, scale: 1 }}
									transition={{
										duration: 0.4,
										scale: { type: 'spring', visualDuration: 0.4, bounce: 0.2 },
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
												{moment(message.createdAt).format('DD.MM.YYYY HH:mm')}
											</Typography>
										</div>
										<Typography className="mt-2 overflow-hidden">
											{message.content}
										</Typography>
									</div>
								</motion.li>
							))
						) : (
							<li className="flex justify-center">
								<Alert
									status="info"
									title="Сообщений пока нет"
									description="Напишите первое сообщение, чтобы запустить диалог."
								/>
							</li>
						)}
					</ul>

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
						title="Выберите чат"
						description="Чтобы начать переписку, выберите чат из списка слева."
					/>
				</div>
			)}
		</div>
	);
};
