import { useDispatch } from 'react-redux';
import { addAlert } from '@/features/Alert';
import type { RecipeCreateFormInputType } from '@/features/RecipeCreate/model/recipeCreate.schema';
import {
	useCreateRecipeMutation,
	useDeleteRecipeMutation,
	useGetRecipesQuery,
} from './recipe.api';

export const useRecipe = (page?: number) => {
	const { data, isLoading, error } = useGetRecipesQuery(page);
	const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
	const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
	const dispatch = useDispatch();
	const createRecipeData = async (data: RecipeCreateFormInputType) => {
		try {
			const result = await createRecipe(data).unwrap();

			if (result.recipe) {
				dispatch(
					addAlert({
						id: crypto.randomUUID(),
						status: 'success',
						title: 'Success',
						description: result.code || 'Unknown error',
					}),
				);
				return result.recipe;
			} else {
				dispatch(
					addAlert({
						id: crypto.randomUUID(),
						status: 'danger',
						title: 'Error',
						description: result.code || 'Unknown error',
					}),
				);
				return null;
			}
		} catch (error) {
			const code = (error as { data: { code: string } }).data?.code;
			dispatch(
				addAlert({
					id: crypto.randomUUID(),
					status: 'danger',
					title: 'Error',
					description: code || 'Unknown error',
				}),
			);
		}
	};

	return {
		recipes: data?.data,
		pagination: data?.pagination,
		isLoading,
		error,
		createRecipeData,
		deleteRecipe,
		isCreating,
		isDeleting,
	};
};
