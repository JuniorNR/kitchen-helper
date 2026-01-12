import type { Ingredient } from '@/entities';

export interface IngredientListFilter {
	priceFrom: number;
	priceTo: number;
	createdFrom: string;
	createdTo: string;
	categories: string[];
	units: string[];

	[key: string]: string | number | string[] | Date | number[];
}

export interface IngredientsListFilterProps {
	setPage: (page: number) => void;
	filters: Partial<IngredientListFilter>;
	setFilters: (filters: Partial<IngredientListFilter>) => void;
}

export interface IngredientListFilterDTO {
	price_from: number;
	price_to: number;
	created_from: string;
	created_to: string;
	categories: string[];
	units: string[];
}

export interface IngredientCardProps {
	ingredient: Ingredient;
	isDeleting: boolean;
	onDelete: (id: string) => void;
}

export interface IngredientCardDeleteModalProps {
	id: string;
	title: string;
	isDeleting: boolean;
	onDelete: (id: string) => void;
}
