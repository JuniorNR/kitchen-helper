'use client';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { type FC, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SwiperSlide } from 'swiper/react';
import { useRecipe } from '@/entities';
import { ImageSRC } from '@/features';
import { DeleteButton, Slider, Typography } from '@/shared/ui';
import fallbackImg from '@/shared/ui/images/default.jpg';
import type { RecipeItemProps } from '../model/recipeList.types';
import { RecipeItemStepsModal } from './RecipeItemStepsModal';

export const RecipeItem: FC<RecipeItemProps> = ({ recipe }) => {
	const { t: tUnits } = useTranslation('units');
	const { t: tRecipes } = useTranslation('recipes');
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tCommon, i18n } = useTranslation('common');
	const { deleteRecipe, isDeleting } = useRecipe();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const currencyFormatter = useMemo(
		() =>
			new Intl.NumberFormat(i18n.language, {
				style: 'currency',
				currency: 'RUB',
				maximumFractionDigits: 0,
			}),
		[i18n.language],
	);

	const handleDeleteRecipe = async () => {
		await deleteRecipe(recipe.id.toString());
	};

	const renderImages = () => {
		if (recipe.images.length) {
			return recipe.images.map((image) => (
				<SwiperSlide
					key={image.path}
					onClick={() => setIsOpen((prev) => !prev)}
				>
					<div className="relative w-full aspect-square overflow-hidden rounded-md">
						<div className="absolute left-3 top-3 z-10 flex gap-1">
							<span className="rounded-full bg-neutral-900/70 text-white text-xs px-2 py-0.5 backdrop-blur">
								{tIngredients(`rations.${recipe.ration}`)}
							</span>
							<span className="rounded-full bg-primary-600/80 text-white text-xs px-2 py-0.5 backdrop-blur">
								{tRecipes(`labels.${recipe.type}`)}
							</span>
						</div>
						<ImageSRC
							src={image.path}
							alt={image.path}
							fill
							className="object-cover"
						/>
					</div>
				</SwiperSlide>
			));
		}
		return (
			<div className="relative w-full aspect-square overflow-hidden rounded-md">
				<div className="absolute left-3 top-3 z-10 flex gap-1">
					<span className="rounded-full bg-neutral-900/70 text-white text-xs px-2 py-0.5 backdrop-blur">
						{tIngredients(`rations.${recipe.ration}`)}
					</span>
					<span className="rounded-full bg-primary-600/80 text-white text-xs px-2 py-0.5 backdrop-blur">
						{tRecipes(`labels.${recipe.type}`)}
					</span>
				</div>
				<ImageSRC
					alt="fallback photo"
					src={fallbackImg.src}
					default
					fill
					className="object-cover"
				/>
			</div>
		);
	};

	return (
		<div className="relative rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950 shadow-sm hover:shadow-md transition-shadow duration-200 p-3 sm:p-4 focus-within:ring-2 focus-within:ring-primary-500">
			<div className="flex flex-col h-full">
				<div>
					<h3 className="text-lg font-bold text-center mb-2 overflow-hidden line-clamp-2">
						<Typography component="h3" className="line-clamp-1" tooltip>
							{recipe.title}
						</Typography>
					</h3>
					<Slider
						spaceBetween={0}
						slidesPerView={1}
						effect="cards"
						isOpen={isOpen}
					>
						{renderImages()}
					</Slider>
					<Typography
						className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-1 mt-2"
						tooltip
					>
						{recipe.description}
					</Typography>
					<div className="mt-2 flex items-center gap-1.5 flex-wrap">
						<span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300">
							{tIngredients(`rations.${recipe.ration}`)}
						</span>
						<span className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300">
							{tRecipes(`labels.${recipe.type}`)}
						</span>
					</div>
				</div>
				<div className="flex flex-col">
					<Divider className="my-2" />
					<div className="flex-shrink-1 flex-grow-1 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
						<p className="text-xs text-neutral-500 dark:text-neutral-400">
							{tRecipes('titles.organic_substances')}
						</p>
						<div className="mt-1 flex items-center gap-1.5 flex-wrap">
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{tUnits('labels.calories')}: {(+recipe.calories).toFixed(0)}{' '}
								{tUnits('labels.kilocalories')}
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{tUnits('labels.proteins')}: {(+recipe.proteins).toFixed(0)}{' '}
								{tUnits('labels.gr')}
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{tUnits('labels.fats')}: {(+recipe.fats).toFixed(0)}{' '}
								{tUnits('labels.gr')}
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{tUnits('labels.carbohydrates')}:{' '}
								{(+recipe.carbohydrates).toFixed(0)} {tUnits('labels.gr')}
							</span>
						</div>
					</div>
					<div className="mt-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 px-3 py-2">
						<p className="text-xs text-neutral-500 dark:text-neutral-400">
							{tRecipes('titles.prices')}
						</p>
						<div className="mt-1 flex items-center gap-1.5 flex-wrap">
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{tRecipes('fields.price_of_dish')}:{' '}
								{currencyFormatter.format(Number(recipe.priceOfDish))}
							</span>
							<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
								{tRecipes('fields.price_to_buy')}:{' '}
								{currencyFormatter.format(Number(recipe.priceToBuy))}
							</span>
						</div>
					</div>
				</div>
				<div className="flex flex-col flex-grow-1 justify-end">
					<Divider className="my-2" />
					<RecipeItemStepsModal
						className="gap-2 mb-2"
						recipeSteps={recipe.steps}
						title={`${tRecipes('buttons.view_steps')} (${recipe.steps.length})`}
					/>
					<div className="flex gap-2">
						<Button
							className="w-full"
							color="success"
							size="sm"
							variant="flat"
							onPress={() => {}}
						>
							<span className="block max-w-[140px] truncate">
								{tRecipes('buttons.put_on_the_market')}
							</span>
						</Button>
						<DeleteButton
							ariaLabel={tCommon('delete')}
							size="sm"
							onPress={handleDeleteRecipe}
							isLoading={isDeleting}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
