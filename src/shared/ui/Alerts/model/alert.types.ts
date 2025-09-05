export interface AlertsProps {
	alerts: AlertType[];
	autoCloseMS?: number;
}

export interface AlertType {
	id: string;
	status: 'success' | 'danger' | 'warning' | 'info' | 'default';
	title: string;
	description: string;
}
