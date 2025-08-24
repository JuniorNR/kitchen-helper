import type { TFunction } from 'i18next';
import { z } from 'zod';

export const createSignUpSchema = (t?: TFunction<'validation'>) =>
	z
		.object({
			email: z
				.string()
				.nonempty(t ? t('email_required') : 'Email required')
				.email(t ? t('email_invalid') : 'Email invalid'),
			password: z
				.string()
				.min(
					8,
					t ? t('password_min') : 'Password must be at least 8 characters',
				),
			confirmPassword: z
				.string()
				.min(
					8,
					t ? t('password_min') : 'Password must be at least 8 characters',
				),
		})
		.refine((data) => data.password === data.confirmPassword, {
			message: t ? t('passwords_mismatch') : 'Passwords do not match',
			path: ['confirmPassword'],
		});

export const createLoginSchema = (t?: TFunction<'validation'>) =>
	z.object({
		email: z
			.string()
			.nonempty(t ? t('email_required') : 'Email required')
			.email(t ? t('email_invalid') : 'Email invalid'),
		password: z
			.string()
			.min(8, t ? t('password_min') : 'Password must be at least 8 characters'),
	});
