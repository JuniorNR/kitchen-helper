import type { Ingredient } from '@/entities';
import type { Recipe, RecipeStep } from '@/entities/recipe/model/recipe.type';

export interface RecipeItemProps {
	recipe: Recipe;
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
