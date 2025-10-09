import type { TFunction } from 'i18next';
import { z } from 'zod';

export const createRecipeCreateSchema = (t: TFunction<'validation'>) => {
	return z.object({
		title: z.string().nonempty(t('title_required')),
		description: z.string().nonempty(t('description_required')),
		duration: z.number().min(0, t('duration_required')),
		type: z.string().nonempty(t('type_required')),
		ration: z.string().nonempty(t('ration_required')),
		calories: z.number().min(0, t('calories_required')),
		proteins: z.number().min(0, t('proteins_required')),
		fats: z.number().min(0, t('fats_required')),
		carbohydrates: z.number().min(0, t('carbohydrates_required')),
		priceToBuy: z.number().min(0, t('priceToBuy_required')),
		priceOfDish: z.number().min(0, t('priceOfDish_required')),
		steps: z.array(
			z.object({
				title: z.string().nonempty(t('title_required')),
				description: z.string().nonempty(t('description_required')),
				duration: z.number().min(0, t('duration_required')),
				order: z.number().default(1),
				ingredients: z.array(
					z.object({
						id: z.number(),
						amount: z.number().min(1, t('amount_required')),
					}),
				),
			}),
		),
		images: z.array(
			z.object({
				isMain: z.boolean(),
				file: z.file(),
				position: z.number(),
			}),
		),
	});
};

export type RecipeCreateFormInputType = z.input<
	ReturnType<typeof createRecipeCreateSchema>
>;
