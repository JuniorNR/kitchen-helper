import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SendMessageIcon } from '@/shared/ui/icons/sendMessageIcon';
import type { ChatSendControlPanelProps } from '../model/chat.types';

export const ChatSendControlPanel: FC<ChatSendControlPanelProps> = ({
	message,
	setMessage,
	sendMessage,
	isSending,
}) => {
	const { t: tFields } = useTranslation('fields');
	return (
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
	);
};
