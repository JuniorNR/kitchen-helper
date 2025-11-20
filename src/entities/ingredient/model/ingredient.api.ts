import { createApi } from '@reduxjs/toolkit/query/react';
import { addAlert } from '@/features/Alert';
import type {
	IngredientListFilter,
	IngredientListFilterDTO,
} from '@/features/IngredientsList/model/ingredientsList.types';
import type { IngredientCreateFormDataType } from '@/features/ingredientCreate/model/IngredientCreate.schema';
import { dto } from '@/shared/lib/helpers/dto';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type {
	ApiError,
	ApiErrorDTO,
	ApiResponse,
	ApiResponsePagination,
	ApiResponsePaginationDTO,
} from '@/shared/lib/types/api.types';
import type {
	Ingredient,
	IngredientDTO,
	UseIngredients,
} from './ingredient.types';

export const ingredientApi = createApi({
	reducerPath: 'ingredientApi',
	baseQuery,
	tagTypes: ['Ingredients'],
	endpoints: (builder) => ({
		getIngredients: builder.query<
			ApiResponse<Ingredient[], ApiResponsePagination>,
			UseIngredients
		>({
			query: ({ page, filters }) => {
				const params: Record<string, unknown> = {
					page,
					...(filters
						? dto<
								Partial<IngredientListFilter>,
								Partial<IngredientListFilterDTO>
							>('toServer', filters)
						: {}),
				};
				return {
					url: '/ingredients',
					params,
				};
			},
			transformResponse: (
				response: ApiResponse<IngredientDTO[], ApiResponsePaginationDTO>,
			) => {
				return {
					data: dto<IngredientDTO[], Ingredient[]>('toClient', response.data),
					pagination: dto<ApiResponsePaginationDTO, ApiResponsePagination>(
						'toClient',
						response.pagination,
					),
					code: response.code,
				};
			},
			providesTags: ['Ingredients'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					const apiError = dto<ApiErrorDTO, ApiError>(
						'toClient',
						error as ApiError,
					);
					const code = apiError.error.data?.code;
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'danger',
							title: 'Error',
							description: code || 'UNKNOWN_ERROR',
						}),
					);
				}
			},
		}),
		createIngredient: builder.mutation<
			Ingredient,
			IngredientCreateFormDataType
		>({
			query: (ingredient) => ({
				url: '/ingredients/create',
				method: 'POST',
				body: dto<IngredientCreateFormDataType, IngredientDTO>(
					'toServer',
					ingredient,
				),
			}),
			transformResponse: (response: ApiResponse<IngredientDTO>) => {
				return dto<IngredientDTO, Ingredient>('toClient', response.data);
			},
			invalidatesTags: ['Ingredients'],
		}),
		deleteIngredient: builder.mutation<void, string>({
			query: (id) => ({
				url: `/ingredients/delete/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Ingredients'],
		}),
	}),
});

export const {
	useGetIngredientsQuery,
	useCreateIngredientMutation,
	useDeleteIngredientMutation,
} = ingredientApi;
