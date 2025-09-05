export interface Ingredient {
	id: string;
	title: string;
	description: string;
	price: number;
	currency: string;
	priceUnit: string;
	countUnit: number;
	unit: string;
	category: string;
	createdAt: string;
	updatedAt: string;
}

export interface IngredientDTO {
	id: string;
	title: string;
	description: string;
	price: number;
	currency: string;
	price_unit: string;
	count_unit: number;
	unit: string;
	category: string;
	created_at: string;
	updated_at: string;
}
