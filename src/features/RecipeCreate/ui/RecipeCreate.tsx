'use client';
import {
	Autocomplete,
	AutocompleteItem,
	AutocompleteSection,
} from '@heroui/autocomplete';
import { Button } from '@heroui/button';
import { Form } from '@heroui/form';
import { Input, Textarea } from '@heroui/input';
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/entities';
import { classNames } from '@/shared/lib/helpers/classNames';
import { DeleteIcon } from '@/shared/ui/icons/deleteIcon';
import { DragIcon } from '@/shared/ui/icons/dragIcon';
import {
	createRecipeCreateSchema,
	type RecipeCreateFormInputType,
} from '../model/recipeCreate.schema';
import type { RecipeCreateProps } from '../model/recipeCreate.types';
import { getGroupedOptions } from '../model/recipeCreate.utils';
import { RecipeCreateImages } from './RecipeCreateImages';
import { RecipeCreateStepIngredients } from './RecipeCreateStepIngredients';
import styles from './recipeCreate.module.scss';

export const RecipeCreate: FC<RecipeCreateProps> = ({ setCreated }) => {
	const { createRecipeData, isCreating } = useRecipe();
	const { t: tValidation } = useTranslation('validation');
	const { t: tCommon } = useTranslation('common');
	const { t: tFields } = useTranslation('fields');
	const { t: tIngredients } = useTranslation('ingredients');
	const { t: tRecipes } = useTranslation('recipes');
	const { control, handleSubmit, getValues } =
		useForm<RecipeCreateFormInputType>({
			resolver: zodResolver(createRecipeCreateSchema(tValidation)),
			defaultValues: {
				title: '',
				description: '',
				type: '',
				ration: '',
				duration: 0,
				calories: 0,
				proteins: 0,
				fats: 0,
				carbohydrates: 0,
				priceToBuy: 0,
				priceOfDish: 0,
				steps: [
					{
						title: '',
						description: '',
						duration: 0,
						ingredients: [
							{
								id: 0,
								amount: 0,
							},
						],
						order: 1,
					},
				],
				images: [],
			},
		});
	const {
		fields: stepFields,
		append: appendStep,
		remove: removeStep,
	} = useFieldArray<RecipeCreateFormInputType, 'steps'>({
		control,
		name: 'steps',
	});

	const formSectionStyles = 'flex gap-2 w-full';

	const onSubmit = async (data: RecipeCreateFormInputType) => {
		const result = await createRecipeData(data);
		if (result) {
			setCreated(true);
		}
	};

	const handleAddStep = () => {
		console.debug(getValues('images'));
		const newOrder = (stepFields.length ?? 0) + 1;
		appendStep({
			title: '',
			description: '',
			duration: 0,
			ingredients: [
				{
					id: 0,
					amount: 0,
				},
			],
			order: newOrder,
		});
	};

	return (
		<div className={classNames('w-full')}>
			<h1 className="text-2xl font-bold mb-2">
				{tCommon('page_titles.recipe_create')}
			</h1>
			<Form onSubmit={handleSubmit(onSubmit)}>
				<Controller
					control={control}
					name="title"
					render={({ field, fieldState }) => (
						<Input
							label={tFields('title')}
							isInvalid={fieldState.invalid}
							errorMessage={fieldState.error?.message}
							{...field}
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
				<div className={formSectionStyles}>
					<Controller
						control={control}
						name="ration"
						render={({ field, fieldState }) => (
							<Select
								label={tFields('ration')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							>
								<SelectItem onPress={() => field.onChange('breakfast')}>
									{tIngredients('rations.breakfast')}
								</SelectItem>
								<SelectItem onPress={() => field.onChange('lunch')}>
									{tIngredients('rations.lunch')}
								</SelectItem>
								<SelectItem onPress={() => field.onChange('dinner')}>
									{tIngredients('rations.dinner')}
								</SelectItem>
							</Select>
						)}
					/>
					<Controller
						control={control}
						name="duration"
						render={({ field, fieldState }) => (
							<NumberInput
								label={tFields('duration_minutes')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								min={0}
								step={1}
								value={Number(field.value) || 0}
								onValueChange={(value: number) => field.onChange(Number(value))}
							/>
						)}
					/>
					<Controller
						control={control}
						name="type"
						render={({ field, fieldState }) => (
							<Autocomplete
								className="w-full"
								label={tFields('type')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							>
								{getGroupedOptions(tRecipes).map((group) => (
									<AutocompleteSection key={group.label} title={group.label}>
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
				<div className={formSectionStyles}>
					<Controller
						control={control}
						name="calories"
						render={({ field, fieldState }) => (
							<NumberInput
								label={tFields('calories')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								min={0}
								step={10}
								{...field}
							/>
						)}
					/>
					<Controller
						control={control}
						name="proteins"
						render={({ field, fieldState }) => (
							<NumberInput
								label={tFields('proteins')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								min={0}
								step={10}
								{...field}
							/>
						)}
					/>
					<Controller
						control={control}
						name="fats"
						render={({ field, fieldState }) => (
							<NumberInput
								label={tFields('fats')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								min={0}
								step={10}
								value={Number(field.value) || 0}
								onValueChange={(value: number) => field.onChange(Number(value))}
							/>
						)}
					/>
					<Controller
						control={control}
						name="carbohydrates"
						render={({ field, fieldState }) => (
							<NumberInput
								label={tFields('carbohydrates')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								min={0}
								step={10}
								value={Number(field.value) || 0}
								onValueChange={(value: number) => field.onChange(Number(value))}
							/>
						)}
					/>
				</div>
				<div className={formSectionStyles}>
					<Controller
						control={control}
						name="priceToBuy"
						render={({ field, fieldState }) => (
							<NumberInput
								label={tFields('price_to_buy')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								min={0}
								step={10}
								value={Number(field.value) || 0}
								onValueChange={(value: number) => field.onChange(Number(value))}
							/>
						)}
					/>
					<Controller
						control={control}
						name="priceOfDish"
						render={({ field, fieldState }) => (
							<NumberInput
								label={tFields('price_of_dish')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								min={0}
								step={10}
								value={Number(field.value) || 0}
								onValueChange={(value: number) => field.onChange(Number(value))}
							/>
						)}
					/>
				</div>
				<div className={formSectionStyles}>
					<RecipeCreateImages control={control} />
				</div>
				<Button
					type="button"
					fullWidth
					variant="solid"
					color="primary"
					onPress={handleAddStep}
				>
					{tFields('add_step')}
				</Button>
				<div
					className={classNames(styles.scrollXGradient, {}, [
						'flex gap-2 w-full p-1',
					])}
				>
					<AnimatePresence initial={true}>
						{stepFields.map((stepField, index) => {
							return (
								<motion.div
									key={stepField.id}
									className="border rounded-md p-2 flex min-w-[400px] max-w-[400px] h-[445px] max-h-[445px] flex-col gap-2 flex-grow-1"
									initial={{ opacity: 0, y: -150 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: 150 }}
									transition={{ duration: 0.3, ease: 'backIn' }}
								>
									<h3 className="text-lg font-bold">
										{tFields('step')} {index + 1}
									</h3>
									<div
										className={classNames(styles.scrollYGradient, {}, [
											'flex-col gap-2 flex-grow-1 flex overflow-x-hidden',
										])}
									>
										<Controller
											control={control}
											name={`steps.${index}.title`}
											render={({ field, fieldState }) => (
												<Input
													label={tFields('title')}
													isInvalid={fieldState.invalid}
													errorMessage={fieldState.error?.message}
													{...field}
												/>
											)}
										/>
										<Controller
											control={control}
											name={`steps.${index}.description`}
											render={({ field, fieldState }) => (
												<Textarea
													label={tFields('description')}
													isInvalid={fieldState.invalid}
													errorMessage={fieldState.error?.message}
													{...field}
												/>
											)}
										/>
										<Controller
											control={control}
											name={`steps.${index}.duration`}
											render={({ field, fieldState }) => (
												<NumberInput
													label={tFields('duration_minutes')}
													isInvalid={fieldState.invalid}
													errorMessage={fieldState.error?.message}
													min={0}
													step={1}
													{...field}
												/>
											)}
										/>

										<RecipeCreateStepIngredients
											control={control}
											stepIndex={index}
										/>
									</div>
									<div className="flex items-center justify-between">
										<Button
											type="button"
											variant="light"
											className="cursor-grab"
										>
											<DragIcon />
											{index + 1}
										</Button>
										<Button
											type="button"
											variant="solid"
											color="danger"
											isDisabled={stepFields.length <= 1}
											onPress={() => {
												removeStep(index);
											}}
										>
											<DeleteIcon />
											{tCommon('delete')}
										</Button>
									</div>
								</motion.div>
							);
						})}
					</AnimatePresence>
				</div>
				<Button
					type="submit"
					fullWidth
					variant="solid"
					color="primary"
					isLoading={isCreating}
				>
					{tCommon('create')}
				</Button>
			</Form>
		</div>
	);
};
