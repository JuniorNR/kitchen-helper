import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { localStorageHelper } from '@/shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { changeAccentColor } from '../model/chat.slice';
import type { ChatThemeColor } from '../model/chat.types';
import { accentColorsVariants } from '../model/chat.utils';
import { ChatSettingsColorsVariants } from './ChatSettingsColorsVariants';

export const ChatSettingsColorsAccentColorsTab: FC = () => {
	const { t: tChats } = useTranslation('chats');
	const dispatch = useAppDispatch();
	const { settings } = useAppSelector((state) => state.chat);
	const { storageSetItem } = localStorageHelper('chat-theme');

	const handleChangeAccentColor = (data: ChatThemeColor) => {
		dispatch(changeAccentColor(data));
		storageSetItem({ ...settings.theme, accentColor: data });
	};

	return (
		<div className="mt-3">
			<ChatSettingsColorsVariants
				className="mb-6"
				title={tChats('settings.colors.titles.accent_color_window')}
				chatThemeState={settings.theme}
				colorVariants={accentColorsVariants}
				handleColorThemeChange={handleChangeAccentColor}
				themeField="accentColor"
			/>
		</div>
	);
};
