import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { EmptyListIcon } from '@/shared/ui/icons/emptyListIcon';
import type { MarketProductsTabProps } from '../model/market.types';
import { MarketRecipeCard } from './MarketRecipeCard';

export const MarketRecipesTab: FC<MarketProductsTabProps> = ({
	products,
	marketSellerId,
}) => {
	const { t: tMarkets } = useTranslation('markets');
	const { t: tRecipes } = useTranslation('recipes');

	// Фильтруем рецепты по продавцу (если есть userId в рецепте)
	const sellerRecipes = products?.filter(
		(product) => product.userId === marketSellerId,
	);

	if (!sellerRecipes || sellerRecipes.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-16">
				<div className="relative mb-4">
					<div className="absolute inset-0 rounded-full bg-primary-400/20 blur-xl animate-pulse" />
					<div className="relative flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary-400/30 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-800/30">
						<EmptyListIcon className="h-10 w-10 text-primary-500 dark:text-primary-400" />
					</div>
				</div>
				<Typography
					component="h3"
					classNameComponent="text-xl font-semibold mb-2 text-foreground"
				>
					{tRecipes('card.recipes_empty')}
				</Typography>
				<Typography
					component="p"
					classNameComponent="text-sm text-foreground-500 dark:text-foreground-400 text-center max-w-md"
				>
					{tRecipes('card.market_recipes_empty')}
				</Typography>
			</div>
		);
	}

	return (
		<div className="space-y-6">
			<Typography
				component="h2"
				classNameComponent="text-2xl font-bold mb-6 text-foreground"
			>
				{tMarkets('card.products')}
			</Typography>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{sellerRecipes.map((product) => (
					<MarketRecipeCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
};
