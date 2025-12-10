import type { Meta, StoryObj } from '@storybook/react';
import { CheckIcon } from './checkIcon';
import { DeleteIcon } from './deleteIcon';
import { DragIcon } from './dragIcon';
import { GithubIcon } from './githubIcon';
import { Logotype } from './logotype';
import { PhotoIcon } from './photoIcon';
import { PlusIcon } from './plusIcon';
import { SendMessageIcon } from './sendMessageIcon';
import { TelegramIcon } from './telegramIcon';
import { WarningIcon } from './warningIcon';

const meta = {
	title: 'Shared/Ui/Icons',
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const IconWrapper = ({
	children,
	name,
}: {
	children: React.ReactNode;
	name: string;
}) => (
	<div className="flex flex-col items-center gap-2 p-4">
		{children}
		<span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
			{name}
		</span>
	</div>
);

export const AllIcons: Story = {
	render: () => (
		<div className="flex flex-row gap-4 p-8">
			<div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
					Обычные иконки
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<IconWrapper name="CheckIcon">
						<CheckIcon />
					</IconWrapper>
					<IconWrapper name="DeleteIcon">
						<DeleteIcon />
					</IconWrapper>
					<IconWrapper name="DragIcon">
						<DragIcon />
					</IconWrapper>
					<IconWrapper name="Logotype">
						<Logotype />
					</IconWrapper>
					<IconWrapper name="PhotoIcon">
						<PhotoIcon />
					</IconWrapper>
					<IconWrapper name="PlusIcon">
						<PlusIcon />
					</IconWrapper>
					<IconWrapper name="SendMessageIcon">
						<SendMessageIcon />
					</IconWrapper>
					<IconWrapper name="WarningIcon">
						<WarningIcon />
					</IconWrapper>
				</div>
			</div>
			<div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
				<h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1">
					Иконки соц сетей
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
					<IconWrapper name="GithubIcon">
						<GithubIcon />
					</IconWrapper>
					<IconWrapper name="TelegramIcon">
						<TelegramIcon />
					</IconWrapper>
				</div>
			</div>
		</div>
	),
};

export const Sizes: Story = {
	render: () => (
		<div className="flex flex-col gap-4 p-8">
			<div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
				<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
					CheckIcon
				</h3>
				<div className="flex items-center gap-4">
					<CheckIcon width={16} height={16} />
					<CheckIcon width={24} height={24} />
					<CheckIcon width={32} height={32} />
					<CheckIcon width={48} height={48} />
				</div>
			</div>
			<div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
				<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
					PlusIcon
				</h3>
				<div className="flex items-center gap-4">
					<PlusIcon width={16} height={16} />
					<PlusIcon width={24} height={24} />
					<PlusIcon width={32} height={32} />
					<PlusIcon width={48} height={48} />
				</div>
			</div>
			<div className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white/60 p-4 shadow-sm ring-1 ring-gray-200/60 dark:border-white/10 dark:bg-white/5 dark:ring-white/10">
				<h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
					DeleteIcon
				</h3>
				<div className="flex items-center gap-4">
					<DeleteIcon width={16} height={16} />
					<DeleteIcon width={24} height={24} />
					<DeleteIcon width={32} height={32} />
					<DeleteIcon width={48} height={48} />
				</div>
			</div>
		</div>
	),
};
