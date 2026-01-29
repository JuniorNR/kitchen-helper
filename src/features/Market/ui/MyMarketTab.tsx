'use client';

import { Button } from '@heroui/button';
import { AnimatePresence, motion } from 'framer-motion';
import type { Dispatch, Key, SetStateAction } from 'react';
import { useId, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/entities';
import type { Market } from '@/entities/market';
import { MarketCreateForm } from '@/features/MarketCreate/ui/MarketCreateForm';
import { Typography } from '@/shared/ui';

import { MyMarketStoreCard } from './MyMarketStoreCard';

export interface MyMarketTabProps {
	isCreated: boolean;
	setIsCreated: Dispatch<SetStateAction<boolean>>;
	setSelectedKey?: (key: Key) => void;
}

const container = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.08, delayChildren: 0.1 },
	},
};

const item = {
	hidden: { opacity: 0, y: 12 },
	visible: { opacity: 1, y: 0 },
};

export function MyMarketTab({
	isCreated,
	setIsCreated,
	setSelectedKey,
}: MyMarketTabProps) {
	const { t: tMarkets } = useTranslation('markets');
	const { user } = useUser();
	const [showForm, setShowForm] = useState(false);

	const hasMarket = (user?.markets?.length ?? 0) > 0;
	const market =
		hasMarket && user?.markets?.[0] ? (user.markets[0] as Market) : null;
	const showSuccess = isCreated && !hasMarket;
	const titleId = useId();

	const handleGoToCatalog = () => {
		setSelectedKey?.('/markets');
	};

	// Успех: магазин создан, но ещё не в user.markets
	if (showSuccess) {
		return (
			<section className="w-full px-1 py-6">
				<motion.div
					initial={{ opacity: 0, scale: 0.96 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.3, ease: 'easeOut' }}
					className="mx-auto max-w-md rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-emerald-50/90 to-teal-50/70 p-8 text-center shadow-lg dark:border-emerald-900/40 dark:from-emerald-950/40 dark:to-teal-950/30"
				>
					<div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-2xl text-emerald-600 dark:bg-emerald-400/20 dark:text-emerald-400">
						✓
					</div>
					<Typography
						component="h2"
						classNameComponent="mb-2 text-xl font-semibold text-foreground"
					>
						{tMarkets('create.success_created')}
					</Typography>
					<Button
						color="success"
						variant="flat"
						className="mt-4 font-semibold"
						onPress={handleGoToCatalog}
					>
						{tMarkets('create.go_to_catalog')}
					</Button>
				</motion.div>
			</section>
		);
	}

	// Форма создания
	if (!hasMarket && showForm) {
		return (
			<section className="w-full px-1 py-6">
				<motion.div
					initial={{ opacity: 0, scale: 0.98 }}
					animate={{ opacity: 1, scale: 1 }}
					transition={{ duration: 0.25, ease: 'easeOut' }}
				>
					<MarketCreateForm setIsCreated={setIsCreated} />
				</motion.div>
			</section>
		);
	}

	// Пустое состояние: нет магазина, форма не открыта
	if (!hasMarket && !showForm) {
		return (
			<section className="w-full px-1 py-6">
				<AnimatePresence mode="wait">
					<motion.div
						key="empty"
						variants={container}
						initial="hidden"
						animate="visible"
						className="mx-auto max-w-5xl"
					>
						<div className="grid min-h-[420px] overflow-hidden rounded-3xl border border-blue-200/50 bg-gradient-to-br from-blue-50/90 via-sky-50/60 to-slate-100/80 shadow-xl shadow-blue-900/5 dark:border-blue-900/40 dark:from-blue-950/40 dark:via-sky-950/30 dark:to-slate-900/50 dark:shadow-blue-950/10 md:grid-cols-[1.1fr_1fr]">
							{/* Левая панель — визуал */}
							<motion.div
								variants={item}
								className="relative flex flex-col justify-end p-8 md:p-10"
							>
								<div
									className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
									style={{
										backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
										backgroundSize: '28px 28px',
									}}
								/>
								<div className="absolute bottom-6 right-6 h-32 w-32 rounded-full bg-blue-400/20 blur-2xl dark:bg-blue-500/15" />
								<div className="absolute top-10 left-10 h-24 w-24 rounded-2xl border-2 border-blue-300/30 bg-blue-100/50 dark:border-blue-600/30 dark:bg-blue-900/30" />
								<div className="absolute top-24 left-24 h-16 w-16 rounded-xl border-2 border-sky-300/30 bg-sky-100/50 dark:border-sky-600/30 dark:bg-sky-900/30" />
							</motion.div>

							{/* Правая панель — контент */}
							<motion.div
								variants={item}
								className="flex flex-col justify-center gap-6 px-8 py-10 md:px-10"
							>
								<Typography
									component="h2"
									classNameComponent="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100 md:text-3xl"
								>
									{tMarkets('create.not_have_store')}
								</Typography>
								<Typography
									component="p"
									classNameComponent="text-base leading-relaxed text-slate-600 dark:text-slate-400"
								>
									{tMarkets('create.create_market_description')}
								</Typography>
								<Button
									size="lg"
									variant="shadow"
									color="primary"
									className="w-fit font-semibold uppercase tracking-wide"
									onPress={() => setShowForm(true)}
								>
									{tMarkets('create.create_market')}
								</Button>
							</motion.div>
						</div>
					</motion.div>
				</AnimatePresence>
			</section>
		);
	}

	return (
		<section className="w-full px-1 py-6">
			<AnimatePresence mode="wait">
				<motion.div
					key="dashboard"
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -8 }}
					transition={{ duration: 0.25 }}
					className="mx-auto max-w-3xl"
				>
					<Typography
						component="h2"
						classNameComponent="mb-6 text-xl font-semibold text-foreground"
					>
						{tMarkets('create.your_store')}
					</Typography>

					{market && <MyMarketStoreCard market={market} titleId={titleId} />}
				</motion.div>
			</AnimatePresence>
		</section>
	);
}
