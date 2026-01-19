import { Button } from '@heroui/button';
import moment from 'moment';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Kbd, Typography } from '@/shared/ui';
import { ReplyIcon } from '@/shared/ui/icons/replyIcon';
import type { ChatSendControlPanelReplyProps } from '../model/chat.types';

export const ChatSendControlPanelReply: FC<ChatSendControlPanelReplyProps> = ({
	replyMessage,
	onCancel,
	isOwnMessage = false,
}) => {
	const { t: tChats } = useTranslation('chats');
	const MAX_REPLY_PREVIEW_LENGTH = 100;

	const getTruncatedContent = (content: string): string => {
		if (content.length <= MAX_REPLY_PREVIEW_LENGTH) {
			return content;
		}
		return `${content.slice(0, MAX_REPLY_PREVIEW_LENGTH)}...`;
	};

	return (
		<div className="absolute group top-0 right-0 -translate-y-full w-full flex items-start justify-between gap-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border-l-4 border-primary-500">
			<Kbd
				className="absolute right-[50px] top-0 translate-y-1/2 text-amber-50 z-999"
				shortcut={'Esc'}
			/>
			<div className="flex flex-col flex-1 min-w-0 gap-1">
				<div className="flex items-center gap-1.5">
					<ReplyIcon className="text-slate-500 dark:text-slate-400" />
					<Typography
						component="span"
						className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400"
					>
						{tChats('reply.reply')}
					</Typography>
				</div>
				<div className="flex items-center gap-2">
					<Typography
						component="span"
						className={`text-xs font-semibold uppercase tracking-wide ${
							isOwnMessage
								? 'text-emerald-500 dark:text-emerald-300'
								: 'text-slate-600 dark:text-slate-400'
						}`}
					>
						{replyMessage.user.name}
					</Typography>
					<Typography
						component="span"
						className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 uppercase tracking-wide"
					>
						{replyMessage.user.role}
					</Typography>
				</div>
				<Typography
					component="p"
					className="text-sm text-slate-700 dark:text-slate-300 line-clamp-2 break-words"
				>
					{getTruncatedContent(replyMessage.content)}
				</Typography>
				<Typography
					component="span"
					className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5"
				>
					{moment(replyMessage.createdAt).format('DD.MM.YYYY HH:mm')}
				</Typography>
			</div>
			<Button
				size="sm"
				variant="solid"
				className="h-6 w-6 min-w-6 rounded-full border border-transparent hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors flex-shrink-0"
				aria-label={tChats('reply.cancel')}
				onPress={onCancel}
			>
				<span className="text-base leading-none">×</span>
			</Button>
		</div>
	);
};
