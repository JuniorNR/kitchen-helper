import type { FC } from 'react';
import { Controller, useFieldArray } from 'react-hook-form';
import { ImagesPick } from '@/shared/ui';
import type { RecipeCreateFormInputType } from '../model/recipeCreate.schema';
import type { RecipeCreateImagesProps } from '../model/recipeCreate.types';

export const RecipeCreateImages: FC<RecipeCreateImagesProps> = ({
	control,
}) => {
	const { update } = useFieldArray<RecipeCreateFormInputType>({
		control,
		name: 'images',
	});

	const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (event.target.files !== null && (event.target.files.length ?? 0)) {
			for (let i = 0; i < event.target.files.length; i++) {
				update(i, {
					isMain: i === 0,
					file: event.target.files[i],
					position: i + 1,
				});
			}
		}
	};

	return (
		<div>
			<Controller
				control={control}
				name="images"
				render={() => <ImagesPick onChange={handleFilesSelected} />}
			/>
		</div>
	);
};

// {
// 	isMain: true,
// 	path: '/test.png',
// 	position: 1,
// },
