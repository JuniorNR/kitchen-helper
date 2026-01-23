import { createApi } from '@reduxjs/toolkit/query/react';
import { dto } from '@/shared/lib/helpers';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type {
	Chat,
	ChatDTO,
	ChatMessage,
	ChatMessageDTO,
	ChatMessageQuery,
	CreateChatQueryDTO,
	DeleteMessageQuery,
	SendMessageQuery,
} from './chat.types';

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: baseQuery,
	tagTypes: ['ChatMessages', 'Chats'],
	endpoints: (builder) => ({
		getChats: builder.query<Chat[], void>({
			query: () => '/chats',
			providesTags: ['Chats'],
			transformResponse: (response: ChatDTO[]) => {
				return dto<ChatDTO[], Chat[]>('toClient', response);
			},
		}),
		getChatMessages: builder.query<ChatMessage[], ChatMessageQuery>({
			query: ({ chatId, limit, before_id, after_id }) => ({
				url: `/chats/${chatId}/messages`,
				params: {
					limit,
					before_id,
					after_id,
				},
			}),
			providesTags: ['ChatMessages'],
			transformResponse: (response: ChatMessageDTO[]) => {
				return dto<ChatMessageDTO[], ChatMessage[]>('toClient', response);
			},
		}),
		createChat: builder.mutation<Chat, CreateChatQueryDTO>({
			invalidatesTags: ['Chats'],
			query: ({ name, user_ids }) => ({
				url: `/chats/create`,
				method: 'POST',
				body: {
					name,
					user_ids,
				},
			}),
			transformResponse: (response: ChatDTO) => {
				return dto<ChatDTO, Chat>('toClient', response);
			},
		}),
		sendMessage: builder.mutation<ChatMessage, SendMessageQuery>({
			query: ({ chatId, content, replyMessage }) => ({
				url: `/chats/${chatId}/messages`,
				method: 'POST',
				body: {
					content,
					reply: replyMessage
						? dto<ChatMessage, ChatMessageDTO>('toServer', replyMessage)
						: undefined,
				},
			}),
			transformResponse: (response: ChatMessageDTO) => {
				return dto<ChatMessageDTO, ChatMessage>('toClient', response);
			},
		}),
		deleteMessage: builder.mutation<ChatMessage, DeleteMessageQuery>({
			query: ({ chatId, messageId }) => ({
				url: `/chats/${chatId}/messages/${messageId}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetChatsQuery,
	useGetChatMessagesQuery,
	useCreateChatMutation,
	useSendMessageMutation,
	useDeleteMessageMutation,
	useLazyGetChatMessagesQuery,
} = chatApi;
