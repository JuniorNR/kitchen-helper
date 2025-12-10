import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PriceInput } from './PriceInput';

const meta = {
	title: 'Shared/Ui/PriceInput',
	component: PriceInput,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: [
				'onPriceChange',
				'onPriceUnitChange',
				'value',
				'priceUnit',
				'labelPlacement',
				'fullWidth',
				'isClearable',
				'disableAnimation',
				'as',
			],
		},
	},
	args: {
		value: 100,
		priceUnit: 'USD',
		onPriceChange: () => {},
		onPriceUnitChange: () => {},
	},
	argTypes: {
		size: {
			control: 'select',
			options: ['sm', 'md', 'lg'],
		},
		isDisabled: { control: 'boolean' },
		isRequired: { control: 'boolean' },
		isInvalid: { control: 'boolean' },
		errorMessage: { control: 'text' },
		description: { control: 'text' },
	},
} satisfies Meta<typeof PriceInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		value: 100,
		priceUnit: 'USD',
		onPriceChange: () => {},
		onPriceUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 100);
		const [priceUnit, setPriceUnit] = useState(args.priceUnit ?? 'USD');
		return (
			<div className="w-full max-w-md">
				<PriceInput
					{...args}
					value={value}
					priceUnit={priceUnit}
					onPriceChange={setValue}
					onPriceUnitChange={setPriceUnit}
				/>
			</div>
		);
	},
};

export const WithValue: Story = {
	args: {
		value: 1500,
		priceUnit: 'RUB',
		onPriceChange: () => {},
		onPriceUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 1500);
		const [priceUnit, setPriceUnit] = useState(args.priceUnit ?? 'RUB');
		return (
			<div className="w-full max-w-md">
				<PriceInput
					{...args}
					value={value}
					priceUnit={priceUnit}
					onPriceChange={setValue}
					onPriceUnitChange={setPriceUnit}
				/>
			</div>
		);
	},
};

export const Sizes: Story = {
	args: {
		onPriceChange: () => {},
		onPriceUnitChange: () => {},
	},
	render: () => {
		const [value1, setValue1] = useState(100);
		const [unit1, setUnit1] = useState('USD');
		const [value2, setValue2] = useState(100);
		const [unit2, setUnit2] = useState('USD');
		const [value3, setValue3] = useState(100);
		const [unit3, setUnit3] = useState('USD');
		return (
			<div className="flex flex-col gap-4 w-full max-w-md">
				<PriceInput
					size="sm"
					value={value1}
					priceUnit={unit1}
					onPriceChange={setValue1}
					onPriceUnitChange={setUnit1}
				/>
				<PriceInput
					size="md"
					value={value2}
					priceUnit={unit2}
					onPriceChange={setValue2}
					onPriceUnitChange={setUnit2}
				/>
				<PriceInput
					size="lg"
					value={value3}
					priceUnit={unit3}
					onPriceChange={setValue3}
					onPriceUnitChange={setUnit3}
				/>
			</div>
		);
	},
};

export const WithError: Story = {
	args: {
		value: 0,
		priceUnit: 'USD',
		isInvalid: true,
		errorMessage: 'Цена должна быть больше 0',
		onPriceChange: () => {},
		onPriceUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 0);
		const [priceUnit, setPriceUnit] = useState(args.priceUnit ?? 'USD');
		return (
			<div className="w-full max-w-md">
				<PriceInput
					{...args}
					value={value}
					priceUnit={priceUnit}
					onPriceChange={setValue}
					onPriceUnitChange={setPriceUnit}
				/>
			</div>
		);
	},
};

export const Disabled: Story = {
	args: {
		value: 500,
		priceUnit: 'EUR',
		isDisabled: true,
		onPriceChange: () => {},
		onPriceUnitChange: () => {},
	},
	render: (args) => {
		const [value, setValue] = useState(args.value ?? 500);
		const [priceUnit, setPriceUnit] = useState(args.priceUnit ?? 'EUR');
		return (
			<div className="w-full max-w-md">
				<PriceInput
					{...args}
					value={value}
					priceUnit={priceUnit}
					onPriceChange={setValue}
					onPriceUnitChange={setPriceUnit}
				/>
			</div>
		);
	},
};
