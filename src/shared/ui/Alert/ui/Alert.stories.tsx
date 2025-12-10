import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
	title: 'Shared/Ui/Alert',
	component: Alert,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		className: 'w-[400px]',
	},
	argTypes: {
		className: { control: 'text' },
	},
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Default',
		description: 'Default description',
		status: 'default',
	},
};

export const Success: Story = {
	args: {
		title: 'Success',
		description: 'Success description',
		status: 'success',
	},
};

export const Warning: Story = {
	args: {
		title: 'Warning',
		description: 'Warning description',
		status: 'warning',
	},
};

export const Danger: Story = {
	args: {
		title: 'Danger',
		description: 'Danger description',
		status: 'danger',
	},
};

export const Info: Story = {
	args: {
		title: 'Info',
		description: 'Info description',
		status: 'info',
	},
};
