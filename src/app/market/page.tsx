'use client';

import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MarketList } from '@/features';
import { PageInfoBlock } from '@/shared/ui';

export default function MarketPage() {
	const { t: tCommon } = useTranslation('common');
	const [selectedKey, setSelectedKey] = useState<Key>('/market');
	const tabStyles = 'w-[75%] flex items-center justify-center';
	return (
		<>
			<PageInfoBlock
				version="0.9.0"
				titleDescription={tCommon('market.title_description')}
				title={tCommon('market.title')}
				description={tCommon('market.description')}
			/>
			<Tabs
				variant="bordered"
				color="primary"
				aria-label="Options"
				selectedKey={String(selectedKey)}
				onSelectionChange={(key) => setSelectedKey(key)}
			>
				<Tab
					key="/market"
					title={tCommon('page_titles.market')}
					className={tabStyles}
				>
					<MarketList />
				</Tab>
				<Tab key="/market-2" title="My store" disabled className={tabStyles}>
					WIP
				</Tab>
			</Tabs>
		</>
	);
}
