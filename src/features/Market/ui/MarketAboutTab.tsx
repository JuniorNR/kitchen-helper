import { Button } from '@heroui/button';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { EmptyListIcon } from '@/shared/ui/icons/emptyListIcon';
import type { MarketAboutTabProps } from '../model/market.types';

export const MarketAboutTab: FC<MarketAboutTabProps> = ({
	market,
	setSelectedKey,
}) => {
	const { t: tMarkets } = useTranslation('markets');

	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{market.story && (
					<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 via-content1/40 to-content2/40 backdrop-blur-sm shadow-xl">
						<Typography
							component="h2"
							classNameComponent="text-xl font-bold mb-4 text-foreground"
						>
							{tMarkets('card.story_of_market')}
						</Typography>
						<Typography classNameComponent="text-base leading-relaxed text-foreground-600 dark:text-foreground-400 whitespace-pre-line">
							{market.story}
						</Typography>
					</div>
				)}

				{market.themesOfMarket && market.themesOfMarket.length > 0 && (
					<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-xl">
						<Typography
							component="h2"
							classNameComponent="text-xl font-bold mb-4 text-foreground"
						>
							{tMarkets('card.themes')}
						</Typography>
						<div className="flex flex-wrap gap-3">
							{market.themesOfMarket.map((theme) => (
								<div
									key={theme.id}
									className="inline-flex items-center gap-2 rounded-full border border-foreground-200/40 bg-white/90 px-4 py-2 shadow-md transition-all hover:scale-105 hover:shadow-lg dark:border-white/20 dark:bg-white/10"
								>
									<div className="h-2 w-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 dark:from-amber-300 dark:to-pink-400 shadow-sm" />
									<Typography
										component="span"
										classNameComponent="font-semibold text-sm text-foreground"
									>
										{theme.value}
									</Typography>
								</div>
							))}
						</div>
					</div>
				)}
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{market.factsAboutSeller && market.factsAboutSeller.length > 0 && (
					<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-xl">
						<Typography
							component="h2"
							classNameComponent="text-xl font-bold mb-4 text-foreground"
						>
							{tMarkets('card.about_seller')}
						</Typography>
						<div className="space-y-3">
							{market.factsAboutSeller.map((fact) => (
								<div
									key={fact.id}
									className="flex items-center gap-3 p-4 rounded-xl border border-foreground-100/50 bg-white/70 dark:border-white/10 dark:bg-white/5 transition-all hover:border-primary-300/50 hover:bg-primary-50/50 dark:hover:bg-primary-900/10"
								>
									<div className="flex-shrink-0">
										<div className="h-2 w-2 rounded-full bg-primary-400 dark:bg-primary-400 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
									</div>
									<Typography classNameComponent="text-base text-foreground-700 dark:text-foreground-300">
										{fact.value}
									</Typography>
								</div>
							))}
						</div>
					</div>
				)}

				<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-xl">
					<Typography
						component="h2"
						classNameComponent="text-xl font-bold mb-4 text-foreground"
					>
						{tMarkets('card.buy_most_often')}
					</Typography>
					{market.buyMostOften && market.buyMostOften.length > 0 ? (
						<ul className="space-y-3">
							{market.buyMostOften.map((item) => (
								<li
									key={item.id}
									className="flex items-center gap-2 p-4 rounded-xl border border-foreground-100/50 bg-white/70 dark:border-white/10 dark:bg-white/5 transition-all hover:border-primary-300/50 hover:bg-primary-50/50 dark:hover:bg-primary-900/10"
								>
									<div className="h-2 w-2 flex-shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] dark:bg-amber-300" />
									<Typography classNameComponent="text-base text-foreground-700 dark:text-foreground-300">
										{item.value}
									</Typography>
								</li>
							))}
						</ul>
					) : (
						<div className="flex flex-col items-center justify-center py-12">
							<div className="relative mb-4">
								<div className="absolute inset-0 rounded-full bg-amber-400/20 blur-xl animate-pulse" />
								<div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-amber-400/30 bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-900/20 dark:to-amber-800/30">
									<EmptyListIcon className="h-8 w-8 text-amber-500 dark:text-amber-400" />
								</div>
							</div>
							<Typography
								component="p"
								classNameComponent="text-sm font-medium text-foreground-500 dark:text-foreground-400"
							>
								{tMarkets('card.empty_list')}
							</Typography>
						</div>
					)}
				</div>
			</div>

			<div className="flex flex-col sm:flex-row gap-4">
				<Button
					color="primary"
					variant="solid"
					size="lg"
					className="flex-1 font-semibold text-base"
				>
					{tMarkets('card.contact_seller')}
				</Button>
				<Button
					color="primary"
					variant="bordered"
					size="lg"
					className="flex-1 font-semibold text-base"
					onPress={() => setSelectedKey('recipes')}
				>
					{tMarkets('card.view_products')}
				</Button>
			</div>
		</div>
	);
};
