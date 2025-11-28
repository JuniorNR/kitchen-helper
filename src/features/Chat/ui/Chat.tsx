'use client';
import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';
import { layoutConfig } from '@/configs';
import type {
	ChatDTO as ChatDTOType,
	ChatMessage,
	ChatMessageDTO,
	Chat as ChatType,
} from '@/entities';
import { useChat, useUser } from '@/entities';
import { dto, localStorageHelper } from '@/shared/lib/helpers';
import { ChatListAside } from './ChatListAside';
import { ChatListAsideSkeleton } from './ChatListAside.skeleton';
import { ChatMessagesWindow } from './ChatMessagesWindow';
import { ChatMessagesWindowSkeleton } from './ChatMessagesWindow.skeleton';

export const Chat = () => {
	const { item: localStorageChatId, storageSetItem } =
		localStorageHelper('active_chat_id');
	const [activeChatId, setActiveChatId] = useState<number | null>(
		Number(localStorageChatId) || null,
	);

	const {
		chats,
		messages,
		isSending,
		isChatsLoading,
		isMessagesLoading,
		sendMessageData,
		refetchMessages,
	} = useChat(activeChatId);
	const { user } = useUser();

	const [localMessages, setLocalMessages] = useState<ChatMessage[]>(
		messages || [],
	);
	const [localChats, setLocalChats] = useState<ChatType[]>(chats || []);

	useEffect(() => {
		if (!activeChatId) {
			setLocalMessages([]);
			return;
		}
		refetchMessages(); // заставляем RTK Query снова сходить на бэк
	}, [activeChatId, refetchMessages]); // refetch messages by change activeChatId

	useEffect(() => {
		setLocalMessages(messages || []);
	}, [messages]); // set messages

	useEffect(() => {
		setLocalChats(chats || []);
	}, [chats]); // set chats

	useEcho(`user.${user?.id}`, '.MessageSent', (message: ChatMessageDTO) => {
		if (message.chat_id === activeChatId) {
			setLocalMessages((prev) => [
				...prev,
				dto<ChatMessageDTO, ChatMessage>('toClient', message),
			]);
		}
	});

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
					chats={localChats || []}
					activeChatId={activeChatId}
					localMessages={localMessages}
					sendMessageData={sendMessageData}
					isSending={isSending}
				/>
			) : (
				<ChatMessagesWindowSkeleton />
			)}
		</section>
	);
};
