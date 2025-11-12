'use client';
import { Input } from '@heroui/input';
import { Select, SelectItem, SelectSection } from '@heroui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import moment from 'moment';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import type { z } from 'zod';
import { useIngredient } from '@/entities';
import {
	getIngredientCategoryGroupsOptions,
	getUnitGroupsOptions,
} from '@/shared/lib/constants';
import {
	classNames,
	deleteFieldsWithUndefinedValues,
	prepareDateForInput,
} from '@/shared/lib/helpers';
import { Filter, NumberInput, PaginationBar } from '@/shared/ui';
import { createIngredientsListFilterSchema } from '../model/ingredientListFilter.schema';
import type { IngredientListFilter } from '../model/ingredientsList.types';
import {
	handleDeleteIngredient,
	INGREDIENT_SKELETON_KEYS,
	prepareIngredientsList,
} from '../model/ingredientsList.utils';
import { IngredientCard } from './IngredientCard';
import { IngredientCardSkeleton } from './IngredientCardSkeleton';

export const IngredientsList = () => {
	const { t: tCommon } = useTranslation('common');
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tUnits } = useTranslation('units');
	const { t: tValidation } = useTranslation('validation');
	const { t: tFields } = useTranslation('fields');

	const categoryGroups = getIngredientCategoryGroupsOptions(tIngredients);
	const unitGroups = getUnitGroupsOptions(tUnits);

	const filterFromLocalStorage: Partial<IngredientListFilter> = (() => {
		try {
			return JSON.parse(
				localStorage.getItem('filter_ingredients') || '',
			) as Partial<IngredientListFilter>;
		} catch {
			return {};
		}
	})();

	const [page, setPage] = useState<number>(1);
	const [formKey, setFormKey] = useState<number>(0);
	const [filters, setFilters] = useState<Partial<IngredientListFilter>>(
		filterFromLocalStorage,
	);
	const [isDeleteLoadingIngredient, setIsDeleteLoadingIngredient] = useState<
		string | null
	>(null);

	const [badges, setBadges] = useState(filters);

	const schema = createIngredientsListFilterSchema(tValidation);
	const { control, handleSubmit, getValues, reset } = useForm<
		z.input<typeof schema>
	>({
		defaultValues: filters as unknown as z.input<typeof schema>,
		resolver: zodResolver(schema),
	});

	const { ingredients, pagination, isLoading, deleteIngredientData } =
		useIngredient({
			page,
			filters,
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
		<div className="w-full min-h-[600px] transition-all duration-300">
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.ingredient_list')}
			</h1>
			<div className="mb-5">
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
			</div>
			<AnimatePresence mode="wait">
				{isLoading ? (
					<motion.div
						key="loading"
						initial={{ opacity: 0, filter: 'blur(6px)' }}
						animate={{ opacity: 1, filter: 'blur(0px)' }}
						exit={{ opacity: 0, filter: 'blur(6px)' }}
						transition={{ duration: 0.25 }}
						className={classNames(
							'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4',
						)}
					>
						{INGREDIENT_SKELETON_KEYS.map((key) => (
							<IngredientCardSkeleton key={key} />
						))}
					</motion.div>
				) : ingredients?.length ? (
					<motion.div
						key="list"
						initial={{ opacity: 0, filter: 'blur(6px)' }}
						animate={{ opacity: 1, filter: 'blur(0px)' }}
						exit={{ opacity: 0, filter: 'blur(6px)' }}
						transition={{ duration: 0.25 }}
						className="flex flex-col gap-6"
					>
						<motion.div
							className={classNames(
								'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[600px]',
							)}
							initial="hidden"
							animate="visible"
							variants={{
								hidden: { opacity: 1 },
								visible: {
									opacity: 1,
									transition: { staggerChildren: 0.06, delayChildren: 0.05 },
								},
							}}
						>
							{prepareIngredientsList(ingredients).map((ingredient) => (
								<motion.div
									key={ingredient.id}
									layout
									variants={{
										hidden: { opacity: 0, y: 10, scale: 0.98 },
										visible: {
											opacity: 1,
											y: 0,
											scale: 1,
											transition: { duration: 0.25, ease: 'easeOut' },
										},
									}}
								>
									<IngredientCard
										ingredient={ingredient}
										isDeleting={isDeleteLoadingIngredient === ingredient.id}
										onDelete={(id) =>
											handleDeleteIngredient(
												id,
												setIsDeleteLoadingIngredient,
												deleteIngredientData,
											)
										}
									/>
								</motion.div>
							))}
						</motion.div>

						<PaginationBar
							page={page}
							onPageChange={setPage}
							totalItems={pagination?.total || 0}
							currentPage={pagination?.currentPage || 1}
						/>
					</motion.div>
				) : (
					<motion.div
						key="empty"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
						className="mt-10 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 p-8 text-center text-neutral-600 dark:text-neutral-400"
					>
						{tIngredients('titles.empty_state')}
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
};
