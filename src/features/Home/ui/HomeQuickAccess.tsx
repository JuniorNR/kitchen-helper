'use client';

import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { containerVariants, itemVariants, quickAccessItems } from '../model';

export const HomeQuickAccess = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tHome } = useTranslation('home');

	return (
		<motion.div
			variants={containerVariants}
			initial="hidden"
			animate="visible"
			className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8"
		>
			{quickAccessItems.map((item) => (
				<motion.div
					key={item.href}
					variants={itemVariants}
					transition={{ duration: 0.2, ease: 'easeOut' }}
				>
					<Card
						as={Link}
						href={item.href}
						isPressable
						className={`h-full border-2 ${item.borderColor} bg-gradient-to-br ${item.gradient} backdrop-blur-sm transition-all duration-300 ${item.hoverShadow} hover:scale-[1.02] hover:border-opacity-80`}
						radius="lg"
						shadow="lg"
					>
						<CardBody className="p-6 sm:p-8 flex flex-col h-full">
							<div className="flex flex-col gap-4 flex-grow">
								<Typography
									component="h2"
									className="text-2xl sm:text-3xl font-bold text-foreground"
								>
									{tCommon(item.titleKey)}
								</Typography>

								<Typography
									component="p"
									className="text-default-600 dark:text-default-400 text-base sm:text-lg leading-relaxed"
								>
									{tCommon(item.descriptionKey)}
								</Typography>

								<Typography
									component="p"
									className="text-sm sm:text-base text-default-500 dark:text-default-500 leading-relaxed mt-2"
								>
									{tHome(item.additionalInfoKey)}
								</Typography>
							</div>

							<div className="flex justify-start pt-4 mt-auto">
								<Button
									variant="solid"
									size="lg"
									className={`font-semibold ${item.buttonColor}`}
								>
									{tHome(item.buttonKey)} →
								</Button>
							</div>
						</CardBody>
					</Card>
				</motion.div>
			))}
		</motion.div>
	);
};
