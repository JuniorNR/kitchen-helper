'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserSettings } from '@/features';

export default function SettingsPage() {
	const { t: tCommon } = useTranslation('common');
	const [selectedKey, setSelectedKey] = useState<Key>('user');
	const tabStyles = 'w-[50%] h-full flex items-center justify-center';
	return (
		<Tabs
			variant="bordered"
			color="primary"
			aria-label="Options"
			selectedKey={String(selectedKey)}
			onSelectionChange={(key) => setSelectedKey(key)}
		>
			<Tab
				key="user"
				title={tCommon('page_titles.user_settings')}
				className={tabStyles}
			>
				<UserSettings />
			</Tab>
			<Tab key="music" title="Music" className={tabStyles} disabled>
				music
			</Tab>
		</Tabs>
	);
}
