import type { Meta, StoryObj } from '@storybook/react';
import { useId, useState } from 'react';
import { classNames } from './classNames';

const meta = {
	title: 'Shared/Lib/Helpers/classNames',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `classNames` используется для условного объединения CSS классов. Поддерживает базовые классы, модификаторы (boolean или string) и дополнительные классы.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Базовое использование функции classNames с одним классом.
 */
export const BaseUsage: Story = {
	name: 'Базовое использование',
	parameters: {
		docs: {
			description: {
				story: 'Простое использование с одним базовым классом.',
			},
		},
	},
	render: () => {
		const result = classNames('px-6 py-2 text-black rounded border-1');
		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<code className="text-sm text-gray-800 dark:text-gray-200">
						classNames('{result}')
					</code>
				</div>
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>{' '}
					<code className="text-sm text-gray-800 dark:text-gray-200">
						{result}
					</code>
				</div>
				<div className="p-6 border-2 border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-700 min-h-[80px] flex items-center">
					<div className={result}>Пример элемента с классом</div>
				</div>
			</div>
		);
	},
};

/**
 * Использование модификаторов с boolean значениями.
 */
export const ModifiersBoolean: Story = {
	name: 'Модификаторы (boolean)',
	parameters: {
		docs: {
			description: {
				story:
					'Использование модификаторов с boolean значениями. Если значение `true`, добавляется ключ как класс.',
			},
		},
	},
	render: () => {
		const result = classNames('px-4 py-2 rounded', {
			'bg-blue-500': false,
			'bg-red-500': false,
			'cursor-pointer': true,
			'text-black': true,
			'font-bold': true,
			'shadow-md': true,
		});
		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{`classNames('px-4 py-2 rounded', {
  'bg-blue-500': false,
  'bg-red-500': false,
  'cursor-pointer': true,
  'text-black': true,
  'font-bold': true,
  'shadow-md': true,
})`}
					</pre>
				</div>
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>{' '}
					<code className="text-sm text-gray-800 dark:text-gray-200">
						{result}
					</code>
				</div>
				<div className="p-6 border-2 border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-700 min-h-[80px] flex items-center">
					<div className={result}>Пример с модификаторами</div>
				</div>
			</div>
		);
	},
};

/**
 * Использование модификаторов со string значениями.
 */
export const ModifiersString: Story = {
	name: 'Модификаторы (string)',
	parameters: {
		docs: {
			story:
				'Использование модификаторов со string значениями. Если строка не пустая, добавляется значение как класс.',
		},
	},
	render: () => {
		const size = 'text-lg';
		const border = 'border-2 rounded-2xl';
		const textColor = 'text-black';
		const result = classNames('px-4 py-2', {
			[size]: size,
			borderStyles: border,
			[textColor]: textColor,
			pointer: 'cursor-pointer',
		});
		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{`const size = 'text-lg';
const border = 'border-2 rounded-2xl';
const textColor = 'text-black';

classNames('px-4 py-2', {
  [size]: size,
  borderStyles: border,
  [textColor]: textColor,
  pointer: 'cursor-pointer',
})`}
					</pre>
				</div>
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>{' '}
					<code className="text-sm text-gray-800 dark:text-gray-200">
						{result}
					</code>
				</div>
				<div className="p-6 border-2 border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-700 min-h-[80px] flex items-center">
					<div className={result}>Пример с модификаторами</div>
				</div>
			</div>
		);
	},
};

/**
 * Использование дополнительных классов через массив.
 */
export const additionalClasses: Story = {
	name: 'Дополнительные классы',
	parameters: {
		docs: {
			description: {
				story:
					'Использование третьего параметра для добавления дополнительных классов через массив.',
			},
		},
	},
	render: () => {
		const result = classNames('px-4 py-2', { rounded: true }, [
			'border-2',
			'text-black',
			'font-semibold',
			'shadow-md',
		]);
		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{`classNames(
  'px-4 py-2 rounded',
  { rounded: true },
  ['border-2', 'text-black', 'font-semibold', 'shadow-md']
)`}
					</pre>
				</div>
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>{' '}
					<code className="text-sm text-gray-800 dark:text-gray-200">
						{result}
					</code>
				</div>
				<div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-900">
					<button type="button" className={result}>
						Пример с дополнительными классами
					</button>
				</div>
			</div>
		);
	},
};

/**
 * Комплексный пример использования всех возможностей функции.
 */
