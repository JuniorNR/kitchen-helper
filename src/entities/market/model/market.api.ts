import { createApi } from '@reduxjs/toolkit/query/react';
import { dto } from '@/shared/lib/helpers';
import { baseQuery } from '@/shared/lib/store/baseQuery';
import type {
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
		}),
	}),
});

export const { useGetMarketsQuery } = marketApi;
