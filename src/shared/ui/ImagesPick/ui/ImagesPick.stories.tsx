import type { Meta, StoryObj } from '@storybook/react';
import { ImagesPick } from './ImagesPick';

const meta = {
	title: 'Shared/Ui/ImagesPick',
	component: ImagesPick,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: [
				'onChange',
				'color',
				'variant',
				'size',
				'radius',
				'labelPlacement',
				'fullWidth',
				'isClearable',
				'disableAnimation',
				'as',
			],
		},
	},
	args: {
		maxImages: 5,
	},
	argTypes: {
		maxImages: { control: 'number' },
		errorMessage: { control: 'text' },
	},
} satisfies Meta<typeof ImagesPick>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		maxImages: 5,
	},
};

export const WithError: Story = {
	args: {
		maxImages: 5,
		errorMessage: 'Ошибка загрузки изображения',
	},
};
