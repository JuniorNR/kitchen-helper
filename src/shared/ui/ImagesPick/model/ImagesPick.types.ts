import type { InputProps } from '@heroui/input';

export interface ImagesPickProps extends InputProps {
	maxImages?: number;
	errorMessage?: string;
}
