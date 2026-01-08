import type {
	ImagesPickMiddlewareProps,
	ImagesPickMiddlewareReturn,
} from './ImagesPick.types';

export const imagesPickMiddleware = ({
	target,
	options: { maxImages },
}: ImagesPickMiddlewareProps): ImagesPickMiddlewareReturn => {
	let returnObject: ImagesPickMiddlewareReturn = {
		isValid: true,
	};

	if (target.length > maxImages) {
		returnObject = {
			isValid: false,
			errorMessage: 'max_images',
		};
	}

	return returnObject;
};
