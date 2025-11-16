import { Input } from '@heroui/input';
import { Select, SelectItem, SelectSection } from '@heroui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { type FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type z from 'zod';
import { getGroupedOptions } from '@/features/RecipeCreate/model/recipeCreate.utils';
import {
	deleteFieldsWithUndefinedValues,
	dto,
	localStorageHelper,
	prepareDateForInput,
} from '@/shared/lib/helpers';
import { Filter, FilterGroup, Range } from '@/shared/ui';
import type {
	RecipeListFilter,
	RecipesListFilterProps,
} from '../model/recipeList.types';
import { createRecipeListFilterSchema } from '../model/recipeListFilter.schema';

export const RecipesListFilter: FC<RecipesListFilterProps> = ({
	setPage,
	filters,
	setFilters,
}) => {
	const {
		item: filterFromLocalStorage,
		storageRemoveItem,
		storageSetItem,
	} = localStorageHelper<RecipeListFilter>('filter_recipes');

	const limits = {
		priceOfDish: { min: 0, max: 5000 },
		priceToBuy: { min: 0, max: 5000 },
		calories: { min: 0, max: 5000 },
		proteins: { min: 0, max: 5000 },
		fats: { min: 0, max: 5000 },
		carbohydrates: { min: 0, max: 5000 },
	};

	const [formKey, setFormKey] = useState<number>(0);
	const [badges, setBadges] = useState(filters);

	const { t: tFields } = useTranslation('fields');
	const { t: tValidation } = useTranslation('validation');
	const { t: tRecipes } = useTranslation('recipes');
	const { t: tIngredients } = useTranslation('ingredients');
	const schema = createRecipeListFilterSchema(tValidation);

	const { control, handleSubmit, getValues, reset, setValue, watch } = useForm<
		z.input<typeof schema>
	>({
		resolver: zodResolver(schema),
		defaultValues: filters as unknown as z.input<typeof schema>,
	});

	const onHandleSubmit = handleSubmit((data) => {
		const preparedData = deleteFieldsWithUndefinedValues({
			...data,
			priceOfDishFrom:
				data.priceOfDishFrom === limits.priceOfDish.min
					? undefined
					: data.priceOfDishFrom,
			priceOfDishTo:
				data.priceOfDishTo === limits.priceOfDish.max
					? undefined
					: data.priceOfDishTo,
			priceToBuyFrom:
				data.priceToBuyFrom === limits.priceToBuy.min
					? undefined
					: data.priceToBuyFrom,
			priceToBuyTo:
				data.priceToBuyTo === limits.priceToBuy.max
					? undefined
					: data.priceToBuyTo,
			caloriesFrom:
				data.caloriesFrom === limits.calories.min
					? undefined
					: data.caloriesFrom,
			caloriesTo:
				data.caloriesTo === limits.calories.max ? undefined : data.caloriesTo,
			proteinsFrom:
				data.proteinsFrom === limits.proteins.min
					? undefined
					: data.proteinsFrom,
			proteinsTo:
				data.proteinsTo === limits.proteins.max ? undefined : data.proteinsTo,
			fatsFrom: data.fatsFrom === limits.fats.min ? undefined : data.fatsFrom,
			fatsTo: data.fatsTo === limits.fats.max ? undefined : data.fatsTo,
			carbohydratesFrom:
				data.carbohydratesFrom === limits.carbohydrates.min
					? undefined
					: data.carbohydratesFrom,
			carbohydratesTo:
				data.carbohydratesTo === limits.carbohydrates.max
					? undefined
					: data.carbohydratesTo,
			ration: data.ration?.length ? data.ration : undefined,
			type: data.type?.length ? data.type : undefined,
		});
		setFilters(deleteFieldsWithUndefinedValues(preparedData));
		setBadges(deleteFieldsWithUndefinedValues(preparedData));
		setPage(1);
	});

	const onHandleSaveToLocalStorage = () => {
		const formValues: Partial<RecipeListFilter> =
			getValues() as Partial<RecipeListFilter>;
		const preparedFormValues = deleteFieldsWithUndefinedValues({
			...formValues,
			priceOfDishFrom:
				formValues?.priceOfDishFrom === limits.priceOfDish.min
					? undefined
					: formValues?.priceOfDishFrom,
			priceOfDishTo:
				formValues?.priceOfDishTo === limits.priceOfDish.max
					? undefined
					: formValues?.priceOfDishTo,
			priceToBuyFrom:
				formValues?.priceToBuyFrom === limits.priceToBuy.min
					? undefined
					: formValues?.priceToBuyFrom,
			priceToBuyTo:
				formValues?.priceToBuyTo === limits.priceToBuy.max
					? undefined
					: formValues?.priceToBuyTo,
			caloriesFrom:
				formValues?.caloriesFrom === limits.calories.min
					? undefined
					: formValues?.caloriesFrom,
			caloriesTo:
				formValues?.caloriesTo === limits.calories.max
					? undefined
					: formValues?.caloriesTo,
			proteinsFrom:
				formValues?.proteinsFrom === limits.proteins.min
					? undefined
					: formValues?.proteinsFrom,
			proteinsTo:
				formValues?.proteinsTo === limits.proteins.max
					? undefined
					: formValues?.proteinsTo,
			fatsFrom:
				formValues?.fatsFrom === limits.fats.min
					? undefined
					: formValues?.fatsFrom,
			fatsTo:
				formValues?.fatsTo === limits.fats.max ? undefined : formValues?.fatsTo,
			carbohydratesFrom:
				formValues?.carbohydratesFrom === limits.carbohydrates.min
					? undefined
					: formValues?.carbohydratesFrom,
			carbohydratesTo:
				formValues?.carbohydratesTo === limits.carbohydrates.max
					? undefined
					: formValues?.carbohydratesTo,
		});

		storageSetItem(deleteFieldsWithUndefinedValues(preparedFormValues));
		setFormKey((prev) => prev + 1);
	};

	const onHandleSoftReset = () => {
		const emptyValues: z.input<typeof schema> = {
			priceOfDishFrom: undefined,
			priceOfDishTo: undefined,
			priceToBuyFrom: undefined,
			priceToBuyTo: undefined,
			caloriesFrom: undefined,
			caloriesTo: undefined,
			proteinsFrom: undefined,
			proteinsTo: undefined,
			fatsFrom: undefined,
			fatsTo: undefined,
			carbohydratesFrom: undefined,
			carbohydratesTo: undefined,
			ration: undefined,
			type: undefined,
			createdFrom: undefined,
			createdTo: undefined,
		};
		const hasStoredPreset = Object.entries(filterFromLocalStorage).length > 0;

		if (hasStoredPreset) {
			setFilters(filterFromLocalStorage);
			setBadges(filterFromLocalStorage);
			reset(filterFromLocalStorage as z.input<typeof schema>);
		} else {
			setFilters({});
			setBadges({});
			reset(emptyValues);
		}

		setPage(1);
	};

	const onHandleHardReset = () => {
		setPage(1);
		storageRemoveItem();
		setFilters({});
		setBadges({});

		reset({
			priceOfDishFrom: undefined,
			priceOfDishTo: undefined,
			priceToBuyFrom: undefined,
			priceToBuyTo: undefined,
			caloriesFrom: undefined,
			caloriesTo: undefined,
			proteinsFrom: undefined,
			proteinsTo: undefined,
			fatsFrom: undefined,
			fatsTo: undefined,
			carbohydratesFrom: undefined,
			carbohydratesTo: undefined,
			ration: undefined,
			type: undefined,
			createdFrom: undefined,
			createdTo: undefined,
		} as z.input<typeof schema>);

		setFormKey((prev) => prev + 1);
	};

	const onHandleDeleteBadge = (
		key: string,
		_value?: string | number | Date | string[] | number[],
	) => {
		const nextFilters = { ...filters };
		delete (nextFilters as Record<string, unknown>)[key];
		setFilters(nextFilters);

		const nextBadges = { ...badges };
		delete (nextBadges as Record<string, unknown>)[key];
		setBadges(nextBadges);

		const valuesFromFilters: z.input<typeof schema> = {
			priceOfDishFrom: nextFilters.priceOfDishFrom,
			priceOfDishTo: nextFilters.priceOfDishTo,
			priceToBuyFrom: nextFilters.priceToBuyFrom,
			priceToBuyTo: nextFilters.priceToBuyTo,
			caloriesFrom: nextFilters.caloriesFrom,
			caloriesTo: nextFilters.caloriesTo,
			proteinsFrom: nextFilters.proteinsFrom,
			proteinsTo: nextFilters.proteinsTo,
			fatsFrom: nextFilters.fatsFrom,
			fatsTo: nextFilters.fatsTo,
			carbohydratesFrom: nextFilters.carbohydratesFrom,
			carbohydratesTo: nextFilters.carbohydratesTo,
			ration: nextFilters.ration,
			type: nextFilters.type,
			createdFrom: nextFilters.createdFrom,
			createdTo: nextFilters.createdTo,
		};
		reset(valuesFromFilters);

		setPage(1);
	};

	return (
		<Filter
			key={formKey}
			badges={badges}
			filterFromLocalStorage={filterFromLocalStorage}
			onSubmit={onHandleSubmit}
			onSave={onHandleSaveToLocalStorage}
			onReset={onHandleHardReset}
			onCancel={onHandleSoftReset}
			onDeleteBadge={onHandleDeleteBadge}
		>
			<FilterGroup title={tRecipes('titles.prices')}>
				<Controller
					name="priceOfDishTo"
					control={control}
					render={({ field }) => (
						<Range
							label={tFields('price_of_dish')}
							minValue={limits.priceOfDish.min}
							maxValue={limits.priceOfDish.max}
							step={10}
							value={[
								watch('priceOfDishFrom') ?? limits.priceOfDish.min,
								field.value ?? limits.priceOfDish.max,
							]}
							onChange={(val) => {
								if (Array.isArray(val) && val.length === 2) {
									const [from, to] = val as [number, number];
									setValue('priceOfDishFrom', from, { shouldDirty: true });
									field.onChange(to);
								}
							}}
						/>
					)}
				/>
				<Controller
					name="priceToBuyTo"
					control={control}
					render={({ field }) => (
						<Range
							label={tFields('price_to_buy')}
							minValue={0}
							maxValue={5000}
							step={10}
							value={[watch('priceToBuyFrom') ?? 0, field.value ?? 5000]}
							onChange={(val) => {
								if (Array.isArray(val) && val.length === 2) {
									const [from, to] = val as [number, number];
									setValue('priceToBuyFrom', from, { shouldDirty: true });
									field.onChange(to);
								}
							}}
						/>
					)}
				/>
			</FilterGroup>
			<FilterGroup title={tRecipes('titles.organic_substances')}>
				<Controller
					name="caloriesTo"
					control={control}
					render={({ field }) => (
						<Range
							label={tFields('calories')}
							minValue={0}
							maxValue={5000}
							step={10}
							value={[watch('caloriesFrom') ?? 0, field.value ?? 5000]}
							onChange={(val) => {
								if (Array.isArray(val) && val.length === 2) {
									const [from, to] = val as [number, number];
									setValue('caloriesFrom', from, { shouldDirty: true });
									field.onChange(to);
								}
							}}
						/>
					)}
				/>
				<Controller
					name="proteinsTo"
					control={control}
					render={({ field }) => (
						<Range
							label={tFields('proteins')}
							minValue={0}
							maxValue={5000}
							step={10}
							value={[watch('proteinsFrom') ?? 0, field.value ?? 5000]}
							onChange={(val) => {
								if (Array.isArray(val) && val.length === 2) {
									const [from, to] = val as [number, number];
									setValue('proteinsFrom', from, { shouldDirty: true });
									field.onChange(to);
								}
							}}
						/>
					)}
				/>
				<Controller
					name="fatsTo"
					control={control}
					render={({ field }) => (
						<Range
							label={tFields('fats')}
							minValue={0}
							maxValue={5000}
							step={10}
							value={[watch('fatsFrom') ?? 0, field.value ?? 5000]}
							onChange={(val) => {
								if (Array.isArray(val) && val.length === 2) {
									const [from, to] = val as [number, number];
									setValue('fatsFrom', from, { shouldDirty: true });
									field.onChange(to);
								}
							}}
						/>
					)}
				/>
				<Controller
					name="carbohydratesTo"
					control={control}
					render={({ field }) => (
						<Range
							label={tFields('carbohydrates')}
							minValue={0}
							maxValue={5000}
							step={10}
							value={[watch('carbohydratesFrom') ?? 0, field.value ?? 5000]}
							onChange={(val) => {
								if (Array.isArray(val) && val.length === 2) {
									const [from, to] = val as [number, number];
									setValue('carbohydratesFrom', from, { shouldDirty: true });
									field.onChange(to);
								}
							}}
						/>
					)}
				/>
			</FilterGroup>
			<FilterGroup title={tRecipes('titles.created')}>
				<Controller
					name="createdFrom"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							label={tFields('created_from')}
							type="date"
							size="sm"
							value={prepareDateForInput(field.value as string)}
							onValueChange={(value) =>
								field.onChange(moment(value).format('DD.MM.YYYY'))
							}
							errorMessage={fieldState.error?.message}
							isInvalid={!!fieldState.error}
						/>
					)}
				/>
				<Controller
					name="createdTo"
					control={control}
					render={({ field, fieldState }) => (
						<Input
							label={tFields('created_to')}
							type="date"
							size="sm"
							value={prepareDateForInput(field.value as string)}
							onValueChange={(value) =>
								field.onChange(moment(value).format('DD.MM.YYYY'))
							}
							errorMessage={fieldState.error?.message}
							isInvalid={!!fieldState.error}
						/>
					)}
				/>
			</FilterGroup>
			<FilterGroup title={tRecipes('titles.common_information')}>
				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<Select
							label={tFields('categories')}
							selectionMode="multiple"
							size="sm"
							selectedKeys={new Set(field.value || [])}
							onSelectionChange={(keys) => {
								if (keys === 'all') return;
								const selected = Array.from(keys as Set<string>).map(String);
								field.onChange(selected);
							}}
						>
							{getGroupedOptions(tRecipes).map((group) => (
								<SelectSection key={group.label} title={group.label}>
									{group.options.map((option) => (
										<SelectItem key={option.value}>{option.label}</SelectItem>
									))}
								</SelectSection>
							))}
						</Select>
					)}
				/>
				<Controller
					control={control}
					name="ration"
					render={({ field, fieldState }) => (
						<Select
							label={tFields('ration')}
							selectionMode="multiple"
							size="sm"
							selectedKeys={new Set(field.value || [])}
							onSelectionChange={(keys) => {
								if (keys === 'all') return;
								const selected = Array.from(keys as Set<string>).map(String);
								field.onChange(selected);
							}}
							isInvalid={fieldState.invalid}
							errorMessage={fieldState.error?.message}
						>
							<SelectItem key="breakfast">
								{tIngredients('rations.breakfast')}
							</SelectItem>
							<SelectItem key="lunch">
								{tIngredients('rations.lunch')}
							</SelectItem>
							<SelectItem key="dinner">
								{tIngredients('rations.dinner')}
							</SelectItem>
						</Select>
					)}
				/>
			</FilterGroup>
		</Filter>
	);
};
