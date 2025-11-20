import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { ingredientApi } from '@/entities/ingredient/model/ingredient.api';
import { recipeApi } from '@/entities/recipe/model/recipe.api';
import { userApi } from '@/entities/user/model/user.api';
import { addAlert } from '@/features/Alert';
import { dto } from '@/shared/lib/helpers/dto/dto';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type { ApiResponse } from '@/shared/lib/types/api.types';
import { setIsAuthenticated } from './auth.slice';
import type {
	AuthResponse,
	AuthResponseDTO,
	LoginFormData,
	SignUpFormData,
	SignUpFormDataDTO,
} from './auth.types';

type ApiError = FetchBaseQueryError & {
	data: { code: string };
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery,
	tagTypes: ['Auth', 'User'],
	endpoints: (builder) => ({
		signUp: builder.mutation<ApiResponse<AuthResponse>, SignUpFormData>({
			query: (data) => ({
				url: '/register',
				method: 'POST',
				body: dto<SignUpFormData, SignUpFormDataDTO>('toServer', data),
			}),
			transformResponse: (response: ApiResponse<AuthResponseDTO>) => {
				return dto<ApiResponse<AuthResponseDTO>, ApiResponse<AuthResponse>>(
					'toClient',
					response,
				);
			},
			invalidatesTags: ['Auth'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const result = await queryFulfilled;
					if (result.data.data.token) {
						if (typeof window !== 'undefined') {
							localStorage.setItem('auth_token', result.data.data.token);
						}
					}
					dispatch(setIsAuthenticated(true));
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'success',
							title: 'Success',
							description: result.data.code || 'Unknown error',
						}),
					);
				} catch (error) {
					const apiError = error as ApiError;
					const code = apiError.data?.code;
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'danger',
							title: 'Error',
							description: code || 'Unknown error',
						}),
					);
				}
			},
		}),
		login: builder.mutation<ApiResponse<AuthResponse>, LoginFormData>({
			query: (data) => ({
				url: '/login',
				method: 'POST',
				body: data,
			}),
			transformResponse: (response: ApiResponse<AuthResponseDTO>) => {
				return dto<ApiResponse<AuthResponseDTO>, ApiResponse<AuthResponse>>(
					'toClient',
					response,
				);
			},
			invalidatesTags: ['Auth', 'User'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const result = await queryFulfilled;
					if (result.data.data.token) {
						if (typeof window !== 'undefined') {
							localStorage.setItem('auth_token', result.data.data.token);
						}
					}
					dispatch(setIsAuthenticated(true));
					dispatch(userApi.util.invalidateTags(['User']));
					dispatch(ingredientApi.util.invalidateTags(['Ingredients']));
					dispatch(recipeApi.util.invalidateTags(['Recipe']));
					try {
						await dispatch(
							userApi.endpoints.getUser.initiate(undefined, {
								subscribe: false,
								forceRefetch: true,
							}),
						).unwrap();
					} catch {
						// Игнорируем ошибки, так как инвалидация тегов уже вызовет перезапрос для активных подписок
					}
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'success',
							title: 'Success',
							description: result.data.code || 'Unknown error',
						}),
					);
				} catch (error) {
					const apiError = error as ApiError;
					const code = apiError.data?.code;
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'danger',
							title: 'Error',
							description: code || 'Unknown error',
						}),
					);
				}
			},
		}),
		logout: builder.mutation<ApiResponse<void>, void>({
			query: () => ({
				url: '/logout',
				method: 'POST',
			}),
			transformResponse: (response: ApiResponse<void>) => {
				return dto<ApiResponse<void>, ApiResponse<void>>('toClient', response);
			},
			invalidatesTags: ['Auth'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const result = await queryFulfilled;
					if (typeof window !== 'undefined') {
						localStorage.removeItem('auth_token');
					}
					dispatch(setIsAuthenticated(false));
					dispatch(userApi.util.invalidateTags(['User']));
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'success',
							title: 'Success',
							description: result.data.code || 'Unknown error',
						}),
					);
				} catch (error) {
					const apiError = error as ApiError;
					const code = apiError.data?.code;
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'danger',
							title: 'Error',
							description: code || 'Unknown error',
						}),
					);
				}
			},
		}),
	}),
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation } =
	authApi;
