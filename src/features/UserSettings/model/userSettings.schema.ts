import type { TFunction } from 'i18next';
import z from 'zod';

export const createUserSettingsSchema = (t: TFunction<'validation'>) => {
	return z.object({
		name: z.string().nonempty(t('name_required')),
		email: z.string().nonempty(t('email_required')).email(t('email_invalid')),
	});
};
