import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/entities';
import { useAppSelector } from '@/shared/lib/hooks';
import { Alert, Typography } from '@/shared/ui';
import { SettingsIcon } from '@/shared/ui/icons/settingsIcon';
import type { ChatListAsideProps } from '../model/chat.types';
import { ChatListAsideButton } from './ChatListAsideButton';
import styles from './chat.module.scss';

export const ChatListAside: FC<ChatListAsideProps> = ({
	chats,
	activeChatId,
	onChatClick,
	setIsSettingsOpen,
}) => {
	const { asideColorBg } = useAppSelector((state) => state.chat.settings.theme);
	const { t: tChats } = useTranslation('chats');
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
					{chats?.map((chat) => (
						<ChatListAsideButton
							key={chat.id}
							chat={chat}
							activeChatId={activeChatId}
							onChatClick={onChatClick}
							currentUserId={user?.id}
						/>
					))}
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
