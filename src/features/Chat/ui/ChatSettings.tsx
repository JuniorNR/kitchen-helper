'use client';

import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useState } from 'react';
import { localStorageHelper } from '@/shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Typography } from '@/shared/ui';
import {
	changeAsideColorBg,
	changeChatColorBg,
	changeWindowColorBg,
} from '../model/chat.slice';
import type {
	ChatSettingsProps,
	ChatTheme,
	ChatThemeColor,
} from '../model/chat.types';
import {
	chatAsideColorBgVariants,
	chatColorBgVariants,
	chatWindowColorBgVariants,
} from '../model/chat.utils';
import { ChatSettingsColorsVariants } from './ChatSettingsColorsVariants';
import styles from './chat.module.scss';

type SettingsSection = 'colors' | 'notifications' | 'general';

const settingsMenuItems: { key: SettingsSection; label: string }[] = [
	{ key: 'colors', label: 'Цвета' },
	{ key: 'notifications', label: 'Уведомления' },
	{ key: 'general', label: 'Общие' },
];

export const ChatSettings: FC<ChatSettingsProps> = ({ setIsSettingsOpen }) => {
	const { storageSetItem } = localStorageHelper<ChatTheme>('chat-theme');
	const dispatch = useAppDispatch();
	const settings = useAppSelector((state) => state.chat.settings);
	const [activeSection, setActiveSection] = useState<SettingsSection>('colors');

	const handleChangeWindowColor = (data: ChatThemeColor) => {
		dispatch(changeWindowColorBg(data));
		storageSetItem({ ...settings.theme, windowColorBg: data });
	};

	const handleChangeChatColor = (data: ChatThemeColor) => {
		dispatch(changeChatColorBg(data));
		storageSetItem({ ...settings.theme, chatColorBg: data });
	};

	const handleChangeAsideChatColor = (data: ChatThemeColor) => {
		dispatch(changeAsideColorBg(data));
		storageSetItem({ ...settings.theme, asideColorBg: data });
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.96 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.96 }}
			transition={{ duration: 0.2, ease: 'easeInOut' }}
			className="absolute inset-0 m-5 z-20 flex rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/10 shadow-2xl"
		>
			<div className="flex flex-1 overflow-hidden rounded-2xl border-1 border-white/10 dark:border-white/10">
				<div className="relative w-56 border-r border-slate-200/60 dark:border-slate-700/60 bg-gradient-to-b from-slate-50/50 via-white/30 to-slate-50/50 dark:from-slate-800/30 dark:via-slate-900/20 dark:to-slate-800/30 flex-shrink-0">
					<div className="p-4">
						<Typography
							component="h2"
							classNameComponent="text-lg font-semibold"
						>
							Настройки
						</Typography>
					</div>
					<nav className="flex flex-col gap-2 p-4">
						{settingsMenuItems.map((item) => (
							<Button
								key={item.key}
								variant={activeSection === item.key ? 'flat' : 'light'}
								color={activeSection === item.key ? 'primary' : 'default'}
								size="md"
								className={`justify-start rounded-xl transition-all ${
									activeSection === item.key
										? 'dark:text-white bg-primary/20 font-semibold shadow-sm'
										: 'hover:bg-default-100 dark:hover:bg-default-50'
								}`}
								onPress={() => setActiveSection(item.key)}
							>
								{item.label}
							</Button>
						))}
					</nav>
					<Button
						className="absolute w-full uppercase rounded-none bottom-0"
						color="danger"
						onPress={() => setIsSettingsOpen(false)}
					>
						Закрыть
					</Button>
				</div>

				<div className={`flex-1 overflow-y-auto p-6 ${styles.scrollbar}`}>
					{activeSection === 'colors' && (
						<div>
							<div className="mb-6">
								<Typography
									component="h3"
									classNameComponent="text-xl font-semibold mb-2"
								>
									Цветовая тема
								</Typography>
								<Typography className="text-sm text-default-500">
									Выберите цветовую схему для окна чата
								</Typography>
							</div>
							<ChatSettingsColorsVariants
								className="mb-6"
								title="Фон интерфейса чата"
								chatThemeState={settings.theme}
								colorVariants={chatWindowColorBgVariants}
								handleColorThemeChange={handleChangeWindowColor}
								themeField="windowColorBg"
							/>
							<ChatSettingsColorsVariants
								className="mb-6"
								title="Фон окна сообщений"
								chatThemeState={settings.theme}
								colorVariants={chatColorBgVariants}
								handleColorThemeChange={handleChangeChatColor}
								themeField="chatColorBg"
							/>
							<ChatSettingsColorsVariants
								title="Фон списка чатов"
								chatThemeState={settings.theme}
								colorVariants={chatAsideColorBgVariants}
								handleColorThemeChange={handleChangeAsideChatColor}
								themeField="asideColorBg"
							/>
						</div>
					)}

					{activeSection === 'notifications' && (
						<div>
							<Typography
								component="h3"
								classNameComponent="text-xl font-semibold mb-4"
							>
								Уведомления
							</Typography>
							<Typography className="text-sm text-default-500">
								Настройки уведомлений будут добавлены позже
							</Typography>
						</div>
					)}
					{activeSection === 'general' && (
						<div>
							<Typography
								component="h3"
								classNameComponent="text-xl font-semibold mb-4"
							>
								Общие настройки
							</Typography>
							<Typography className="text-sm text-default-500">
								Общие настройки будут добавлены позже
							</Typography>
						</div>
					)}
				</div>
			</div>
		</motion.div>
	);
};
