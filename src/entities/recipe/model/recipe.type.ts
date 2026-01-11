import type { Ingredient, IngredientDTO } from '@/entities/ingredient';
import type { User, UserDTO } from '@/entities/user';
import type { RecipeListFilter } from '@/features/RecipesList/model/recipeList.types';

export interface UseRecipe {
	page?: number;
	filters?: Partial<RecipeListFilter>;
	skip?: boolean;
}

export interface RecipeImage {
	id: number;
	isMain: boolean;
	path: string;
	position: string;
	recipeId: number;
	createdAt: string;
	updatedAt: string;
}

export interface RecipeStep {
	id: number;
	recipeId: number;
	title: string;
	description: string;
	duration: string;
	order: number;
	createdAt: string;
	ingredients: Ingredient[];
}

export interface Recipe {
	id: number;
	userId: number;
	title: string;
	description: string;
	ration: string;
	type: string;
	calories: number;
	carbohydrates: number;
	fats: number;
	proteins: number;
	priceOfDish: number;
	priceToBuy: number;
	images: RecipeImage[];
	steps: RecipeStep[];
	user: User;
	createdAt: string;
	updatedAt: string;
}

export interface RecipeImageDTO {
	id: number;
	is_main: boolean;
	path: string;
	position: string;
	recipe_id: number;
	created_at: string;
	updated_at: string;
}

export interface RecipeStepDTO {
	id: number;
	recipe_id: number;
	title: string;
	description: string;
	duration: string;
	order: number;
	created_at: string;
	ingredients: IngredientDTO[];
}

export interface RecipeDTO {
	id: number;
	userId: number;
	title: string;
	description: string;
	ration: string;
	price_of_dish: number;
	price_to_buy: number;
	calories: number;
	carbohydrates: string;
	fats: number;
	proteins: string;
	images: RecipeImageDTO[];
	steps: RecipeStepDTO[];
	user: UserDTO;
	created_at: string;
	updated_at: string;
}
