export interface ImagesPickProps {
	maxImages?: number;
	onFilesChange?: (files: File[]) => void;
}

export interface ImagesPickMiddlewareProps {
	target: File[];
	options: {
		maxImages: number;
	};
}

export interface ImagesPickMiddlewareReturn {
	isValid: boolean;
	errorMessage?: string;
}
