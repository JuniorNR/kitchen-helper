'use client';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIngredient } from '@/entities';
import { classNames } from '@/shared/lib/helpers';
import { INGREDIENT_SKELETON_KEYS } from '../model/ingredientsList.utils';
import { IngredientCard } from './IngredientCard';
import { IngredientCardSkeleton } from './IngredientCardSkeleton';

export const IngredientsList = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tIngredients } = useTranslation('ingredients');
	const { ingredients, isLoading, deleteIngredientData } = useIngredient();
	const [isDeleteLoadingIngredient, setIsDeleteLoadingIngredient] = useState<
		string | null
	>(null);

	const prepareIngredientsList = useMemo(() => {
		if (ingredients) {
			return ingredients.map((ingredient) => ({
				id: ingredient.id,
				title: ingredient.title,
				description: ingredient.description,
				category: ingredient.category,
				unit: ingredient.unit,
				price: ingredient.price,
				currency: ingredient.currency,
				updatedAt: ingredient.updatedAt,
				createdAt: ingredient.createdAt,
			}));
		}

		return [];
	}, [ingredients]);

	const handleDeleteIngredient = async (id: string) => {
		try {
			setIsDeleteLoadingIngredient(id);
			await deleteIngredientData(id);
		} catch (_) {
			return null;
		} finally {
			setIsDeleteLoadingIngredient(null);
		}
	};

	const hasItems = prepareIngredientsList.length > 0;

	return (
		<div className="w-full min-h-[600px] transition-all duration-300">
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.ingredient_list')}
			</h1>
			{isLoading ? (
				<div
					className={classNames(
						'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
					)}
				>
					{INGREDIENT_SKELETON_KEYS.map((key) => (
						<IngredientCardSkeleton key={key} />
					))}
				</div>
			) : hasItems ? (
				<div
					className={classNames(
						'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
					)}
				>
					{prepareIngredientsList.map((ingredient) => (
						<IngredientCard
							key={ingredient.id}
							ingredient={ingredient}
							isDeleting={isDeleteLoadingIngredient === ingredient.id}
							onDelete={(id) => handleDeleteIngredient(id)}
						/>
					))}
				</div>
			) : (
				<div className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-600 dark:text-neutral-400">
					{tIngredients('titles.empty_state')}
				</div>
			)}
		</div>
	);
};
