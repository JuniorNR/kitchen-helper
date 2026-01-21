import * as motion from 'motion/react-client';
import { useId, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useUser } from '@/entities';
import type { ChatMessage } from '@/entities/chat/model/chat.types';
import { customizeString } from '@/shared/lib/helpers';
import { useAppSelector } from '@/shared/lib/hooks';
import { Alert, Typography } from '@/shared/ui';
import type { ChatMessagesWindowProps } from '../model/chat.types';
import { ChatMessageComponent } from './ChatMessageComponent';
import { ChatSendControlPanel } from './ChatSendControlPanel';

const safeId = (rawId: string) => rawId.replace(/[^a-zA-Z0-9_-]/g, '');

export const ChatMessagesWindow = ({
	chats,
	activeChatId,
	localMessages,
	isSending,
	isDeleting,
	isBlockFetch,
	sendMessageData,
	deleteMessageData,
	loadOldestMessages,
}: ChatMessagesWindowProps) => {
	const { chatColorBg, accentColor } = useAppSelector(
		(state) => state.chat.settings.theme,
	);
	const scrollableId = safeId(`chat-scroll-${useId()}`);
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const hasMessages = localMessages?.length > 0;
	const lastScrolledChatIdRef = useRef<number | null>(null);
	const usersCount = `${chats?.find((chat) => chat.id === activeChatId)?.usersCount || 0} `;

	const { t: tChats, i18n } = useTranslation('chats');

	const { user } = useUser();
	const [message, setMessage] = useState<string>('');
	const [replyMessage, setReplyMessage] = useState<ChatMessage>();
	const lastMessagesLengthRef = useRef<number>(0);
	const lastMessageIdRef = useRef<number | null>(null);

	useLayoutEffect(() => {
		const container = messagesContainerRef.current;
		const hasRenderedMessages = Boolean(localMessages?.length);

		if (!container || !hasRenderedMessages) {
			return;
		}

		if (activeChatId === null) {
			lastScrolledChatIdRef.current = null;
			lastMessagesLengthRef.current = 0;
			lastMessageIdRef.current = null;
			return;
		}

		const chatChanged = lastScrolledChatIdRef.current !== activeChatId;
		const lastMessageId = localMessages[localMessages.length - 1]?.id;
		const newMessageAdded =
			lastMessageIdRef.current !== null &&
			lastMessageId !== lastMessageIdRef.current;

		if (chatChanged || newMessageAdded) {
			container.scrollTop = 0;
			lastScrolledChatIdRef.current = activeChatId;
			lastMessagesLengthRef.current = localMessages.length;
			lastMessageIdRef.current = lastMessageId;
		} else if (lastMessageIdRef.current === null && localMessages.length > 0) {
			// Инициализация при первой загрузке
			lastMessageIdRef.current = lastMessageId;
			lastMessagesLengthRef.current = localMessages.length;
		}
	}, [activeChatId, localMessages]);

	const handleCancelReplyMessage = () => {
		setReplyMessage(undefined);
	};

	return (
		<div
			className={`flex flex-shrink-1 flex-grow-1 min-h-0 overflow-hidden min-w-[400px] max-w-3/4 pt-5 flex-col rounded-2xl border ${chatColorBg.classes}`}
		>
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
						className={`flex flex-col-reverse flex-grow-1 flex-shrink-1 overflow-y-auto h-auto scrollbar-${accentColor.colorName}`}
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
											<ChatMessageComponent
												message={message}
												setReplyMessage={setReplyMessage}
												isDeleting={isDeleting}
												deleteMessageData={deleteMessageData}
												isOwnMessage={message.user.id === user?.id}
											/>
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
						replyMessage={replyMessage}
						cancelReplyMessage={handleCancelReplyMessage}
						setMessage={setMessage}
						sendMessage={sendMessageData}
						isSending={isSending}
						currentUserId={user?.id}
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
