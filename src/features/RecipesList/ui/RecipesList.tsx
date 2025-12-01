'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/entities';
import { classNames, localStorageHelper } from '@/shared/lib/helpers';
import { Alert, PaginationBar } from '@/shared/ui';
import type { RecipeListFilter } from '../model/recipeList.types';
import { handleDeleteRecipe, SKELETON_KEYS } from '../model/recipeList.utils';
import { RecipeItem } from './RecipeItem';
import { RecipeItemSkeleton } from './RecipeItemSkeleton';
import { RecipesListFilter } from './RecipesListFilter';
import styles from './recipeList.module.scss';

export const RecipesList = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tRecipes } = useTranslation('recipes');
	const { t: tAlerts } = useTranslation('alerts');
	const { item: filterFromLocalStorage } =
		localStorageHelper<RecipeListFilter>('filter_recipes');
	const [isDeleteLoadingRecipe, setIsDeleteLoadingRecipe] = useState<
		string | null
	>(null);
	const [page, setPage] = useState<number>(1);
	const [filters, setFilters] = useState<Partial<RecipeListFilter>>(
		filterFromLocalStorage,
	);
	const { recipes, error, pagination, isLoading, deleteRecipeData } = useRecipe(
		{
			page,
			filters,
		},
	);

	const renderRecipes = () => {
		return (
			<motion.div
				key="list"
				initial={{ opacity: 0, filter: 'blur(6px)' }}
				animate={{ opacity: 1, filter: 'blur(0px)' }}
				exit={{ opacity: 0, filter: 'blur(6px)' }}
				transition={{ duration: 0.25 }}
				className="flex flex-col gap-6"
			>
				<motion.div
					className={`${styles.recipeList} justify-center lg:justify-start`}
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 1 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.06, delayChildren: 0.05 },
						},
					}}
				>
					{recipes?.map((recipe) => (
						<motion.div
							key={recipe.id}
							layout
							variants={{
								hidden: { opacity: 0, y: 10, scale: 0.98 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: { duration: 0.25, ease: 'easeOut' },
								},
							}}
						>
							<RecipeItem
								recipe={recipe}
								isDeleting={isDeleteLoadingRecipe === recipe.id.toString()}
								onDelete={(id) =>
									handleDeleteRecipe(
										id,
										setIsDeleteLoadingRecipe,
										deleteRecipeData,
									)
								}
							/>
						</motion.div>
					))}
				</motion.div>
				<PaginationBar
					page={page}
					onPageChange={setPage}
					totalItems={pagination?.total || 0}
					currentPage={pagination?.currentPage || 1}
				/>
			</motion.div>
		);
	};

	const renderSkeleton = () => {
		return (
			<motion.div
				key="loading"
				initial={{ opacity: 0, filter: 'blur(6px)' }}
				animate={{ opacity: 1, filter: 'blur(0px)' }}
				exit={{ opacity: 0, filter: 'blur(6px)' }}
				transition={{ duration: 0.25 }}
				className={classNames(styles.recipeList)}
			>
				{SKELETON_KEYS.map((key) => (
					<RecipeItemSkeleton key={key} />
				))}
			</motion.div>
		);
	};

	const renderEmptyState = () => {
		return (
			<motion.div
				key="empty"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-600 dark:text-neutral-400"
			>
				{tRecipes('titles.empty_state')}
			</motion.div>
		);
	};

	const renderError = () => {
		return (
			<Alert
				status="danger"
				title={tAlerts('codes.ACCESS_DENIED')}
				description={tCommon('common.section_only_for', {
					roles: error?.data.requiredRoles?.map((role) =>
						tCommon(`roles.${role}`).toLowerCase(),
					),
				})}
			/>
		);
	};

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
			<AnimatePresence mode="wait">
				{error
					? renderError()
					: isLoading
						? renderSkeleton()
						: recipes && recipes.length > 0
							? renderRecipes()
							: renderEmptyState()}
			</AnimatePresence>
		</div>
	);
};
