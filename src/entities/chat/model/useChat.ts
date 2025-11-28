import {
	useGetChatMessagesQuery,
	useGetChatsQuery,
	useSendMessageMutation,
} from './chat.api';

export const useChat = (id: number | null) => {
	const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery();
	const {
		data: messages,
		isLoading: isMessagesLoading,
		refetch: refetchMessages,
	} = useGetChatMessagesQuery(
		{ chatId: id },
		{
			skip: !id,
			refetchOnMountOrArgChange: true,
			refetchOnFocus: true,
			refetchOnReconnect: true,
		},
	);
	const [sendMessage, { isLoading: isSending }] = useSendMessageMutation();

	const sendMessageData = async (content: string) => {
		try {
			const data = await sendMessage({ chatId: id, content }).unwrap();
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
		messages,
		isMessagesLoading,
		refetchMessages,
		sendMessageData,
	};
};
