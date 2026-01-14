'use client';

import { Button } from '@heroui/button';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import type { ChatSettingsProps, SettingsSection } from '../model/chat.types';
import { ChatSettingsColorsTab } from './ChatSettingsColorsTab';
import styles from './chat.module.scss';

export const ChatSettings: FC<ChatSettingsProps> = ({ setIsSettingsOpen }) => {
	const { t: tChats } = useTranslation('chats');
	const [activeSection, setActiveSection] = useState<SettingsSection>('colors');

	const settingsMenuItems: { key: SettingsSection; label: string }[] = [
		{ key: 'colors', label: tChats('settings.sections.colors') },
		{ key: 'notifications', label: tChats('settings.sections.notifications') },
		{ key: 'general', label: tChats('settings.sections.general') },
	];

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
							{tChats('settings.title')}
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
						{tChats('settings.close')}
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
									{tChats('settings.colors.title')}
								</Typography>
								<Typography className="text-sm text-default-500">
									{tChats('settings.colors.description')}
								</Typography>
							</div>
							<ChatSettingsColorsTab />
						</div>
					)}

					{activeSection === 'notifications' && (
						<div>
							<Typography
								component="h3"
								classNameComponent="text-xl font-semibold mb-4"
							>
								{tChats('settings.notifications.title')}
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
								{tChats('settings.general.title')}
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
