import type { Recipe, RecipeDTO } from '@/entities/recipe/model/recipe.type';

export interface UseMarket {
	page?: number;
	skip?: boolean;
}

export interface Market {
	id: number;
	title: string;
	averagePrice: string;
	rating: string;
	countOfRecipes: number;
	description: string;
	story: string;
	createdAt: string;
	updatedAt: string;
	images: Image[] | null;
	seller: Seller;
	sellerId: number;
	products: Recipe[];
	themesOfMarket: ThemesOfMarket[];
	buyMostOften: BuyMostOften[];
	factsAboutSeller: FactsAboutSeller[];
}

export interface Seller {
	id: number;
	name: string;
}

interface Image {
	isMain: boolean;
	path: string;
	position: number;
}

export interface BuyMostOften {
	id: number;
	marketId: number;
	value: string;
	createdAt: string;
	updatedAt: string;
}

export interface FactsAboutSeller {
	id: number;
	marketId: number;
	value: string;
	createdAt: string;
	updatedAt: string;
}

export interface ThemesOfMarket {
	id: number;
	marketId: number;
	value: string;
	createdAt: string;
	updatedAt: string;
}

export interface MarketDTO {
	id: number;
	title: string;
	images: ImageDTO[] | null;
	average_price: string;
	rating: string;
	count_of_recipes: number;
	description: string;
	story: string;
	created_at: string;
	updated_at: string;
	seller: SellerDTO;
	products: RecipeDTO[];
	themes_of_market: ThemesOfMarketDTO[];
	buy_most_often: BuyMostOftenDTO[];
	facts_about_seller: FactsAboutSellerDTO[];
}

interface ImageDTO {
	is_main: boolean;
	path: string;
	position: number;
}

interface SellerDTO {
	id: number;
	name: string;
}

interface BuyMostOftenDTO {
	id: number;
	market_id: number;
	value: string;
	created_at: string;
	updated_at: string;
}

interface FactsAboutSellerDTO {
	id: number;
	market_id: number;
	value: string;
	created_at: string;
	updated_at: string;
}

interface ThemesOfMarketDTO {
	id: number;
	market_id: number;
	value: string;
	created_at: string;
	updated_at: string;
}
