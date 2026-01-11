'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { Logotype } from '@/shared/ui/icons/logotype';
import { heroVariants } from '../model';

export const HomeHero = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tHome } = useTranslation('home');

	return (
		<motion.div
			variants={heroVariants}
			initial="hidden"
			animate="visible"
			transition={{ duration: 0.3, ease: 'easeOut' }}
			className="flex flex-col items-center text-center mb-12 sm:mb-16 lg:mb-20"
		>
			<motion.div
				className="mb-6"
				initial={{ scale: 0.8, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ delay: 0.15, duration: 0.25, ease: 'easeOut' }}
			>
				<Logotype className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28" />
			</motion.div>

			<Typography
				component="h1"
				className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent"
			>
				{tCommon('app_name')}
			</Typography>

			<Typography
				component="p"
				className="text-lg sm:text-xl lg:text-2xl text-default-600 dark:text-default-400 max-w-3xl mx-auto leading-relaxed mb-4"
			>
				{tCommon('app_name_description')}
			</Typography>
			<Typography
				component="p"
				className="text-base sm:text-lg text-default-500 dark:text-default-500 max-w-2xl mx-auto leading-relaxed"
			>
				{tHome('hero.subtitle')}
			</Typography>
		</motion.div>
	);
};
