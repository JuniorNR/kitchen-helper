'use client';

import type { FC } from 'react';
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

export const ChatSettingsColorsBackgroundTab: FC = () => {
	const { t: tChats } = useTranslation('chats');
	const { storageSetItem } = localStorageHelper<ChatTheme>('chat-theme');
	const dispatch = useAppDispatch();
	const settings = useAppSelector((state) => state.chat.settings);

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
	);
};
