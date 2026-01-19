/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
'use client';

import moment from 'moment';
import { type FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@/shared/lib/hooks';
import { ContextMenu, Typography } from '@/shared/ui';
import type { ContextMenuItem } from '@/shared/ui/ContextMenu/model/contextMenu.types';
import { DeleteIcon } from '@/shared/ui/icons/deleteIcon';
import { ReplyIcon } from '@/shared/ui/icons/replyIcon';
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
	const [isDeletingMessage, setIsDeletingMessage] = useState<boolean>(false);

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
				setReplyMessage?.(message);
			},
			shortcut: ['Hover', 'Ctrl+R'],
		},
	];

	if (isOwnMessage) {
		menuItems.push({
			label: tChats('context_menu.delete'),
			isActionLoading: isDeleting,
			action: () => {
				deleteMessageData?.({ messageId: message.id });
			},
			shortcut: ['Hover', 'Ctrl+D'],
		});
	}

	const MAX_REPLY_PREVIEW_LENGTH = 50;

	const getTruncatedContent = (content: string): string => {
		if (content.length <= MAX_REPLY_PREVIEW_LENGTH) {
			return content;
		}
		return `${content.slice(0, MAX_REPLY_PREVIEW_LENGTH)}...`;
	};

	const isReplyMessageOwn = message.reply?.user.id === message.user.id;

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
			// Проверяем актуальное значение через ref
			if (
				isHoveredRef.current &&
				(event.ctrlKey || event.metaKey) &&
				!event.shiftKey &&
				!event.altKey
			) {
				event.preventDefault();
				const currentMessage = messageRef.current;
				const currentIsOwnMessage = isOwnMessageRef.current;
				if (event.code === 'KeyC') {
					navigator.clipboard.writeText(currentMessage.content);
				}
				if (event.code === 'KeyR') {
					setReplyMessageRef.current?.(currentMessage);
				}
				if (event.code === 'KeyD') {
					if (currentIsOwnMessage) {
						setIsDeletingMessage(true);

						if (!isDeletingMessage) {
							deleteMessageDataRef
								.current?.({ messageId: currentMessage.id })
								.then(() => {
									setIsDeletingMessage(false);
								});
						}
					}
				}
			}
		};

		document.addEventListener('keydown', handleKeyDown, true);

		return () => {
			document.removeEventListener('keydown', handleKeyDown, true);
		};
	}, [isDeletingMessage]);

	return (
		<ContextMenu items={menuItems} disabled={isDeletingMessage}>
			<div
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				className={`relative max-w-[100%] rounded-2xl border px-4 py-3 text-sm leading-relaxed ${
					isOwnMessage
						? theme.chatMessageOwnComponentColorBg.classes
						: theme.chatMessageComponentColorBg.classes
				} ${className}`}
			>
				{isDeletingMessage && (
					<div className="absolute inset-0 z-20 flex items-center justify-center rounded-2xl bg-slate-900/70 backdrop-blur-sm transition-all duration-300 dark:bg-slate-950/80 px-2 py-1">
						<div className="flex flex-col items-center gap-1.5">
							<div className="relative">
								<div className="absolute inset-0 animate-ping rounded-full bg-red-500/30 scale-75"></div>
								<div className="relative flex items-center justify-center rounded-full bg-red-500/20 p-1.5 dark:bg-red-600/20">
									<DeleteIcon className="h-4 w-4 animate-pulse text-red-500 dark:text-red-400" />
								</div>
							</div>
							<Typography
								component="span"
								className="text-xs font-semibold text-red-500 dark:text-red-400 leading-tight"
							>
								{tChats('context_menu.deleting')}
							</Typography>
						</div>
					</div>
				)}
				{message.reply && (
					<div className="mb-3 pb-3 border-b border-slate-200 dark:border-slate-700">
						<div className="flex items-center gap-1.5 mb-1">
							<ReplyIcon className="text-slate-400 dark:text-slate-500 w-3 h-3" />
							<Typography
								component="span"
								className={`text-[10px] font-semibold uppercase tracking-wide ${
									isReplyMessageOwn
										? 'text-emerald-500 dark:text-emerald-300'
										: 'text-slate-600 dark:text-slate-400'
								}`}
							>
								{message.reply.user.name}
							</Typography>
						</div>
						<Typography
							component="p"
							className="text-xs text-slate-600 dark:text-slate-400 line-clamp-1 break-words"
						>
							{getTruncatedContent(message.reply.content)}
						</Typography>
					</div>
				)}
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
