'use client';
import { useEcho } from '@laravel/echo-react';
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
import { useAppDispatch } from '@/shared/lib/hooks';
import { LIMITS_MESSAGES } from '../model/chat.utils';
import { ChatListAside } from './ChatListAside';
import { ChatListAsideSkeleton } from './ChatListAside.skeleton';
import { ChatMessagesWindow } from './ChatMessagesWindow';
import { ChatMessagesWindowSkeleton } from './ChatMessagesWindow.skeleton';

export const Chat = () => {
	const dispatch = useAppDispatch();
	const { item: localStorageChatId, storageSetItem } =
		localStorageHelper('active_chat_id');
	const [activeChatId, setActiveChatId] = useState<number | null>(
		Number(localStorageChatId) || null,
	);
	const [isBlockFetch, setIsBlockFetch] = useState<boolean>(false);
	const {
		chats,
		messages,
		isSending,
		isChatsLoading,
		isMessagesLoading,
		sendMessageData,
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
			className={`flex w-full h-[${layoutConfig.chatHeight}] max-h-[650px] min-h-[400px] gap-6 rounded-3xl border border-slate-200/90 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.08)] backdrop-blur-sm dark:bg-none dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-900/40`}
		>
			{!isChatsLoading ? (
				<ChatListAside
					chats={localChats || []}
					activeChatId={activeChatId}
					onChatClick={handleSetActiveChatId}
				/>
			) : (
				<ChatListAsideSkeleton />
			)}
			{!isMessagesLoading ? (
				<ChatMessagesWindow
					loadOldestMessages={handleRefetchOldestMessagesByScroll}
					chats={localChats || []}
					activeChatId={activeChatId}
					localMessages={localMessages}
					sendMessageData={sendMessageData}
					isBlockFetch={isBlockFetch}
					isSending={isSending}
				/>
			) : (
				<ChatMessagesWindowSkeleton />
			)}
		</section>
	);
};
