import type { RecipeCreateFormInputType } from '@/features/RecipeCreate/model/recipeCreate.schema';
import { serializeDate } from '@/shared/lib/helpers';
import {
	useCreateRecipeMutation,
	useDeleteRecipeMutation,
	useGetRecipesQuery,
} from './recipe.api';
import type { UseRecipe } from './recipe.type';

export const useRecipe = ({ page, filters }: UseRecipe) => {
	const { data, isLoading, error } = useGetRecipesQuery({
		page,
		filters: filters
			? {
					createdFrom: serializeDate(filters?.createdFrom),
					createdTo: serializeDate(filters?.createdTo),
					...filters,
				}
			: undefined,
	});
	const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
	const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();

	const createRecipeData = async (data: RecipeCreateFormInputType) => {
		try {
			const result = await createRecipe(data).unwrap();
			return result.recipe || null;
		} catch {
			return null;
		}
	};

	const deleteRecipeData = async (id: string) => {
		try {
			const result = await deleteRecipe(id).unwrap();
			return result;
		} catch {
			return null;
		}
	};

	return {
		recipes: data?.data,
		pagination: data?.pagination,
		isLoading,
		error,
		createRecipeData,
		deleteRecipeData,
		isCreating,
		isDeleting,
	};
};
