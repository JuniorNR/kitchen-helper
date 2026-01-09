import type { Dispatch, Key, SetStateAction } from 'react';
import type { Market } from '@/entities';
import type { Recipe } from '@/entities/recipe/model/recipe.type';

export interface MarketProps {
	marketId: number;
}

export interface MarketHeaderProps {
	market: Market;
}

export interface MarketAboutTabProps {
	market: Market;
	setSelectedKey: Dispatch<SetStateAction<Key>>;
}

export interface MarketProductsTabProps {
	products: Recipe[];
	marketSellerId: number;
}

export interface MarketProductsCardProps {
	product: Recipe;
}
