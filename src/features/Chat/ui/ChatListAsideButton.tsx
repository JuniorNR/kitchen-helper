'use client';

import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import moment from 'moment';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { customizeString } from '@/shared/lib/helpers';
import { useAppSelector } from '@/shared/lib/hooks';
import { Kbd, Typography } from '@/shared/ui';
import type { ChatListAsideButtonProps } from '../model/chat.types';

export const ChatListAsideButton: FC<ChatListAsideButtonProps> = ({
	chat,
	activeChatId,
	onChatClick,
	currentUserId,
	index,
	className = '',
	isUnread,
}) => {
	const { t: tChats, i18n } = useTranslation('chats');
	const { theme } = useAppSelector((state) => state.chat.settings);

	const lastMessage = chat.lastMessage;
	const lastMessageMoment = lastMessage?.createdAt
		? moment(lastMessage.createdAt)
		: null;
	const lastMessageTimestamp = lastMessageMoment
		? lastMessageMoment.format('DD.MM.YYYY HH:mm')
		: '——— ——';
	const lastMessageAuthor =
		lastMessage?.user.name || tChats('settings.common.no_author');
	const lastMessageContent =
		lastMessage?.content || tChats('alerts.titles.no_messages');
	const isOwnMessage = lastMessage?.user.id === currentUserId;

	const interlocutorOrCount = (): string => {
		if (chat.usersCount === 2) {
			return chat.users.find((user) => user.id !== currentUserId)?.name || '0';
		}
		return `${chat.usersCount || 0} ${customizeString(tChats('member'), {
			language: i18n.language,
			cut: {
				english: 4,
				russian: 2,
			},
			ended: {
				countTrigger: chat.usersCount || 0,
				russian: {
					zero: 'ов',
					fromTwoToFour: 'а',
					fromFiveToTen: 'ов',
					fromElevenToNineteen: 'ов',
				},
				english: {
					moreThatOne: 's',
				},
			},
		}).toLowerCase()}`;
	};

	return (
		<motion.li
			key={chat.id}
			layout="position"
			className={`max-w-[400px] ${className}`}
			transition={{
				layout: {
					duration: 0.1,
					ease: [0.22, 1, 0.36, 1],
				},
			}}
		>
			<Button
				type="button"
				className={`group h-fit relative flex w-full flex-col gap-3 overflow-hidden rounded-2xl border px-2 py-2 text-left transition duration-300 ${
					chat.id === activeChatId
						? theme.chatCardActiveColorBg.classes
						: theme.chatCardColorBg.classes
				}`}
				onPress={() => onChatClick(chat.id)}
			>
				{index <= 2 && (
					<Kbd
						className="absolute top-3 right-3"
						shortcut={`Alt+${index + 1}`}
					/>
				)}

				<div
					aria-hidden="true"
					className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 ${
						chat.id === activeChatId
							? 'bg-gradient-to-r from-emerald-100/60 via-transparent to-transparent dark:from-emerald-500/10'
							: 'bg-gradient-to-r from-white/0 via-white/40 to-white/0 dark:from-slate-900/0 dark:via-slate-900/40'
					}`}
				/>
				<div className={`flex flex-1 flex-col gap-2 w-full`}>
					<div className="flex items-center justify-between gap-2">
						<Typography
							component="h3"
							className={`text-sm font-semibold text-slate-800 dark:text-slate-100`}
						>
							{chat.name}
						</Typography>
					</div>

					<div className="flex flex-wrap items-between justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
						<Typography
							component="span"
							maxLength={12}
							tooltip
							className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200"
						>
							{interlocutorOrCount()}
						</Typography>
						<div
							className={`flex flex-col items-center justify-center rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
								chat.id === activeChatId
									? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-400/10 dark:text-emerald-100'
									: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
							}`}
						>
							<Typography component="span">{lastMessageTimestamp}</Typography>
						</div>
					</div>

					<div
						className={`relative rounded-2xl px-2 py-2 border ${isOwnMessage ? theme.chatCardOwnMessageColorBg.classes : theme.chatCardMessageColorBg.classes}`}
					>
						{isUnread && (
							<div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-primary shadow-lg" />
						)}
						<Typography
							component="span"
							className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide shadow-sm ${isOwnMessage ? 'bg-white text-emerald-600  dark:bg-emerald-500/20 dark:text-emerald-100' : 'bg-white text-slate-600  dark:bg-slate-500/20 dark:text-slate-100'}`}
						>
							{lastMessageAuthor}
						</Typography>
						<Typography className="mt-2 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-white">
							{lastMessageContent}
						</Typography>
					</div>
				</div>
			</Button>
		</motion.li>
	);
};
