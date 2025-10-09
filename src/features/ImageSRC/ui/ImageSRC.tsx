import Image, { type ImageProps } from 'next/image';
import type { FC } from 'react';

export const ImageSRC: FC<ImageProps> = (props) => {
	const src = 'http://127.0.0.1:8000/storage/';
	return (
		<div>
			<Image
				{...props}
				loader={() => {
					return `${src}${props.src}`;
				}}
				src={`${src}${props.src}`}
			/>
		</div>
	);
};
