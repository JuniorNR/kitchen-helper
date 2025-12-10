import type { Meta, StoryObj } from '@storybook/react';
import { PageInfoBlock } from './PageInfoBlock';

const meta = {
	title: 'Shared/Ui/PageInfoBlock',
	component: PageInfoBlock,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
	},
	args: {
		version: 'v1.0.0',
		titleDescription: 'Новая версия',
		title: 'Добро пожаловать',
		description:
			'Это описание страницы, которое может содержать дополнительную информацию о функциональности или назначении страницы.',
	},
	argTypes: {
		version: { control: 'text' },
		titleDescription: { control: 'text' },
		title: { control: 'text' },
		description: { control: 'text' },
	},
} satisfies Meta<typeof PageInfoBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		version: 'v1.0.0',
		titleDescription: 'Новая версия',
		title: 'Добро пожаловать',
		description:
			'Это описание страницы, которое может содержать дополнительную информацию о функциональности или назначении страницы.',
	},
};
