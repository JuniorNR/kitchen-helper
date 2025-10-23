import type { TFunction } from 'i18next';
import { z } from 'zod';

export const getIngredientCreateSchema = (t: TFunction<'validation'>) => {
	const configValues = {
		titleMin: 10,
		descriptionMin: 25,
	};
	return z.object({
		title: z
			.string()
			.min(
				configValues.titleMin,
				`${t('title_required')} ${configValues.titleMin}`,
			),
		description: z
			.string()
			.min(
				configValues.descriptionMin,
				`${t('description_required')} ${configValues.descriptionMin}`,
			),
		price: z.number().min(1, t('price_required')),
		currency: z.string().nonempty(t('currency_required')),
		unit: z.string().nonempty(t('unit_required')),
		category: z.string().nonempty(t('category_required')),
	});
};

export type IngredientCreateFormDataType = z.infer<
	ReturnType<typeof getIngredientCreateSchema>
>;
