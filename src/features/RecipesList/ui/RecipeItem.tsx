'use client';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SwiperSlide } from 'swiper/react';
import { useRecipe } from '@/entities';
import { ImageSRC } from '@/features';
import { Slider } from '@/shared/ui';
import { DeleteIcon } from '@/shared/ui/icons/deleteIcon';
import type { RecipeItemProps } from '../model/recipeList.types';
import { RecipeItemStepsModal } from './RecipeItemStepsModal';

export const RecipeItem: FC<RecipeItemProps> = ({ recipe }) => {
	const { t: tUnits } = useTranslation('units');
	const { t: tRecipes } = useTranslation('recipes');
	const { t: tIngredients } = useTranslation('ingredients');
	const { deleteRecipe, isDeleting } = useRecipe();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleDeleteRecipe = async () => {
		await deleteRecipe(recipe.id.toString());
	};

	return (
		<div className="w-[calc(25%-6px)] min-w-[200px] max-w-[250px] border rounded-md p-2 grow-1">
			<h3 className="text-lg font-bold text-center h-[50px] mb-2 overflow-hidden line-clamp-2">
				{recipe.title}
			</h3>
			<Slider spaceBetween={0} slidesPerView={1} effect="cube" isOpen={isOpen}>
				{recipe.images.map((image) => (
					<SwiperSlide
						key={image.path}
						onClick={() => setIsOpen((prev) => !prev)}
					>
						<ImageSRC
							src={image.path}
							alt={image.path}
							className="w-[175px] h-[175px] object-cover"
							width={175}
							height={175}
						/>
					</SwiperSlide>
				))}
			</Slider>

			<p className="text-sm text-gray-500 line-clamp-3 h-[60px] mt-2">
				{recipe.description}
			</p>
			<Divider />
			<div className="flex justify-between">
				<p className="line-clamp-1 max-w-[50%] text-ellipsis">
					{tIngredients(`rations.${recipe.ration}`)}
				</p>
				<p className="line-clamp-1 max-w-[50%] text-ellipsis text-center">
					{tRecipes(`labels.${recipe.type}`)}
				</p>
			</div>
			<Divider className="mb-2" />
			<div className="flex flex-col">
				<h4 className="font-bold">{tRecipes('titles.organic_substances')}</h4>
				<p className="text-sm">
					{tUnits('labels.calories')}:
					<span className="font-bold text-gray-500">
						{' '}
						{(+recipe.calories).toFixed(0)} {tUnits('labels.kilocalories')}
					</span>
				</p>
				<p className="text-sm">
					{tUnits('labels.proteins')}:
					<span className="font-bold text-gray-500">
						{' '}
						{(+recipe.proteins).toFixed(0)} {tUnits('labels.gr')}
					</span>
				</p>
				<p className="text-sm">
					{tUnits('labels.fats')}:
					<span className="font-bold text-gray-500">
						{' '}
						{(+recipe.fats).toFixed(0)} {tUnits('labels.gr')}
					</span>
				</p>
				<p className="text-sm">
					{tUnits('labels.carbohydrates')}:
					<span className="font-bold text-gray-500">
						{' '}
						{(+recipe.carbohydrates).toFixed(0)} {tUnits('labels.gr')}
					</span>
				</p>
			</div>
			<Divider className="mb-2" />
			<div className="flex flex-col">
				<h4 className="font-bold">{tRecipes('titles.prices')}</h4>
				<p className="text-sm">
					{tRecipes('fields.price_of_dish')}:{' '}
					<span className="text-gray-500 font-bold">
						{recipe.priceOfDish} RUB
					</span>
				</p>
				<p className="text-sm">
					{tRecipes('fields.price_to_buy')}:{' '}
					<span className="text-gray-500 font-bold">
						{recipe.priceToBuy} RUB
					</span>
				</p>
			</div>
			<Divider className="mb-2" />
			<RecipeItemStepsModal
				recipeSteps={recipe.steps}
				title={`${tRecipes('buttons.view_steps')} (${recipe.steps.length})`}
			/>
			<div className="flex gap-2">
				<Button
					className="min-w-0"
					color="success"
					fullWidth
					onPress={() => {}}
				>
					<span className="block max-w-full truncate">
						{tRecipes('buttons.put_on_the_market')}
					</span>
				</Button>
				<Button
					color="danger"
					onPress={handleDeleteRecipe}
					isLoading={isDeleting}
				>
					<DeleteIcon />
				</Button>
			</div>
		</div>
	);
};
