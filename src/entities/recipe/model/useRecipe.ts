import { useDispatch } from 'react-redux';
import { addAlert } from '@/features/Alert';
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

	const deleteRecipeData = async (id: string) => {
		try {
			const result = await deleteRecipe(id).unwrap();
			return result;
		} catch (_) {
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
