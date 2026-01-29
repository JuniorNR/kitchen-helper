'use client';

import { Button } from '@heroui/button';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageSRC } from '@/features';
import { Typography } from '@/shared/ui';
import type { Market } from '@/entities/market';

export interface MyMarketStoreCardProps {
	market: Market;
	titleId: string;
}

export const MyMarketStoreCard: FC<MyMarketStoreCardProps> = ({
	market,
	titleId,
}) => {
	const { t: tMarkets } = useTranslation('markets');
	const router = useRouter();

	const handleVisitStore = () => {
		if (market.id) router.push(`/market/${market.id}`);
	};

	return (
		<article
			className="group flex flex-col overflow-hidden rounded-3xl border border-default-200/80 bg-content1/60 shadow-lg transition-all duration-300 hover:border-primary/40 hover:shadow-xl dark:bg-content2/40"
			aria-labelledby={titleId}
		>
			<div className="relative aspect-[21/9] w-full bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-950/50 dark:to-orange-950/50">
				{market.images?.length ? (
					<ImageSRC
						src={market.images[0].path}
						alt={market.title}
						fill
						className="object-cover transition-transform duration-500 group-hover:scale-105"
						sizes="(min-width: 768px) 672px, 100vw"
					/>
				) : (
					<div
						className="absolute inset-0 opacity-30"
						style={{
							backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
							backgroundSize: '24px 24px',
						}}
					/>
				)}
				<div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
				<div className="absolute bottom-4 left-6 right-6 flex flex-wrap items-center gap-2">
					<span className="rounded-full border border-amber-300/50 bg-amber-500/20 px-3 py-1 text-sm font-semibold text-amber-800 dark:border-amber-500/40 dark:bg-amber-500/25 dark:text-amber-100">
						★ {market.rating ?? '—'}
					</span>
					<span className="rounded-full border border-sky-300/50 bg-sky-500/20 px-3 py-1 text-sm font-semibold text-sky-800 dark:border-sky-500/40 dark:bg-sky-500/25 dark:text-sky-100">
						{market.countOfRecipes ?? 0} {tMarkets('create.recipes_short')}
					</span>
					<span className="rounded-full border border-emerald-300/50 bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-800 dark:border-emerald-500/40 dark:bg-emerald-500/25 dark:text-emerald-100">
						{market.averagePrice ?? '—'}
					</span>
				</div>
			</div>

			<div className="flex flex-col gap-4 p-6">
				<h3 id={titleId} className="text-xl font-bold text-foreground">
					{market.title ?? ''}
				</h3>
				{market.description ? (
					<Typography
						component="p"
						classNameComponent="line-clamp-2 text-default-500"
					>
						{market.description}
					</Typography>
				) : null}
				<Button
					color="primary"
					variant="solid"
					size="lg"
					className="w-fit font-semibold"
					onPress={handleVisitStore}
				>
					{tMarkets('card.visit')}
				</Button>
			</div>
		</article>
	);
};
