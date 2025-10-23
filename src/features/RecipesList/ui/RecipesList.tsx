'use client';

import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/entities';
import { classNames } from '@/shared/lib/helpers';
import { SKELETON_KEYS } from '../model/recipeList.utils';
import { RecipeItem } from './RecipeItem';
import { RecipeItemSkeleton } from './RecipeItemSkeleton';

import styles from './recipeList.module.scss';

export const RecipesList = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tRecipes } = useTranslation('recipes');
	const { recipes, isLoading } = useRecipe();

	return (
		<div className={`w-full min-h-[600px] transition-all duration-300`}>
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.recipe_list')}
			</h1>
			{isLoading ? (
				<div className={classNames(styles.recipeList)}>
					{SKELETON_KEYS.map((key) => (
						<RecipeItemSkeleton key={key} />
					))}
				</div>
			) : recipes && recipes.length > 0 ? (
				<div className={classNames(styles.recipeList)}>
					{recipes.map((recipe) => (
						<RecipeItem key={recipe.id} recipe={recipe} />
					))}
				</div>
			) : (
				<div className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-600 dark:text-neutral-400">
					{tRecipes('titles.empty_state')}
				</div>
			)}
		</div>
	);
};
