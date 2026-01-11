import { Button } from '@heroui/button';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SwiperSlide } from 'swiper/react';
import { ImageSRC } from '@/features/ImageSRC';
import { customizeString } from '@/shared/lib/helpers';
import { Slider, Typography } from '@/shared/ui';
import fallbackImg from '@/shared/ui/images/default.jpg';
import type { MarketProductsCardProps } from '../model/market.types';

export const MarketRecipeCard: FC<MarketProductsCardProps> = ({ product }) => {
	const { t: tIngredients, i18n } = useTranslation('ingredients');
	const { t: tUnits } = useTranslation('units');
	const { t: tRecipes } = useTranslation('recipes');
	const { t: tMarkets } = useTranslation('markets');

	const currencyFormatter = new Intl.NumberFormat('ru', {
		style: 'currency',
		currency: 'RUB',
		maximumFractionDigits: 0,
	});

	const renderRecipeImages = () => {
		if (product.images && product.images.length > 0) {
			return product.images.map((image) => (
				<SwiperSlide key={image.path || image.id}>
					<div className="relative w-full h-full overflow-hidden">
						<ImageSRC
							src={image.path}
							alt={product.title}
							fill
							sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
							className="object-cover transition-transform duration-500 group-hover:scale-110"
						/>
					</div>
				</SwiperSlide>
			));
		}
		return (
			<SwiperSlide>
				<div className="relative w-full h-full overflow-hidden">
					<ImageSRC
						alt={product.title}
						src={fallbackImg.src}
						default
						fill
						sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
						className="object-cover"
					/>
				</div>
			</SwiperSlide>
		);
	};

	return (
		<div
			key={product.id}
			className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-content1/60 via-content1/50 to-content2/40 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-primary-300/30"
		>
			<div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-primary-100/20 to-primary-200/20 dark:from-primary-900/20 dark:to-primary-800/20">
				<Slider
					spaceBetween={0}
					slidesPerView={1}
					className="h-full"
					navigation
					pagination={{ clickable: true, dynamicBullets: true }}
				>
					{renderRecipeImages()}
				</Slider>
				<div className="absolute left-3 top-3 z-10 flex flex-wrap gap-2">
					<span className="rounded-full bg-black/70 text-white text-xs px-2.5 py-1 backdrop-blur-sm font-medium">
						{tIngredients(`rations.${product.ration}`)}
					</span>
					<span className="rounded-full bg-primary-600/80 text-white text-xs px-2.5 py-1 backdrop-blur-sm font-medium">
						{tRecipes(`labels.${product.type}`)}
					</span>
				</div>
				<div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-content1/90 via-content1/50 to-transparent pointer-events-none z-10" />
			</div>

			<div className="flex flex-col flex-1 p-5 gap-4">
				<div className="flex-1">
					<Typography
						component="h3"
						classNameComponent="text-lg font-bold mb-2 text-foreground line-clamp-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
					>
						{product.title}
					</Typography>
					<Typography classNameComponent="text-sm text-foreground-600 dark:text-foreground-400 mb-3 line-clamp-2">
						{product.description}
					</Typography>
				</div>

				<div className="flex flex-col">
					<div className="flex-shrink-1 flex-grow-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
						<p className="text-xs text-neutral-500 dark:text-neutral-400">
							{tRecipes('titles.organic_substances')}
						</p>
						<div className="mt-1 flex items-center gap-1.5 flex-wrap">
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{`${tUnits('labels.calories')}: ${(+product.calories).toFixed(0)} ${tUnits('labels.kilocalories')}`}
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{`${tUnits('labels.proteins')}: ${(+product.proteins).toFixed(0)} ${tUnits('labels.gr')}`}
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{`${tUnits('labels.fats')}: ${(+product.fats).toFixed(0)} ${tUnits('labels.gr')}`}
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{`${tUnits('labels.carbohydrates')}: ${(+product.carbohydrates).toFixed(0)} ${tUnits('labels.gr')}`}
							</span>
						</div>
					</div>
					<div className="mt-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
						<Typography classNameComponent="text-xs text-neutral-500 dark:text-neutral-400">
							{tRecipes('titles.prices')}
						</Typography>
						<div className="mt-1 flex items-center gap-1.5 flex-wrap">
							<Typography
								component="span"
								className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300"
							>
								{`${tRecipes('fields.price_of_dish')}: ${currencyFormatter.format(Number(product.priceOfDish))}`}
							</Typography>
							{product.priceToBuy && (
								<Typography
									component="span"
									className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300"
								>
									{`${tRecipes('fields.price_to_buy')}: ${currencyFormatter.format(
										Number(product.priceToBuy),
									)}`}
								</Typography>
							)}
						</div>
					</div>
					<div className="mt-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
						<Typography classNameComponent="text-xs text-neutral-500 dark:text-neutral-400">
							{tMarkets('card.steps_count')}
						</Typography>
						<Typography classNameComponent="mt-1 text-sm font-semibold text-neutral-700 dark:text-neutral-300">
							{`${product.steps.length} ${customizeString(
								tMarkets('card.step'),
								{
									language: i18n.language,
									ended: {
										countTrigger: product.steps.length,
										russian: {
											zero: 'ов',
											fromTwoToFour: 'а',
											fromFiveToTen: 'ов',
											fromElevenToNineteen: 'ов',
										},
									},
								},
							)}`}
						</Typography>
					</div>
				</div>

				<Button
					color="primary"
					variant="solid"
					size="lg"
					className="w-full font-semibold shadow-md hover:shadow-lg transition-all duration-200"
					onPress={() => {
						// TODO: Реализовать логику приобретения рецепта
					}}
				>
					{`${tMarkets('card.purchase')} (${currencyFormatter.format(
						Number(product.priceToBuy),
					)})`}
				</Button>
			</div>
		</div>
	);
};