export const complexExample: Story = {
	name: 'Комплексный пример',
	parameters: {
		docs: {
			description: {
				story:
					'Пример использования всех возможностей функции classNames: базовые классы, модификаторы (boolean и string) и дополнительные классы.',
			},
		},
	},
	render: () => {
		const isActive = false;
		const size = 'px-6 py-3';
		const result = classNames(
			'rounded-lg border-2',
			{
				'text-red': isActive,
				'text-black': !isActive,
				[size]: size,
			},
			['font-semibold', 'shadow-md', 'cursor-pointer'],
		);
		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{`const isActive = false;
const size = 'px-6 py-3';

classNames(
  'rounded-lg border-2',
  {
    'text-red': isActive,
    'text-black': !isActive,
    [size]: size,
  },
  ['font-semibold', 'shadow-md', 'cursor-pointer']
)`}
					</pre>
				</div>
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>{' '}
					<code className="text-sm text-gray-800 dark:text-gray-200">
						{result}
					</code>
				</div>
				<div className="p-6 border-2 border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-700 min-h-[80px] flex items-center">
					<div className={result}>Пример</div>
				</div>
			</div>
		);
	},
};

/**
 * Интерактивный пример использования classNames с controls.
 */
export const ИнтерактивныйПример: Story = {
	name: 'Интерактивный пример',
	parameters: {
		docs: {
			description: {
				story:
					'Интерактивный пример с controls для изменения параметров функции classNames в реальном времени.',
			},
		},
	},
	render: () => {
		const baseClassId = useId();
		const additionalClassesId = useId();
		const [baseClass, setBaseClass] = useState('px-4 py-2 rounded');
		const [modifier1Active, setModifier1Active] = useState(true);
		const [modifier2Active, setModifier2Active] = useState(false);
		const [modifier3Active, setModifier3Active] = useState(true);
		const [additionalClasses, setAdditionalClasses] = useState(
			'font-semibold border-2',
		);

		const additionalArray = additionalClasses
			? additionalClasses.split(' ').filter(Boolean)
			: [];
		const result = classNames(
			baseClass,
			{
				'text-black': modifier1Active,
				'opacity-50': modifier2Active,
				'shadow-md': modifier3Active,
			},
			additionalArray,
		);

		return (
			<div className="space-y-4">
				<div className="flex flex-col gap-4 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg space-y-2 border border-gray-300 dark:border-gray-700">
					<div>
						<label
							htmlFor={baseClassId}
							className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
						>
							Базовый класс:
						</label>
						<input
							id={baseClassId}
							type="text"
							value={baseClass}
							onChange={(e) => setBaseClass(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						/>
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-sm font-medium mb-1 text-gray-800 dark:text-gray-200">
							Дополнительные классы (через объект):
						</p>
						<div className="flex gap-2">
							<label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
								<input
									type="checkbox"
									checked={modifier1Active}
									onChange={(e) => setModifier1Active(e.target.checked)}
									className="w-4 h-4"
								/>
								<span className="text-sm">text-black</span>
							</label>
							<label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
								<input
									type="checkbox"
									checked={modifier2Active}
									onChange={(e) => setModifier2Active(e.target.checked)}
									className="w-4 h-4"
								/>
								<span className="text-sm">opacity-50</span>
							</label>
							<label className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
								<input
									type="checkbox"
									checked={modifier3Active}
									onChange={(e) => setModifier3Active(e.target.checked)}
									className="w-4 h-4"
								/>
								<span className="text-sm">shadow-md</span>
							</label>
						</div>
					</div>
					<div>
						<label
							htmlFor={additionalClassesId}
							className="block text-sm font-medium mb-1 text-gray-800 dark:text-gray-200"
						>
							Дополнительные классы (через пробел):
						</label>
						<input
							id={additionalClassesId}
							type="text"
							value={additionalClasses}
							onChange={(e) => setAdditionalClasses(e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700 text-gray-900 dark:text-gray-100"
						/>
					</div>
				</div>
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200">
						{`classNames(
  '${baseClass}',
  {
    'text-black': ${modifier1Active},
    'opacity-50': ${modifier2Active},
    'shadow-md': ${modifier3Active},
  },
  ${JSON.stringify(additionalArray)}
)`}
					</pre>
				</div>
				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<strong className="text-gray-800 dark:text-gray-200">
						Результат:
					</strong>{' '}
					<code className="text-sm break-all text-gray-800 dark:text-gray-200">
						{result}
					</code>
				</div>
				<div className="p-6 border-2 border-gray-400 dark:border-gray-500 rounded-lg bg-gray-100 dark:bg-gray-700 min-h-[80px] flex items-center">
					<button type="button" className={result}>
						Интерактивная кнопка
					</button>
				</div>
			</div>
		);
	},
};
