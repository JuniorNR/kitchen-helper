'use client';

import { useParams } from 'next/navigation';
import { useMarketById } from '@/entities';
import { Market } from '@/features';

export default function MarketDetailPage() {
	const params = useParams();
	useMarketById(Number(params?.id));

	return (
		<div className="flex flex-col items-center justify-center">
			<Market marketId={Number(params?.id)} />
		</div>
	);
}
