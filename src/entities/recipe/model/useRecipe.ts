import type { RecipeCreateFormInputType } from '@/features/RecipeCreate/model/recipeCreate.schema';
import { dto, serializeDate } from '@/shared/lib/helpers';
import type { ApiError, ApiErrorDTO } from '@/shared/lib/types';
import {
	useAttachRecipeToMarketMutation,
	useCreateRecipeMutation,
	useDeleteRecipeMutation,
	useDetachRecipeToMarketMutation,
	useGetRecipesQuery,
} from './recipe.api';
import type { UseRecipe } from './recipe.type';

export const useRecipe = ({ page, filters, skip }: UseRecipe) => {
	const { data, isLoading, error, refetch } = useGetRecipesQuery(
		{
			page,
			filters: filters
				? {
						createdFrom: serializeDate(filters?.createdFrom),
						createdTo: serializeDate(filters?.createdTo),
						...filters,
					}
				: undefined,
		},
		{
			skip,
		},
	);
	const [createRecipe, { isLoading: isCreating }] = useCreateRecipeMutation();
	const [deleteRecipe, { isLoading: isDeleting }] = useDeleteRecipeMutation();
	const [attachRecipeToMarket, { isLoading: isAttaching }] =
		useAttachRecipeToMarketMutation();
	const [detachRecipeToMarket, { isLoading: isDetaching }] =
		useDetachRecipeToMarketMutation();

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

	const attachRecipeToMarketData = async ({
		marketId,
		recipeIds,
	}: {
		marketId: number;
		recipeIds: number[];
	}) => {
		try {
			const result = await attachRecipeToMarket({
				marketId,
				recipeIds,
			}).unwrap();
			return result || null;
		} catch {
			return null;
		}
	};

	const detachRecipeToMarketData = async ({
		marketId,
		recipeIds,
	}: {
		marketId: number;
		recipeIds: number[];
	}) => {
		try {
			const result = await detachRecipeToMarket({
				marketId,
				recipeIds,
			}).unwrap();
			return result || null;
		} catch {
			return null;
		}
	};

	return {
		recipes: data?.data,
		pagination: data?.pagination,
		isLoading,
		error: dto<ApiErrorDTO, ApiError>('toClient', error as ApiErrorDTO) as
			| ApiError
			| undefined,
		refetch,
		createRecipeData,
		deleteRecipeData,
		attachRecipeToMarketData,
		detachRecipeToMarketData,
		isCreating,
		isDeleting,
		isAttaching,
		isDetaching,
	};
};
