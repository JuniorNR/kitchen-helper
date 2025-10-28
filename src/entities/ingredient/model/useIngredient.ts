import type { IngredientCreateFormDataType } from '@/features/ingredientCreate/model/IngredientCreate.schema';
import {
	useCreateIngredientMutation,
	useDeleteIngredientMutation,
	useGetIngredientsQuery,
} from './ingredient.api';

export const useIngredient = (page?: number) => {
	const { data, isLoading, error } = useGetIngredientsQuery(page);
	const [deleteIngredient, { isLoading: isDeleteIngredientLoading }] =
		useDeleteIngredientMutation();
	const [createIngredient, { isLoading: isCreateIngredientLoading }] =
		useCreateIngredientMutation();

	const createIngredientData = async (
		dataToSend: IngredientCreateFormDataType,
	) => {
		try {
			const data = await createIngredient(dataToSend).unwrap();
			if (data) {
				return data;
			}
		} catch (_) {
			return null;
		}
	};

	const deleteIngredientData = async (id: string) => {
		try {
			const data = await deleteIngredient(id).unwrap();
			return data;
		} catch (_) {
			return null;
		}
	};

	return {
		ingredients: data?.data,
		pagination: data?.pagination,
		isLoading,
		error,
		createIngredientData,
		deleteIngredientData,
		isDeleteIngredientLoading,
		isCreateIngredientLoading,
	};
};
