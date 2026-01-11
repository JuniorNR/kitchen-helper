import type {
	FeatureItem,
	HowItWorksPath,
	QuickAccessItem,
	StatisticItem,
	UseCaseItem,
} from './home.types';

// Animation variants
export const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.05,
			delayChildren: 0.1,
		},
	},
};

export const itemVariants = {
	hidden: { opacity: 0, y: 20, scale: 0.95 },
	visible: {
		opacity: 1,
		y: 0,
		scale: 1,
	},
};

export const heroVariants = {
	hidden: { opacity: 0, y: -20 },
	visible: {
		opacity: 1,
		y: 0,
	},
};

// Quick Access Items configuration
export const quickAccessItems: QuickAccessItem[] = [
	{
		href: '/recipes',
		titleKey: 'recipes.title',
		descriptionKey: 'recipes.description',
		buttonKey: 'quick_access.recipes.button',
		additionalInfoKey: 'quick_access.recipes.additional_info',
		gradient: 'from-blue-500/20 via-purple-500/20 to-pink-500/20',
		borderColor: 'border-blue-300/50 dark:border-blue-500/30',
		hoverShadow: 'hover:shadow-blue-500/20',
		buttonColor:
			'bg-blue-500/40 hover:bg-blue-500/50 text-white dark:bg-blue-500/50 dark:hover:bg-blue-500/60',
	},
	{
		href: '/ingredients',
		titleKey: 'ingredients.title',
		descriptionKey: 'ingredients.description',
		buttonKey: 'quick_access.ingredients.button',
		additionalInfoKey: 'quick_access.ingredients.additional_info',
		gradient: 'from-green-500/20 via-emerald-500/20 to-teal-500/20',
		borderColor: 'border-green-300/50 dark:border-green-500/30',
		hoverShadow: 'hover:shadow-green-500/20',
		buttonColor:
			'bg-green-500/40 hover:bg-green-500/50 text-white dark:bg-green-500/50 dark:hover:bg-green-500/60',
	},
	{
		href: '/market',
		titleKey: 'market.title',
		descriptionKey: 'market.description',
		buttonKey: 'quick_access.market.button',
		additionalInfoKey: 'quick_access.market.additional_info',
		gradient: 'from-orange-500/20 via-amber-500/20 to-yellow-500/20',
		borderColor: 'border-orange-300/50 dark:border-orange-500/30',
		hoverShadow: 'hover:shadow-orange-500/20',
		buttonColor:
			'bg-orange-500/40 hover:bg-orange-500/50 text-white dark:bg-orange-500/50 dark:hover:bg-orange-500/60',
	},
	{
		href: '/settings',
		titleKey: 'page_titles.user_settings',
		descriptionKey: 'app_name_description',
		buttonKey: 'quick_access.settings.button',
		additionalInfoKey: 'quick_access.settings.additional_info',
		gradient: 'from-violet-500/20 via-purple-500/20 to-fuchsia-500/20',
		borderColor: 'border-violet-300/50 dark:border-violet-500/30',
		hoverShadow: 'hover:shadow-violet-500/20',
		buttonColor:
			'bg-violet-500/40 hover:bg-violet-500/50 text-white dark:bg-violet-500/50 dark:hover:bg-violet-500/60',
	},
];

// Feature Highlights configuration
export const featureItems: FeatureItem[] = [
	{
		titleKey: 'features.recipe_organization.title',
		descriptionKey: 'features.recipe_organization.description',
		detailsKeys: 'features.recipe_organization.details',
	},
	{
		titleKey: 'features.ingredient_management.title',
		descriptionKey: 'features.ingredient_management.description',
		detailsKeys: 'features.ingredient_management.details',
	},
	{
		titleKey: 'features.community.title',
		descriptionKey: 'features.community.description',
		detailsKeys: 'features.community.details',
	},
];

