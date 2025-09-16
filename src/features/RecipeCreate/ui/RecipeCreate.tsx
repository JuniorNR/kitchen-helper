'use client';
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
import { useIngredient, useRecipe } from '@/entities';
import { classNames } from '@/shared/lib/helpers/classNames';
import { DeleteIcon } from '@/shared/ui/icons/deleteIcon';
import { DragIcon } from '@/shared/ui/icons/dragIcon';
import {
	createRecipeCreateSchema,
	type RecipeCreateFormInputType,
} from '../model/recipeCreate.schema';
import type { RecipeCreateProps } from '../model/recipeCreate.types';
import { RecipeCreateStepIngredients } from './RecipeCreateStepIngredients';
import styles from './recipeCreate.module.scss';

export const RecipeCreate: FC<RecipeCreateProps> = ({ setCreated }) => {
	const { recipes } = useRecipe();
	const { t: tValidation } = useTranslation('validation');
	const { t: tCommon } = useTranslation('common');
	const { t: tFields } = useTranslation('fields');
	const { control, handleSubmit, getValues } =
		useForm<RecipeCreateFormInputType>({
			resolver: zodResolver(createRecipeCreateSchema(tValidation)),
			defaultValues: {
				title: '',
				description: '',
				type: '',
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
						order: 1,
						ingredients: [],
					},
				],
				images: [
					{
						isMain: true,
						path: '',
						position: 1,
					},
				],
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
	console.debug(stepFields);

	const onSubmit = async (data: RecipeCreateFormInputType) => {
		console.debug(data);
		// const result = await createRecipeData(data);
		// if (true) {
		// 	setCreated(true);
		// }
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
		<div className={classNames('w-full', { 'mt-50': stepFields.length > 0 })}>
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
							<Select
								className="w-full"
								label={tFields('type')}
								isInvalid={fieldState.invalid}
								errorMessage={fieldState.error?.message}
								{...field}
							>
								<SelectItem>Breakfast</SelectItem>
								<SelectItem>Lunch</SelectItem>
								<SelectItem>Dinner</SelectItem>
							</Select>
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
									className="border rounded-md p-2 flex min-w-[400px] max-w-[400px] max-h-[400px] flex-col gap-2 flex-grow-1"
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
				<Button type="submit" fullWidth variant="solid" color="primary">
					{tCommon('create')}
				</Button>
			</Form>
		</div>
	);
};
