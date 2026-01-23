'use client';

import { Button } from '@heroui/button';
import { Tab, Tabs } from '@heroui/tabs';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMarketById } from '@/entities';
import { Typography } from '@/shared/ui';
import { BackIcon } from '@/shared/ui/icons/backIcon';
import { EmptyListIcon } from '@/shared/ui/icons/emptyListIcon';

import type { MarketProps } from '../model/market.types';
import { MarketSkeleton } from './Market.skeleton';
import { MarketAboutTab } from './MarketAboutTab';
import { MarketHeader } from './MarketHeader';
import { MarketRecipesTab } from './MarketRecipesTab';

export const Market: FC<MarketProps> = ({ marketId }) => {
	const router = useRouter();
	const { market, isLoading } = useMarketById(marketId);
	const { t: tMarkets } = useTranslation('markets');
	const [selectedKey, setSelectedKey] = useState<Key>('about');

	if (isLoading) {
		return <MarketSkeleton />;
	}

	if (!market) {
		return (
			<div className="container mx-auto px-4 py-16 max-w-7xl">
				<div className="mb-6">
					<Button
						variant="light"
						color="danger"
						onPress={() => router.back()}
						className="gap-2"
					>
						<BackIcon />
						{tMarkets('back')}
					</Button>
				</div>
				<div className="flex flex-col items-center justify-center gap-4 text-center">
					<EmptyListIcon className="h-16 w-16 text-foreground-400" />
					<Typography
						component="h2"
						classNameComponent="text-2xl font-semibold"
					>
						Магазин не найден
					</Typography>
					<Typography classNameComponent="text-foreground-500">
						Запрашиваемый магазин не существует или был удален
					</Typography>
				</div>
			</div>
		);
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="mb-6">
				<Button
					variant="light"
					color="default"
					onPress={() => router.back()}
					className="gap-2"
				>
					<BackIcon />
					{tMarkets('back')}
				</Button>
			</div>

			<MarketHeader market={market} />

			<div className="mt-8">
				<Tabs
					variant="bordered"
					color="primary"
					aria-label="Информация о магазине"
					selectedKey={String(selectedKey)}
					onSelectionChange={(key) => setSelectedKey(key)}
					classNames={{
						base: 'w-full',
						tabList:
							'gap-6 w-full relative rounded-lg p-1 border-divider bg-content1/50 backdrop-blur-sm',
						tab: 'px-6 h-12 text-base font-semibold',
					}}
				>
					<Tab
						key="about"
						title={
							<div className="flex items-center gap-2">
								<Typography component="span" classNameComponent="text-1xl">
									{tMarkets('card.about_market')}
								</Typography>
							</div>
						}
					>
						<div className="mt-6">
							<MarketAboutTab market={market} setSelectedKey={setSelectedKey} />
						</div>
					</Tab>
					<Tab
						key="recipes"
						title={
							<div className="flex items-center gap-2">
								<Typography component="span" classNameComponent="text-1xl">
									{tMarkets('card.products')}
								</Typography>
								<Typography
									component="span"
									className="px-2 font-bold rounded-full bg-secondary-100 dark:bg-secondary-400 text-secondary-700 dark:text-secondary-700"
								>
									{String(market.countOfRecipes)}
								</Typography>
							</div>
						}
					>
						<div className="mt-6">
							<MarketRecipesTab
								products={market.products || []}
								marketSellerId={market.seller.id}
							/>
						</div>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};
