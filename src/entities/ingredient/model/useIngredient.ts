import type { IngredientCreateFormDataType } from '@/features/ingredientCreate/model/IngredientCreate.schema';
import {
	useCreateIngredientMutation,
	useDeleteIngredientMutation,
	useGetIngredientsQuery,
} from './ingredient.api';
import type { UseIngredients } from './ingredient.types';

export const useIngredient = ({ page, filters }: UseIngredients) => {
	const serializeDate = (d?: string | Date) =>
		typeof d === 'string' ? d : d?.toISOString();

	const { data, isLoading, error } = useGetIngredientsQuery({
		page,
		priceFrom: filters?.priceFrom,
		priceTo: filters?.priceTo,
		createdFrom: serializeDate(filters?.createdFrom),
		createdTo: serializeDate(filters?.createdTo),
		categories: filters?.categories,
		units: filters?.units,
	});
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
