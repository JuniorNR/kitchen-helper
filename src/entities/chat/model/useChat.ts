import { dto } from '@/shared/lib/helpers';
import {
	useCreateChatMutation,
	useDeleteChatMutation,
	useDeleteMessageMutation,
	useGetChatMessagesQuery,
	useGetChatsQuery,
	useLazyGetChatMessagesQuery,
	useSendMessageMutation,
} from './chat.api';
import type {
	ChatMessage,
	ChatMessageQuery,
	CreateChatQuery,
	CreateChatQueryDTO,
} from './chat.types';

export const useChat = ({
	chatId,
	limit,
	after_id,
	before_id,
	skip = false,
}: ChatMessageQuery) => {
	const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery(
		undefined,
		{ skip },
	);
	const {
		data: messages,
		isLoading: isMessagesLoading,
		refetch: refetchMessages,
	} = useGetChatMessagesQuery(
		{ chatId, limit, after_id, before_id },
		{
			skip: !chatId || skip,
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		},
	);
	const [getChatMessages, { isLoading: isMessagesOldestLoading }] =
		useLazyGetChatMessagesQuery();
	const [createChat, { isLoading: isCreatingChat }] = useCreateChatMutation();
	const [deleteChat, { isLoading: isDeletingChat }] = useDeleteChatMutation();
	const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
	const [deleteMessage, { isLoading: isDeletingMessage }] =
		useDeleteMessageMutation();

	const sendMessageData = async (
		content: string,
		replyMessage?: ChatMessage,
	) => {
		try {
			const data = await sendMessage({
				chatId: chatId || 0, //TODO: Переделать
				content,
				replyMessage,
			}).unwrap();
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const createChatData = async (data: CreateChatQuery) => {
		try {
			const dataDTO = dto<CreateChatQuery, CreateChatQueryDTO>(
				'toServer',
				data,
			);

			const result = await createChat(dataDTO).unwrap();
			return result;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const deleteChatData = async ({ chatId }: { chatId: string }) => {
		try {
			const result = await deleteChat({ chatId }).unwrap();
			return result;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const deleteMessageData = async ({ messageId }: { messageId: number }) => {
		try {
			const result = await deleteMessage({
				chatId: chatId || 0, //TODO: Переделать
				messageId,
			}).unwrap();
			return result;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	return {
		chats,
		isChatsLoading,
		isCreatingChat,
		isDeletingChat,
		isSending,
		isDeletingMessage,
		messages,
		isMessagesLoading,
		isMessagesOldestLoading,
		refetchMessages,
		sendMessageData,
		createChatData,
		deleteChatData,
		deleteMessageData,
		getChatMessages,
	};
};
