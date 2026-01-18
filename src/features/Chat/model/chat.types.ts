import type { Dispatch, SetStateAction } from 'react';
import type { Chat, ChatMessage } from '@/entities/chat/model/chat.types';

export type DeleteMessageData = ({
	messageId,
}: {
	messageId: number;
}) => Promise<ChatMessage | null>;

export interface ChatSendControlPanelProps {
	message: string;
	isSending: boolean;
	replyMessage?: ChatMessage;
	setMessage: Dispatch<SetStateAction<string>>;
	cancelReplyMessage: () => void;
	sendMessage: (
		content: string,
		replyMessage?: ChatMessage,
	) => Promise<ChatMessage | null>;
	currentUserId?: number;
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
	isDeleting: boolean;
	isBlockFetch: boolean;
	sendMessageData: (
		content: string,
		replyMessage?: ChatMessage,
	) => Promise<ChatMessage | null>;
	deleteMessageData: DeleteMessageData;
	loadOldestMessages?: () => void;
}

export interface ChatMessageComponentProps {
	message: ChatMessage;
	isOwnMessage: boolean;
	isDeleting: boolean;
	deleteMessageData: DeleteMessageData;
	setReplyMessage: Dispatch<SetStateAction<ChatMessage | undefined>>;
	className?: string;
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
	chatMessageOwnComponentColorBg: ChatThemeColor;
	chatMessageComponentColorBg: ChatThemeColor;
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
	index: number;
	className?: string;
	isUnread?: boolean;
}

export interface ChatSettingsPreviewComponentProps {
	children: React.ReactNode;
	title: string;
	className?: string;
}

export interface ChatSendControlPanelReplyProps {
	replyMessage: ChatMessage;
	onCancel: () => void;
	isOwnMessage?: boolean;
}
