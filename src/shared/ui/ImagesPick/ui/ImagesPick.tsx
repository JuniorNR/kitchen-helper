import { Input } from '@heroui/input';
import Image from 'next/image';
import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers';
import { DeleteIcon } from '../../icons/deleteIcon';
import { PhotoIcon } from '../../icons/photoIcon';
import type { ImagesPickProps } from '../model/ImagesPick.types';
import styles from './imagesPick.module.scss';

export const ImagesPick: FC<ImagesPickProps> = ({ errorMessage, ...props }) => {
	//TODO: errorMessage add tooltip
	const { t: tRecipes } = useTranslation('recipes');
	const maxImages = props.maxImages ?? 5;
	const inputSelectRef = useRef<HTMLInputElement | null>(null);
	const [previews, setPreviews] = useState<string[]>([]);

	useEffect(() => {
		return () => {
			previews.forEach((url) => {
				URL.revokeObjectURL(url);
			});
		};
	}, [previews]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(event.target.files ?? []).filter((file) =>
			file.type.startsWith('image/'),
		);
		const urls = files.map((image) => URL.createObjectURL(image));
		setPreviews((prev) => {
			if (prev.length + urls.length > maxImages) {
				return [...prev, ...urls.slice(0, maxImages - prev.length)];
			}
			return [...prev, ...urls];
		});
		props.onChange?.(event);
	};

	const handleDelete = (src: string) => {
		setPreviews(previews.filter((image) => image !== src));
	};

	const handleAdd = () => {
		inputSelectRef.current?.click();
	};

	return (
		<div>
			<Input
				type="file"
				accept="image/*"
				multiple
				ref={inputSelectRef}
				{...props}
				onChange={(event) => handleChange(event)}
				className="hidden"
			/>
			<div className="mt-2 flex flex-wrap gap-2">
				{previews.length === 0 && (
					<button
						className={classNames(styles.button, {}, [
							'h-20 w-20 p-2 rounded-md border-1',
							'block max-w-full truncate',
							errorMessage ? 'border-danger-400 text-danger-400' : '',
						])}
						type="button"
						onClick={() => inputSelectRef.current?.click()}
					>
						{/* {tRecipes('buttons.select_images')} */}
						<PhotoIcon className="w-full" />
					</button>
				)}
				{previews.length > 0 && (
					<>
						{previews.map((src) => (
							<div key={src} className={classNames(styles.previews)}>
								<button
									className={classNames(styles.deleteButton, {}, [
										'top-1 right-1 bg-danger-400 p-1 rounded-md opacity-0',
									])}
									type="button"
									onClick={() => {
										handleDelete(src);
									}}
								>
									<DeleteIcon className="h-4 w-4" />
								</button>
								<Image
									src={src}
									alt="preview"
									width={80}
									height={80}
									className="h-20 w-20 rounded object-cover"
								/>
							</div>
						))}
						<button
							className={classNames(styles.button, {}, [
								'h-20 w-20 p-2 rounded-md border-1',
								'block max-w-full truncate',
							])}
							type="button"
							disabled={previews.length >= maxImages}
							onClick={handleAdd}
						>
							{/* {tRecipes('buttons.add_image')} */}
							<PhotoIcon className="w-full" />
						</button>
					</>
				)}
			</div>
		</div>
	);
};
