'use client';

import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatMessage } from '@/entities/chat/model/chat.types';
import { localStorageHelper } from '@/shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import {
	changeChatMessageComponentColorBg,
	changeChatMessageOwnComponentColorBg,
} from '../model/chat.slice';
import type { ChatThemeColor } from '../model/chat.types';
import {
	chatMessageComponentColorBgVariants,
	chatMessageOwnComponentColorBgVariants,
} from '../model/chat.utils';
import { ChatMessageComponent } from './ChatMessageComponent';
import { ChatSettingsColorsVariants } from './ChatSettingsColorsVariants';
import { ChatSettingsPreviewComponent } from './ChatSettingsPreviewComponent';

const now = new Date().toISOString();

export const ChatSettingsColorsMessageCardTab: FC = () => {
	const { t: tChats } = useTranslation('chats');
	const dispatch = useAppDispatch();
	const settings = useAppSelector((state) => state.chat.settings);
	const { storageSetItem } = localStorageHelper('chat-theme');

	const mockMessage: ChatMessage = {
		id: 1,
		chatId: 1,
		content: tChats('settings.common.mock_messages.preview_message'),
		createdAt: now,
		updatedAt: now,
		user: {
			id: 1,
			name: 'John',
			role: 'user',
		},
	};

	const handleChangeChatMessageOwnComponentColorBg = (data: ChatThemeColor) => {
		dispatch(changeChatMessageOwnComponentColorBg(data));
		storageSetItem({ ...settings.theme, chatMessageOwnComponentColorBg: data });
	};

	const handleChangeChatMessageComponentColorBg = (data: ChatThemeColor) => {
		dispatch(changeChatMessageComponentColorBg(data));
		storageSetItem({ ...settings.theme, chatMessageComponentColorBg: data });
	};

	return (
		<div className="mt-3">
			<div className="mb-6">
				<ChatSettingsPreviewComponent
					title={tChats('settings.colors.preview.component_title')}
				>
					<div className="flex flex-col gap-4">
						<div className="flex justify-end">
							<ChatMessageComponent
								message={{
									...mockMessage,
									user: {
										...mockMessage.user,
										id: 1,
										name: tChats('settings.common.you'),
									},
								}}
								isOwnMessage={true}
								isDeleting={false}
							/>
						</div>
						<div className="flex justify-start">
							<ChatMessageComponent
								message={{
									...mockMessage,
									user: {
										...mockMessage.user,
										id: 2,
										name: 'John',
									},
								}}
								isOwnMessage={false}
								isDeleting={false}
							/>
						</div>
					</div>
				</ChatSettingsPreviewComponent>
			</div>
			<ChatSettingsColorsVariants
				className="mb-6"
				minimize
				title={tChats('settings.colors.titles.your_message_background')}
				chatThemeState={settings.theme}
				colorVariants={chatMessageOwnComponentColorBgVariants}
				handleColorThemeChange={handleChangeChatMessageOwnComponentColorBg}
				themeField="chatMessageOwnComponentColorBg"
			/>
			<ChatSettingsColorsVariants
				className="mb-6"
				minimize
				title={tChats('settings.colors.titles.other_message_background')}
				chatThemeState={settings.theme}
				colorVariants={chatMessageComponentColorBgVariants}
				handleColorThemeChange={handleChangeChatMessageComponentColorBg}
				themeField="chatMessageComponentColorBg"
			/>
		</div>
	);
};
