'use client';
import { useEcho } from '@laravel/echo-react';
import { AnimatePresence } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { layoutConfig } from '@/configs';
import type {
	ChatDTO as ChatDTOType,
	ChatMessage,
	ChatMessageDTO,
	Chat as ChatType,
} from '@/entities';
import { useChat, useUser } from '@/entities';
import { chatApi } from '@/entities/chat/model/chat.api';
import { dto, localStorageHelper } from '@/shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { LIMITS_MESSAGES } from '../model/chat.utils';
import { ChatListAside } from './ChatListAside';
import { ChatListAsideSkeleton } from './ChatListAside.skeleton';
import { ChatMessagesWindow } from './ChatMessagesWindow';
import { ChatMessagesWindowSkeleton } from './ChatMessagesWindow.skeleton';
import { ChatSettings } from './ChatSettings';

export const Chat = () => {
	const dispatch = useAppDispatch();
	const { item: localStorageChatId, storageSetItem } =
		localStorageHelper('active_chat_id');
	const windowColorBg = useAppSelector(
		(state) => state.chat.settings.theme.windowColorBg,
	);

	const [activeChatId, setActiveChatId] = useState<number | null>(
		Number(localStorageChatId) || null,
	);
	const [isBlockFetch, setIsBlockFetch] = useState<boolean>(false);

	const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

	const {
		chats,
		messages,
		isSending,
		isDeleting,
		isChatsLoading,
		isMessagesLoading,
		sendMessageData,
		deleteMessageData,
		refetchMessages,
		getChatMessages,
	} = useChat({ chatId: activeChatId, limit: LIMITS_MESSAGES });
	const { user } = useUser();

	const [localMessages, setLocalMessages] = useState<ChatMessage[]>(
		messages || [],
	);
	const [localChats, setLocalChats] = useState<ChatType[]>(chats || []);

	useEffect(() => {
		setIsBlockFetch(false);
		if (!activeChatId) {
			setLocalMessages([]);
			return;
		}
		refetchMessages();
	}, [activeChatId, refetchMessages]); // refetch messages by change activeChatId

	useEffect(() => {
		setLocalMessages(messages || []);
	}, [messages]); // set messages

	useEffect(() => {
		setLocalChats(chats || []);
	}, [chats]); // set chats

	useEcho(
		`user.${user?.id}`,
		'.MessageSent',
		(message: ChatMessageDTO) => {
			if (message.chat_id === activeChatId) {
				setLocalMessages((prev) => [
					...prev,
					dto<ChatMessageDTO, ChatMessage>('toClient', message),
				]);
				dispatch(
					chatApi.util.updateQueryData(
						'getChatMessages',
						{
							chatId: activeChatId,
							limit: LIMITS_MESSAGES,
							after_id: undefined,
							before_id: undefined,
						},
						(draft) => {
							draft.push(dto<ChatMessageDTO, ChatMessage>('toClient', message));
						},
					),
				);
			}
		},
		[activeChatId],
	);

	useEcho(
		`user.${user?.id}`,
		'.MessageDeleted',
		(event: { id: number; chat_id: number }) => {
			if (event.chat_id === activeChatId) {
				setLocalMessages((prev) => prev.filter((msg) => msg.id !== event.id));

				dispatch(
					chatApi.util.updateQueryData(
						'getChatMessages',
						{
							chatId: activeChatId,
							limit: LIMITS_MESSAGES,
							after_id: undefined,
							before_id: undefined,
						},
						(draft) => {
							const index = draft.findIndex((msg) => msg.id === event.id);
							if (index !== -1) {
								draft.splice(index, 1);
							}
						},
					),
				);
			}
		},
		[activeChatId],
	);

	useEcho(`user.${user?.id}`, '.ChatUpdated', (chat: ChatDTOType) => {
		setLocalChats((prev) => {
			const updatedChat = dto<ChatDTOType, ChatType>('toClient', chat);
			const reorderedChats = [
				updatedChat,
				...prev.filter((current) => current.id !== updatedChat.id),
			];
			return reorderedChats;
		});
	});

	const handleSetActiveChatId = (id: number) => {
		setActiveChatId(id);
		storageSetItem(String(id));
	};

	const handleRefetchOldestMessagesByScroll = useCallback(async () => {
		const beforeMessageId = localMessages[0].id;
		try {
			const oldestMessages = await getChatMessages({
				chatId: activeChatId,
				limit: LIMITS_MESSAGES,
				before_id: beforeMessageId,
			}).unwrap();
			if (oldestMessages.length < LIMITS_MESSAGES) {
				setIsBlockFetch(true);
			}
			setLocalMessages((prev) => [...oldestMessages, ...prev]);
		} catch (error) {
			console.error('Не удалось загрузить старые сообщения', error);
		}
	}, [activeChatId, getChatMessages, localMessages]);

	return (
		<section
			className={`flex w-full h-[${layoutConfig.chatHeight}] max-h-[650px] min-h-[650px] gap-6 rounded-3xl border ${windowColorBg.classes}`}
		>
			<AnimatePresence>
				{isSettingsOpen && (
					<ChatSettings setIsSettingsOpen={setIsSettingsOpen} />
				)}
			</AnimatePresence>
			{!isChatsLoading ? (
				<ChatListAside
					chats={localChats || []}
					activeChatId={activeChatId}
					onChatClick={handleSetActiveChatId}
					setIsSettingsOpen={setIsSettingsOpen}
				/>
			) : (
				<ChatListAsideSkeleton />
			)}
			{!isMessagesLoading ? (
				<ChatMessagesWindow
					loadOldestMessages={handleRefetchOldestMessagesByScroll}
					chats={localChats || []}
					activeChatId={activeChatId}
					isDeleting={isDeleting}
					localMessages={localMessages}
					sendMessageData={sendMessageData}
					deleteMessageData={deleteMessageData}
					isBlockFetch={isBlockFetch}
					isSending={isSending}
				/>
			) : (
				<ChatMessagesWindowSkeleton />
			)}
		</section>
	);
};
