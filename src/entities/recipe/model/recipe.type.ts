import type { Ingredient, IngredientDTO } from '@/entities/ingredient';
import type { User, UserDTO } from '@/entities/user';

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

// {
//   "title": "Омлет",
//   "description": "Классический",
//   "price_of_dish": 150,
//   "price_to_buy": 120,
//   "calories": 300,
//   "fats": 20,
//   "proteins": 18,
//   "carbohydrates": 5,
//   "ration": "breakfast",
//   "type": "main",
//   "steps": [
//     {
//       "title": "Подготовка",
//       "description": "Взбить яйца",
//       "order": 1,
//       "duration": "5m",
//       "ingredients": [
//         { "id": 1, "amount": 2.0 }
//       ]
//     },
//     {
//       "title": "Жарка",
//       "description": "Обжарить на сковороде",
//       "order": 2,
//       "duration": "7m",
//       "ingredients": [
//         { "id": 2, "amount": 10.0 }
//       ]
//     }
//   ],
//   "images": [
//     { "path": "/storage/public/recipes/1.jpg", "is_main": true, "position": 0 }
//   ]
// }
