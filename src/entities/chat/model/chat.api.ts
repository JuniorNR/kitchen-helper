import { createApi } from '@reduxjs/toolkit/query/react';
import { dto } from '@/shared/lib/helpers';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type {
	Chat,
	ChatDTO,
	ChatMessage,
	ChatMessageDTO,
	ChatMessageQuery,
	DeleteMessageQuery,
	SendMessageQuery,
} from './chat.types';

export const chatApi = createApi({
	reducerPath: 'chatApi',
	baseQuery: baseQuery,
	tagTypes: ['ChatMessages'],
	endpoints: (builder) => ({
		getChats: builder.query<Chat[], void>({
			query: () => '/chats',
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
				refetchOnMountOrArgChange: true,
				keepUnusedDataFor: 0,
				transformResponse: (response: ChatMessageDTO) => {
					return dto<ChatMessageDTO, ChatMessage>('toClient', response);
				},
			}),
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
	useSendMessageMutation,
	useDeleteMessageMutation,
	useLazyGetChatMessagesQuery,
} = chatApi;
