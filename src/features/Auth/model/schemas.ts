import type { TFunction } from 'i18next';
import { z } from 'zod';

export const createSignUpSchema = (t: TFunction<'validation'>) =>
	z
		.object({
			email: z.string().nonempty(t('email_required')).email(t('email_invalid')),
			password: z.string().min(8, t('password_min')),
			confirmPassword: z.string().min(8, t('password_min')),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t('passwords_mismatch'),
			path: ['confirmPassword'],
		});

export const createLoginSchema = (t: TFunction<'validation'>) =>
	z.object({
		email: z.string().nonempty(t('email_required')).email(t('email_invalid')),
		password: z.string().min(8, t('password_min')),
	});
