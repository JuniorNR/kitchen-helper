import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import { type FC, useCallback, useEffect, useRef, useState } from 'react';
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

	const [isFocused, setIsFocused] = useState<boolean>(false);
	const inputRef = useRef<HTMLInputElement>(null);
	const inputContainerRef = useRef<HTMLDivElement>(null);

	const handleSendMessage = useCallback(() => {
		sendMessage(message, replyMessage).then(() => {
			setMessage('');
		});
		cancelReplyMessage();
	}, [message, replyMessage, sendMessage, setMessage, cancelReplyMessage]);

	// Устанавливаем фокус после завершения отправки
	useEffect(() => {
		if (!isSending && message === '') {
			requestAnimationFrame(() => {
				const inputElement = inputContainerRef.current?.querySelector('input');
				if (inputElement) {
					inputElement.focus();
				}
			});
		}
	}, [isSending, message]);

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (isFocused && event.code === 'Enter' && !event.shiftKey) {
				event.preventDefault();
				if (message.trim() && !isSending) {
					handleSendMessage();
				}
			}
		};

		if (isFocused) {
			document.addEventListener('keydown', handleKeyDown);
		} else {
			document.removeEventListener('keydown', handleKeyDown);
		}

		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [isFocused, message, isSending, handleSendMessage]);

	// Обработчик для Ctrl+Space (фокус на input)
	useEffect(() => {
		const handleCtrlSpace = (event: KeyboardEvent) => {
			if (
				(event.ctrlKey || event.metaKey) &&
				event.code === 'Space' &&
				!event.shiftKey &&
				!event.altKey
			) {
				const activeElement = document.activeElement;
				const inputElement = inputContainerRef.current?.querySelector('input');
				// Устанавливаем фокус, если активный элемент не является нашим input
				if (inputElement && activeElement !== inputElement) {
					event.preventDefault();
					inputElement.focus();
				}
			}
		};

		document.addEventListener('keydown', handleCtrlSpace);

		return () => {
			document.removeEventListener('keydown', handleCtrlSpace);
		};
	}, []);

	// Обработчик для Escape (отмена ответа)
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.code === 'Escape' && replyMessage) {
				// Проверяем, не находится ли фокус на поле ввода
				const activeElement = document.activeElement;
				const inputElement = inputContainerRef.current?.querySelector('input');
				const isInputFocused = activeElement === inputElement;

				// Если фокус не на input, отменяем ответ
				if (!isInputFocused) {
					event.preventDefault();
					cancelReplyMessage();
				}
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [replyMessage, cancelReplyMessage]);

	return (
		<div className="relative flex flex-col w-full">
			{replyMessage && (
				<ChatSendControlPanelReply
					replyMessage={replyMessage}
					isOwnMessage={replyMessage.user.id === currentUserId}
					onCancel={cancelReplyMessage}
				/>
			)}
			<div className="flex items-center" ref={inputContainerRef}>
				<Input
					ref={inputRef}
					size="md"
					color="primary"
					radius="none"
					placeholder={`${tFields('write_message')}...`}
					disabled={isSending}
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
				/>
				<Button
					size="md"
					radius="none"
					color="primary"
					onPress={handleSendMessage}
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
