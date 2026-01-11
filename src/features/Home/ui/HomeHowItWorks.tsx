'use client';

import { Card, CardBody } from '@heroui/card';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { howItWorksPaths } from '../model';

export const HomeHowItWorks = () => {
	const { t: tHome } = useTranslation('home');

	return (
		<motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.6, duration: 0.25 }}
			className="mt-16 sm:mt-20 lg:mt-24 w-full"
		>
			<div className="mb-6">
				<Typography
					component="h2"
					className="text-3xl sm:text-4xl font-bold mb-3"
				>
					{tHome('how_it_works.title')}
				</Typography>
				<Typography
					component="p"
					className="text-default-600 dark:text-default-400 text-lg max-w-3xl"
				>
					{tHome('how_it_works.subtitle')}
				</Typography>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
				{howItWorksPaths.map((path, pathIndex) => (
					<motion.div
						key={tHome(path.titleKey)}
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.65 + pathIndex * 0.1, duration: 0.3 }}
						className="flex flex-col"
					>
						<Card
							className={`h-full bg-gradient-to-br ${path.gradient}/10 border-2 border-default-200/50 hover:border-default-300 dark:hover:border-default-600 transition-all duration-300 hover:shadow-xl`}
							radius="lg"
							shadow="lg"
						>
							<CardBody className="p-6 sm:p-8">
								{/* Path Header */}
								<div className="mb-8 pb-6 border-b border-default-300/50 dark:border-default-700">
									<div className="flex items-start gap-4">
										<div
											className={`flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br ${path.gradient} flex items-center justify-center text-white text-3xl shadow-lg`}
										>
											{path.icon}
										</div>
										<div className="flex-1 min-w-0">
											<Typography
												component="h3"
												className="text-xl sm:text-2xl font-bold mb-2 text-white"
											>
												{tHome(path.titleKey)}
											</Typography>
											<Typography
												component="p"
												className="text-white/90 text-sm leading-relaxed"
											>
												{tHome(path.descriptionKey)}
											</Typography>
										</div>
									</div>
								</div>

								{/* Path Steps */}
								<div className="relative">
									{path.steps.map((step, stepIndex) => (
										<motion.div
											key={step.step}
											initial={{ opacity: 0, x: -10 }}
											animate={{ opacity: 1, x: 0 }}
											transition={{
												delay: 0.75 + pathIndex * 0.1 + stepIndex * 0.06,
												duration: 0.25,
											}}
											className="relative"
										>
											<div className="flex gap-4 group">
												{/* Step Number with Connector */}
												<div className="flex flex-col items-center relative">
													<div
														className={`relative flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300 text-lg z-10`}
													>
														{step.step}
													</div>
													{stepIndex < path.steps.length - 1 && (
														<div
															className="absolute left-6 top-12 w-0.5 bg-gradient-to-b from-default-300 to-default-400 dark:from-default-600 dark:to-default-500"
															style={{ height: 'calc(100% + 1.5rem)' }}
														/>
													)}
												</div>

												{/* Step Content */}
												<div className="flex-1 pt-1 pb-6">
													<Typography
														component="h4"
														className="font-bold text-base sm:text-lg mb-2 text-white"
													>
														{tHome(step.titleKey)}
													</Typography>
													<Typography
														component="p"
														className="text-white/90 leading-relaxed text-sm sm:text-base"
													>
														{tHome(step.descriptionKey)}
													</Typography>
												</div>
											</div>
										</motion.div>
									))}
								</div>
							</CardBody>
						</Card>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};
