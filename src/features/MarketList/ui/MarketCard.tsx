import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type {
	BuyMostOften,
	FactsAboutSeller,
	ThemesOfMarket,
} from '@/entities';
import {
	classNames,
	customizeString,
	localStorageHelper,
} from '@/shared/lib/helpers';
import { Typography } from '@/shared/ui';
import type { MarketProps } from '../model/market.types';

export const MarketCard: FC<MarketProps> = ({ market }) => {
	const { t: tMarkets } = useTranslation('markets');
	return (
		<article
			className="flex h-full flex-col gap-5 rounded-3xl border border-white/5 bg-content1/40 p-6 shadow-lg shadow-black/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:shadow-xl hover:shadow-black/10 dark:bg-content2/30 dark:backdrop-blur"
			aria-labelledby={`store-${market.id}`}
		>
			<div
				className={classNames(
					`relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br`,
				)}
			>
				For image
			</div>

			<div className="flex flex-col gap-3">
				<div className="flex flex-wrap items-start justify-between gap-3">
					<div>
						<Typography
							component="h2"
							classNameComponent="font-semibold leading-tight text-foreground"
						>
							{market.title}
						</Typography>
						<Typography classNameComponent="text-foreground-500">
							{market.description}
						</Typography>
						<Typography component="span" classNameComponent="text-amber-300">
							{market.factsAboutSeller
								.map((fact: FactsAboutSeller) => fact.value)
								.join(' · ')}
						</Typography>
					</div>
					<div className="flex items-center gap-2 text-right">
						<div className="inline-flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-500/15 px-3 py-1.5 text-sm font-semibold text-amber-700 shadow-sm dark:border-amber-200/30 dark:bg-amber-400/15 dark:text-amber-100">
							<div className="text-base leading-none">★</div>
							{market.rating || 0}
						</div>
						<Typography classNameComponent="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/15 px-3 py-1.5 text-sm font-semibold uppercase tracking-wide text-sky-700 shadow-sm dark:border-sky-300/30 dark:bg-sky-400/10 dark:text-sky-100">
							20{' '}
							{customizeString('отзыв', {
								language: String(localStorageHelper('i18nextLng').item),
								ended: {
									countTrigger: 20,
									russian: {
										zero: 'ов',
										fromTwoToFour: 'а',
										fromFiveToTen: 'ов',
										fromElevenToNineteen: 'ов',
									},
								},
							})}
						</Typography>
					</div>
				</div>
				<Typography classNameComponent="text-sm leading-relaxed">
					{market.story}
				</Typography>
			</div>

			<div className="py-2 px-4 rounded-2xl border border-foreground-100/50 bg-gradient-to-r from-white/70 via-white/40 to-white/20 tracking-wide shadow-sm dark:border-white/10 dark:from-slate-900/70 dark:via-slate-900/40 dark:to-slate-900/20 ">
				<Typography component="h3">{tMarkets('card.themes')}</Typography>
				<div className="flex gap-2 flex-wrap">
					{market.themesOfMarket.map((theme: ThemesOfMarket) => (
						<div
							key={theme.value + theme.id}
							className="inline-flex flex-wrap items-center rounded-full border border-foreground-200/40 bg-white/90 px-2 shadow-sm dark:border-white/20 dark:bg-white/5"
						>
							<div className="h-1.5 w-1.5 flex-grow-0 flex-shrink-0 mr-2 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 dark:from-amber-300 dark:to-pink-400" />
							<Typography
								component="span"
								key={`${theme.id}-${theme.value}`}
								className="flex items-center"
								isSecond
								classNameComponent="font-semibold text-xs"
							>
								{theme.value}
							</Typography>
						</div>
					))}
				</div>
			</div>

			<div className="grid gap-4 flex-grow-1 rounded-3xl border border-white/5 bg-white/40 p-4 text-sm shadow-inner dark:border-white/10 dark:bg-slate-900/40">
				<div className="grid gap-4 sm:grid-cols-2">
					<div className="flex flex-col items-center justify-center rounded-2xl border border-foreground-100/40 bg-white/70 p-2 dark:border-white/10 dark:bg-white/5">
						<Typography
							component="h6"
							classNameComponent="uppercase text-center tracking-wide"
						>
							{tMarkets('card.count_of_recipes')}
						</Typography>

						<Typography
							component="span"
							isSecond
							className="flex flex-grow-1 items-center justify-center"
							classNameComponent="text-2xl tracking-wide text-center"
						>
							{String(market.countOfRecipes)}
						</Typography>
					</div>
					<div className="flex flex-col items-center justify-center rounded-2xl border border-foreground-100/40 bg-white/70 p-2 dark:border-white/10 dark:bg-white/5">
						<Typography
							component="h6"
							classNameComponent="uppercase text-center tracking-wide"
						>
							{tMarkets('card.average_price')}
						</Typography>
						<Typography
							component="span"
							isSecond
							className="flex flex-grow-1 items-center justify-center"
							classNameComponent="text-2xl tracking-wide text-center"
						>
							{String(market.averagePrice)}
						</Typography>
					</div>
				</div>

				<div className="rounded-2xl border border-foreground-100/40 bg-white/90 p-4 text-slate-900 shadow-inner dark:border-white/20 dark:bg-white/10 dark:text-white">
					<Typography classNameComponent="uppercase tracking-wide text-slate-600 dark:text-white/80">
						{tMarkets('card.buy_most_often')}
					</Typography>
					<ul className="mt-3 space-y-2">
						{market.buyMostOften.map((highlight: BuyMostOften) => (
							<li
								key={`${highlight.id}-${highlight.value}`}
								className="flex items-center gap-2 text-sm text-slate-800 dark:text-white/90"
							>
								<div className="h-2 w-2 flex-grow-0 flex-shrink-0 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)] dark:bg-amber-300" />
								<Typography component="span" classNameComponent="text-sm">
									{highlight.value}
								</Typography>
							</li>
						))}
					</ul>
				</div>
			</div>
		</article>
	);
};
