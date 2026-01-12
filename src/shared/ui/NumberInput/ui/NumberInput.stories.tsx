import type { Meta, StoryObj } from '@storybook/react';
import { NumberInput } from './NumberInput';

const meta = {
	title: 'Shared/Ui/NumberInput',
	component: NumberInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: [
				'onValueChange',
				'onChange',
				'onBlur',
				'onFocus',
				'className',
				'classNames',
				'ref',
				'as',
				'labelPlacement',
				'hideLabel',
				'hideErrorMessage',
				'disableAnimation',
				'as',
			],
		},
	},
	args: {
		label: 'Количество',
		placeholder: 'Введите число',
	},
	argTypes: {
		label: { control: 'text' },
		placeholder: { control: 'text' },
		value: { control: 'number' },
		minValue: { control: 'number' },
		maxValue: { control: 'number' },
		step: { control: 'number' },
		isDisabled: { control: 'boolean' },
		isReadOnly: { control: 'boolean' },
		isRequired: { control: 'boolean' },
		isInvalid: { control: 'boolean' },
		description: { control: 'text' },
		errorMessage: { control: 'text' },
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		variant: {
			control: 'select',
			options: ['flat', 'bordered', 'faded', 'underlined'],
		},
		color: {
			control: 'select',
			options: [
				'default',
				'primary',
				'secondary',
				'success',
				'warning',
				'danger',
			],
		},
		radius: {
			control: 'select',
			options: ['none', 'sm', 'md', 'lg', 'full'],
		},
		fullWidth: { control: 'boolean' },
	},
} satisfies Meta<typeof NumberInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Количество',
		placeholder: 'Введите число',
	},
};

export const WithValue: Story = {
	args: {
		label: 'Количество',
		value: 10,
		placeholder: 'Введите число',
	},
};

export const WithMinMax: Story = {
	args: {
		label: 'Количество',
		placeholder: 'Введите число от 1 до 100',
		minValue: 1,
		maxValue: 100,
	},
};

export const WithStep: Story = {
	args: {
		label: 'Шаг',
		placeholder: 'Введите число',
		step: 5,
		minValue: 0,
		maxValue: 100,
	},
};

export const Disabled: Story = {
	args: {
		label: 'Количество',
		value: 42,
		isDisabled: true,
	},
};

export const ReadOnly: Story = {
	args: {
		label: 'Количество',
		value: 42,
		isReadOnly: true,
	},
};

export const WithError: Story = {
	args: {
		label: 'Количество',
		placeholder: 'Введите число',
		isInvalid: true,
		errorMessage: 'Поле обязательно для заполнения',
	},
};

export const WithDescription: Story = {
	args: {
		label: 'Количество',
		placeholder: 'Введите число',
		description: 'Введите количество от 1 до 100',
	},
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-full max-w-xs">
			<NumberInput label="Маленький" size="sm" placeholder="sm" />
			<NumberInput label="Средний" size="md" placeholder="md" />
			<NumberInput label="Большой" size="lg" placeholder="lg" />
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div className="flex flex-col gap-4 w-full max-w-xs">
			<NumberInput label="Flat" variant="flat" placeholder="flat" />
			<NumberInput label="Bordered" variant="bordered" placeholder="bordered" />
			<NumberInput label="Faded" variant="faded" placeholder="faded" />
			<NumberInput
				label="Underlined"
				variant="underlined"
				placeholder="underlined"
			/>
		</div>
	),
};
