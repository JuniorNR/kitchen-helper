import { Button } from '@heroui/button';
import { Card, CardBody, CardHeader } from '@heroui/card';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { type FC, useCallback } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useMarket } from '@/entities';
import { CustomInput, ImagesPick, Typography } from '@/shared/ui';
import type { MarketCreateFormProps } from '../model/MarketCreate.types';
import {
	createMarketCreateSchema,
	type MarketCreateSchemaType,
} from '../model/marketCreate.schema';
import { introduction } from '../model/marketCreate.utils';

export const MarketCreateForm: FC<MarketCreateFormProps> = ({
	setIsCreated,
}) => {
	const { t: tMarkets } = useTranslation('markets');
	const { t: tValidation } = useTranslation('validation');
	const { t: tFields } = useTranslation('fields');

	const { control, handleSubmit } = useForm<MarketCreateSchemaType>({
		resolver: zodResolver(createMarketCreateSchema(tValidation)),
		defaultValues: {
			title: '',
			description: '',
			story: '',
			factsAboutSeller: '',
			themesOfMarket: '',
			images: [],
		},
	});

	const { createMarketData, isCreating } = useMarket({});

	const { replace } = useFieldArray<MarketCreateSchemaType>({
		control,
		name: 'images',
	});

	const onSubmit = async (data: MarketCreateSchemaType) => {
		const result = await createMarketData(data);
		if (result?.code === 'MARKET_CREATED') setIsCreated(true);
	};

	const sharedInputProps = {
		variant: 'flat' as const,
		radius: 'md' as const,
		size: 'lg' as const,
	};

	const handleFilesChange = useCallback(
		(files: File[]) => {
			replace(
				files.map((file, index) => ({
					isMain: index === 0,
					file,
					position: index,
				})),
			);
		},
		[replace],
	);

	return (
		<div className="relative flex justify-center py-10">
			<Card
				radius="lg"
				shadow="lg"
				className="w-full max-w-5xl border border-default-200/60 bg-background/80 backdrop-blur"
			>
				<CardHeader className="flex flex-col gap-3 pb-2">
					<div className="flex w-full items-center justify-between gap-4">
						<div className="flex items-center gap-3">
							<div className="flex flex-col gap-1">
								<Typography
									component="h2"
									classNameComponent="text-xl font-semibold text-foreground"
								>
									{tMarkets('create.creating_market_title')}
								</Typography>
								<Typography classNameComponent="text-sm text-default-500">
									{tMarkets('create.creating_market_description')}
								</Typography>
							</div>
						</div>
					</div>
					<div className="grid w-full gap-3 sm:grid-cols-3 cursor-default">
						{introduction(tMarkets).map((item) => (
							<div
								key={item.title}
								className="rounded-xl border border-default-200/70 bg-content2/60 px-4 py-3"
							>
								<Typography classNameComponent="font-semibold">
									{item.title}
								</Typography>
								<Typography classNameComponent="text-xs text-default-500">
									{item.text}
								</Typography>
							</div>
						))}
					</div>
				</CardHeader>
				<Divider />
				<CardBody className="flex flex-col px-3 pb-2 pt-6">
					<Form
						className="grid gap-2 md:grid-cols-2"
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className="md:col-span-2">
							<Controller
								control={control}
								name="title"
								render={({ field, fieldState }) => (
									<CustomInput
										label={tFields('market.title')}
										placeholder={tFields('market.title_example')}
										description={tFields('market.title_description')}
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										{...sharedInputProps}
										{...field}
									/>
								)}
							/>
						</div>

						<div className="md:col-span-2">
							<Controller
								control={control}
								name="images"
								render={() => {
									return (
										<ImagesPick
											maxImages={5}
											variant="bordered"
											onFilesChange={handleFilesChange}
										/>
									);
								}}
							/>
						</div>

						<div className="md:col-span-2">
							<Controller
								control={control}
								name="description"
								render={({ field, fieldState }) => (
									<CustomInput
										label={tFields('market.description')}
										placeholder={tFields('market.description_example')}
										description={tFields('market.description_description')}
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										{...sharedInputProps}
										{...field}
									/>
								)}
							/>
						</div>

						<div className="md:col-span-2">
							<Controller
								control={control}
								name="story"
								render={({ field, fieldState }) => (
									<CustomInput
										label={tFields('market.story')}
										placeholder={tFields('market.story_example')}
										description={tFields('market.story_description')}
										isInvalid={fieldState.invalid}
										errorMessage={fieldState.error?.message}
										{...sharedInputProps}
										{...field}
									/>
								)}
							/>
						</div>

						<Controller
							control={control}
							name="factsAboutSeller"
							render={({ field, fieldState }) => (
								<CustomInput
									label={tFields('market.facts_about_seller')}
									placeholder={tFields('market.facts_about_seller_example')}
									description={tFields('market.facts_about_seller_description')}
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
									{...sharedInputProps}
									{...field}
								/>
							)}
						/>

						<Controller
							control={control}
							name="themesOfMarket"
							render={({ field, fieldState }) => (
								<CustomInput
									label={tFields('market.themes_of_market')}
									placeholder={tFields('market.themes_of_market_example')}
									description={tFields('market.themes_of_market_description')}
									isInvalid={fieldState.invalid}
									errorMessage={fieldState.error?.message}
									{...sharedInputProps}
									{...field}
								/>
							)}
						/>

						<div className="md:col-span-2 flex flex-wrap gap-3 justify-end">
							<Button
								variant="bordered"
								color="default"
								className="font-semibold"
								type="button"
							>
								{tMarkets('create.save_draft')}
							</Button>
							<Button
								type="submit"
								variant="shadow"
								color="primary"
								className="font-semibold"
								isLoading={isCreating}
							>
								{tMarkets('create.publish_store')}
							</Button>
						</div>
					</Form>
				</CardBody>
			</Card>
		</div>
	);
};
