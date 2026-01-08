import { type FC, useCallback } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { ImagesPick } from '@/shared/ui';
import type { RecipeCreateFormInputType } from '../model/recipeCreate.schema';
import type { RecipeCreateImagesProps } from '../model/recipeCreate.types';

export const RecipeCreateImages: FC<RecipeCreateImagesProps> = ({
	control,
}) => {
	const { replace } = useFieldArray<RecipeCreateFormInputType>({
		control,
		name: 'images',
	});

	const handleFilesSelected = useCallback(
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
		<div>
			<Controller
				control={control}
				name="images"
				render={() => {
					return (
						<div>
							<ImagesPick
								// errorMessage={fieldState.error?.message} TODO: потом добавить
								maxImages={5}
								onFilesChange={handleFilesSelected}
							/>
						</div>
					);
				}}
			/>
		</div>
	);
};
