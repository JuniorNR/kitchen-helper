import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SendMessageIcon } from '@/shared/ui/icons/sendMessageIcon';
import type { ChatSendControlPanelProps } from '../model/chat.types';
import { ChatSendControlPanelReply } from './ChatSendControlPanelReply';

export const ChatSendControlPanel: FC<ChatSendControlPanelProps> = ({
	message,
	isSending,
	replyMessage,
	cancelReplyMessage,
	setMessage,
	sendMessage,
	currentUserId,
}) => {
	const { t: tFields } = useTranslation('fields');

	return (
		<div className="relative flex flex-col w-full">
			{replyMessage && (
				<ChatSendControlPanelReply
					replyMessage={replyMessage}
					isOwnMessage={replyMessage.user.id === currentUserId}
					onCancel={cancelReplyMessage}
				/>
			)}
			<div className="flex items-center">
				<Input
					size="md"
					color="primary"
					radius="none"
					placeholder={`${tFields('write_message')}...`}
					disabled={isSending}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
				<Button
					size="md"
					radius="none"
					color="primary"
					onPress={() => sendMessage(message).then(() => setMessage(''))}
					disabled={isSending}
					isLoading={isSending}
					isIconOnly
				>
					<SendMessageIcon />
				</Button>
			</div>
		</div>
	);
};
