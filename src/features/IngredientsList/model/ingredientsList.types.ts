export interface IngredientListFilter {
	priceFrom: number;
	priceTo: number;
	createdFrom: string;
	createdTo: string;
	categories: string[];
	units: string[];
}

export interface IngredientsListFilterProps {
	setPage: (page: number) => void;
	filters: Partial<IngredientListFilter>;
	setFilters: (filters: Partial<IngredientListFilter>) => void;
	filterFromLocalStorage: Partial<IngredientListFilter>;
}
