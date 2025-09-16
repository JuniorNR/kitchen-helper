export interface Ingredient {
	id: string;
	title: string;
	description: string;
	price: number;
	currency: string;
	priceUnit: string;
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
	price_unit: string;
	unit: string;
	category: string;
	created_at: string;
	updated_at: string;
}
