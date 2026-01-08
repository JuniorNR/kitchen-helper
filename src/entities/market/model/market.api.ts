import { createApi } from '@reduxjs/toolkit/query/react';
import { addAlert } from '@/features';
import type { MarketCreateSchemaType } from '@/features/MarketCreate/model/marketCreate.schema';
import { buildMarketCreateFormData } from '@/features/MarketCreate/model/marketCreate.utils';
import { dto } from '@/shared/lib/helpers';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type {
	ApiError,
	ApiErrorDTO,
	ApiResponse,
	ApiResponsePagination,
	ApiResponsePaginationDTO,
} from '@/shared/lib/types';
import type { Market, MarketDTO, UseMarket } from './market.types';

export const marketApi = createApi({
	reducerPath: 'marketApi',
	baseQuery: baseQuery,
	tagTypes: ['Market'],
	endpoints: (builder) => ({
		getMarkets: builder.query<ApiResponse<Market[]>, UseMarket>({
			providesTags: ['Market'],
			query: ({ page }) => {
				const params: Record<string, unknown> = {
					page,
				};
				return {
					url: '/markets',
					params,
				};
			},
			transformResponse: (
				response: ApiResponse<MarketDTO[], ApiResponsePaginationDTO>,
			) => {
				return {
					data: dto<MarketDTO[], Market[]>('toClient', response.data),
					pagination: dto<ApiResponsePaginationDTO, ApiResponsePagination>(
						'toClient',
						response.pagination,
					),
					code: response.code,
				};
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					const apiError = dto<ApiErrorDTO, ApiError>(
						'toClient',
						(error as unknown as { error: ApiErrorDTO }).error as ApiError,
					);
					if (apiError.status === 401 || apiError.status === 403) {
						return;
					}
					const code = apiError.data?.code;
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
		getMarketById: builder.query<ApiResponse<Market>, number>({
			providesTags: (result, error, id) => [{ type: 'Market', id }],
			query: (id) => ({
				url: `/markets/${id}`,
			}),
			transformResponse: (response: ApiResponse<MarketDTO>) => {
				return {
					data: dto<MarketDTO, Market>('toClient', response.data),
					code: response.code,
					pagination: response.pagination,
				};
			},
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					await queryFulfilled;
				} catch (error) {
					const apiError = dto<ApiErrorDTO, ApiError>(
						'toClient',
						(error as unknown as { error: ApiErrorDTO }).error as ApiError,
					);
					if (apiError.status === 401 || apiError.status === 403) {
						return;
					}
					const code = apiError.data?.code;
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
		createMarket: builder.mutation<ApiResponse<Market>, MarketCreateSchemaType>(
			{
				invalidatesTags: ['Market'],
				query: (market) => {
					return {
						url: '/markets/create',
						method: 'POST',
						body: buildMarketCreateFormData(market),
					};
				},
				onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
					try {
						const result = await queryFulfilled;
						if (result.data.data) {
							dispatch(
								addAlert({
									id: crypto.randomUUID(),
									status: 'success',
									title: 'Success',
									description: result.data.code || 'SUCCESS',
								}),
							);
						} else {
							dispatch(
								addAlert({
									id: crypto.randomUUID(),
									status: 'danger',
									title: 'Error',
									description: result.data.code || 'UNKNOWN_ERROR',
								}),
							);
						}
					} catch (error) {
						const apiError = dto<ApiErrorDTO, ApiError>(
							'toClient',
							(error as unknown as { error: ApiErrorDTO }).error as ApiError,
						);
						const code = apiError.data?.code;
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
			},
		),
		deleteMyMarket: builder.mutation<{ code: string }, string>({
			invalidatesTags: ['Market'],
			query: (id) => ({
				url: `/markets/delete/${id}`,
				method: 'DELETE',
			}),
			onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
				try {
					const result = await queryFulfilled;
					if (result.data.code === 'MARKET_DELETED') {
						dispatch(
							addAlert({
								id: crypto.randomUUID(),
								status: 'success',
								title: 'Success',
								description: result.data.code || 'SUCCESS',
							}),
						);
					} else {
						dispatch(
							addAlert({
								id: crypto.randomUUID(),
								status: 'danger',
								title: 'Error',
								description: result.data.code || 'UNKNOWN_ERROR',
							}),
						);
					}
				} catch (error) {
					const apiError = dto<ApiErrorDTO, ApiError>(
						'toClient',
						(error as unknown as { error: ApiErrorDTO }).error as ApiError,
					);
					const code = apiError.data?.code;
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
	}),
});

export const {
	useGetMarketsQuery,
	useGetMarketByIdQuery,
	useCreateMarketMutation,
	useDeleteMyMarketMutation,
} = marketApi;
