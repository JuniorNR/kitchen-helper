import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { createApi } from '@reduxjs/toolkit/query/react';
import { addAlert } from '@/features/Alert';
import { setIsAuthenticated } from '@/features/Auth/model/auth.slice';
import { dto } from '@/shared/lib/helpers/dto/dto';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type { ApiResponse } from '@/shared/lib/types/api.types';
import type { User, UserDTO } from './user.types';

type ApiError = FetchBaseQueryError & {
	data: { code: string };
};

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/user',
			transformResponse: (response: ApiResponse<{ user: UserDTO }>) => {
				return dto<UserDTO, User>('toClient', response.data.user);
			},
			providesTags: ['User'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
					dispatch(setIsAuthenticated(true));
				} catch {
					dispatch(setIsAuthenticated(false));
				}
			},
		}),
		updateUser: builder.mutation<ApiResponse<User>, Partial<User>>({
			query: (data) => ({
				url: '/user',
				method: 'PATCH',
				body: dto<Partial<User>, UserDTO>('toServer', data),
			}),
			transformResponse: (response: ApiResponse<UserDTO>) => {
				return dto<ApiResponse<UserDTO>, ApiResponse<User>>(
					'toClient',
					response,
				);
			},
			invalidatesTags: ['User'],
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const result = await queryFulfilled;
					if (result.data.data) {
						dispatch(
							addAlert({
								id: crypto.randomUUID(),
								status: 'success',
								title: 'success',
								description: result.data.code || 'Unknown error',
							}),
						);
					} else {
						dispatch(
							addAlert({
								id: crypto.randomUUID(),
								status: 'danger',
								title: 'error',
								description: result.data.code || 'Unknown error',
							}),
						);
					}
				} catch (error) {
					const apiError = error as ApiError;
					const code = apiError.data?.code;
					dispatch(
						addAlert({
							id: crypto.randomUUID(),
							status: 'danger',
							title: 'error',
							description: code || 'Unknown error',
						}),
					);
				}
			},
		}),
	}),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
