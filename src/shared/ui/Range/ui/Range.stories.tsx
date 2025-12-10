import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Range } from './Range';

const meta = {
	title: 'Shared/Ui/Range',
	component: Range,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: ['onChange', 'onChangeEnd', 'onChangeStart', 'className'],
		},
	},
	args: {
		label: 'Диапазон',
		defaultValue: [20, 80],
		minValue: 0,
		maxValue: 100,
		step: 1,
	},
	argTypes: {
		label: { control: 'text' },
		minValue: { control: 'number' },
		maxValue: { control: 'number' },
		step: { control: 'number' },
		isDisabled: { control: 'boolean' },
		showSteps: { control: 'boolean' },
		showTooltip: { control: 'boolean' },
		formatOptions: { control: 'object' },
	},
} satisfies Meta<typeof Range>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		label: 'Диапазон значений',
		defaultValue: [20, 80],
		minValue: 0,
		maxValue: 100,
		step: 1,
	},
	render: (args) => (
		<div className="w-[400px] max-w-3xl">
			<Range {...args} />
		</div>
	),
};

export const SingleValue: Story = {
	args: {
		label: 'Одно значение',
		defaultValue: 50,
		minValue: 0,
		maxValue: 100,
		step: 1,
	},
	render: (args) => (
		<div className="w-[400px] max-w-3xl">
			<Range {...args} />
		</div>
	),
};

export const WithSteps: Story = {
	args: {
		label: 'С шагами',
		defaultValue: [25, 75],
		minValue: 0,
		maxValue: 100,
		step: 10,
		showSteps: true,
	},
	render: (args) => (
		<div className="w-[400px] max-w-3xl">
			<Range {...args} />
		</div>
	),
};

export const WithTooltip: Story = {
	args: {
		label: 'С подсказкой',
		defaultValue: [30, 70],
		minValue: 0,
		maxValue: 100,
		step: 1,
		showTooltip: true,
	},
	render: (args) => (
		<div className="w-[400px] max-w-3xl">
			<Range {...args} />
		</div>
	),
};

export const PriceRange: Story = {
	args: {
		label: 'Диапазон цен',
		defaultValue: [100, 1000],
		minValue: 0,
		maxValue: 5000,
		step: 50,
		formatOptions: {
			style: 'currency',
			currency: 'RUB',
		},
		showTooltip: true,
	},
	render: (args) => (
		<div className="w-[400px] max-w-3xl">
			<Range {...args} />
		</div>
	),
};

export const Disabled: Story = {
	args: {
		label: 'Отключен',
		defaultValue: [40, 60],
		minValue: 0,
		maxValue: 100,
		step: 1,
		isDisabled: true,
	},
	render: (args) => (
		<div className="w-[400px] max-w-3xl">
			<Range {...args} />
		</div>
	),
};

export const Controlled: Story = {
	render: () => {
		const [value, setValue] = useState([30, 70]);
		return (
			<div className="w-[400px] max-w-3xl">
				<Range
					label="Управляемый диапазон"
					value={value}
					onChange={(val) => setValue(val as number[])}
					minValue={0}
					maxValue={100}
					step={1}
					showTooltip
				/>
				<div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
					Значение: {value[0]} - {value[1]}
				</div>
			</div>
		);
	},
};
