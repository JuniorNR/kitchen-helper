import {
	useGetChatMessagesQuery,
	useGetChatsQuery,
	useSendMessageMutation,
} from './chat.api';

export const useChat = (id: number | null) => {
	const { data: chats, isLoading: isChatsLoading } = useGetChatsQuery();
	const { data: messages, isLoading: isMessagesLoading } =
		useGetChatMessagesQuery({ chatId: id });
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
		messages,
		isMessagesLoading,
		sendMessageData,
		isSending,
	};
};
