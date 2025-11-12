/** biome-ignore-all lint/suspicious/noConfusingVoidType: <explanation> */
import type { Ingredient } from '@/entities';

export const INGREDIENT_SKELETON_KEYS = [
	'ing-s1',
	'ing-s2',
	'ing-s3',
	'ing-s4',
	'ing-s5',
	'ing-s6',
];

export const prepareIngredientsList = (ingredients?: Ingredient[]) => {
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
};

export const handleDeleteIngredient = async (
	id: string,
	setIsDeleteLoadingIngredient: (id: string | null) => void,
	deleteIngredientData: (id: string) => Promise<void | null>,
) => {
	try {
		setIsDeleteLoadingIngredient(id);
		await deleteIngredientData(id);
	} catch (_) {
		return null;
	} finally {
		setIsDeleteLoadingIngredient(null);
	}
};
