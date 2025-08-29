import { createApi } from '@reduxjs/toolkit/query/react';
import { setIsAuthenticated } from '@/features/Auth/model/auth.slice';
import { dto } from '@/shared/lib/helpers/dto/dto';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type { ApiResponse } from '@/shared/lib/types/api.types';
import type { User, UserDTO } from './user.types';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery,
	tagTypes: ['User'],
	endpoints: (builder) => ({
		getUser: builder.query<User, void>({
			query: () => '/user',
			transformResponse: (response: ApiResponse<UserDTO>) => {
				return dto<UserDTO, User>('toClient', response.data);
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
		}),
	}),
});

export const { useGetUserQuery, useUpdateUserMutation } = userApi;
