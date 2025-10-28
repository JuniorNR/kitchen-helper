import { createApi } from '@reduxjs/toolkit/query/react';
import type { IngredientCreateFormDataType } from '@/features/ingredientCreate/model/IngredientCreate.schema';
import { dto } from '@/shared/lib/helpers/dto';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type {
	ApiResponse,
	ApiResponsePagination,
	ApiResponsePaginationDTO,
} from '@/shared/lib/types/api.types';
import type { Ingredient, IngredientDTO } from './ingredient.types';

export const ingredientApi = createApi({
	reducerPath: 'ingredientApi',
	baseQuery,
	tagTypes: ['Ingredients'],
	endpoints: (builder) => ({
		getIngredients: builder.query<
			ApiResponse<Ingredient[], ApiResponsePagination>,
			number | undefined
		>({
			query: (page) => ({
				url: '/ingredients',
				params: { page },
			}),
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
