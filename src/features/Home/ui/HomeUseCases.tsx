'use client';

import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { useCaseItems } from '../model';

export const HomeUseCases = () => {
	const { t: tHome } = useTranslation('home');

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.8, duration: 0.25 }}
			className="mt-16 sm:mt-20 lg:mt-24 w-full"
		>
			<div className="mb-6">
				<Typography
					component="h2"
					className="text-3xl sm:text-4xl font-bold mb-2"
				>
					{tHome('use_cases.title')}
				</Typography>
				<Typography
					component="p"
					className="text-default-600 dark:text-default-400 text-lg"
				>
					{tHome('use_cases.subtitle')}
				</Typography>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{useCaseItems.map((item, index) => (
					<motion.div
						key={tHome(item.titleKey)}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.85 + index * 0.025, duration: 0.2 }}
					>
						<Card
							className={`h-full bg-gradient-to-br ${item.gradient} border border-default-200`}
							radius="lg"
						>
							<CardBody className="p-6">
								<div className="text-4xl mb-3">{item.icon}</div>
								<Typography component="h3" className="font-bold text-lg mb-2">
									{tHome(item.titleKey)}
								</Typography>
								<Typography
									component="p"
									className="text-default-600 dark:text-default-400 leading-relaxed text-sm"
								>
									{tHome(item.descriptionKey)}
								</Typography>
							</CardBody>
						</Card>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
