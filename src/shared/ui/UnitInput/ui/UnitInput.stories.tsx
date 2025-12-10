import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { UnitInput } from './UnitInput';

const meta = {
	title: 'Shared/Ui/UnitInput',
	component: UnitInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: [
				'onUnitChange',
				'onUnitUnitChange',
				'value',
				'unit',
				'labelPlacement',
				'fullWidth',
				'isClearable',
				'as',
				'disableAnimation',
			],
		},
	},
	args: {
		value: 1,
		unit: 'kg',
		onUnitChange: () => {},
		onUnitUnitChange: () => {},
	},
	argTypes: {
		isDisabled: { control: 'boolean' },
		isRequired: { control: 'boolean' },
		isInvalid: { control: 'boolean' },
		errorMessage: { control: 'text' },
		description: { control: 'text' },
	},
} satisfies Meta<typeof UnitInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 1,
		unit: 'kg',
		onUnitChange: () => {},
		onUnitUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 1);
		const [unit, setUnit] = useState(args.unit ?? 'kg');
		return (
			<div className="w-full max-w-md">
				<UnitInput
					{...args}
					value={value}
					unit={unit}
					onUnitChange={setValue}
					onUnitUnitChange={setUnit}
				/>
			</div>
		);
	},
};

export const WithValue: Story = {
	args: {
		value: 500,
		unit: 'g',
		onUnitChange: () => {},
		onUnitUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 500);
		const [unit, setUnit] = useState(args.unit ?? 'g');
		return (
			<div className="w-full max-w-md">
				<UnitInput
					{...args}
					value={value}
					unit={unit}
					onUnitChange={setValue}
					onUnitUnitChange={setUnit}
				/>
			</div>
		);
	},
};

export const WithError: Story = {
	args: {
		value: 0,
		unit: 'kg',
		isInvalid: true,
		errorMessage: 'Количество должно быть больше 0',
		onUnitChange: () => {},
		onUnitUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 0);
		const [unit, setUnit] = useState(args.unit ?? 'kg');
		return (
			<div className="w-full max-w-md">
				<UnitInput
					{...args}
					value={value}
					unit={unit}
					onUnitChange={setValue}
					onUnitUnitChange={setUnit}
				/>
			</div>
		);
	},
};

export const Disabled: Story = {
	args: {
		value: 2.5,
		unit: 'kg',
		isDisabled: true,
		onUnitChange: () => {},
		onUnitUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 2.5);
		const [unit, setUnit] = useState(args.unit ?? 'kg');
		return (
			<div className="w-full max-w-md">
				<UnitInput
					{...args}
					value={value}
					unit={unit}
					onUnitChange={setValue}
					onUnitUnitChange={setUnit}
				/>
			</div>
		);
	},
};

export const WithDescription: Story = {
	args: {
		value: 1,
		unit: 'kg',
		description: 'Введите количество и выберите единицу измерения',
		onUnitChange: () => {},
		onUnitUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 1);
		const [unit, setUnit] = useState(args.unit ?? 'kg');
		return (
			<div className="w-full max-w-md">
				<UnitInput
					{...args}
					value={value}
					unit={unit}
					onUnitChange={setValue}
					onUnitUnitChange={setUnit}
				/>
			</div>
		);
	},
};
