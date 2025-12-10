import type { Meta, StoryObj } from '@storybook/react';
import type { AlertsProps } from '../model/alert.types';
import { Alerts } from './Alerts';

const sampleAlerts: AlertsProps['alerts'] = [
	{
		id: '1',
		status: 'success',
		title: 'success',
		description: 'USER_REGISTERED',
	},
	{
		id: '2',
		status: 'danger',
		title: 'error',
		description: 'ACCESS_DENIED',
	},
	{
		id: '3',
		status: 'warning',
		title: 'warning',
		description: 'UNKNOWN_ERROR',
	},
	{
		id: '4',
		status: 'info',
		title: 'info',
		description: 'INFO',
	},
];

const meta = {
	title: 'Shared/Ui/Alerts',
	component: Alerts,
	tags: ['autodocs'],
	parameters: {
		layout: 'fullscreen',
	},
	args: {
		alerts: sampleAlerts,
	},
	argTypes: {
		className: { control: 'text' },
		autoCloseMS: { control: 'number' },
	},
} satisfies Meta<typeof Alerts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
