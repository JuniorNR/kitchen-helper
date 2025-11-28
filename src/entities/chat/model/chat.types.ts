type ChatIdType = number | null;

export interface ChatDTO {
	id: number;
	name: string;
	created_at: string;
	updated_at: string;
	last_message_created_at: string;
	users_count: number;
	users: ChatUserDTO[];
	last_message: ChatMessageDTO;
	creator: ChatUserDTO;
}

export interface ChatUserDTO {
	id: number;
	name: string;
	role: string;
}

export interface ChatMessageDTO {
	id: number;
	chat_id: number;
	content: string;
	created_at: string;
	updated_at: string;
	user: ChatUserDTO;
}

export interface Chat {
	id: number;
	name: string;
	createdAt: string;
	updatedAt: string;
	lastMessageCreatedAt: string;
	usersCount: number;
	users: ChatUser[];
	lastMessage: ChatMessage;
	creator: ChatUser;
}

export interface ChatUser {
	id: number;
	name: string;
	role: string;
}

export interface ChatMessage {
	id: number;
	chatId: number;
	content: string;
	createdAt: string;
	updatedAt: string;
	user: ChatUser;
}

export interface ChatMessageQuery {
	chatId: ChatIdType;
}

export interface SendMessageQuery {
	chatId: ChatIdType;
	content: string;
}
