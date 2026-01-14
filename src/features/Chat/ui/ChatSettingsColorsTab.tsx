'use client';

import { Tab, Tabs } from '@heroui/tabs';
import type { FC } from 'react';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { localStorageHelper } from '@/shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
	changeAsideColorBg,
	changeChatColorBg,
	changeWindowColorBg,
} from '../model/chat.slice';
import type { ChatTheme, ChatThemeColor } from '../model/chat.types';
import {
	chatAsideColorBgVariants,
	chatColorBgVariants,
	chatWindowColorBgVariants,
} from '../model/chat.utils';
import { ChatSettingsColorsVariants } from './ChatSettingsColorsVariants';

export const ChatSettingsColorsTab: FC = () => {
	const { t: tChats } = useTranslation('chats');
	const { storageSetItem } = localStorageHelper<ChatTheme>('chat-theme');
	const dispatch = useAppDispatch();
	const settings = useAppSelector((state) => state.chat.settings);
	const [activeTab, setActiveTab] = useState<Key>('background');

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
		<Tabs
			variant="bordered"
			color="primary"
			aria-label={tChats('settings.colors.aria_label')}
			selectedKey={String(activeTab)}
			onSelectionChange={(key) => setActiveTab(key)}
			classNames={{
				base: 'w-full',
				tabList:
					'gap-2 w-full relative rounded-lg p-1 border-divider bg-content1/50 backdrop-blur-sm',
				tab: 'px-4 h-10 text-sm font-semibold',
			}}
		>
			<Tab key="background" title={tChats('settings.colors.tabs.background')}>
				<div className="mt-3">
					<ChatSettingsColorsVariants
						className="mb-6"
						title={tChats('settings.colors.backgrounds.chat_interface')}
						chatThemeState={settings.theme}
						colorVariants={chatWindowColorBgVariants}
						handleColorThemeChange={handleChangeWindowColor}
						themeField="windowColorBg"
					/>
					<ChatSettingsColorsVariants
						className="mb-6"
						title={tChats('settings.colors.backgrounds.messages_window')}
						chatThemeState={settings.theme}
						colorVariants={chatColorBgVariants}
						handleColorThemeChange={handleChangeChatColor}
						themeField="chatColorBg"
					/>
					<ChatSettingsColorsVariants
						title={tChats('settings.colors.backgrounds.chats_list')}
						chatThemeState={settings.theme}
						colorVariants={chatAsideColorBgVariants}
						handleColorThemeChange={handleChangeAsideChatColor}
						themeField="asideColorBg"
					/>
				</div>
			</Tab>
		</Tabs>
	);
};
