import type { Meta, StoryObj } from '@storybook/react';
import { prepareCase } from './prepareCase';

const meta = {
	title: 'Shared/Lib/Helpers/prepareCase',
	tags: ['autodocs'],
	parameters: {
		layout: 'padded',
		docs: {
			description: {
				component:
					'Хелпер `prepareCase` преобразует строки между форматами camelCase и snake_case. Может работать в автоматическом режиме (определяет формат по наличию подчеркиваний) или с явным указанием целевого формата.',
			},
		},
	},
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Пример преобразования в snake_case.
 */
export const ToSnakeCase: Story = {
	name: 'Преобразование в snake_case',
	parameters: {
		docs: {
			description: {
				story:
					'Примеры преобразования строк из camelCase в snake_case с явным указанием целевого формата.',
			},
		},
	},
	render: () => {
		const examples = [
			{ input: 'userName', output: prepareCase('userName', 'snake') },
			{ input: 'userAge', output: prepareCase('userAge', 'snake') },
			{ input: 'userEmail', output: prepareCase('userEmail', 'snake') },
			{ input: 'getUserData', output: prepareCase('getUserData', 'snake') },
			{ input: 'XMLParser', output: prepareCase('XMLParser', 'snake') },
			{ input: 'HTMLContent', output: prepareCase('HTMLContent', 'snake') },
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`prepareCase('userName', 'snake')`}
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
 * Пример преобразования в camelCase.
 */
export const ToCamelCase: Story = {
	name: 'Преобразование в camelCase',
	parameters: {
		docs: {
			description: {
				story:
					'Примеры преобразования строк из snake_case в camelCase с явным указанием целевого формата.',
			},
		},
	},
	render: () => {
		const examples = [
			{ input: 'user_name', output: prepareCase('user_name', 'camel') },
			{ input: 'user_age', output: prepareCase('user_age', 'camel') },
			{ input: 'user_email', output: prepareCase('user_email', 'camel') },
			{ input: 'get_user_data', output: prepareCase('get_user_data', 'camel') },
			{ input: 'xml_parser', output: prepareCase('xml_parser', 'camel') },
			{ input: 'html_content', output: prepareCase('html_content', 'camel') },
		];

		return (
			<div className="space-y-4">
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Код:
						</div>
						<pre className="text-sm overflow-x-auto text-gray-800 dark:text-gray-200 font-mono">
							{`prepareCase('user_name', 'camel')`}
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
 * Пример автоматического определения формата.
 */
export const AutoDetection: Story = {
	name: 'Автоматическое определение',
	parameters: {
		docs: {
			description: {
				story:
					'Когда целевой формат не указан, функция автоматически определяет формат входной строки по наличию подчеркиваний и преобразует в противоположный формат.',
			},
		},
	},
	render: () => {
		const examples = [
			{
				input: 'user_name',
				output: prepareCase('user_name'),
				description: 'snake_case → camelCase (автоматически)',
			},
			{
				input: 'userName',
				output: prepareCase('userName'),
				description: 'camelCase → snake_case (автоматически)',
			},
			{
				input: 'get_user_data',
				output: prepareCase('get_user_data'),
				description: 'snake_case → camelCase',
			},
			{
				input: 'getUserData',
				output: prepareCase('getUserData'),
				description: 'camelCase → snake_case',
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
							{`prepareCase('user_name')
// Автоматически определяет формат`}
						</pre>
					</div>

					<div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700">
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
							Примеры:
						</div>
						<div className="space-y-2">
							{examples.map(({ input, output, description }) => (
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

				<div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
					<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
						Логика определения:
					</div>
					<ul className="text-sm text-gray-800 dark:text-gray-200 space-y-1 list-disc list-inside">
						<li>
							Если строка содержит{' '}
							<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
								_
							</code>{' '}
							→ преобразуется в camelCase
						</li>
						<li>
							Если строка не содержит{' '}
							<code className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">
								_
							</code>{' '}
							→ преобразуется в snake_case
						</li>
					</ul>
				</div>
			</div>
		);
	},
};

/**
 * Примеры с особыми случаями.
 */
export const SpecialCases: Story = {
	name: 'Особые случаи',
	parameters: {
		docs: {
			description: {
				story:
					'Примеры работы функции с особыми случаями: пустые строки, строки с несколькими подчеркиваниями, аббревиатуры и т.д.',
			},
		},
	},
	render: () => {
		const examples = [
			{
				category: 'Аббревиатуры',
				cases: [
					{
						input: 'XMLParser',
						target: 'snake' as const,
						output: prepareCase('XMLParser', 'snake'),
					},
					{
						input: 'HTMLContent',
						target: 'snake' as const,
						output: prepareCase('HTMLContent', 'snake'),
					},
					{
						input: 'APIKey',
						target: 'snake' as const,
						output: prepareCase('APIKey', 'snake'),
					},
				],
			},
			{
				category: 'Множественные подчеркивания',
				cases: [
					{
						input: 'user__name',
						target: 'camel' as const,
						output: prepareCase('user__name', 'camel'),
					},
					{
						input: 'get___data',
						target: 'camel' as const,
						output: prepareCase('get___data', 'camel'),
					},
					{
						input: '_user_name_',
						target: 'camel' as const,
						output: prepareCase('_user_name_', 'camel'),
					},
				],
			},
			{
				category: 'Пустые строки',
				cases: [
					{
						input: '',
						target: 'snake' as const,
						output: prepareCase('', 'snake'),
					},
					{
						input: '',
						target: 'camel' as const,
						output: prepareCase('', 'camel'),
					},
				],
			},
		];

		return (
			<div className="space-y-4">
				{examples.map(({ category, cases }) => (
					<div
						key={category}
						className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-300 dark:border-gray-700"
					>
						<div className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-3">
							{category}:
						</div>
						<div className="space-y-2">
							{cases.map(({ input, target, output }) => (
								<div
									key={`${input}-${target}`}
									className="p-2 bg-white dark:bg-gray-700/50 rounded border border-gray-200 dark:border-gray-600"
								>
									<div className="flex items-start justify-between gap-4">
										<div className="flex-1">
											<div
												className="text-xs font-mono"
												style={{ color: '#000000' }}
											>
												{input || '(пустая строка)'} →{' '}
												{output || '(пустая строка)'}
											</div>
										</div>
										<div className="text-xs">
											<code className="px-2 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded">
												{target}
											</code>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				))}
			</div>
		);
	},
};
