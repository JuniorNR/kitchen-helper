import Image, { type ImageProps } from 'next/image';
import type { FC } from 'react';

export const ImageSRC: FC<ImageProps> = (props) => {
	// const base = `${process.env.NEXT_PUBLIC_PROD ? process.env.NEXT_PUBLIC_API_URL_PROD_STORAGE : process.env.NEXT_PUBLIC_API_URL_DEV_STORAGE}`;
	const base =
		'https://kitchen-helper-server-production.up.railway.app/storage/';
	const { sizes, ...rest } = props;
	const isFill = (rest as ImageProps).fill === true;
	const computedSizes = isFill ? (sizes ?? '100vw') : sizes;
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			<Image
				{...(rest as ImageProps)}
				sizes={computedSizes}
				loader={() => `${base}${String(props.src)}`}
			/>
		</div>
	);
};
