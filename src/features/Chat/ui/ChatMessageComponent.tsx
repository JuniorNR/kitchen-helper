'use client';

import moment from 'moment';
import type { FC } from 'react';
import type { ChatMessage as ChatMessageType } from '@/entities/chat/model/chat.types';
import { useAppSelector } from '@/shared/lib/hooks';
import { Typography } from '@/shared/ui';

interface ChatMessageComponentProps {
	message: ChatMessageType;
	isOwnMessage: boolean;
	className?: string;
}

export const ChatMessageComponent: FC<ChatMessageComponentProps> = ({
	message,
	isOwnMessage,
	className = '',
}) => {
	const { theme } = useAppSelector((state) => state.chat.settings);
	return (
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
	);
};
