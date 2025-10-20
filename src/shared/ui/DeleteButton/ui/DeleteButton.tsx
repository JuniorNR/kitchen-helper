import { Button } from '@heroui/button';
import type { FC } from 'react';
import { DeleteIcon } from '@/shared/ui/icons/deleteIcon';

export interface DeleteButtonProps {
	ariaLabel?: string;
	label?: string; // optional text label next to icon
	size?: 'sm' | 'md' | 'lg';
	isLoading?: boolean;
	isDisabled?: boolean;
	className?: string;
	onPress?: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({
	ariaLabel = 'Delete',
	label,
	size = 'md',
	isLoading,
	isDisabled,
	className,
	onPress,
}) => {
	const isIconOnly = !label;
	const composedClassName = [
		className ?? '',
		isDisabled ? 'opacity-60 cursor-not-allowed' : '',
	]
		.filter(Boolean)
		.join(' ');

	return (
		<Button
			aria-label={ariaLabel}
			isIconOnly={isIconOnly}
			variant="flat"
			color="danger"
			radius="sm"
			size={size}
			isLoading={isLoading}
			isDisabled={isDisabled}
			className={composedClassName}
			onPress={onPress}
			startContent={!isIconOnly ? <DeleteIcon /> : undefined}
		>
			{isIconOnly ? <DeleteIcon /> : label}
		</Button>
	);
};
