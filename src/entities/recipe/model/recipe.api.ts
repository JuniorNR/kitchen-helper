import { createApi } from '@reduxjs/toolkit/query/react';
import type { RecipeCreateFormInputType } from '@/features/RecipeCreate/model/recipeCreate.schema';
import { dto } from '@/shared/lib/helpers';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type { ApiResponse } from '@/shared/lib/types';
import type { Recipe, RecipeDTO } from './recipe.type';
import { buildRecipeCreateFormData } from './recipe.utils';

export const recipeApi = createApi({
	reducerPath: 'recipeApi',
	baseQuery: baseQuery,
	tagTypes: ['Recipe'],
	endpoints: (builder) => ({
		getRecipes: builder.query<ApiResponse<Recipe[]>, number | undefined>({
			providesTags: ['Recipe'],
			query: (page) => ({
				url: `/recipes`,
				params: {
					page,
				},
			}),
			transformResponse: (response: ApiResponse<RecipeDTO[]>) => {
				return {
					data: dto('toClient', response.data),
					pagination: dto('toClient', response.pagination),
					code: response.code,
				};
			},
		}),
		createRecipe: builder.mutation<
			{ recipe: Recipe; code: string },
			RecipeCreateFormInputType
		>({
			invalidatesTags: ['Recipe'],
			query: (data) => ({
				url: `/recipes/create`,
				method: 'POST',
				body: buildRecipeCreateFormData(data),
			}),
			transformResponse: (response: ApiResponse<RecipeDTO>) => {
				return {
					recipe: dto('toClient', response.data),
					code: response.code,
				};
			},
		}),
		deleteRecipe: builder.mutation<{ code: string }, string>({
			invalidatesTags: ['Recipe'],
			query: (id) => ({
				url: `/recipes/delete/${id}`,
				method: 'DELETE',
			}),
		}),
	}),
});

export const {
	useGetRecipesQuery,
	useCreateRecipeMutation,
	useDeleteRecipeMutation,
} = recipeApi;
