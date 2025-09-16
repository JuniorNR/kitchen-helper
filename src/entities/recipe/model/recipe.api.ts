import { createApi } from '@reduxjs/toolkit/query/react';
import { dto } from '@/shared/lib/helpers';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type { ApiResponse } from '@/shared/lib/types';
import type { Recipe, RecipeDTO } from './recipe.type';

export const recipeApi = createApi({
	reducerPath: 'recipeApi',
	baseQuery: baseQuery,
	tagTypes: ['Recipe'],
	endpoints: (builder) => ({
		getRecipes: builder.query<{ recipes: Recipe[]; code: string }, void>({
			query: () => `/recipes/`,
			providesTags: ['Recipe'],
			transformResponse: (response: ApiResponse<RecipeDTO[]>) => {
				return {
					recipes: dto('toClient', response.data),
					code: response.code,
				};
			},
		}),
	}),
});

export const { useGetRecipesQuery } = recipeApi;
