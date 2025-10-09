'use client';

import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/entities';
import { RecipeItem } from './RecipeItem';

export const RecipesList = () => {
	const { t: tCommon } = useTranslation('common');
	const { recipes, isLoading } = useRecipe();

	return (
		<div
			className={`w-full min-h-[600px] ${isLoading ? 'blur' : ''} transition-all duration-300`}
		>
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.recipe_list')}
			</h1>
			<div className={`flex flex-wrap gap-2`}>
				{recipes?.map((recipe) => (
					<RecipeItem key={recipe.id} recipe={recipe} />
				))}
			</div>
		</div>
	);
};
