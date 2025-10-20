'use client';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useIngredient } from '@/entities';
import { IngredientCardSkeleton } from './IngredientCardSkeleton';

const INGREDIENT_SKELETON_KEYS = [
	'ing-s1',
	'ing-s2',
	'ing-s3',
	'ing-s4',
	'ing-s5',
	'ing-s6',
];

import { IngredientCard } from './IngredientCard';

export const IngredientsList = () => {
	const { t: tCommon } = useTranslation('common');
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

	return (
		<div className="h-full w-full">
			<h1 className="text-2xl font-bold mb-3">
				{tCommon('page_titles.ingredient_list')}
			</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				{isLoading
					? INGREDIENT_SKELETON_KEYS.map((key) => (
							<IngredientCardSkeleton key={key} />
						))
					: prepareIngredientsList.map((ingredient) => (
							<IngredientCard
								key={ingredient.id}
								ingredient={ingredient}
								isDeleting={isDeleteLoadingIngredient === ingredient.id}
								onDelete={(id) => handleDeleteIngredient(id)}
							/>
						))}
			</div>
		</div>
	);
};
