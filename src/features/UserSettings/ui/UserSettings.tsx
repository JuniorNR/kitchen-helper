'use client';

import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input } from '@heroui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { format } from 'date-fns';
import { enUS, ru } from 'date-fns/locale';
import { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useUser } from '@/entities';
import { LanguageSwitcher, ThemeSwitcher } from '@/features';
import { Typography } from '@/shared/ui';
import { CheckIcon } from '@/shared/ui/icons/checkIcon';
import { createUserSettingsSchema } from '../model/userSettings.schema';
import type { UserSettingsFormData } from '../model/userSettings.types';

export const UserSettings = () => {
	const { t: tCommon, i18n } = useTranslation('common');
	const { t: tFields } = useTranslation('fields');
	const { t: tValidation } = useTranslation('validation');
	const { user, updateUserData, isUpdateUserLoading } = useUser();
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

	const userInitial = useMemo(() => {
		const source = (user?.name || user?.email || '').trim();
		return source ? source.charAt(0).toUpperCase() : '?';
	}, [user]);

	const dateLocale = useMemo(() => {
		return i18n.language?.toLowerCase().startsWith('ru') ? ru : enUS;
	}, [i18n.language]);

	const onSubmit = async (data: UserSettingsFormData) => {
		await updateUserData(data);
	};
	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			className="w-full max-w-5xl mx-auto"
		>
			<div className="mb-2">
				<Typography component="h1">
					{tCommon('page_titles.user_settings')}
				</Typography>
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				<Card shadow="sm" className="h-full">
					<CardHeader>
						<Typography component="h3">{tCommon('profile')}</Typography>
					</CardHeader>
					<Divider />
					<CardBody className="flex items-center gap-3">
						<div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center font-semibold">
							{userInitial}
						</div>
						<div className="flex flex-col">
							<span className="text-sm text-neutral-500 dark:text-neutral-400">
								{user?.email}
							</span>
							<span className="text-base font-medium text-center">
								{user?.name || tFields('name')}
							</span>
						</div>
					</CardBody>
				</Card>

				<div className="lg:col-span-2">
					<Card shadow="sm">
						<CardHeader>
							<Typography component="h3">{tCommon('account')}</Typography>
						</CardHeader>
						<Divider />
						<CardBody className="grid grid-cols-1 sm:grid-cols-2 gap-4">
							<Controller
								control={control}
								name="name"
								render={({ field, fieldState }) => (
									<Input
										size="md"
										autoComplete="off"
										placeholder={tFields('name_placeholder')}
										label={tFields('name')}
										labelPlacement="outside"
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
										size="md"
										autoComplete="off"
										placeholder={tFields('email_placeholder')}
										type="email"
										label={tFields('email')}
										labelPlacement="outside"
										errorMessage={fieldState.error?.message}
										isInvalid={!!fieldState.error}
										{...field}
									/>
								)}
							/>

							<div className="sm:col-span-2 flex justify-end mt-2">
								<Button
									type="submit"
									color="primary"
									startContent={<CheckIcon />}
									isLoading={isUpdateUserLoading}
								>
									{tCommon('save')}
								</Button>
							</div>
						</CardBody>
					</Card>
				</div>
				<div className="lg:col-span-1">
					<Card shadow="sm" className="h-full">
						<CardHeader>
							<Typography component="h3">{tCommon('preferences')}</Typography>
						</CardHeader>
						<Divider />
						<CardBody>
							<div className="flex flex-wrap gap-3">
								<LanguageSwitcher />
								<ThemeSwitcher />
							</div>
						</CardBody>
					</Card>
				</div>
				<div className="lg:col-span-2">
					<Card shadow="sm">
						<CardHeader>
							<Typography component="h3">{tCommon('information')}</Typography>
						</CardHeader>
						<Divider />
						<CardBody className="grid grid-cols-2 gap-4">
							<Input
								size="md"
								isReadOnly
								label={tFields('created_at')}
								labelPlacement="outside"
								value={
									user
										? format(new Date(user.createdAt), 'dd.MM.yyyy HH:mm', {
												locale: dateLocale,
											})
										: ''
								}
							/>
							<Input
								size="md"
								isReadOnly
								label={tFields('updated_at')}
								labelPlacement="outside"
								value={
									user
										? format(new Date(user.updatedAt), 'dd.MM.yyyy HH:mm', {
												locale: dateLocale,
											})
										: ''
								}
							/>
						</CardBody>
					</Card>
				</div>
			</div>
		</Form>
	);
};
