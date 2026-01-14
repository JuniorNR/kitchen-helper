'use client';

import { Tab, Tabs } from '@heroui/tabs';
import type { FC } from 'react';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChatSettingsColorsBackgroundTab } from './ChatSettingsColorsBackgroundTab';
import { ChatSettingsColorsChatCardTab } from './ChatSettingsColorsChatCardTab';

export const ChatSettingsColorsTabs: FC = () => {
	const { t: tChats } = useTranslation('chats');
	const [activeTab, setActiveTab] = useState<Key>('chat-card');

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
				<ChatSettingsColorsBackgroundTab />
			</Tab>
			<Tab key="chat-card" title={tChats('settings.colors.tabs.chat_card')}>
				<ChatSettingsColorsChatCardTab />
			</Tab>
		</Tabs>
	);
};
