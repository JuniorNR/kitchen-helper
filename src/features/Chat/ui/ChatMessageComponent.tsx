'use client';

import moment from 'moment';
import type { FC } from 'react';
import { useAppSelector } from '@/shared/lib/hooks';
import { ContextMenu, Typography } from '@/shared/ui';
import type { ContextMenuItem } from '@/shared/ui/ContextMenu/model/contextMenu.types';
import type { ChatMessageComponentProps } from '../model/chat.types';

export const ChatMessageComponent: FC<ChatMessageComponentProps> = ({
	message,
	isOwnMessage,
	isDeleting,
	deleteMessageData,
	className = '',
}) => {
	const { theme } = useAppSelector((state) => state.chat.settings);

	const menuItems: ContextMenuItem[] = [
		{
			label: 'Копировать',
			action: () => {
				navigator.clipboard.writeText(message.content);
			},
			shortcut: ['Hover', 'Ctrl+C'],
		},
		{
			label: 'Ответить',
			action: () => {
				console.debug('Reply to message:', message.id);
			},
			shortcut: ['Hover', 'Ctrl+X'],
		},
	];

	if (isOwnMessage) {
		menuItems.push({
			label: 'Удалить',
			isActionLoading: isDeleting,
			action: () => {
				deleteMessageData({ messageId: message.id });
			},
			shortcut: ['Hover', 'Delete'],
		});
	}

	return (
		<ContextMenu items={menuItems}>
			<div
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
