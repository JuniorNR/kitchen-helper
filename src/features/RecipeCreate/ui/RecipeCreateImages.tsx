import type { FC } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { ImagesPick } from '@/shared/ui';
import type { RecipeCreateFormInputType } from '../model/recipeCreate.schema';
import type { RecipeCreateImagesProps } from '../model/recipeCreate.types';

export const RecipeCreateImages: FC<RecipeCreateImagesProps> = ({
	control,
}) => {
	const { fields, append } = useFieldArray<RecipeCreateFormInputType>({
		control,
		name: 'images',
	});

	const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
		const maxImages = 5;
		const remainingSlots = Math.max(0, maxImages - fields.length);
		if (remainingSlots <= 0) return;

		const files = Array.from(event.target.files ?? []).slice(0, remainingSlots);
		if (files.length === 0) return;

		const startIndex = fields.length;
		files.forEach((file, index) => {
			append({
				isMain: startIndex === 0 && index === 0,
				file,
				position: startIndex + index + 1,
			});
		});
	};

	return (
		<div>
			<Controller
				control={control}
				name="images"
				render={({ fieldState }) => {
					return (
						<div>
							<ImagesPick
								errorMessage={fieldState.error?.message}
								maxImages={5}
								onChange={handleFilesSelected}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
};
