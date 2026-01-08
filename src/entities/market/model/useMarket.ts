import type { MarketCreateSchemaType } from '@/features/MarketCreate/model/marketCreate.schema';
import { dto } from '@/shared/lib/helpers';
import type { ApiError, ApiErrorDTO } from '@/shared/lib/types';
import {
	useCreateMarketMutation,
	useDeleteMyMarketMutation,
	useGetMarketByIdQuery,
	useGetMarketsQuery,
} from './market.api';
import type { UseMarket } from './market.types';

export const useMarket = ({ page }: UseMarket) => {
	const { data, isLoading, error } = useGetMarketsQuery({ page });
	const [createMarket, { isLoading: isCreating }] = useCreateMarketMutation();
	const [deleteMyMarket, { isLoading: isDeleting }] =
		useDeleteMyMarketMutation();

	const createMarketData = async (dataToSend: MarketCreateSchemaType) => {
		try {
			const data = await createMarket(dataToSend).unwrap();
			if (data) {
				return data;
			}
		} catch (error) {
			console.debug(error);
		}
	};

	const deleteMyMarketData = async (id: string) => {
		try {
			const data = await deleteMyMarket(id).unwrap();
			if (data) {
				return data;
			}
		} catch (error) {
			console.debug(error);
		}
	};

	return {
		markets: data?.data,
		pagination: data?.pagination,
		isLoading,
		isCreating,
		isDeleting,
		error: dto<ApiErrorDTO, ApiError>('toClient', error as ApiErrorDTO) as
			| ApiError
			| undefined,
		createMarketData,
		deleteMyMarketData,
	};
};

export const useMarketById = (id: number | undefined) => {
	const { data, isLoading, error } = useGetMarketByIdQuery(id || 0, {
		skip: !id,
	});

	return {
		market: data?.data,
		isLoading,
		error: dto<ApiErrorDTO, ApiError>('toClient', error as ApiErrorDTO) as
			| ApiError
			| undefined,
	};
};
