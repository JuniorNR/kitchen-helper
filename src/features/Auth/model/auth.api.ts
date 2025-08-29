import { createApi } from '@reduxjs/toolkit/query/react';
import { userApi } from '@/entities/user/model/user.api';
import { dto } from '@/shared/lib/helpers/dto/dto';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type { ApiResponse } from '@/shared/lib/types/api.types';
import type {
	AuthResponse,
	AuthResponseDTO,
	LoginFormData,
	SignUpFormData,
	SignUpFormDataDTO,
} from './auth.types';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery,
	tagTypes: ['Auth'],
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
			invalidatesTags: ['Auth'],
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
		}),
	}),
});

export const { useSignUpMutation, useLoginMutation, useLogoutMutation } =
	authApi;
