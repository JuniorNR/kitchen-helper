'use client';
import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';
import { layoutConfig } from '@/configs';
import { useChat } from '@/entities';
import type {
	ChatMessage,
	ChatMessageDTO,
} from '@/entities/chat/model/chat.types';
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
		sendMessageData,
		isSending,
		isChatsLoading,
		isMessagesLoading,
	} = useChat(activeChatId);

	const [localMessages, setLocalMessages] = useState<ChatMessage[]>(
		messages || [],
	);

	useEcho(
		`chats.${activeChatId}`,
		'.MessageSent',
		(message: ChatMessageDTO) => {
			setLocalMessages((prev) => [
				...prev,
				dto<ChatMessageDTO, ChatMessage>('toClient', message),
			]);
		},
	);

	useEffect(() => {
		setLocalMessages(messages || []);
	}, [messages]);

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
					chats={chats || []}
					activeChatId={activeChatId}
					onChatClick={handleSetActiveChatId}
				/>
			) : (
				<ChatListAsideSkeleton />
			)}
			{!isMessagesLoading ? (
				<ChatMessagesWindow
					chats={chats || []}
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
