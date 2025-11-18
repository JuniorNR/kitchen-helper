export interface ModalProps {
	title: string;
	description: string;
	subtitle?: string;
	accentItemTitle?: string;
	warningFields?: string[];
	onConfirm: () => void;
	isLoading?: boolean;
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
}
