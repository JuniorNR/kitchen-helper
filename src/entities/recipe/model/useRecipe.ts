import { useDispatch } from 'react-redux';
import { addAlert } from '@/features/Alert';
import type { RecipeCreateFormInputType } from '@/features/RecipeCreate/model/recipeCreate.schema';
import {
	useCreateRecipeMutation,
	useDeleteRecipeMutation,
	useGetRecipesQuery,
} from './recipe.api';

export const useRecipe = () => {
	const { data, isLoading, error } = useGetRecipesQuery();
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
		} catch (error) {
			const code = (error as { data: { code: string } }).data?.code;
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
