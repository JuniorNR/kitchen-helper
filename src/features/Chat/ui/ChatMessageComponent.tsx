/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
'use client';

import moment from 'moment';
import { type FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/shared/lib/hooks';
import { ContextMenu, Typography } from '@/shared/ui';
import type { ContextMenuItem } from '@/shared/ui/ContextMenu/model/contextMenu.types';
import type { ChatMessageComponentProps } from '../model/chat.types';

export const ChatMessageComponent: FC<ChatMessageComponentProps> = ({
	message,
	isOwnMessage,
	isDeleting,
	deleteMessageData,
	setReplyMessage,
	className = '',
}) => {
	const { theme } = useAppSelector((state) => state.chat.settings);
	const { t: tChats } = useTranslation('chats');

	const [isHovered, setIsHovered] = useState<boolean>(false);
	const isHoveredRef = useRef<boolean>(false);
	const messageRef = useRef(message);
	const isOwnMessageRef = useRef(isOwnMessage);
	const deleteMessageDataRef = useRef(deleteMessageData);
	const setReplyMessageRef = useRef(setReplyMessage);

	const menuItems: ContextMenuItem[] = [
		{
			label: tChats('context_menu.copy'),
			action: () => {
				navigator.clipboard.writeText(message.content);
			},
			shortcut: ['Hover', 'Ctrl+C'],
		},
		{
			label: tChats('context_menu.reply'),
			action: () => {
				setReplyMessage(message);
			},
			shortcut: ['Hover', 'Ctrl+R'],
		},
	];

	if (isOwnMessage) {
		menuItems.push({
			label: tChats('context_menu.delete'),
			isActionLoading: isDeleting,
			action: () => {
				deleteMessageData({ messageId: message.id });
			},
			shortcut: ['Hover', 'Ctrl+D'],
		});
	}

	// Синхронизируем refs с актуальными значениями
	useEffect(() => {
		isHoveredRef.current = isHovered;
		messageRef.current = message;
		isOwnMessageRef.current = isOwnMessage;
		deleteMessageDataRef.current = deleteMessageData;
		setReplyMessageRef.current = setReplyMessage;
	}, [isHovered, message, isOwnMessage, deleteMessageData, setReplyMessage]);

	// Создаем обработчик один раз и используем refs для актуальных значений
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			// Проверяем актуальное значение через ref, а не через замыкание
			if (
				isHoveredRef.current &&
				(event.ctrlKey || event.metaKey) &&
				!event.shiftKey &&
				!event.altKey
			) {
				// Проверяем, не находится ли фокус на поле ввода
				const activeElement = document.activeElement;
				const isInputFocused =
					activeElement?.tagName === 'INPUT' ||
					activeElement?.tagName === 'TEXTAREA' ||
					(activeElement instanceof HTMLElement &&
						activeElement.isContentEditable);

				// Для Ctrl+C пропускаем, если фокус на input (чтобы не мешать стандартному копированию текста)
				if (isInputFocused && event.key === 'c') {
					return;
				}
				event.preventDefault();

				const currentMessage = messageRef.current;
				const currentIsOwnMessage = isOwnMessageRef.current;

				if (event.key === 'c') {
					navigator.clipboard.writeText(currentMessage.content);
				}
				if (event.key === 'r') {
					setReplyMessageRef.current(currentMessage);
				}
				if (event.key === 'd') {
					if (currentIsOwnMessage) {
						deleteMessageDataRef.current({ messageId: currentMessage.id });
					}
				}
			}
		};

		// Всегда добавляем слушатель, проверка isHovered происходит через ref внутри обработчика
		// Используем capture phase для более раннего перехвата события
		document.addEventListener('keydown', handleKeyDown, true);

		return () => {
			document.removeEventListener('keydown', handleKeyDown, true);
		};
	}, []);

	return (
		<ContextMenu items={menuItems}>
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={`max-w-[100%] rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
					isOwnMessage
						? theme.chatMessageOwnComponentColorBg.classes
						: theme.chatMessageComponentColorBg.classes
				} ${className}`}
			>
				<div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide">
					<Typography
						component="span"
						className={
							isOwnMessage
								? 'text-emerald-500 dark:text-emerald-300'
								: 'text-slate-600 dark:text-slate-400'
						}
					>
						{message.user.name}
					</Typography>
					<Typography
						component="span"
						className="ml-5 text-slate-500 dark:text-slate-500"
					>
						{moment(message.createdAt).format('DD.MM.YYYY HH:mm')}
					</Typography>
				</div>
				<Typography className="mt-2 overflow-hidden">
					{message.content}
				</Typography>
			</div>
		</ContextMenu>
	);
};
