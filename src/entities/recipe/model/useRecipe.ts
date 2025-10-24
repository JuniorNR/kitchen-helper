import { addAlert } from '@/features/Alert';
import type { RecipeCreateFormInputType } from '@/features/RecipeCreate/model/recipeCreate.schema';
import { useAppDispatch } from '@/shared/lib/store';
import { isApiErrorResponse } from '@/shared/lib/types';
import {
	useCreateRecipeMutation,
	useDeleteRecipeMutation,
	useGetRecipesQuery,
} from './recipe.api';

export const useRecipe = () => {
	const { data, isLoading, error } = useGetRecipesQuery();
	const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
	const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
	const dispatch = useAppDispatch();
	const createRecipeData = async (data: RecipeCreateFormInputType) => {
		try {
			const result = await createRecipe(data).unwrap();
			if (result.recipe) {
				dispatch(
					addAlert({
						id: crypto.randomUUID(),
						status: 'success',
						title: 'Success',
						description: result.code,
					}),
				);
				return result.recipe;
			} else {
				dispatch(
					addAlert({
						id: crypto.randomUUID(),
						status: 'danger',
						title: 'Error',
						description: result.code,
					}),
				);
				return null;
			}
		} catch (error: unknown) {
			const code = isApiErrorResponse(error)
				? error.data.code
				: 'UNKNOWN_ERROR';
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'danger',
					title: 'Error',
					description: code,
				}),
			);
		}
	};

	return {
		recipes: data?.recipes,
		isLoading,
		error,
		createRecipeData,
		deleteRecipe,
		isCreating,
		isDeleting,
	};
};
