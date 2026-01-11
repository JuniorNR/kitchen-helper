'use client';

import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export const HomeCTA = () => {
	const { t: tHome } = useTranslation('home');

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 1.2, duration: 0.25 }}
			className="mt-16 sm:mt-20 lg:mt-24 w-full"
		>
			<Card
				className="bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 border-2 border-primary/20"
				radius="lg"
				shadow="lg"
			>
				<CardBody className="p-0">
					<div className="flex flex-col sm:flex-row h-full w-full bg-gradient-to-r from-red-500 via-red-400 to-purple-500 rounded-lg overflow-hidden gap-0">
						<Button
							as={Link}
							href="/market"
							variant="solid"
							size="lg"
							className="font-semibold shadow-lg flex-1 h-full min-h-[80px] sm:min-h-[100px] rounded-l-lg rounded-r-none border-0 bg-transparent text-white hover:bg-black/30 transition-colors duration-200"
						>
							{tHome('cta.market_button')}
						</Button>
						<Button
							as={Link}
							href="/recipes"
							variant="solid"
							size="lg"
							className="font-semibold flex-1 h-full min-h-[80px] sm:min-h-[100px] rounded-r-lg rounded-l-none border-0 bg-transparent text-white hover:bg-black/30 transition-colors duration-200 -ml-px sm:-ml-px"
						>
							{tHome('cta.recipes_button')}
						</Button>
					</div>
				</CardBody>
			</Card>
		</motion.div>
	);
};
