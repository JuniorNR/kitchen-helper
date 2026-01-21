'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Chat, UserSettings } from '@/features';

export default function SettingsPage() {
	const { t: tCommon } = useTranslation('common');
	const [selectedKey, setSelectedKey] = useState<Key>('chat');
	return (
		<Tabs
			className="w-full justify-center"
			variant="bordered"
			color="primary"
			aria-label="Options"
			selectedKey={String(selectedKey)}
			onSelectionChange={(key) => setSelectedKey(key)}
			classNames={{
				base: 'h-full',
				panel: 'pt-10',
			}}
		>
			<Tab key="user" title={tCommon('page_titles.user_settings')}>
				<UserSettings />
			</Tab>
			<Tab
				className="flex max-w-screen-xl flex-grow-1 w-full overflow-hidden"
				key="chat"
				title={tCommon('page_titles.user_chats')}
			>
				<Chat />
			</Tab>
		</Tabs>
	);
}
