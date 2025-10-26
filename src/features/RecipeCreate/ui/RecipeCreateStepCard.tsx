'use client';

import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import { NumberInput } from '@heroui/number-input';
import { motion } from 'framer-motion';
import type { FC } from 'react';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers/classNames';
import { DeleteButton } from '@/shared/ui';
import { DragIcon } from '@/shared/ui/icons/dragIcon';
import type { RecipeCreateStepCardProps } from '../model/recipeCreate.types';
import { RecipeCreateStepIngredients } from './RecipeCreateStepIngredients';
import styles from './recipeCreate.module.scss';

export const RecipeCreateStepCard: FC<RecipeCreateStepCardProps> = ({
	stepIndex,
	control,
	onRemove,
}) => {
	const { t: tFields } = useTranslation('fields');
	const { t: tCommon } = useTranslation('common');

	return (
		<motion.div
			className="bg-content1 border border-default-200 rounded-medium p-3 flex min-w-[calc(100%_-_1rem)] w-[calc(100%_-_1rem)] h-auto xl:min-w-[420px] xl:max-w-[420px] xl:h-[470px] xl:max-h-[470px] flex-col gap-3 shrink-0 snap-start"
			initial={{ opacity: 0, y: -150 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, y: 150 }}
			transition={{ duration: 0.3, ease: 'backIn' }}
		>
			<h3 className="text-lg font-bold">
				{tFields('step')} {stepIndex + 1}
			</h3>
			<div
				className={classNames(styles.scrollYGradient, {}, [
					'flex-col gap-3 flex-grow flex overflow-x-hidden',
				])}
			>
				<Controller
					control={control}
					name={`steps.${stepIndex}.title`}
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
					name={`steps.${stepIndex}.description`}
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
					name={`steps.${stepIndex}.duration`}
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

				<RecipeCreateStepIngredients control={control} stepIndex={stepIndex} />
			</div>
			<div className="flex items-center justify-between gap-2">
				<Button type="button" variant="faded" className="cursor-grab">
					<DragIcon />
					{stepIndex + 1}
				</Button>
				<DeleteButton
					ariaLabel={tCommon('delete')}
					label={tCommon('delete')}
					onPress={onRemove}
				/>
			</div>
		</motion.div>
	);
};
