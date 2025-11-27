import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import type { FC } from 'react';
import type { ChatSendControlPanelProps } from '@/entities/chat/model/chat.types';
import { SendMessageIcon } from '@/shared/ui/icons/sendMessageIcon';

export const ChatSendControlPanel: FC<ChatSendControlPanelProps> = ({
	message,
	setMessage,
	sendMessage,
	isSending,
}) => {
	return (
		<div className="flex items-center">
			<Input
				size="md"
				color="primary"
				radius="none"
				placeholder="Напишите сообщение..."
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
	);
};
