import { Input } from '@heroui/input';
import { Select, SelectItem, SelectSection } from '@heroui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import moment from 'moment';
import { type FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import {
	getIngredientCategoryGroupsOptions,
	getUnitGroupsOptions,
} from '@/shared/lib/constants';
import {
	deleteFieldsWithUndefinedValues,
	prepareDateForInput,
} from '@/shared/lib/helpers';
import { Filter, NumberInput } from '@/shared/ui';
import { createIngredientsListFilterSchema } from '../model/ingredientListFilter.schema';
import type { IngredientsListFilterProps } from '../model/ingredientsList.types';

export const IngredientsListFilter: FC<IngredientsListFilterProps> = ({
	setPage,
	filters,
	setFilters,
	filterFromLocalStorage,
}) => {
	const [formKey, setFormKey] = useState<number>(0);
	const [badges, setBadges] = useState(filters);

	const { t: tValidation } = useTranslation('validation');
	const { t: tFields } = useTranslation('fields');
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tUnits } = useTranslation('units');

	const categoryGroups = getIngredientCategoryGroupsOptions(tIngredients);
	const unitGroups = getUnitGroupsOptions(tUnits);

	const schema = createIngredientsListFilterSchema(tValidation);
	const { control, handleSubmit, getValues, reset } = useForm<
		z.input<typeof schema>
	>({
		defaultValues: filters as unknown as z.input<typeof schema>,
		resolver: zodResolver(schema),
	});
	const onHandleSubmit = handleSubmit((data) => {
		setFilters(deleteFieldsWithUndefinedValues(data));
		setBadges(deleteFieldsWithUndefinedValues(data));
		setPage(1);
	});

	const onHandleSoftReset = () => {
		const emptyValues: z.input<typeof schema> = {
			priceFrom: undefined,
			priceTo: undefined,
			createdFrom: undefined,
			createdTo: undefined,
			categories: undefined,
			units: undefined,
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
		localStorage.removeItem('filter_ingredients');
		setFilters({});
		setBadges({});

		reset({
			priceFrom: undefined,
			priceTo: undefined,
			createdFrom: undefined,
			createdTo: undefined,
			categories: undefined,
			units: undefined,
		} as z.input<typeof schema>);

		setFormKey((prev) => prev + 1);
	};

	const onHandleSaveToLocalStorage = () => {
		const formValues = getValues();

		localStorage.setItem('filter_ingredients', JSON.stringify(formValues));
		setFormKey((prev) => prev + 1);
	};

	const onHandleDeleteBadge = (
		key: string,
		_value?: string | number | Date | string[] | number[],
	) => {
		// При удалении бейджа сбрасываем соответствующее поле формы и состояния фильтра/бейджей
		const nextFilters = { ...filters };
		delete (nextFilters as Record<string, unknown>)[key];
		setFilters(nextFilters);

		const nextBadges = { ...badges };
		delete (nextBadges as Record<string, unknown>)[key];
		setBadges(nextBadges);

		const valuesFromFilters: z.input<typeof schema> = {
			priceFrom: nextFilters.priceFrom as number | undefined,
			priceTo: nextFilters.priceTo as number | undefined,
			createdFrom: nextFilters.createdFrom as string | undefined,
			createdTo: nextFilters.createdTo as string | undefined,
			categories: nextFilters.categories as string[] | undefined,
			units: nextFilters.units as string[] | undefined,
		};
		reset(valuesFromFilters);

		setPage(1);
	};
	return (
		<Filter
			key={formKey}
			badges={badges}
			onSubmit={onHandleSubmit}
			onSave={onHandleSaveToLocalStorage}
			onReset={onHandleHardReset}
			onCancel={onHandleSoftReset}
			onDeleteBadge={onHandleDeleteBadge}
		>
			<Controller
				name="priceFrom"
				control={control}
				render={({ field, fieldState }) => (
					<NumberInput
						label={tFields('price_from')}
						size="sm"
						minValue={0}
						hideStepper
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						value={field.value}
						onValueChange={field.onChange}
					/>
				)}
			/>
			<Controller
				name="priceTo"
				control={control}
				render={({ field, fieldState }) => (
					<NumberInput
						label={tFields('price_to')}
						size="sm"
						minValue={0}
						hideStepper
						errorMessage={fieldState.error?.message}
						isInvalid={!!fieldState.error}
						value={field.value}
						onValueChange={field.onChange}
					/>
				)}
			/>

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

			<Controller
				name="categories"
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
						{categoryGroups.map((group) => (
							<SelectSection key={group.group} title={group.group}>
								{group.options.map((option) => (
									<SelectItem key={option.value}>{option.label}</SelectItem>
								))}
							</SelectSection>
						))}
					</Select>
				)}
			/>

			<Controller
				name="units"
				control={control}
				render={({ field }) => (
					<Select
						label={tFields('units')}
						selectionMode="multiple"
						size="sm"
						selectedKeys={new Set(field.value || [])}
						onSelectionChange={(keys) => {
							if (keys === 'all') return;
							const selected = Array.from(keys as Set<string>).map(String);
							field.onChange(selected);
						}}
					>
						{unitGroups.map((group) => (
							<SelectSection key={group.group} title={group.group}>
								{group.options.map((option) => (
									<SelectItem key={option.value}>{option.label}</SelectItem>
								))}
							</SelectSection>
						))}
					</Select>
				)}
			/>
		</Filter>
	);
};
