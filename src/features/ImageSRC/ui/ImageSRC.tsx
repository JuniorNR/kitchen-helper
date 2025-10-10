import Image, { type ImageProps } from 'next/image';
import type { FC } from 'react';

export const ImageSRC: FC<ImageProps> = (props) => {
	const src = 'http://127.0.0.1:8000/storage/';
	return (
		<div className="w-full h-full flex items-center justify-center">
			<Image
				{...props}
				loader={() => {
					return `${src}${props.src}`;
				}}
			/>
		</div>
	);
};
