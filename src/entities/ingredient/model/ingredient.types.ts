import type { IngredientListFilter } from '@/features/IngredientsList/model/ingredientsList.types';

export interface UseIngredients {
	page?: number;
	filters?: Partial<IngredientListFilter>;
}

export interface Ingredient {
	id: string;
	title: string;
	description: string;
	price: number;
	currency: string;
	unit: string;
	category: string;
	createdAt: string;
	updatedAt: string;
	stepsCount: number;
	usage?: {
		amount: string; // TODO: Возможно переписать
	};
}

export interface IngredientDTO {
	id: string;
	title: string;
	description: string;
	price: number;
	currency: string;
	unit: string;
	category: string;
	created_at: string;
	updated_at: string;
	steps_count: number;
}