// Statistics configuration
export const statisticsItems: StatisticItem[] = [
	{
		labelKey: 'statistics.recipes',
		value: '1,234',
		icon: '📝',
		gradient: 'from-blue-500 to-purple-500',
		color: 'bg-blue-500/10 border-blue-300/50 dark:border-blue-500/30',
	},
	{
		labelKey: 'statistics.users',
		value: '5,678',
		icon: '👥',
		gradient: 'from-purple-500 to-pink-500',
		color: 'bg-purple-500/10 border-purple-300/50 dark:border-purple-500/30',
	},
	{
		labelKey: 'statistics.ingredients',
		value: '890',
		icon: '🥕',
		gradient: 'from-green-500 to-emerald-500',
		color: 'bg-green-500/10 border-green-300/50 dark:border-green-500/30',
	},
	{
		labelKey: 'statistics.markets',
		value: '456',
		icon: '🛒',
		gradient: 'from-orange-500 to-amber-500',
		color: 'bg-orange-500/10 border-orange-300/50 dark:border-orange-500/30',
	},
];

// How It Works configuration
export const howItWorksPaths: HowItWorksPath[] = [
	{
		titleKey: 'how_it_works.selling.title',
		descriptionKey: 'how_it_works.selling.description',
		icon: '💰',
		gradient: 'from-green-500 to-emerald-500',
		steps: [
			{
				step: 1,
				titleKey: 'how_it_works.selling.steps.create_ingredients.title',
				descriptionKey:
					'how_it_works.selling.steps.create_ingredients.description',
				color: 'from-green-500 to-teal-500',
			},
			{
				step: 2,
				titleKey: 'how_it_works.selling.steps.create_recipes.title',
				descriptionKey: 'how_it_works.selling.steps.create_recipes.description',
				color: 'from-teal-500 to-cyan-500',
			},
			{
				step: 3,
				titleKey: 'how_it_works.selling.steps.create_market.title',
				descriptionKey: 'how_it_works.selling.steps.create_market.description',
				color: 'from-blue-500 to-indigo-500',
			},
			{
				step: 4,
				titleKey: 'how_it_works.selling.steps.publish_recipes.title',
				descriptionKey:
					'how_it_works.selling.steps.publish_recipes.description',
				color: 'from-cyan-500 to-blue-500',
			},
		],
	},
	{
		titleKey: 'how_it_works.buying.title',
		descriptionKey: 'how_it_works.buying.description',
		icon: '🛒',
		gradient: 'from-orange-500 to-pink-500',
		steps: [
			{
				step: 1,
				titleKey: 'how_it_works.buying.steps.buy_recipes.title',
				descriptionKey: 'how_it_works.buying.steps.buy_recipes.description',
				color: 'from-orange-500 to-red-500',
			},
			{
				step: 2,
				titleKey: 'how_it_works.buying.steps.cook_recipe.title',
				descriptionKey: 'how_it_works.buying.steps.cook_recipe.description',
				color: 'from-red-500 to-pink-500',
			},
			{
				step: 3,
				titleKey: 'how_it_works.buying.steps.communicate.title',
				descriptionKey: 'how_it_works.buying.steps.communicate.description',
				color: 'from-pink-500 to-purple-500',
			},
			{
				step: 4,
				titleKey: 'how_it_works.buying.steps.create_collections.title',
				descriptionKey:
					'how_it_works.buying.steps.create_collections.description',
				color: 'from-purple-500 to-violet-500',
			},
		],
	},
];

// Use Cases configuration
export const useCaseItems: UseCaseItem[] = [
	{
		titleKey: 'use_cases.beginners.title',
		descriptionKey: 'use_cases.beginners.description',
		icon: '👨‍🍳',
		gradient: 'from-blue-500/10 to-purple-500/10',
	},
	{
		titleKey: 'use_cases.experienced.title',
		descriptionKey: 'use_cases.experienced.description',
		icon: '👩‍🍳',
		gradient: 'from-purple-500/10 to-pink-500/10',
	},
	{
		titleKey: 'use_cases.vegans.title',
		descriptionKey: 'use_cases.vegans.description',
		icon: '🥗',
		gradient: 'from-green-500/10 to-emerald-500/10',
	},
	{
		titleKey: 'use_cases.families.title',
		descriptionKey: 'use_cases.families.description',
		icon: '👨‍👩‍👧‍👦',
		gradient: 'from-orange-500/10 to-amber-500/10',
	},
	{
		titleKey: 'use_cases.business.title',
		descriptionKey: 'use_cases.business.description',
		icon: '🏪',
		gradient: 'from-amber-500/10 to-yellow-500/10',
	},
	{
		titleKey: 'use_cases.students.title',
		descriptionKey: 'use_cases.students.description',
		icon: '🎓',
		gradient: 'from-violet-500/10 to-fuchsia-500/10',
	},
];
