'use client';

import { Switch } from '@heroui/switch';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Chat } from '@/entities/chat/model/chat.types';
import { localStorageHelper } from '@/shared/lib/helpers';
import { useAppDispatch, useAppSelector } from '@/shared/lib/hooks';
import { Typography } from '@/shared/ui';
import {
	changeChatCardActiveColorBg,
	changeChatCardColorBg,
	changeChatCardMessageColorBg,
	changeChatCardOwnMessageColorBg,
} from '../model/chat.slice';
import type { ChatThemeColor } from '../model/chat.types';
import {
	chatCardActiveColorBgVariants,
	chatCardColorBgVariants,
	chatCardMessageColorBgVariants,
	chatCardOwnMessageColorBgVariant,
} from '../model/chat.utils';
import { ChatListAsideButton } from './ChatListAsideButton';
import { ChatSettingsColorsVariants } from './ChatSettingsColorsVariants';
import { ChatSettingsPreviewComponent } from './ChatSettingsPreviewComponent';

const now = new Date().toISOString();

const mockChat: Chat = {
	id: 1,
	name: 'Slate',
	createdAt: now,
	updatedAt: now,
	lastMessageCreatedAt: now,
	usersCount: 3,
	users: [],
	lastMessage: {
		id: 1,
		chatId: 1,
		content: 'Привет, это первое сообщение',
		createdAt: now,
		updatedAt: now,
		user: {
			id: 1,
			name: 'John',
			role: 'user',
		},
	},
	creator: {
		id: 1,
		name: 'Elisa',
		role: 'admin',
	},
};

export const ChatSettingsColorsChatCardTab: FC = () => {
	const { t: tChats } = useTranslation('chats');
	const dispatch = useAppDispatch();
	const settings = useAppSelector((state) => state.chat.settings);
	const { storageSetItem } = localStorageHelper('chat-theme');
	const [isActiveChat, setIsActiveChat] = useState(false);
	const [isUnreadChat, setIsUnreadChat] = useState(false);
	const [isMyMessage, setIsMyMessage] = useState(false);

	const handleChangeChatCardColorBg = (data: ChatThemeColor) => {
		dispatch(changeChatCardColorBg(data));
		storageSetItem({ ...settings.theme, chatCardColorBg: data });
	};

	const handleChangeChatCardActiveColorBg = (data: ChatThemeColor) => {
		dispatch(changeChatCardActiveColorBg(data));
		storageSetItem({ ...settings.theme, chatCardActiveColorBg: data });
	};

	const handleChangeChatCardOwnMessageColorBgVariant = (
		data: ChatThemeColor,
	) => {
		dispatch(changeChatCardOwnMessageColorBg(data));
		storageSetItem({ ...settings.theme, chatCardOwnMessageColorBg: data });
	};

	const handleChangeChatCardMessageColorBgVariant = (data: ChatThemeColor) => {
		dispatch(changeChatCardMessageColorBg(data));
		storageSetItem({ ...settings.theme, chatCardMessageColorBg: data });
	};

	return (
		<div className="mt-3">
			<div>
				<div className="mb-6">
					<ChatSettingsPreviewComponent title="Предпросмотр компонента">
						<div className="flex flex-row gap-3 mb-4">
							<div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-default-50 border border-default-200 hover:bg-default-100 transition-colors flex-1">
								<div className="flex flex-col gap-1">
									<Typography className="text-sm font-semibold text-foreground">
										Активный чат
									</Typography>
									<Typography className="text-xs text-default-500">
										Показать состояние активного чата
									</Typography>
								</div>
								<Switch
									isSelected={isActiveChat}
									onValueChange={setIsActiveChat}
									color="primary"
									size="md"
									classNames={{
										wrapper: 'group-data-[selected=true]:bg-primary',
									}}
								/>
							</div>
							<div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-default-50 border border-default-200 hover:bg-default-100 transition-colors flex-1">
								<div className="flex flex-col gap-1">
									<Typography className="text-sm font-semibold text-foreground">
										Непрочитанный чат
									</Typography>
									<Typography className="text-xs text-default-500">
										Показать непрочитанные сообщения
									</Typography>
								</div>
								<Switch
									isSelected={isUnreadChat}
									onValueChange={setIsUnreadChat}
									color="primary"
									size="md"
									classNames={{
										wrapper: 'group-data-[selected=true]:bg-primary',
									}}
								/>
							</div>
							<div className="flex items-center justify-between gap-4 p-4 rounded-lg bg-default-50 border border-default-200 hover:bg-default-100 transition-colors flex-1">
								<div className="flex flex-col gap-1">
									<Typography className="text-sm font-semibold text-foreground">
										Сообщение от меня
									</Typography>
									<Typography className="text-xs text-default-500">
										Показать сообщение от меня или от собеседника
									</Typography>
								</div>
								<Switch
									isSelected={isMyMessage}
									onValueChange={setIsMyMessage}
									color="primary"
									size="md"
									classNames={{
										wrapper: 'group-data-[selected=true]:bg-primary',
									}}
								/>
							</div>
						</div>
						<ul className="flex justify-center">
							<ChatListAsideButton
								chat={{
									...mockChat,
									lastMessage: {
										...mockChat.lastMessage,
										user: {
											...mockChat.lastMessage.user,
											id: isMyMessage ? 1 : 2,
											name: isMyMessage ? 'Вы' : 'John',
										},
									},
								}}
								activeChatId={isActiveChat ? mockChat.id : null}
								onChatClick={() => {}}
								currentUserId={1}
								className="w-full"
								isUnread={isUnreadChat}
							/>
						</ul>
					</ChatSettingsPreviewComponent>
				</div>
			</div>
			<ChatSettingsColorsVariants
				className="mb-6"
				minimize
				title={'Фон карточки'}
				chatThemeState={settings.theme}
				colorVariants={chatCardColorBgVariants}
				handleColorThemeChange={handleChangeChatCardColorBg}
				themeField="chatCardColorBg"
			/>
			<ChatSettingsColorsVariants
				className="mb-6"
				minimize
				title={'Рамка активной карточки'}
				chatThemeState={settings.theme}
				colorVariants={chatCardActiveColorBgVariants}
				handleColorThemeChange={handleChangeChatCardActiveColorBg}
				themeField="chatCardActiveColorBg"
			/>
			<ChatSettingsColorsVariants
				className="mb-6"
				minimize
				title={'Фон вашего сообщения'}
				chatThemeState={settings.theme}
				colorVariants={chatCardOwnMessageColorBgVariant}
				handleColorThemeChange={handleChangeChatCardOwnMessageColorBgVariant}
				themeField="chatCardOwnMessageColorBg"
			/>
			<ChatSettingsColorsVariants
				className="mb-6"
				minimize
				title={'Фон сообщения собеседника'}
				chatThemeState={settings.theme}
				colorVariants={chatCardMessageColorBgVariants}
				handleColorThemeChange={handleChangeChatCardMessageColorBgVariant}
				themeField="chatCardMessageColorBg"
			/>
		</div>
	);
};
