'use client';

import { Button } from '@heroui/button';
import { Tab, Tabs } from '@heroui/tabs';
import { useRouter } from 'next/navigation';
import type { FC } from 'react';
import { type Key, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SwiperSlide } from 'swiper/react';
import { useMarketById, useRecipe } from '@/entities';
import { ImageSRC } from '@/features';
import { Slider, Typography } from '@/shared/ui';
import { EmptyListIcon } from '@/shared/ui/icons/emptyListIcon';
import fallbackImg from '@/shared/ui/images/default.jpg';
import type { MarketProps } from '../model/market.types';

export const Market: FC<MarketProps> = ({ marketId }) => {
	const router = useRouter();
	const { market, isLoading } = useMarketById(marketId);
	const { t: tMarkets } = useTranslation('markets');
	const [selectedKey, setSelectedKey] = useState<Key>('about');

	// Получаем рецепты продавца (если есть API для фильтрации по продавцу)
	const { recipes, isLoading: isRecipesLoading } = useRecipe({
		page: 1,
	});

	const DETAIL_IMAGE_SIZES =
		'(min-width: 1200px) 50vw, (min-width: 768px) 60vw, 100vw';

	const renderImages = () => {
		if (market?.images?.length) {
			return market.images.map((image) => (
				<SwiperSlide key={image.path}>
					<div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
						<ImageSRC
							src={image.path || 'preview.jpg'}
							alt={image.path || 'preview image'}
							fill
							sizes={DETAIL_IMAGE_SIZES}
							className="object-cover"
						/>
					</div>
				</SwiperSlide>
			));
		}
		return (
			<SwiperSlide>
				<div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
					<ImageSRC
						alt="fallback photo"
						src={fallbackImg.src}
						default
						fill
						sizes={DETAIL_IMAGE_SIZES}
						className="object-cover"
					/>
				</div>
			</SwiperSlide>
		);
	};

	if (isLoading) {
		return (
			<div className="container mx-auto px-4 py-8 max-w-7xl">
				<div className="flex items-center justify-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
				</div>
			</div>
		);
	}

	if (!market) {
		return (
			<div className="container mx-auto px-4 py-16 max-w-7xl">
				<div className="mb-6">
					<Button
						variant="light"
						color="default"
						onPress={() => router.back()}
						className="gap-2"
					>
						<span className="text-lg">←</span>
						Назад
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

	const renderAboutTab = () => (
		<div className="space-y-8">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{market.story && (
					<div className="p-6 rounded-3xl border border-white/10 bg-gradient-to-br from-content1/60 via-content1/40 to-content2/40 backdrop-blur-sm shadow-xl">
						<Typography
							component="h2"
							classNameComponent="text-xl font-bold mb-4 text-foreground"
						>
							История магазина
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
							О продавце
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

			{/* Кнопки действий */}
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
					Посмотреть рецепты
				</Button>
			</div>
		</div>
	);

	const renderRecipesTab = () => {
		// Фильтруем рецепты по продавцу (если есть userId в рецепте)
		const sellerRecipes = recipes?.filter(
			(recipe) => recipe.userId === market.seller.id,
		);

		if (isRecipesLoading) {
			return (
				<div className="flex items-center justify-center py-20">
					<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
				</div>
			);
		}

		if (!sellerRecipes || sellerRecipes.length === 0) {
			return (
				<div className="flex flex-col items-center justify-center py-16">
					<div className="relative mb-4">
						<div className="absolute inset-0 rounded-full bg-primary-400/20 blur-xl animate-pulse" />
						<div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary-400/30 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/30">
							<EmptyListIcon className="h-10 w-10 text-primary-500 dark:text-primary-400" />
						</div>
					</div>
					<Typography
						component="h3"
						classNameComponent="text-xl font-semibold mb-2 text-foreground"
					>
						Рецепты пока отсутствуют
					</Typography>
					<Typography
						component="p"
						classNameComponent="text-sm text-foreground-500 dark:text-foreground-400 text-center max-w-md"
					>
						У этого продавца пока нет опубликованных рецептов. Загляните позже!
					</Typography>
				</div>
			);
		}

		return (
			<div className="space-y-6">
				<Typography
					component="h2"
					classNameComponent="text-2xl font-bold mb-6 text-foreground"
				>
					{`Рецепты продавца (${sellerRecipes.length})`}
				</Typography>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{sellerRecipes.map((recipe) => (
						<div
							key={recipe.id}
							className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
						>
							{recipe.images && recipe.images.length > 0 && (
								<div className="relative aspect-video w-full overflow-hidden">
									<ImageSRC
										src={recipe.images[0].path}
										alt={recipe.title}
										fill
										sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
										className="object-cover transition-transform duration-300 group-hover:scale-110"
									/>
								</div>
							)}
							<div className="p-5">
								<Typography
									component="h3"
									classNameComponent="text-lg font-bold mb-2 text-foreground line-clamp-2"
								>
									{recipe.title}
								</Typography>
								{recipe.description && (
									<Typography classNameComponent="text-sm text-foreground-600 dark:text-foreground-400 mb-4 line-clamp-2">
										{recipe.description}
									</Typography>
								)}
								<div className="flex items-center justify-between">
									<Typography
										component="span"
										classNameComponent="text-lg font-bold text-primary-600 dark:text-primary-400"
									>
										{`${recipe.priceOfDish} ₽`}
									</Typography>
									<Typography
										component="span"
										classNameComponent="text-xs px-2 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300"
									>
										{recipe.type}
									</Typography>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		);
	};

	return (
		<div className="container mx-auto px-4 py-8 max-w-7xl">
			<div className="mb-6">
				<Button
					variant="light"
					color="default"
					onPress={() => router.back()}
					className="gap-2"
				>
					<span className="text-lg">←</span>
					Назад
				</Button>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-stretch">
				<div className="relative w-full">
					<div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-content1/40 to-content2/40 shadow-xl">
						<Slider className="h-full">{renderImages()}</Slider>
					</div>
				</div>

				<div className="flex flex-col gap-6 h-full">
					<div className="grid grid-cols-3 gap-4">
						<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-amber-400/40 bg-gradient-to-br from-amber-50/80 to-amber-100/50 dark:border-amber-300/30 dark:from-amber-900/30 dark:to-amber-800/20 shadow-md">
							<div className="flex items-center gap-2 mb-1">
								<div className="text-2xl leading-none">★</div>
								<Typography
									component="span"
									classNameComponent="text-2xl font-bold text-amber-700 dark:text-amber-300"
								>
									{market.rating || '0.0'}
								</Typography>
							</div>
							<Typography
								component="span"
								classNameComponent="text-xs uppercase tracking-wide text-amber-600 dark:text-amber-400"
							>
								Рейтинг
							</Typography>
						</div>

						<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-sky-400/40 bg-gradient-to-br from-sky-50/80 to-sky-100/50 dark:border-sky-300/30 dark:from-sky-900/30 dark:to-sky-800/20 shadow-md">
							<Typography
								component="span"
								classNameComponent="text-2xl font-bold text-sky-700 dark:text-sky-300 mb-1"
							>
								{String(market.countOfRecipes)}
							</Typography>
							<Typography
								component="span"
								classNameComponent="text-xs uppercase tracking-wide text-sky-600 dark:text-sky-400 text-center"
							>
								{tMarkets('card.count_of_recipes')}
							</Typography>
						</div>

						<div className="flex flex-col items-center justify-center p-4 rounded-xl border border-emerald-400/40 bg-gradient-to-br from-emerald-50/80 to-emerald-100/50 dark:border-emerald-300/30 dark:from-emerald-900/30 dark:to-emerald-800/20 shadow-md">
							<Typography
								component="h4"
								classNameComponent="text-xs uppercase tracking-wide text-emerald-600 dark:text-emerald-400 mb-1"
							>
								{tMarkets('card.average_price')}
							</Typography>
							<Typography
								component="span"
								classNameComponent="text-2xl font-bold text-emerald-700 dark:text-emerald-300"
							>
								{market.averagePrice} ₽
							</Typography>
						</div>
					</div>
					<div className="flex flex-col gap-4 p-6 rounded-2xl border border-white/10 bg-gradient-to-br from-content1/60 to-content2/40 shadow-lg h-full flex-1 justify-between">
						<div className="flex flex-col gap-4">
							<Typography
								component="h1"
								classNameComponent="text-4xl font-bold leading-tight text-foreground"
							>
								{market.title}
							</Typography>

							{market.description && (
								<Typography classNameComponent="text-lg text-foreground-600 dark:text-foreground-400 leading-relaxed">
									{market.description}
								</Typography>
							)}
						</div>

						<div className="flex items-center gap-3 p-4 rounded-xl border border-primary-200/30 bg-primary-50/50 dark:border-primary-500/20 dark:bg-primary-900/20 mt-auto">
							<div className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-white font-bold text-lg shadow-lg">
								{market.seller.name.charAt(0).toUpperCase()}
							</div>
							<div className="flex flex-col">
								<Typography
									component="span"
									classNameComponent="text-xs uppercase tracking-wide text-foreground-500"
								>
									Продавец
								</Typography>
								<Typography
									component="h3"
									classNameComponent="text-lg font-semibold text-foreground"
								>
									{market.seller.name}
								</Typography>
							</div>
						</div>
					</div>
				</div>
			</div>

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
								<span>О магазине</span>
							</div>
						}
					>
						<div className="mt-6">{renderAboutTab()}</div>
					</Tab>
					<Tab
						key="recipes"
						title={
							<div className="flex items-center gap-2">
								<span>Рецепты</span>
								{market.countOfRecipes > 0 && (
									<span className="px-2 py-0.5 text-xs font-bold rounded-full bg-primary-100 dark:bg-primary-900/50 text-primary-700 dark:text-primary-300">
										{String(market.countOfRecipes)}
									</span>
								)}
							</div>
						}
					>
						<div className="mt-6">{renderRecipesTab()}</div>
					</Tab>
				</Tabs>
			</div>
		</div>
	);
};
