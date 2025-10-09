'use client';
import { Button } from '@heroui/button';
import { Divider } from '@heroui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageSRC } from '@/features';
import type { RecipeItemProps } from '../model/recipeList.types';
import { RecipeItemStepsModal } from './RecipeItemStepsModal';

export const RecipeItem: FC<RecipeItemProps> = ({ recipe }) => {
	const { t: tUnits } = useTranslation('units');
	const { t: tRecipes } = useTranslation('recipes');
	const { t: tIngredients } = useTranslation('ingredients');
	return (
		<div className="w-[calc(25%-6px)] min-w-[200px] max-w-[250px] border rounded-md p-2 grow-1">
			<h3 className="text-lg font-bold text-center h-[50px] mb-2 overflow-hidden line-clamp-2">
				{recipe.title}
			</h3>
			<ImageSRC
				src={recipe.images[0].path}
				alt={recipe.title}
				className="w-[100%] h-[100px] object-cover"
				width={100}
				height={100}
			/>
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
			<Button color="success" fullWidth onPress={() => {}}>
				{tRecipes('buttons.put_on_the_market')}
			</Button>
		</div>
	);
};
