'use client';

import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { statisticsItems } from '../model';

export const HomeStatistics = () => {
	const { t: tHome } = useTranslation('home');

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.5, duration: 0.25 }}
			className="mt-16 sm:mt-20 lg:mt-24 w-full"
		>
			<div className="text-center mb-4 sm:mb-6">
				<Typography
					component="h2"
					classNameComponent="text-3xl sm:text-4xl font-bold mb-2 text-center"
				>
					{tHome('statistics.title')}
				</Typography>
			</div>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
				{statisticsItems.map((stat, index) => (
					<motion.div
						key={tHome(stat.labelKey)}
						initial={{ opacity: 0, scale: 0.9 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.55 + index * 0.05, duration: 0.2 }}
					>
						<Card
							className={`h-full ${stat.color} border-2 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-lg`}
							radius="lg"
						>
							<CardBody className="p-4 sm:p-6 text-center">
								<div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
								<div
									className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}
								>
									{stat.value}
								</div>
								<Typography
									component="p"
									classNameComponent="text-sm sm:text-base text-default-600 dark:text-default-400 text-center"
								>
									{tHome(stat.labelKey)}
								</Typography>
							</CardBody>
						</Card>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
