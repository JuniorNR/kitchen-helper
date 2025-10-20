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
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecipe } from '@/entities';
import { classNames } from '@/shared/lib/helpers/classNames';
import { DeleteButton } from '@/shared/ui';
import { CheckIcon } from '@/shared/ui/icons/checkIcon';
import { DragIcon } from '@/shared/ui/icons/dragIcon';
import { PlusIcon } from '@/shared/ui/icons/plusIcon';
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
	const { control, handleSubmit } = useForm<RecipeCreateFormInputType>({
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
					ingredients: [],
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

	const formSectionStyles = 'grid grid-cols-1 md:grid-cols-2 gap-4 w-full';

	const onSubmit = async (data: RecipeCreateFormInputType) => {
		const result = await createRecipeData(data);
		if (result) {
			setCreated(true);
		}
	};

	const handleAddStep = () => {
		const newOrder = (stepFields.length ?? 0) + 1;
		appendStep({
			title: '',
			description: '',
			duration: 0,
			ingredients: [],
			order: newOrder,
		});
	};

	return (
		<div className="w-full max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-3">
				{tCommon('page_titles.recipe_create')}
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
									label={tFields('title')}
									isInvalid={fieldState.invalid}
									isRequired
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
									isRequired
									label={tFields('description')}
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
								/>
							)}
						/>
						<Divider />

						<div className={formSectionStyles}>
							<Controller
								control={control}
								name="ration"
								render={({ field, fieldState }) => (
									<Select
										label={tFields('ration')}
										size="lg"
										isRequired
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
										size="lg"
										isRequired
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										min={0}
										step={1}
										value={Number(field.value) || 0}
										onValueChange={(value: number) =>
											field.onChange(Number(value))
										}
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
										size="lg"
										isRequired
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										{...field}
									>
										{getGroupedOptions(tRecipes).map((group) => (
											<AutocompleteSection
												key={group.label}
												title={group.label}
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
						<div className={formSectionStyles}>
							<Controller
								control={control}
								name="calories"
								render={({ field, fieldState }) => (
									<NumberInput
										label={tFields('calories')}
										size="lg"
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										min={0}
										step={10}
										value={Number(field.value) || 0}
										onValueChange={(value: number) =>
											field.onChange(Number(value))
										}
									/>
								)}
							/>
							<Controller
								control={control}
								name="proteins"
								render={({ field, fieldState }) => (
									<NumberInput
										label={tFields('proteins')}
										size="lg"
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										min={0}
										step={10}
										value={Number(field.value) || 0}
										onValueChange={(value: number) =>
											field.onChange(Number(value))
										}
									/>
								)}
							/>
							<Controller
								control={control}
								name="fats"
								render={({ field, fieldState }) => (
									<NumberInput
										label={tFields('fats')}
										size="lg"
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										min={0}
										step={10}
										value={Number(field.value) || 0}
										onValueChange={(value: number) =>
											field.onChange(Number(value))
										}
									/>
								)}
							/>
							<Controller
								control={control}
								name="carbohydrates"
								render={({ field, fieldState }) => (
									<NumberInput
										label={tFields('carbohydrates')}
										size="lg"
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										min={0}
										step={10}
										value={Number(field.value) || 0}
										onValueChange={(value: number) =>
											field.onChange(Number(value))
										}
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
										size="lg"
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										min={0}
										step={10}
										value={Number(field.value) || 0}
										onValueChange={(value: number) =>
											field.onChange(Number(value))
										}
									/>
								)}
							/>
							<Controller
								control={control}
								name="priceOfDish"
								render={({ field, fieldState }) => (
									<NumberInput
										label={tFields('price_of_dish')}
										size="lg"
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										min={0}
										step={10}
										value={Number(field.value) || 0}
										onValueChange={(value: number) =>
											field.onChange(Number(value))
										}
									/>
								)}
							/>
						</div>
						<Divider />

						<div className="flex w-full">
							<RecipeCreateImages control={control} />
						</div>
						<Button
							type="button"
							fullWidth
							variant="shadow"
							color="secondary"
							radius="sm"
							startContent={<PlusIcon />}
							onPress={handleAddStep}
						>
							{tFields('add_step')}
						</Button>
						<div
							className={classNames(styles.scrollXGradient, {}, [
								'flex gap-4 w-full p-2',
							])}
						>
							<AnimatePresence initial={true}>
								{stepFields.map((stepField, index) => {
									return (
										<motion.div
											key={stepField.id}
											className="bg-content1 border border-default-200 rounded-medium p-3 flex min-w-[420px] max-w-[420px] h-[470px] max-h-[470px] flex-col gap-3"
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
													'flex-col gap-3 flex-grow flex overflow-x-hidden',
												])}
											>
												<Controller
													control={control}
													name={`steps.${index}.title`}
													render={({ field, fieldState }) => (
														<Input
															label={tFields('title')}
															size="lg"
															isRequired
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
															size="lg"
															minRows={3}
															isRequired
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
															size="lg"
															isRequired
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
													variant="faded"
													className="cursor-grab"
												>
													<DragIcon />
													{index + 1}
												</Button>
												<DeleteButton
													ariaLabel={tCommon('delete')}
													label={tCommon('delete')}
													isDisabled={stepFields.length <= 1}
													onPress={() => {
														removeStep(index);
													}}
												/>
											</div>
										</motion.div>
									);
								})}
							</AnimatePresence>
						</div>
						<Button
							type="submit"
							fullWidth
							variant="shadow"
							color="primary"
							radius="sm"
							startContent={<CheckIcon />}
							isLoading={isCreating}
						>
							{tCommon('create')}
						</Button>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
};
