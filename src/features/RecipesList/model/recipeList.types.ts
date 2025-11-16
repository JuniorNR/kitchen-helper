import type { Ingredient } from '@/entities';
import type { Recipe, RecipeStep } from '@/entities/recipe/model/recipe.type';

export interface RecipeItemProps {
	recipe: Recipe;
	isDeleting?: boolean;
	onDelete?: (id: string) => void;
}

export interface RecipeItemStepsModalProps {
	recipeSteps: RecipeStep[];
	title: string;
	className?: string;
}

export interface RecipeItemStepsModalIngredientCardProps {
	ingredient: Ingredient;
	onClose: () => void;
}

export interface RecipeListFilter {
	priceOfDishFrom: number;
	priceOfDishTo: number;
	priceToBuyFrom: number;
	priceToBuyTo: number;
	caloriesFrom: number;
	caloriesTo: number;
	fatsFrom: number;
	fatsTo: number;
	proteinsFrom: number;
	proteinsTo: number;
	carbohydratesFrom: number;
	carbohydratesTo: number;
	ration: string[];
	type: string[];
	createdFrom: string;
	createdTo: string;
}

export interface RecipeListFilterDTO {
	price_of_dish_from: number;
	price_of_dish_to: number;
	price_to_buy_from: number;
	price_to_buy_to: number;
	calories_from: number;
	calories_to: number;
	fats_from: number;
	fats_to: number;
	proteins_from: number;
	proteins_to: number;
	carbohydrates_from: number;
	carbohydrates_to: number;
	ration: string[];
	type: string[];
	created_from: string;
	created_to: string;
}

export interface RecipesListFilterProps {
	setPage: (page: number) => void;
	filters: Partial<RecipeListFilter>;
	setFilters: (filters: Partial<RecipeListFilter>) => void;
}
