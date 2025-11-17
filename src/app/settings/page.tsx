'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { UserSettings } from '@/features';

export default function SettingsPage() {
	const { t: tCommon } = useTranslation('common');
	const [selectedKey, setSelectedKey] = useState<Key>('user');
	return (
		<div>
			<div>
				<Tabs
					className="w-full justify-center"
					variant="bordered"
					color="primary"
					aria-label="Options"
					selectedKey={String(selectedKey)}
					onSelectionChange={(key) => setSelectedKey(key)}
				>
					<Tab key="user" title={tCommon('page_titles.user_settings')}>
						<UserSettings />
					</Tab>
				</Tabs>
			</div>
		</div>
	);
}
