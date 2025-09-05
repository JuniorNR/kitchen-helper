import type { TFunction } from 'i18next';
import { z } from 'zod';

export const getIngredientCreateSchema = (t: TFunction<'validation'>) => {
	return z.object({
		title: z.string().min(10, t('title_required')),
		description: z.string().min(25, t('description_required')),
		price: z.number().min(1, t('price_required')),
		currency: z.string().nonempty(t('currency_required')),
		countUnit: z.number().min(1, t('count_unit_required')),
		unit: z.string().nonempty(t('unit_required')),
		category: z.string().nonempty(t('category_required')),
	});
};

export type IngredientCreateFormDataType = z.infer<
	ReturnType<typeof getIngredientCreateSchema>
>;
