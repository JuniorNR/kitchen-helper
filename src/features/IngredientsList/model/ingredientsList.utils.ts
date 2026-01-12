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
	return ingredients ?? [];
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
		// Игнорируем ошибки
	} finally {
		setIsDeleteLoadingIngredient(null);
	}
};
