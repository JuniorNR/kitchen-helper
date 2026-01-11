'use client';

import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { featureItems } from '../model';

export const HomeFeatures = () => {
	const { t: tHome } = useTranslation('home');

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4, duration: 0.25 }}
			className="mt-16 sm:mt-20 lg:mt-24 w-full"
		>
			<div className="text-center mb-4">
				<Typography
					component="h2"
					className="text-3xl sm:text-4xl font-bold mb-2"
				>
					{tHome('features.title')}
				</Typography>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{featureItems.map((feature, index) => (
					<motion.div
						key={tHome(feature.titleKey)}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.45 + index * 0.05, duration: 0.2 }}
					>
						<Card
							className="h-full bg-content1 border border-default-200"
							radius="lg"
						>
							<CardBody className="p-6">
								<Typography component="h3" className="font-bold mb-3 text-lg">
									{tHome(feature.titleKey)}
								</Typography>
								<Typography
									component="p"
									className="text-default-600 dark:text-default-400 mb-4 leading-relaxed"
								>
									{tHome(feature.descriptionKey)}
								</Typography>
								<ul className="space-y-2">
									{(
										tHome(feature.detailsKeys, {
											returnObjects: true,
										}) as string[]
									).map((detail) => (
										<li
											key={detail}
											className="flex items-center gap-2 text-sm text-default-500 dark:text-default-500"
										>
											<div className="h-2 w-2 flex-shrink-0 rounded-full bg-primary shadow-[0_0_8px_rgba(0,0,0,0.4),0_0_16px_rgba(0,0,0,0.3)] dark:shadow-[0_0_12px_rgba(255,255,255,0.3),0_0_24px_rgba(255,255,255,0.2)]" />
											<span>{detail}</span>
										</li>
									))}
								</ul>
							</CardBody>
						</Card>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
