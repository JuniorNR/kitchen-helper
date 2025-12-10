import { Button } from '@heroui/button';
import type { Meta, StoryObj } from '@storybook/react';
import { Modal } from './Modal';

const meta = {
	title: 'Shared/Ui/Modal',
	component: Modal,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: ['TriggerComponent', 'onConfirm'],
		},
	},
	args: {
		title: 'Подтверждение действия',
		description: 'Вы уверены, что хотите выполнить это действие?',
		onConfirm: () => {},
	},
	argTypes: {
		title: { control: 'text' },
		subtitle: { control: 'text' },
		description: { control: 'text' },
		accentItemTitle: { control: 'text' },
		warningFields: { control: 'object' },
		isLoading: { control: 'boolean' },
		confirmButtonText: { control: 'text' },
		confirmButtonColor: {
			control: 'select',
			options: ['primary', 'secondary', 'danger', 'warning', 'success'],
		},
		confirmButtonVariant: {
			control: 'select',
			options: ['solid', 'outline', 'ghost', 'link', 'shadow'],
		},
	},
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		title: 'Подтверждение действия',
		description: 'Вы уверены, что хотите выполнить это действие?',
		onConfirm: () => {
			console.log('Подтверждено');
		},
	},
};

export const WithSubtitle: Story = {
	args: {
		title: 'Удаление элемента',
		subtitle: 'Это действие нельзя отменить',
		description: 'Вы уверены, что хотите удалить этот элемент?',
		onConfirm: () => {
			console.log('Удалено');
		},
	},
};

export const WithAccentItem: Story = {
	args: {
		title: 'Удаление рецепта',
		description: 'Вы уверены, что хотите удалить этот рецепт?',
		accentItemTitle: 'Борщ украинский',
		onConfirm: () => {
			console.log('Рецепт удален');
		},
	},
};

export const WithWarning: Story = {
	args: {
		title: 'Удаление ингредиента',
		description: 'Этот ингредиент используется в нескольких рецептах.',
		warningFields: [
			'Ингредиент используется в 5 рецептах',
			'После удаления рецепты будут недоступны',
		],
		onConfirm: () => {
			console.log('Ингредиент удален');
		},
	},
};

export const WithCustomTrigger: Story = {
	args: {
		title: 'Модальное окно',
		description: 'Это модальное окно с кастомной кнопкой триггера',
		TriggerComponent: ({ onPress }) => (
			<Button color="danger" onPress={onPress}>
				Открыть модальное окно
			</Button>
		),
		onConfirm: () => {
			console.log('Подтверждено');
		},
	},
};

export const Loading: Story = {
	args: {
		title: 'Сохранение данных',
		description: 'Пожалуйста, подождите...',
		isLoading: true,
		onConfirm: () => {
			console.log('Сохранено');
		},
	},
};

export const DangerAction: Story = {
	args: {
		title: 'Опасное действие',
		description: 'Это действие может привести к необратимым последствиям.',
		confirmButtonColor: 'danger',
		confirmButtonText: 'Удалить навсегда',
		onConfirm: () => {
			console.log('Удалено');
		},
	},
};
