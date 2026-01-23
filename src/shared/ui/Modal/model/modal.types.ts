export interface ModalProps {
	title: string;
	description?: string;
	children?: React.ReactElement;
	subtitle?: string;
	accentItemTitle?: string;
	warningFields?: string[];
	isLoading?: boolean;
	disabled?: boolean;
	TriggerComponent?:
		| React.ComponentType<{ onPress: () => void }>
		| ((props: { onPress: () => void }) => React.ReactElement);
	confirmButtonText?: string;
	confirmButtonColor?:
		| 'primary'
		| 'secondary'
		| 'danger'
		| 'warning'
		| 'success';
	confirmButtonVariant?: 'solid' | 'outline' | 'ghost' | 'link' | 'shadow';
	confirmButtonStartContent?: React.ReactNode;
	onConfirm: () => void;
}
