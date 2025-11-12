'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIngredient } from '@/entities';
import { classNames } from '@/shared/lib/helpers';
import { PaginationBar } from '@/shared/ui';
import type { IngredientListFilter } from '../model/ingredientsList.types';
import {
	handleDeleteIngredient,
	INGREDIENT_SKELETON_KEYS,
	prepareIngredientsList,
} from '../model/ingredientsList.utils';
import { IngredientCard } from './IngredientCard';
import { IngredientCardSkeleton } from './IngredientCardSkeleton';
import { IngredientsListFilter } from './IngredientsListFilter';

export const IngredientsList = () => {
	const filterFromLocalStorage: Partial<IngredientListFilter> = (() => {
		try {
			return JSON.parse(
				localStorage.getItem('filter_ingredients') || '',
			) as Partial<IngredientListFilter>;
		} catch {
			return {};
		}
	})();

	const { t: tCommon } = useTranslation('common');
	const { t: tIngredients } = useTranslation('ingredients');

	const [page, setPage] = useState<number>(1);
	const [filters, setFilters] = useState<Partial<IngredientListFilter>>(
		filterFromLocalStorage,
	);
	const [isDeleteLoadingIngredient, setIsDeleteLoadingIngredient] = useState<
		string | null
	>(null);

	const { ingredients, pagination, isLoading, deleteIngredientData } =
		useIngredient({
			page,
			filters,
		});

	return (
		<div className="w-full min-h-[600px] transition-all duration-300">
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.ingredient_list')}
			</h1>
			<div className="mb-5">
				<IngredientsListFilter
					setPage={setPage}
					filters={filters}
					setFilters={setFilters}
					filterFromLocalStorage={filterFromLocalStorage}
				/>
			</div>
			<AnimatePresence mode="wait">
				{isLoading ? (
					<motion.div
						key="loading"
						initial={{ opacity: 0, filter: 'blur(6px)' }}
						animate={{ opacity: 1, filter: 'blur(0px)' }}
						exit={{ opacity: 0, filter: 'blur(6px)' }}
						transition={{ duration: 0.25 }}
						className={classNames(
							'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
						)}
					>
						{INGREDIENT_SKELETON_KEYS.map((key) => (
							<IngredientCardSkeleton key={key} />
						))}
					</motion.div>
				) : ingredients?.length ? (
					<motion.div
						key="list"
						initial={{ opacity: 0, filter: 'blur(6px)' }}
						animate={{ opacity: 1, filter: 'blur(0px)' }}
						exit={{ opacity: 0, filter: 'blur(6px)' }}
						transition={{ duration: 0.25 }}
						className="flex flex-col gap-6"
					>
						<motion.div
							className={classNames(
								'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]',
							)}
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
							{prepareIngredientsList(ingredients).map((ingredient) => (
								<motion.div
									key={ingredient.id}
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
									<IngredientCard
										ingredient={ingredient}
										isDeleting={isDeleteLoadingIngredient === ingredient.id}
										onDelete={(id) =>
											handleDeleteIngredient(
												id,
												setIsDeleteLoadingIngredient,
												deleteIngredientData,
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
				) : (
					<motion.div
						key="empty"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-600 dark:text-neutral-400"
					>
						{tIngredients('titles.empty_state')}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
