import { Button } from '@heroui/button';
import { Input } from '@heroui/input';
import Image from 'next/image';
import { type ChangeEvent, type FC, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { addAlert } from '@/features';
import { useAppDispatch } from '@/shared/lib/hooks';
import { DeleteButton, Typography } from '@/shared/ui';
import { PhotoIcon } from '../../icons/photoIcon';
import type { ImagesPickProps } from '../model/ImagesPick.types';
import { imagesPickMiddleware } from '../model/imagesPick.utils';
import styles from './imagesPick.module.scss';

export const ImagesPick: FC<ImagesPickProps> = ({
	maxImages = 5,
	onFilesChange,
}) => {
	const inputSelectRef = useRef<HTMLInputElement | null>(null);
	const { t: tValidation } = useTranslation('validation');
	const dispatch = useAppDispatch();
	const [images, setImages] = useState<Array<{ file: File; preview: string }>>(
		[],
	);

	useEffect(() => {
		onFilesChange?.(images.map((image) => image.file));
	}, [images, onFilesChange]);

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const newFiles = Array.from(event.target.files ?? []);
		const totalImages = [...images.map((image) => image.file), ...newFiles];
		const { isValid, errorMessage } = imagesPickMiddleware({
			target: totalImages,
			options: {
				maxImages,
			},
		});
		if (isValid) {
			const addedFiles = newFiles.map((file) => ({
				file,
				preview: URL.createObjectURL(file),
			}));

			setImages((prev) => {
				const bothImages = [...prev, ...addedFiles];
				return bothImages;
			});
		} else {
			dispatch(
				addAlert({
					id: '1',
					status: 'info',
					title: 'info',
					customDescription: Boolean(errorMessage?.length),
					description: errorMessage?.length
						? tValidation(errorMessage, {
								totalImages: totalImages.length,
								maxImages,
							})
						: 'UNKNOWN_ERROR',
				}),
			);
		}
	};

	const handleDelete = (preview: string) => {
		setImages((prev) => {
			const filteredImages = prev.filter((blob) => blob.preview !== preview);
			return filteredImages;
		});
	};

	const isDisabled = () => {
		return maxImages >= images.length;
	};

	return (
		<div className={`${styles.imagesPick} p-3 border-1 rounded-2xl`}>
			<Input
				type="file"
				accept="image/*"
				multiple
				ref={inputSelectRef}
				onChange={(event) => handleChange(event)}
				className="hidden"
			/>
			{images.length === 0 && (
				<Button
					className={styles.button}
					type="button"
					onPress={() => inputSelectRef.current?.click()}
				>
					<PhotoIcon className="w-full" />
				</Button>
			)}
			{images.length > 0 && (
				<ul
					className={`${styles.imagesItems} lg:flex-nowrap lg:justify-between`}
				>
					<li>
						<Button
							className={styles.button}
							type="button"
							onPress={() => inputSelectRef.current?.click()}
							disabled={isDisabled()}
						>
							<PhotoIcon className="w-full" />
							<Typography>{`${images.length} of ${maxImages}`}</Typography>
						</Button>
					</li>
					{images.map((image) => (
						<li key={image.preview}>
							<div className={`${styles.imagesItem}`}>
								<DeleteButton
									className={styles.imagesDeleteButton}
									size="sm"
									onPress={() => {
										handleDelete(image.preview);
									}}
								/>
								<Image
									src={image.preview}
									alt="preview"
									width={80}
									height={80}
									className="h-25 w-25 rounded-2xl object-cover"
								/>
							</div>
						</li>
					))}
				</ul>
			)}
			{/* <div className="mt-2 flex flex-wrap gap-2">
				{images.length > 0 && (
					<>
						{images.map((image) => (
							<div key={image.preview} className={classNames(styles.previews)}>
								<DeleteButton
									className={classNames(styles.deleteButton, {}, [
										'top-1 right-1 opacity-0',
									])}
									size="sm"
									onPress={() => {
										handleDelete(image.preview);
									}}
								/>
								<Image
									src={image.preview}
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
							disabled={images.length >= maxImages}
							onClick={() => inputSelectRef.current?.click()}
						>
							<PhotoIcon className="w-full" />
						</button>
					</>
				)}
			</div> */}
		</div>
	);
};
