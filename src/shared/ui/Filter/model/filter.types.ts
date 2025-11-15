import type { PressEvent } from '@heroui/button';

export interface FilterProps {
	children: React.ReactNode;
	badges: Record<string, string | number | Date | string[] | number[]>;
	filterFromLocalStorage: Record<
		string,
		string | number | Date | string[] | number[]
	>;
	onDeleteBadge: (
		key: string,
		value: string | number | Date | string[] | number[],
	) => void;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	onReset?: ((event: PressEvent) => void) | undefined;
	onSave?: ((event: PressEvent) => void) | undefined;
	onCancel?: ((event: PressEvent) => void) | undefined;
	saveDisabled?: boolean;
	submitDisabled?: boolean;
}

export interface FilterBadgeProps {
	children: string;
	withoutDeleteButton?: boolean;
	onDelete?: () => void;
	readOnly?: boolean;
	compact?: boolean;
	className?: string;
}

export interface FilterFormProps {
	isOpen: boolean;
	children: React.ReactNode;
	onSubmit?: React.FormEventHandler<HTMLFormElement>;
	onReset?: ((event: PressEvent) => void) | undefined;
	onSave?: ((event: PressEvent) => void) | undefined;
	onCancel?: ((event: PressEvent) => void) | undefined;
	saveDisabled?: boolean;
	submitDisabled?: boolean;
}

export interface FilterGroupProps {
	children: React.ReactNode;
	title: string;
}
