import type { Meta, StoryObj } from '@storybook/react';
import { prepareDateForInput } from './prepareDateForInput';

const meta = {
	title: 'Shared/Lib/Helpers/prepareDateForInput',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `prepareDateForInput` преобразует Date объект или строку в формат `YYYY-MM-DD` для использования в HTML input[type="date"]. Поддерживает различные форматы входных данных и автоматически обрабатывает их.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример преобразования из Date объекта.
 */
export const FromDateObject: Story = {
	name: 'Из Date объекта',
	parameters: {
		docs: {
			description: {
				story:
					'Примеры преобразования Date объектов в формат YYYY-MM-DD для использования в HTML input[type="date"].',
			},
		},
	},
	render: () => {
		const examples = [
			{
				input: new Date(2024, 11, 25),
				output: prepareDateForInput(new Date(2024, 11, 25)),
				description: '25 декабря 2024',
			},
			{
				input: new Date(2024, 0, 1),
				output: prepareDateForInput(new Date(2024, 0, 1)),
				description: '1 января 2024',
			},
			{
				input: new Date(2023, 5, 15),
				output: prepareDateForInput(new Date(2023, 5, 15)),
				description: '15 июня 2023',
			},
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`const date = new Date(2024, 11, 25);
prepareDateForInput(date)`}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Примеры:
						</div>
						<div className="space-y-2">
							{examples.map(({ input, output, description }) => (
								<div
									key={input.toISOString()}
									className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
								>
									<div
										className="text-xs font-mono"
										style={{ color: '#000000' }}
									>
										{input.toLocaleDateString('ru')} → {output}
									</div>
									<div
										className="text-xs mt-1 italic"
										style={{ color: '#000000' }}
									>
										{description}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	},
};

/**
 * Пример преобразования из строки YYYY-MM-DD.
 */
export const FromYYYYMMDD: Story = {
	name: 'Из строки YYYY-MM-DD',
	parameters: {
		docs: {
			description: {
				story:
					'Строки в формате YYYY-MM-DD возвращаются без изменений, так как это уже правильный формат для input[type="date"].',
			},
		},
	},
	render: () => {
		const examples = [
			{ input: '2024-12-25', output: prepareDateForInput('2024-12-25') },
			{ input: '2024-01-01', output: prepareDateForInput('2024-01-01') },
			{ input: '2023-06-15', output: prepareDateForInput('2023-06-15') },
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`prepareDateForInput('2024-12-25')`}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Примеры:
						</div>
						<div className="space-y-2">
							{examples.map(({ input, output }) => (
								<div
									key={input}
									className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
								>
									<div
										className="text-xs font-mono"
										style={{ color: '#000000' }}
									>
										{input} → {output}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Примечание:
					</div>
					<p className="text-sm text-gray-800 dark:text-gray-200">
						Строки в формате YYYY-MM-DD возвращаются без изменений, так как это
						уже правильный формат для HTML input[type="date"].
					</p>
				</div>
			</div>
		);
	},
};

/**
 * Пример преобразования из строки DD.MM.YYYY.
 */
export const FromDDMMYYYY: Story = {
	name: 'Из строки DD.MM.YYYY',
	parameters: {
		docs: {
			description: {
				story:
					'Строки в русском формате DD.MM.YYYY автоматически преобразуются в формат YYYY-MM-DD.',
			},
		},
	},
	render: () => {
		const examples = [
			{ input: '25.12.2024', output: prepareDateForInput('25.12.2024') },
			{ input: '01.01.2024', output: prepareDateForInput('01.01.2024') },
			{ input: '15.06.2023', output: prepareDateForInput('15.06.2023') },
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`prepareDateForInput('25.12.2024')`}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Примеры:
						</div>
						<div className="space-y-2">
							{examples.map(({ input, output }) => (
								<div
									key={input}
									className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
								>
									<div
										className="text-xs font-mono"
										style={{ color: '#000000' }}
									>
										{input} → {output}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	},
};

/**
 * Примеры с пустыми значениями и невалидными датами.
 */
export const EdgeCases: Story = {
	name: 'Граничные случаи',
	parameters: {
		docs: {
			description: {
				story:
					'Примеры работы функции с пустыми значениями, undefined, null и невалидными датами. Все они возвращают пустую строку.',
			},
		},
	},
	render: () => {
		const examples = [
			{
				input: 'undefined',
				output: prepareDateForInput(undefined),
				description: 'undefined значение',
			},
			{
				input: '""',
				output: prepareDateForInput(''),
				description: 'Пустая строка',
			},
			{
				input: '"   "',
				output: prepareDateForInput('   '),
				description: 'Строка с пробелами',
			},
			{
				input: 'new Date("invalid")',
				output: prepareDateForInput(new Date('invalid')),
				description: 'Невалидная дата',
			},
			{
				input: '"invalid-date"',
				output: prepareDateForInput('invalid-date'),
				description: 'Невалидная строка',
			},
		];

		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
						Примеры:
					</div>
					<div className="space-y-2">
						{examples.map(({ input, output, description }) => (
							<div
								key={input}
								className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
							>
								<div className="text-xs font-mono" style={{ color: '#000000' }}>
									{input} → {output || '(пустая строка)'}
								</div>
								<div
									className="text-xs mt-1 italic"
									style={{ color: '#000000' }}
								>
									{description}
								</div>
							</div>
						))}
					</div>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Примечание:
					</div>
					<p className="text-sm text-gray-800 dark:text-gray-200">
						Все невалидные значения, пустые строки и undefined возвращают пустую
						строку{' '}
						<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
							""
						</code>
						, что корректно для HTML input[type="date"].
					</p>
				</div>
			</div>
		);
	},
};

/**
 * Пример использования в HTML форме.
 */
export const UsageInForm: Story = {
	name: 'Использование в форме',
	parameters: {
		docs: {
			description: {
				story:
					'Пример использования функции в React форме с input[type="date"].',
			},
		},
	},
	render: () => {
		const codeExample = `import { prepareDateForInput } from '@/shared/lib/helpers';
import { useState } from 'react';

function DateInput() {
  const [date, setDate] = useState<Date | undefined>();

  return (
    <input
      type="date"
      value={prepareDateForInput(date)}
      onChange={(e) => setDate(new Date(e.target.value))}
    />
  );
}`;

		return (
			<div className="space-y-4">
				<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Пример кода:
					</div>
					<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
						{codeExample}
					</pre>
				</div>

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Как это работает:
					</div>
					<ul className="text-sm text-gray-800 dark:text-gray-200 space-y-1 list-disc list-inside">
						<li>
							<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
								prepareDateForInput
							</code>{' '}
							преобразует Date объект или строку в формат YYYY-MM-DD
						</li>
						<li>
							HTML input[type="date"] требует формат YYYY-MM-DD для значения
						</li>
						<li>
							При изменении значения input, создается новый Date объект из
							строки
						</li>
						<li>
							Если date undefined, функция вернет пустую строку, и input будет
							пустым
						</li>
					</ul>
				</div>
			</div>
		);
	},
};
