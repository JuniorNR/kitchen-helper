'use client';
import { Button } from '@heroui/button';
import { AnimatePresence, motion } from 'motion/react';
import { type FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import type { MarketCreateProps } from '../model/MarketCreate.types';
import { MarketCreateForm } from './MarketCreateForm';

export const MarketCreate: FC<MarketCreateProps> = ({ setIsCreated }) => {
	const { t: tMarkets } = useTranslation('markets');
	const [canCreate, setCanCreate] = useState<boolean>(false);
	return (
		<motion.div layout>
			<AnimatePresence mode="wait">
				{canCreate ? (
					<motion.div
						key="can-create"
						layout
						initial={{ opacity: 0, scale: 0.86 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.18, ease: 'easeOut' }}
						className="flex items-center justify-center min-h-[200px]"
					>
						<MarketCreateForm setIsCreated={setIsCreated} />
					</motion.div>
				) : (
					<motion.div
						key="empty"
						layout
						initial={{ opacity: 0, scale: 1 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.88 }}
						transition={{ duration: 0.18, ease: 'easeInOut' }}
						className="flex items-center justify-center min-h-[400px]"
					>
						<div className="flex flex-col items-center min-w-[400px] gap-6 rounded-2xl border border-default-200 bg-content2/60 px-8 py-10 text-center shadow-sm">
							<Typography
								component="h2"
								classNameComponent="text-2xl font-semibold text-foreground"
							>
								{tMarkets('create.not_have_store')}
							</Typography>
							<Typography
								component="p"
								classNameComponent="text-base text-default-500"
							>
								{tMarkets('create.create_market_description')}
							</Typography>
							<Button
								fullWidth
								onPress={() => setCanCreate(true)}
								className="uppercase font-semibold tracking-wide"
								variant="solid"
								color="primary"
							>
								{tMarkets('create.create_market')}
							</Button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	);
};
