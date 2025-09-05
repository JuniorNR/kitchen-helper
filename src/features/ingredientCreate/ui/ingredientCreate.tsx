'use client';

import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteSection,
} from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useIngredient } from '@/entities/ingredient';
import { getIngredientCategoryGroupsOptions } from '@/shared/lib/constants';
import { PriceInput, UnitInput } from '@/shared/ui';
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

	const { control, handleSubmit } = useForm({
		resolver: zodResolver(getIngredientCreateSchema(tValidation)),
		defaultValues: {
			title: '',
			description: '',
			price: 1,
			currency: 'RUB',
			countUnit: 1,
			unit: 'gr',
			category: '',
		},
	});

	const { createIngredientData, isCreateIngredientLoading } = useIngredient();

	const onSubmit = (data: IngredientCreateFormDataType) => {
		createIngredientData(data);
		setCreated(true);
	};

	return (
		<div className="w-full">
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.ingredient_create')}
			</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="title"
					render={({ field, fieldState }) => (
						<Input
							{...field}
							label={tFields('title')}
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
							isInvalid={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						/>
					)}
				/>
				<div className="flex gap-2 w-full">
					<Controller
						control={control}
						name="price"
						render={({ field: priceField, fieldState: priceFieldState }) => (
							<Controller
								control={control}
								name="currency"
								render={({
									field: priceUnitField,
									fieldState: priceUnitFieldState,
								}) => (
									<PriceInput
										value={Number(priceField.value)}
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
						name="countUnit"
						render={({ field: unitField, fieldState: unitFieldState }) => (
							<Controller
								control={control}
								name="unit"
								render={({
									field: unitUnitField,
									fieldState: unitUnitFieldState,
								}) => (
									<UnitInput
										value={Number(unitField.value)}
										onUnitChange={unitField.onChange}
										unit={unitUnitField.value}
										onUnitUnitChange={unitUnitField.onChange}
										isInvalid={
											unitFieldState.invalid || unitUnitFieldState.invalid
										}
										errorMessage={
											unitFieldState.error?.message ||
											unitUnitFieldState.error?.message
										}
									/>
								)}
							/>
						)}
					/>
				</div>
				<Controller
					control={control}
					name="category"
					render={({ field, fieldState }) => (
						<Autocomplete
							{...field}
							name="category"
							label={tFields('category')}
							isInvalid={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						>
							{getIngredientCategoryGroupsOptions(tIngredients).map((group) => (
								<AutocompleteSection key={group.group} title={group.group}>
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
				<Button
					type="submit"
					fullWidth
					color="primary"
					isLoading={isCreateIngredientLoading}
				>
					{tCommon('create')}
				</Button>
			</Form>
		</div>
	);
};
