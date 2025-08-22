'use client';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { createSignUpSchema } from '../model/schemas';
import type { SignUpFormData, SignUpFormProps } from '../model/types';

export const SignUpForm: FC<SignUpFormProps> = ({ onSubmit, formId }) => {
	const { t: tFields } = useTranslation('fields');
	const { t: tValidation } = useTranslation('validation');
	const { handleSubmit, control } = useForm<SignUpFormData>({
		resolver: zodResolver(createSignUpSchema(tValidation)),
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
		},
	});

	return (
		<Form
			id={formId}
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-md"
		>
			<Controller
				control={control}
				name="email"
				render={({ field, fieldState }) => (
					<Input
						size="sm"
						label={tFields('email')}
						placeholder={tFields('email_placeholder')}
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="password"
				render={({ field, fieldState }) => (
					<Input
						size="sm"
						label={tFields('password')}
						placeholder={tFields('password_placeholder')}
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="confirmPassword"
				render={({ field, fieldState }) => (
					<Input
						size="sm"
						label={tFields('confirm_password')}
						placeholder={tFields('password_placeholder')}
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						{...field}
					/>
				)}
			/>
		</Form>
	);
};
