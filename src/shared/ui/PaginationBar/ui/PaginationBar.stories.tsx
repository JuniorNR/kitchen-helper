import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PaginationBar } from './PaginationBar';

const meta = {
	title: 'Shared/Ui/PaginationBar',
	component: PaginationBar,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: ['onPageChange'],
		},
	},
	args: {
		currentPage: 1,
		page: 1,
		totalItems: 60,
	},
	argTypes: {
		currentPage: { control: 'number' },
		page: { control: 'number' },
		totalItems: { control: 'number' },
	},
} satisfies Meta<typeof PaginationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	render: (args) => {
		const [page, setPage] = useState(args.page);
		return (
			<PaginationBar
				{...args}
				page={page}
				onPageChange={setPage}
			/>
		);
	},
};

export const ManyPages: Story = {
	args: {
		currentPage: 1,
		page: 1,
		totalItems: 200,
	},
	render: (args) => {
		const [page, setPage] = useState(args.page);
		return (
			<PaginationBar
				{...args}
				page={page}
				onPageChange={setPage}
			/>
		);
	},
};

export const FewItems: Story = {
	args: {
		currentPage: 1,
		page: 1,
		totalItems: 12,
	},
	render: (args) => {
		const [page, setPage] = useState(args.page);
		return (
			<PaginationBar
				{...args}
				page={page}
				onPageChange={setPage}
			/>
		);
	},
};

export const SinglePage: Story = {
	args: {
		currentPage: 1,
		page: 1,
		totalItems: 5,
	},
	render: (args) => {
		const [page, setPage] = useState(args.page);
		return (
			<PaginationBar
				{...args}
				page={page}
				onPageChange={setPage}
			/>
		);
	},
};

