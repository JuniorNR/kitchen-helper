import type { Meta, StoryObj } from '@storybook/react';
import { Typography } from './Typography';

const meta = {
	title: 'Shared/Ui/Typography',
	component: Typography,
	tags: ['autodocs'],
	parameters: {
		layout: 'centered',
		controls: {
			exclude: ['children'],
		},
	},
	args: {
		children: 'Пример текста',
		component: 'p',
	},
	argTypes: {
		component: {
			control: 'select',
			options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'p'],
		},
		tooltip: { control: 'boolean' },
		maxLength: { control: 'number' },
		lineClamp: { control: 'number' },
		hideLargeText: { control: 'boolean' },
		isSecond: { control: 'boolean' },
		className: { control: 'text' },
		classNameComponent: { control: 'text' },
	},
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		children: 'Обычный текст параграфа',
		component: 'p',
	},
};

export const Headings: Story = {
	render: () => (
		<div className="flex flex-col gap-4">
			<Typography component="h1">Заголовок H1</Typography>
			<Typography component="h2">Заголовок H2</Typography>
			<Typography component="h3">Заголовок H3</Typography>
			<Typography component="h4">Заголовок H4</Typography>
			<Typography component="h5">Заголовок H5</Typography>
			<Typography component="h6">Заголовок H6</Typography>
		</div>
	),
};

export const Paragraph: Story = {
	args: {
		children:
			'Это обычный параграф текста. Он используется для основного контента страницы.',
		component: 'p',
	},
};

export const Span: Story = {
	args: {
		children: 'Это текст в элементе span',
		component: 'span',
	},
};

export const WithMaxLength: Story = {
	args: {
		children:
			'Это очень длинный текст, который будет обрезан до определенной длины. Остальная часть текста будет заменена на многоточие.',
		component: 'p',
		maxLength: 50,
	},
};

export const WithTooltip: Story = {
	args: {
		children:
			'Это текст с подсказкой. Наведите курсор, чтобы увидеть полный текст в подсказке.',
		component: 'p',
		maxLength: 30,
		tooltip: true,
	},
};

export const WithLineClamp: Story = {
	args: {
		children:
			'Это текст с ограничением по количеству строк. Если текст превышает указанное количество строк, он будет обрезан с многоточием. Это очень полезно для создания аккуратных карточек и списков, где нужно показать только часть текста.',
		component: 'p',
		lineClamp: 3,
	},
	render: (args) => (
		<div className="max-w-[400px]">
			<Typography {...args} />
		</div>
	),
};

export const IsSecond: Story = {
	args: {
		children: 'Это вторичный текст с приглушенным цветом',
		component: 'p',
		isSecond: true,
	},
};

export const CustomClassName: Story = {
	args: {
		children: 'Текст с кастомными классами',
		component: 'p',
		classNameComponent: 'text-blue-500 font-semibold text-lg',
	},
};

export const LongText: Story = {
	args: {
		children:
			'Это очень длинный текст, который демонстрирует, как компонент Typography обрабатывает большие объемы текста. Он может быть обрезан с помощью maxLength или lineClamp, а также может показывать полный текст в tooltip при наведении.',
		component: 'p',
	},
};

export const WithHideLargeText: Story = {
	args: {
		children:
			'Это текст с hideLargeText. Он будет обрезан и покажет кнопку для раскрытия полного текста, если не используется tooltip.',
		component: 'p',
		hideLargeText: true,
		maxLength: 30,
	},
};

export const AllVariants: Story = {
	render: () => (
		<div className="flex flex-col gap-6">
			<div>
				<Typography component="h1">Основной заголовок</Typography>
				<Typography component="p" isSecond>
					Подзаголовок с приглушенным цветом
				</Typography>
			</div>
			<div>
				<Typography component="h2">Заголовок раздела</Typography>
				<Typography component="p">
					Это основной текст параграфа, который содержит важную информацию для
					пользователя.
				</Typography>
			</div>
			<div>
				<Typography component="h3">Подзаголовок</Typography>
				<Typography component="p" lineClamp={2}>
					Это текст с ограничением по строкам. Он будет обрезан после двух строк
					и покажет многоточие, если содержимое превышает это ограничение. Это
					очень полезно для создания компактных карточек.
				</Typography>
			</div>
			<div>
				<Typography component="span" classNameComponent="text-sm text-gray-500">
					Метка или дополнительная информация
				</Typography>
			</div>
		</div>
	),
};
