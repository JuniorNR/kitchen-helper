import { useGetMarketsQuery } from './market.api';
import type { UseMarket } from './market.types';

export const useMarket = ({ page }: UseMarket) => {
	const { data, isLoading } = useGetMarketsQuery({ page });

	return {
		markets: data,
		isLoading,
	};
};
