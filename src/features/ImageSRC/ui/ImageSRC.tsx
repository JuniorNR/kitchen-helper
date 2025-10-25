import Image, { type ImageProps } from 'next/image';
import type { FC } from 'react';
import { apiConfig } from '@/configs';

export const ImageSRC: FC<ImageProps & { default?: boolean }> = (props) => {
	const base = `${apiConfig.isProd ? apiConfig.APP_BACKEND_URL_PROD : apiConfig.APP_BACKEND_URL}/storage/`;
	const { sizes, ...rest } = props;
	const isFill = (rest as ImageProps).fill === true;
	const computedSizes = isFill ? (sizes ?? '100vw') : sizes;
	return (
		<div className="relative w-full h-full flex items-center justify-center">
			{props.default ? (
				<Image
					{...(rest as ImageProps)}
					sizes={computedSizes}
					placeholder="empty"
					src={props.src}
				/>
			) : (
				<Image
					{...(rest as ImageProps)}
					sizes={computedSizes}
					placeholder="empty"
					loader={() => `${base}${String(props.src)}`}
				/>
			)}
		</div>
	);
};
