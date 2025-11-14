'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/entities';
import { classNames, localStorageHelper } from '@/shared/lib/helpers';
import { PaginationBar } from '@/shared/ui';
import type { RecipeListFilter } from '../model/recipeList.types';
import { SKELETON_KEYS } from '../model/recipeList.utils';
import { RecipeItem } from './RecipeItem';
import { RecipeItemSkeleton } from './RecipeItemSkeleton';
import { RecipesListFilter } from './RecipesListFilter';
import styles from './recipeList.module.scss';

export const RecipesList = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tRecipes } = useTranslation('recipes');
	const { item: filterFromLocalStorage } =
		localStorageHelper<RecipeListFilter>('filter_recipes');
	const [page, setPage] = useState<number>(1);
	const [filters, setFilters] = useState<Partial<RecipeListFilter>>(
		filterFromLocalStorage,
	);
	const { recipes, pagination, isLoading } = useRecipe({
		page,
		filters,
	});

	return (
		<div className={`w-full min-h-[600px] transition-all duration-300`}>
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.recipe_list')}
			</h1>
			<div className="mb-5">
				<RecipesListFilter
					setPage={setPage}
					filters={filters}
					setFilters={setFilters}
				/>
			</div>
			{isLoading ? (
				<div className={classNames(styles.recipeList)}>
					{SKELETON_KEYS.map((key) => (
						<RecipeItemSkeleton key={key} />
					))}
				</div>
			) : recipes && recipes.length > 0 ? (
				<div className="flex flex-col gap-6">
					<div
						className={`${styles.recipeList} justify-center lg:justify-start`}
					>
						{recipes.map((recipe) => (
							<RecipeItem key={recipe.id} recipe={recipe} />
						))}
					</div>
					<PaginationBar
						page={page}
						onPageChange={setPage}
						totalItems={pagination?.total || 0}
						currentPage={pagination?.currentPage || 1}
					/>
				</div>
			) : (
				<div className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-600 dark:text-neutral-400">
					{tRecipes('titles.empty_state')}
				</div>
			)}
		</div>
	);
};
