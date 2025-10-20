'use client';

import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteSection,
} from '@heroui/autocomplete';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useIngredient } from '@/entities/ingredient';
import {
	getIngredientCategoryGroupsOptions,
	getUnitGroupsOptions,
} from '@/shared/lib/constants';
import { PriceInput } from '@/shared/ui';
import {
	getIngredientCreateSchema,
	type IngredientCreateFormDataType,
} from '../model/IngredientCreate.schema';
import type { IngredientCreateProps } from '../model/IngredientCreate.types';

export const IngredientCreate: FC<IngredientCreateProps> = ({ setCreated }) => {
	const { t: tFields } = useTranslation('fields');
	const { t: tCommon } = useTranslation('common');
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tValidation } = useTranslation('validation');
	const { t: tUnits } = useTranslation('units');

	const unitGroupsOptions = getUnitGroupsOptions(tUnits);

	const { control, handleSubmit } = useForm({
		resolver: zodResolver(getIngredientCreateSchema(tValidation)),
		defaultValues: {
			title: '',
			description: '',
			price: 1,
			currency: 'RUB',
			unit: 'gr',
			category: '',
		},
	});

	const { createIngredientData, isCreateIngredientLoading } = useIngredient();

	const onSubmit = async (data: IngredientCreateFormDataType) => {
		const result = await createIngredientData(data);
		if (result) {
			setCreated(true);
		}
	};

	return (
		<div className="w-full max-w-2xl mx-auto">
			<h1 className="text-2xl font-bold mb-3">
				{tCommon('page_titles.ingredient_create')}
			</h1>
			<Card radius="sm" shadow="sm">
				<CardBody className="flex flex-col gap-4">
					<Form
						className="flex flex-col gap-4"
						onSubmit={handleSubmit(onSubmit)}
					>
						<Controller
							control={control}
							name="title"
							render={({ field, fieldState }) => (
								<Input
									{...field}
									label={tFields('title')}
									size="lg"
									isRequired
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
								/>
							)}
						/>
						<Controller
							control={control}
							name="description"
							render={({ field, fieldState }) => (
								<Textarea
									{...field}
									label={tFields('description')}
									size="lg"
									minRows={3}
									isRequired
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
								/>
							)}
						/>
						<Divider />

						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
							<Controller
								control={control}
								name="price"
								render={({
									field: priceField,
									fieldState: priceFieldState,
								}) => (
									<Controller
										control={control}
										name="currency"
										render={({
											field: priceUnitField,
											fieldState: priceUnitFieldState,
										}) => (
											<PriceInput
												value={Number(priceField.value)}
												size="lg"
												onPriceChange={priceField.onChange}
												priceUnit={priceUnitField.value || 'RUB'}
												onPriceUnitChange={priceUnitField.onChange}
												isInvalid={
													priceFieldState.invalid || priceUnitFieldState.invalid
												}
												errorMessage={
													priceFieldState.error?.message ||
													priceUnitFieldState.error?.message
												}
											/>
										)}
									/>
								)}
							/>
							<Controller
								control={control}
								name="unit"
								render={({ field, fieldState }) => (
									<Autocomplete
										label={tFields('unit')}
										size="lg"
										isRequired
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
									>
										{unitGroupsOptions.map((group) => (
											<AutocompleteSection
												key={group.group}
												title={group.group}
											>
												{group.options.map((option) => (
													<AutocompleteItem
														key={option.value}
														onPress={() => field.onChange(option.value)}
													>
														{option.label}
													</AutocompleteItem>
												))}
											</AutocompleteSection>
										))}
									</Autocomplete>
								)}
							/>
						</div>

						<Divider />

						<Controller
							control={control}
							name="category"
							render={({ field, fieldState }) => (
								<Autocomplete
									{...field}
									name="category"
									label={tFields('category')}
									size="lg"
									isRequired
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
								>
									{getIngredientCategoryGroupsOptions(tIngredients).map(
										(group) => (
											<AutocompleteSection
												key={group.group}
												title={group.group}
											>
												{group.options.map((option) => (
													<AutocompleteItem
														key={option.value}
														onPress={() => field.onChange(option.value)}
													>
														{option.label}
													</AutocompleteItem>
												))}
											</AutocompleteSection>
										),
									)}
								</Autocomplete>
							)}
						/>
						<Button
							type="submit"
							fullWidth
							color="primary"
							isLoading={isCreateIngredientLoading}
						>
							{tCommon('create')}
						</Button>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
};
