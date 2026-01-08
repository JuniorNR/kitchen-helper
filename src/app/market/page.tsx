'use client';

import { Button } from '@heroui/button';
import { Tab, Tabs } from '@heroui/tabs';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMarket, useUser } from '@/entities';
import { MarketCreate, MarketsList } from '@/features';
import { PageInfoBlock } from '@/shared/ui';

export default function MarketPage() {
	const { t: tCommon } = useTranslation('common');
	const { user } = useUser();
	const [selectedKey, setSelectedKey] = useState<Key>('/markets');
	const [isCreated, setIsCreated] = useState<boolean>(false);

	const tabStyles = 'w-[75%] flex items-center justify-center';

	const { deleteMyMarketData } = useMarket({});

	return (
		<div className="flex flex-col items-center justify-center">
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
					key="/markets"
					title={tCommon('page_titles.market')}
					className={tabStyles}
				>
					<MarketsList />
				</Tab>
				<Tab
					key="/my-market"
					title={tCommon('page_titles.my_market')}
					className={tabStyles}
				>
					{user?.markets.length !== 0 || isCreated ? (
						<Button onPress={() => deleteMyMarketData('18')}>My market</Button>
					) : (
						<MarketCreate setIsCreated={setIsCreated} />
					)}
				</Tab>
			</Tabs>
		</div>
	);
}
