import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { motion } from 'framer-motion';
import moment from 'moment';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/entities';
import { customizeString } from '@/shared/lib/helpers';
import { useAppSelector } from '@/shared/lib/hooks';
import { Alert, Typography } from '@/shared/ui';
import { SettingsIcon } from '@/shared/ui/icons/settingsIcon';
import type { ChatListAsideProps } from '../model/chat.types';
import styles from './chat.module.scss';

export const ChatListAside: FC<ChatListAsideProps> = ({
	chats,
	activeChatId,
	onChatClick,
	setIsSettingsOpen,
}) => {
	const { asideColorBg } = useAppSelector((state) => state.chat.settings.theme);
	const { t: tChats, i18n } = useTranslation('chats');
	const { user } = useUser();
	const hasChats = Boolean(chats?.length);
	return (
		<aside
			className={`flex flex-shrink-0 overflow-y-auto w-1/4 max-w-1/4 min-w-[220px] flex-col rounded-2xl border ${asideColorBg.classes}`}
		>
			<div className="px-5 py-2">
				<Typography
					component="h2"
					className="text-sm font-semibold tracking-wide text-slate-600 dark:text-slate-300"
				>
					{tChats('chats')}
				</Typography>
			</div>
			<Divider />
			{hasChats ? (
				<motion.ul
					layout="position"
					className={`p-5 flex-1 space-y-2 overflow-y-auto ${styles.scrollbar}`}
				>
					{chats?.map((chat) => {
						const isUnread = chat.id === 1;
						const lastMessage = chat.lastMessage;
						const lastMessageMoment = lastMessage?.createdAt
							? moment(lastMessage.createdAt)
							: null;
						const lastMessageTimestamp = lastMessageMoment
							? lastMessageMoment.format('DD.MM.YYYY HH:mm')
							: '——— ——';
						const lastMessageAuthor = lastMessage?.user.name || 'Без автора';
						const lastMessageContent =
							lastMessage?.content || 'Сообщений пока нет';
						const isOwnMessage = lastMessage?.user.id === user?.id;
						const highlightExternalMessage =
							Boolean(lastMessage) && !isOwnMessage;

						const messageWrapperClass = isOwnMessage
							? 'rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 px-2 py-2 shadow-[0_8px_20px_rgba(16,185,129,0.18)] dark:border-emerald-500/30 dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-950'
							: highlightExternalMessage
								? 'rounded-2xl border border-sky-200 bg-gradient-to-br from-sky-50 via-white to-indigo-50 px-2 py-2 shadow-[0_10px_25px_rgba(56,189,248,0.25)] dark:border-sky-500/40 dark:from-sky-500/10 dark:via-indigo-900/30 dark:to-slate-950 dark:shadow-[0_22px_45px_rgba(15,23,42,0.55)]'
								: 'rounded-2xl border border-slate-200 bg-white/95 px-2 py-2 shadow-[0_12px_28px_rgba(15,23,42,0.08)] dark:border-slate-800 dark:bg-slate-900/60';

						const authorBadgeClass = isOwnMessage
							? 'inline-flex items-center rounded-full bg-white px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-emerald-600 shadow-sm dark:bg-emerald-500/20 dark:text-emerald-100'
							: highlightExternalMessage
								? 'inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-sky-700 shadow-sm dark:bg-sky-500/10 dark:text-sky-100'
								: 'inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-700 shadow-inner dark:bg-slate-800 dark:text-slate-100';

						const messageTextClass = isOwnMessage
							? 'mt-2 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-white'
							: highlightExternalMessage
								? 'mt-2 line-clamp-2 text-sm font-semibold text-slate-800 dark:text-slate-100'
								: 'mt-2 line-clamp-2 text-sm font-medium text-slate-700 dark:text-slate-100';

						return (
							<motion.li
								key={chat.id}
								layout="position"
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
											? 'border-emerald-300 bg-gradient-to-br from-white via-emerald-50 to-slate-50 dark:bg-none dark:border-emerald-500/40 dark:bg-slate-950 dark:shadow-emerald-900/30'
											: highlightExternalMessage
												? 'border-sky-200 bg-white/95 ring-1 ring-sky-100/60 shadow-[0_18px_40px_rgba(56,189,248,0.25)] hover:border-sky-300 hover:ring-sky-200/80 hover:shadow-[0_25px_55px_rgba(56,189,248,0.35)] dark:border-sky-500/50 dark:bg-[#050816] dark:ring-sky-500/30 dark:shadow-[0_30px_60px_rgba(8,7,6,0.65)] dark:hover:border-sky-400 dark:hover:ring-sky-400/50 dark:hover:shadow-[0_38px_75px_rgba(8,7,6,0.8)]'
												: 'border-slate-200/70 bg-white/90 hover:border-slate-300 hover:bg-white dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900/70'
									}`}
									onPress={() => onChatClick(chat.id)}
								>
									<div
										aria-hidden="true"
										className={`pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition duration-300 group-hover:opacity-100 ${
											chat.id === activeChatId
												? 'bg-gradient-to-r from-emerald-100/60 via-transparent to-transparent dark:from-emerald-500/10'
												: highlightExternalMessage
													? 'bg-gradient-to-r from-sky-50/70 via-white/30 to-transparent dark:from-sky-500/15 dark:via-indigo-500/10 dark:to-transparent'
													: 'bg-gradient-to-r from-white/0 via-white/40 to-white/0 dark:from-slate-900/0 dark:via-slate-900/40'
										}`}
									/>
									<div className={`flex flex-1 flex-col gap-2 w-full`}>
										<div className="flex items-center justify-between gap-2">
											<Typography
												component="h3"
												className={`text-sm font-semibold ${
													highlightExternalMessage
														? 'text-slate-900 dark:text-white'
														: 'text-slate-800 dark:text-slate-100'
												}`}
											>
												{chat.name}
											</Typography>
										</div>

										{highlightExternalMessage && isUnread && (
											<div className="flex items-center gap-2 text-[11px] font-medium text-sky-600 dark:text-sky-200">
												<span className="inline-flex h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
												<span>{`Новое сообщение от ${lastMessageAuthor}`}</span>
											</div>
										)}

										<div className="flex flex-wrap items-between justify-between gap-2 text-xs text-slate-400 dark:text-slate-500">
											<Typography
												component="span"
												className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-200"
											>
												{String(chat.usersCount || 0)}{' '}
												{customizeString(tChats('member'), {
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
												}).toLowerCase()}
											</Typography>
											<div
												className={`flex flex-col items-center justify-center rounded-full border px-2 py-1 text-xs font-semibold uppercase tracking-wide ${
													chat.id === activeChatId
														? 'border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-500/40 dark:bg-emerald-400/10 dark:text-emerald-100'
														: 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
												}`}
											>
												<Typography component="span">
													{lastMessageTimestamp}
												</Typography>
											</div>
										</div>

										<div
											className={`${messageWrapperClass} ${
												highlightExternalMessage
													? 'ring-1 ring-sky-100/70 shadow-[0_12px_30px_rgba(56,189,248,0.25)] dark:ring-sky-500/25 dark:shadow-[0_18px_38px_rgba(8,7,6,0.6)]'
													: ''
											}`}
										>
											<Typography component="span" className={authorBadgeClass}>
												{lastMessageAuthor}
											</Typography>
											<Typography className={`${messageTextClass}`}>
												{lastMessageContent}
											</Typography>
										</div>
									</div>
								</Button>
							</motion.li>
						);
					})}
				</motion.ul>
			) : (
				<Alert
					status="info"
					title="Чатов пока нет"
					description="Создайте новый диалог, чтобы начать переписку."
					className="mt-10"
				/>
			)}
			<Divider />
			<div className="h-[40px] w-full">
				<Button
					className="h-[40px] w-[40px] rounded-none"
					isIconOnly
					color="secondary"
					onPress={() => setIsSettingsOpen((prev) => !prev)}
				>
					<SettingsIcon />
				</Button>
			</div>
		</aside>
	);
};
