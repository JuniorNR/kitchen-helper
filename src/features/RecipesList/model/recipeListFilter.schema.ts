import type { TFunction } from 'i18next';
import { z } from 'zod';
import { parseDate } from '@/shared/lib/helpers';

const DDMMYYYY_REGEX = /^\d{2}\.\d{2}\.\d{4}$/;

export const createRecipeListFilterSchema = (t: TFunction<'validation'>) => {
	return z
		.object({
			priceOfDishFrom: z.union([z.number(''), z.undefined()]),
			priceOfDishTo: z.union([z.number(''), z.undefined()]),
			priceToBuyFrom: z.union([z.number(''), z.undefined()]),
			priceToBuyTo: z.union([z.number(''), z.undefined()]),
			caloriesFrom: z.union([z.number(''), z.undefined()]),
			caloriesTo: z.union([z.number(''), z.undefined()]),
			fatsFrom: z.union([z.number(''), z.undefined()]),
			fatsTo: z.union([z.number(''), z.undefined()]),
			proteinsFrom: z.union([z.number(''), z.undefined()]),
			proteinsTo: z.union([z.number(''), z.undefined()]),
			carbohydratesFrom: z.union([z.number(''), z.undefined()]),
			carbohydratesTo: z.union([z.number(''), z.undefined()]),
			ration: z.union([z.array(z.string()), z.undefined()]),
			type: z.union([z.array(z.string()), z.undefined()]),
			createdFrom: z
				.string()
				.regex(DDMMYYYY_REGEX, {
					message: t
						? t('invalid_date_format')
						: 'Invalid date format (DD.MM.YYYY)',
				})
				.optional()
				.refine(
					(value) => {
						if (!value) return true;
						const d = parseDate(value, 'ru');
						return !!d && d <= new Date();
					},
					{
						message: t
							? t('date_must_not_be_in_future')
							: 'Date cannot be in the future',
					},
				),
			createdTo: z
				.string()
				.regex(DDMMYYYY_REGEX, {
					message: t
						? t('invalid_date_format')
						: 'Invalid date format (DD.MM.YYYY)',
				})
				.optional()
				.refine(
					(value) => {
						if (!value) return true;
						const d = parseDate(value, 'ru');
						return !!d && d <= new Date();
					},
					{
						message: t
							? t('date_must_not_be_in_future')
							: 'Date cannot be in the future',
					},
				),
		})
		.superRefine((data, ctx) => {
			if (data.createdFrom && data.createdTo) {
				const from = parseDate(data.createdFrom, 'ru');
				const to = parseDate(data.createdTo, 'ru');
				// If both parse, check order; if parse fails, individual field validations will flag
				if (from && to && from > to) {
					ctx.addIssue({
						code: 'custom',
						message: t
							? t('date_cannot_be_greater_from')
							: 'The date cannot be greater than "Created from"',
						path: ['createdFrom'],
					});
				}
			}
		});
};
