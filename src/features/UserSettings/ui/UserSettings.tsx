'use client';

import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/entities';
import { createUserSettingsSchema } from '../model/userSettings.schema';
import type { UserSettingsFormData } from '../model/userSettings.types';

export const UserSettings = () => {
	const { t: tFields } = useTranslation('fields');
	const { t: tValidation } = useTranslation('validation');
	const { user, updateUserData } = useUser();
	const { control, handleSubmit, reset } = useForm({
		resolver: zodResolver(createUserSettingsSchema(tValidation)),
		defaultValues: {
			name: '',
			email: '',
		},
	});

	useEffect(() => {
		if (user) {
			reset({
				name: user.name,
				email: user.email,
			});
		}
	}, [user, reset]);

	const onSubmit = async (data: UserSettingsFormData) => {
		await updateUserData(data);
	};
	return (
		<Form onSubmit={handleSubmit(onSubmit)} className="w-full">
			<h1 className="text-2xl font-bold">User Settings</h1>
			<Controller
				control={control}
				name="name"
				render={({ field, fieldState }) => (
					<Input
						size="sm"
						autoComplete="off"
						placeholder={tFields('name_placeholder')}
						label={tFields('name')}
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						{...field}
					/>
				)}
			/>
			<Controller
				control={control}
				name="email"
				render={({ field, fieldState }) => (
					<Input
						size="sm"
						autoComplete="off"
						placeholder={tFields('email_placeholder')}
						type="email"
						label={tFields('email')}
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						{...field}
					/>
				)}
			/>
			<Button type="submit" color="primary" fullWidth>
				Save
			</Button>
		</Form>
	);
};
