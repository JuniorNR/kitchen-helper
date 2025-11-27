export interface AlertProps {
	title: string;
	description: string;
	status: 'success' | 'danger' | 'warning' | 'info' | 'default';
	className?: string;
}
