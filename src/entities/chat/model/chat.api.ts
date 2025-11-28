import { createApi } from '@reduxjs/toolkit/query/react';
import { dto } from '@/shared/lib/helpers';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type {
	Chat,
	ChatDTO,
	ChatMessage,
	ChatMessageDTO,
	ChatMessageQuery,
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
			query: ({ chatId }) => ({ url: `/chats/${chatId}/messages` }),
			providesTags: ['ChatMessages'],
			transformResponse: (response: ChatMessageDTO[]) => {
				return dto<ChatMessageDTO[], ChatMessage[]>('toClient', response);
			},
		}),
		sendMessage: builder.mutation<ChatMessage, SendMessageQuery>({
			query: ({ chatId, content }) => ({
				url: `/chats/${chatId}/messages`,
				method: 'POST',
				body: { content },
				refetchOnMountOrArgChange: true,
				keepUnusedDataFor: 0,
				transformResponse: (response: ChatMessageDTO) => {
					return dto<ChatMessageDTO, ChatMessage>('toClient', response);
				},
			}),
			invalidatesTags: ['ChatMessages'],
		}),
	}),
});

export const {
	useGetChatsQuery,
	useGetChatMessagesQuery,
	useSendMessageMutation,
	// useLazyGetChatMessagesQuery,
} = chatApi;
