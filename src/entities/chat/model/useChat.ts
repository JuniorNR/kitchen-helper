import {
	useDeleteMessageMutation,
	useGetChatMessagesQuery,
	useGetChatsQuery,
	useLazyGetChatMessagesQuery,
	useSendMessageMutation,
} from './chat.api';
import type { ChatMessageQuery } from './chat.types';

export const useChat = ({
	chatId,
	limit,
	after_id,
	before_id,
}: ChatMessageQuery) => {
	const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery();
	const {
		data: messages,
		isLoading: isMessagesLoading,
		refetch: refetchMessages,
	} = useGetChatMessagesQuery(
		{ chatId, limit, after_id, before_id },
		{
			skip: !chatId,
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		},
	);
	const [getChatMessages, { isLoading: isMessagesOldestLoading }] =
		useLazyGetChatMessagesQuery();
	const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();
	const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

	const sendMessageData = async (content: string) => {
		try {
			const data = await sendMessage({ chatId, content }).unwrap();
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	const deleteMessageData = async ({ messageId }: { messageId: number }) => {
		try {
			const data = await deleteMessage({ chatId, messageId }).unwrap();
			return data;
		} catch (error) {
			console.error(error);
			return null;
		}
	};

	return {
		chats,
		isChatsLoading,
		isSending,
		isDeleting,
		messages,
		isMessagesLoading,
		isMessagesOldestLoading,
		refetchMessages,
		sendMessageData,
		deleteMessageData,
		getChatMessages,
	};
};
