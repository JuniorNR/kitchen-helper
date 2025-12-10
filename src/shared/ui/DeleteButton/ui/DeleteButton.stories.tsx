import type { Meta, StoryObj } from '@storybook/react';
import { DeleteButton } from './DeleteButton';

const meta = {
	title: 'Shared/Ui/DeleteButton',
	component: DeleteButton,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		ariaLabel: 'Delete item',
		size: 'md',
	},
	argTypes: {
		className: { control: 'text' },
		onPress: { action: 'pressed' },
		size: {
			control: 'radio',
			options: ['sm', 'md', 'lg'],
		},
		isLoading: { control: 'boolean' },
		isDisabled: { control: 'boolean' },
	},
} satisfies Meta<typeof DeleteButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const IconOnly: Story = {};

export const WithLabel: Story = {
	args: {
		label: 'Удалить',
	},
};

export const Disabled: Story = {
	args: {
		label: 'Удалить',
		isDisabled: true,
	},
};

export const Loading: Story = {
	args: {
		label: 'Удаление...',
		isLoading: true,
	},
};
