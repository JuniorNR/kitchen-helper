import { Button } from '@heroui/button';
import { NumberInput } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useIngredient } from '@/entities';
import { DeleteButton } from '@/shared/ui';
import { PlusIcon } from '@/shared/ui/icons/plusIcon';
import type { RecipeCreateStepIngredientsProps } from '../model/recipeCreate.types';

export const RecipeCreateStepIngredients: FC<
	RecipeCreateStepIngredientsProps
> = ({ control, stepIndex }) => {
	const { ingredients } = useIngredient({});
	const { t: tFields } = useTranslation('fields');

	const { fields, append, remove } = useFieldArray({
		control,
		name: `steps.${stepIndex}.ingredients`,
	});
	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center justify-between">
				<h4 className="text-md font-semibold">{tFields('ingredients')}</h4>
				<Button
					type="button"
					variant="shadow"
					color="secondary"
					radius="sm"
					startContent={<PlusIcon />}
					onPress={() => append({ id: 0, amount: 0 })}
				>
					{tFields('add_ingredient')}
				</Button>
			</div>

			<AnimatePresence initial={false}>
				{fields?.map((ingredientField, ingredientIndex) => (
					<motion.div
						key={ingredientField.id}
						className="flex gap-2 items-end md:flex-row flex-col"
						initial={{ opacity: 0, x: -50 }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: 50 }}
						transition={{ duration: 0.2 }}
					>
						<Controller
							control={control}
							name={`steps.${stepIndex}.ingredients.${ingredientIndex}.id`}
							render={({ fieldState, field }) => (
								<Select
									className="md:w-[40%] w-full min-w-[180px]"
									label={tFields('ingredient')}
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
								>
									{(ingredients ?? []).map((ingredient) => (
										<SelectItem
											key={ingredient.id}
											onPress={() => {
												field.onChange(ingredient.id);
											}}
										>
											{ingredient.title}
										</SelectItem>
									))}
								</Select>
							)}
						/>
						<Controller
							control={control}
							name={`steps.${stepIndex}.ingredients.${ingredientIndex}.amount`}
							render={({ field, fieldState }) => (
								<NumberInput
									label={tFields('amount')}
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
									{...field}
								/>
							)}
						/>

						<DeleteButton
							className="h-full w-full md:w-auto"
							size="lg"
							onPress={() => remove(ingredientIndex)}
						/>
					</motion.div>
				))}
			</AnimatePresence>
		</div>
	);
};
