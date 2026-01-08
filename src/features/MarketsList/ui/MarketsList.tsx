'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMarket } from '@/entities';
import { Alert, PaginationBar } from '@/shared/ui';
import { MarketCard } from './MarketCard';
import { MarketCardSkeleton } from './MarketCardSkeleton';

const SKELETON_KEYS: string[] = Array.from(
	{ length: 6 },
	(_, i) => `market-skeleton-${i}`,
);

export const MarketsList = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tAlerts } = useTranslation('alerts');

	const [page, setPage] = useState<number>(1);

	const { markets, pagination, isLoading, error } = useMarket({ page });

	const renderSkeleton = () => {
		return (
			<motion.div
				key="loading"
				initial={{ opacity: 0, filter: 'blur(6px)' }}
				animate={{ opacity: 1, filter: 'blur(0px)' }}
				exit={{ opacity: 0, filter: 'blur(6px)' }}
				transition={{ duration: 0.25 }}
				className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
			>
				{SKELETON_KEYS.map((key) => (
					<MarketCardSkeleton key={key} />
				))}
			</motion.div>
		);
	};

	const renderMarkets = () => {
		return (
			<motion.div
				key="list"
				initial={{ opacity: 0, filter: 'blur(6px)' }}
				animate={{ opacity: 1, filter: 'blur(0px)' }}
				exit={{ opacity: 0, filter: 'blur(6px)' }}
				transition={{ duration: 0.25 }}
				className="flex flex-col gap-6"
			>
				<motion.div
					className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
					initial="hidden"
					animate="visible"
					variants={{
						hidden: { opacity: 1 },
						visible: {
							opacity: 1,
							transition: { staggerChildren: 0.06, delayChildren: 0.05 },
						},
					}}
				>
					{markets?.map((market) => (
						<motion.div
							key={market.id}
							layout
							variants={{
								hidden: { opacity: 0, y: 10, scale: 0.98 },
								visible: {
									opacity: 1,
									y: 0,
									scale: 1,
									transition: { duration: 0.25, ease: 'easeOut' },
								},
							}}
						>
							<MarketCard market={market} />
						</motion.div>
					))}
				</motion.div>
				<PaginationBar
					page={page}
					currentPage={pagination?.currentPage || 0}
					onPageChange={setPage}
					totalItems={pagination?.total || 0}
				/>
			</motion.div>
		);
	};

	const renderEmptyState = () => {
		return (
			<motion.div
				key="empty"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.2 }}
				className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-600 dark:text-neutral-400"
			>
				{tCommon('market.empty_state')}
			</motion.div>
		);
	};

	const renderError = () => {
		return (
			<Alert
				status="danger"
				title={tAlerts('codes.ACCESS_DENIED')}
				description={tCommon('common.section_only_for', {
					roles: error?.data.requiredRoles?.map((role) =>
						tCommon(`roles.${role}`).toLowerCase(),
					),
				})}
			/>
		);
	};

	return (
		<section className="space-y-6 py-3 px-1 w-full">
			<AnimatePresence mode="wait">
				{error
					? renderError()
					: isLoading
						? renderSkeleton()
						: markets && markets.length > 0
							? renderMarkets()
							: renderEmptyState()}
			</AnimatePresence>
		</section>
	);
};
