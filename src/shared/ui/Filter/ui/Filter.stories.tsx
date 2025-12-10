import { Input } from '@heroui/input';
import { Select, SelectItem } from '@heroui/select';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { FilterProps } from '../model/filter.types';
import { Filter } from './Filter';

const initialBadges = {
	title: 'Томат',
	categories: ['vegetables', 'salads'],
	units: ['kg', 'pcs'],
	type: 'soup',
	ration: 'vegan',
	createdFrom: new Date('2024-03-01'),
};

const storedPreset = {
	title: 'Томат',
	categories: ['vegetables', 'salads'],
	units: ['kg'],
	type: 'soup',
	ration: 'vegan',
	createdFrom: '01.03.2024',
};

const meta = {
	title: 'Shared/Ui/Filter',
	component: Filter,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
	args: {
		badges: initialBadges,
		filterFromLocalStorage: storedPreset,
		saveDisabled: false,
		submitDisabled: false,
	},
	argTypes: {
		onDeleteBadge: { action: 'delete badge' },
		onSubmit: { action: 'submit' },
		onReset: { action: 'reset' },
		onSave: { action: 'save preset' },
		onCancel: { action: 'cancel' },
		saveDisabled: { control: 'boolean' },
		submitDisabled: { control: 'boolean' },
	},
} satisfies Meta<typeof Filter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
	render: (args) => {
		const [badges, setBadges] = useState<FilterProps['badges']>(args.badges);

		const handleDeleteBadge = (
			key: string,
			value: FilterProps['badges'][string],
		) => {
			setBadges((prev) => {
				const next = { ...prev };
				const current = prev[key];
				if (Array.isArray(current) && Array.isArray(value)) {
					const valueSet = new Set(value as (string | number | Date)[]);
					const filtered = (current as (string | number | Date)[]).filter(
						(item) => !valueSet.has(item),
					);
					if (filtered.length) {
						next[key] = filtered as FilterProps['badges'][string];
					} else {
						delete next[key];
					}
				} else {
					delete next[key];
				}
				return next;
			});
			args.onDeleteBadge?.(key, value);
		};

		const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
			event.preventDefault();
			args.onSubmit?.(event);
		};

		return (
			<Filter
				{...args}
				badges={badges}
				onDeleteBadge={handleDeleteBadge}
				onSubmit={handleSubmit}
			>
				<Input name="title" label="Название" placeholder="Например, томат" />
				<Select
					name="type"
					label="Тип"
					placeholder="Выберите тип"
					selectedKeys={new Set(['soup'])}
				>
					<SelectItem key="soup">Суп</SelectItem>
					<SelectItem key="salad">Салат</SelectItem>
					<SelectItem key="dessert">Десерт</SelectItem>
				</Select>
				<Select
					name="units"
					label="Единицы"
					placeholder="Выберите единицы"
					selectionMode="multiple"
					selectedKeys={new Set(['kg', 'pcs'])}
				>
					<SelectItem key="kg">Килограммы</SelectItem>
					<SelectItem key="g">Граммы</SelectItem>
					<SelectItem key="pcs">Штуки</SelectItem>
				</Select>
			</Filter>
		);
	},
	args: {
		children: null,
		onDeleteBadge: () => undefined,
	},
};
