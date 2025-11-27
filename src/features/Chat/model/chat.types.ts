import type { Dispatch, SetStateAction } from 'react';
import type { Chat, ChatMessage } from '@/entities/chat/model/chat.types';

export interface ChatSendControlPanelProps {
	message: string;
	setMessage: Dispatch<SetStateAction<string>>;
	sendMessage: (content: string) => Promise<ChatMessage | null>;
	isSending: boolean;
}

export interface ChatListAsideProps {
	chats: Chat[];
	activeChatId: number | null;
	onChatClick: (id: number) => void;
}

export interface ChatMessagesWindowProps {
	chats: Chat[];
	activeChatId: number | null;
	localMessages: ChatMessage[];
	sendMessageData: (content: string) => Promise<ChatMessage | null>;
	isSending: boolean;
}
