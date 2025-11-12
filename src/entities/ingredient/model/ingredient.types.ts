export interface UseIngredients {
	page?: number;
	filters?: {
		priceFrom?: number;
		priceTo?: number;
		createdFrom?: string | Date;
		createdTo?: string | Date;
		categories?: string[];
		units?: string[];
	};
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
}
