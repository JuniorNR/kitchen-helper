'use client';

import { HomeCTA } from './HomeCTA';
import { HomeFeatures } from './HomeFeatures';
import { HomeHero } from './HomeHero';
import { HomeHowItWorks } from './HomeHowItWorks';
import { HomeQuickAccess } from './HomeQuickAccess';
import { HomeStatistics } from './HomeStatistics';
import { HomeUseCases } from './HomeUseCases';

export const Home = () => {
	return (
		<div className="flex flex-col items-center w-full max-w-7xl mx-auto px-4 py-8 sm:py-12 lg:py-16">
			<HomeHero />
			<HomeQuickAccess />
			<HomeFeatures />
			<HomeStatistics />
			<HomeHowItWorks />
			<HomeUseCases />
			<HomeCTA />
		</div>
	);
};
