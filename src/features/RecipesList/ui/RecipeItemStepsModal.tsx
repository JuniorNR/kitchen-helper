import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/modal';
import { type FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Ingredient } from '@/entities';
import { Typography } from '@/shared/ui';
import { CheckIcon } from '@/shared/ui/icons/checkIcon';
import type { RecipeItemStepsModalProps } from '../model/recipeList.types';
import { getStepMinutes } from '../model/recipeList.utils';
import { RecipeItemStepsModalIngredientCard } from './RecipeItemStepsModalIngredientCard';

export const RecipeItemStepsModal: FC<RecipeItemStepsModalProps> = ({
	className = '',
	recipeSteps,
	title,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { t: tCommon } = useTranslation('common');
	const { t: tRecipes } = useTranslation('recipes');
	const { t: tFields } = useTranslation('fields');
	const [activeIngredientData, setActiveIngredientData] =
		useState<Ingredient | null>(null);
	const [activeStepId, setActiveStepId] = useState<number | null>(null);

	useEffect(() => {
		if (recipeSteps?.length) {
			setActiveStepId(recipeSteps[0]?.id ?? null);
		}
		return () => {
			setActiveIngredientData(null);
			setActiveStepId(null);
		};
	}, [recipeSteps]);

	const totalMinutes = useMemo(
		() =>
			recipeSteps.reduce((sum, step) => sum + getStepMinutes(step.duration), 0),
		[recipeSteps],
	);

	const activeStepIndex = useMemo(
		() => recipeSteps.findIndex((s) => s.id === activeStepId),
		[recipeSteps, activeStepId],
	);

	const handleChangeActiveIngredient = (
		ingredient: Ingredient,
		stepId?: number,
	) => {
		if (ingredient.id === activeIngredientData?.id) {
			setActiveIngredientData(null);
		} else {
			setActiveIngredientData(ingredient);
		}
		if (stepId) setActiveStepId(stepId);
	};
	const handleSelectStep = (stepId: number) => setActiveStepId(stepId);

	return (
		<div className={`relative ${className}`}>
			<Button
				className="w-full dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-300"
				size="sm"
				variant="flat"
				color="primary"
				onPress={onOpen}
			>
				{title}
			</Button>
			<Modal
				isOpen={isOpen}
				onOpenChange={onOpenChange}
				backdrop="blur"
				size="4xl"
			>
				<ModalContent className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-gradient-to-br from-white to-neutral-50/70 dark:from-neutral-900 dark:to-neutral-950">
					<ModalHeader className="flex flex-col gap-2 px-6 pt-5 pb-3 pr-10">
						<div className="flex items-start justify-between gap-4">
							<Typography component="h2">{title}</Typography>
							<div className="flex gap-2 flex-col sm:flex-row items-end sm:items-center">
								<span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300">
									{tFields('total_steps')}: {recipeSteps.length}
								</span>
								<span className="inline-flex items-center gap-1 rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 px-2.5 py-1 text-xs text-neutral-700 dark:text-neutral-300">
									{tCommon('fields.duration')}: {totalMinutes}{' '}
									{tCommon('time.minute_short')}
								</span>
							</div>
						</div>

						{recipeSteps.length > 1 ? (
							<div className="flex items-center gap-1.5">
								{recipeSteps.map((step, idx) => (
									<span
										key={step.id}
										className={
											'h-1.5 rounded-full transition-colors w-full ' +
											(idx <= (activeStepIndex ?? -1)
												? 'bg-primary-400'
												: 'bg-primary-200 dark:bg-primary-100')
										}
									/>
								))}
							</div>
						) : null}
					</ModalHeader>
					<Divider />
					<ModalBody className="px-6 py-4">
						<div className="grid grid-cols-1 md:grid-cols-12 gap-5">
							<div className="md:col-span-7 lg:col-span-8">
								<div className="space-y-4 max-h-[60vh] md:max-h-[65vh] overflow-y-auto pr-1">
									{recipeSteps.map((step) => {
										const isActive = step.id === activeStepId;
										const minutes = getStepMinutes(step.duration);
										return (
											<div
												key={step.id}
												className={
													'rounded-xl border px-4 py-3 transition-colors overflow-hidden ' +
													(isActive
														? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 dark:border-primary-700'
														: 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-900')
												}
											>
												<div className="flex items-center justify-between gap-3">
													<Typography component="h3" tooltip lineClamp={1}>
														{tCommon('fields.step')} {String(step.order)} — «
														{step.title}»
													</Typography>
													<div className="flex items-center gap-2 shrink-0">
														<span className="inline-flex items-center rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 px-2 py-0.5 text-xs text-neutral-700 dark:text-neutral-300">
															{minutes} {tCommon('time.minute_short')}
														</span>
														<Button
															aria-label={tCommon('accept')}
															isIconOnly
															radius="full"
															variant={isActive ? 'solid' : 'bordered'}
															size="sm"
															color={isActive ? 'primary' : 'secondary'}
															onPress={() => handleSelectStep(step.id)}
															className={
																isActive
																	? 'shadow-lg shadow-primary-500/30 ring-2 ring-primary-500'
																	: 'opacity-85 hover:opacity-100 w-8 h-8'
															}
														>
															<CheckIcon width={16} height={16} />
														</Button>
													</div>
												</div>
												<Typography hideLargeText>
													{step.description}
												</Typography>
												{step.ingredients?.length ? (
													<div className="mt-3 flex gap-2 flex-wrap">
														{step.ingredients.map((ingredient) => (
															<Button
																className="text-wrap"
																key={ingredient.id}
																color={
																	activeIngredientData?.id === ingredient.id
																		? 'primary'
																		: 'secondary'
																}
																variant="shadow"
																size="sm"
																onPress={() => {
																	handleChangeActiveIngredient(
																		ingredient,
																		step.id,
																	);
																}}
															>
																{ingredient.title}
															</Button>
														))}
													</div>
												) : null}
											</div>
										);
									})}
								</div>
							</div>
							<div className="md:col-span-5 lg:col-span-4">
								{activeIngredientData ? (
									<RecipeItemStepsModalIngredientCard
										ingredient={activeIngredientData}
										onClose={() => setActiveIngredientData(null)}
									/>
								) : (
									<div className="text-center p-1 h-full min-h-40 rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
										{tRecipes('titles.select_ingredient_to_see_details')}
									</div>
								)}
							</div>
						</div>
					</ModalBody>
					<Divider />
					<ModalFooter className="px-6 pb-5 pt-3">
						<Button color="primary" fullWidth onPress={onOpenChange}>
							{tCommon('close')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</div>
	);
};
