import type { Dispatch, SetStateAction } from 'react';
import type { Chat, ChatMessage } from '@/entities/chat/model/chat.types';
import type {
	chatColorBgVariants,
	chatWindowColorBgVariants,
} from './chat.utils';

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
	setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ChatMessagesWindowProps {
	chats: Chat[];
	activeChatId: number | null;
	localMessages: ChatMessage[];
	isSending: boolean;
	isBlockFetch: boolean;
	sendMessageData: (content: string) => Promise<ChatMessage | null>;
	loadOldestMessages?: () => void;
}

export interface ChatSettingsProps {
	setIsSettingsOpen: Dispatch<SetStateAction<boolean>>;
}

export interface ChatState {
	settings: {
		theme: ChatTheme;
	};
}

export interface ChatTheme {
	windowColorBg: ChatThemeColor;
	asideColorBg: ChatThemeColor;
	chatColorBg: ChatThemeColor;
	chatCardColorBg: ChatThemeColor;
	chatCardActiveColorBg: ChatThemeColor;
	chatCardOwnMessageColorBg: ChatThemeColor;
	chatCardMessageColorBg: ChatThemeColor;
}

export interface ChatThemeColor {
	colorName: string;
	classes: string;
}

export interface ChatSettingsColorsVariantsProps {
	title: string;
	chatThemeState: ChatTheme;
	colorVariants: Record<string, string>;
	handleColorThemeChange: (data: ChatThemeColor) => void;
	themeField: keyof ChatTheme;
	className?: string;
	minimize?: boolean;
}

export type SettingsSection = 'colors' | 'notifications' | 'general';

export interface ChatListAsideButtonProps {
	chat: Chat;
	activeChatId: number | null;
	onChatClick: (id: number) => void;
	currentUserId: number | undefined;
	className?: string;
	isUnread?: boolean;
}

export interface ChatSettingsPreviewComponentProps {
	children: React.ReactNode;
	title: string;
	className?: string;
}
