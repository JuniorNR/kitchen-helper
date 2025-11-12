import type { TFunction } from 'i18next';
import z from 'zod';

const DDMMYYYY_REGEX = /^\d{2}\.\d{2}\.\d{4}$/;

const parseDDMMYYYYToDate = (value: string): Date | null => {
	const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
	if (!match) return null;
	const [, ddStr, mmStr, yyyyStr] = match;
	const dd = Number(ddStr);
	const mm = Number(mmStr);
	const yyyy = Number(yyyyStr);
	const d = new Date(yyyy, mm - 1, dd);
	if (
		Number.isNaN(d.getTime()) ||
		d.getFullYear() !== yyyy ||
		d.getMonth() !== mm - 1 ||
		d.getDate() !== dd
	) {
		return null;
	}
	return d;
};

export const createIngredientsListFilterSchema = (
	t?: TFunction<'validation'>,
) =>
	z
		.object({
			priceFrom: z.union([z.number(''), z.undefined()]),
			priceTo: z.union([z.number(''), z.undefined()]),
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
						const d = parseDDMMYYYYToDate(value);
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
						const d = parseDDMMYYYYToDate(value);
						return !!d && d <= new Date();
					},
					{
						message: t
							? t('date_must_not_be_in_future')
							: 'Date cannot be in the future',
					},
				),
			categories: z.union([z.array(z.string()), z.undefined()]),
			units: z.union([z.array(z.string()), z.undefined()]),
		})
		.superRefine((data, ctx) => {
			if (data.createdFrom && data.createdTo) {
				const from = parseDDMMYYYYToDate(data.createdFrom);
				const to = parseDDMMYYYYToDate(data.createdTo);
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
