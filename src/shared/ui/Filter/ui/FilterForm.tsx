import { Button } from '@heroui/button';
import { Divider } from '@heroui/divider';
import { Form } from '@heroui/form';
import { AnimatePresence, motion } from 'framer-motion';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { FilterFormProps } from '../model/filter.types';

export const FilterForm: FC<FilterFormProps> = ({
	isOpen,
	children,
	onSubmit,
	onReset,
	onSave,
	onCancel,
	saveDisabled,
	submitDisabled,
}) => {
	const { t: tFields } = useTranslation('fields');
	return (
		<AnimatePresence initial={false}>
			{isOpen && (
				<motion.div
					key="filter-form"
					initial={{ height: 0, opacity: 0, y: -8 }}
					animate={{ height: 'auto', opacity: 1, y: 0 }}
					exit={{ height: 0, opacity: 0, y: -8 }}
					transition={{ duration: 0.2, ease: 'easeOut' }}
					className="w-full overflow-hidden"
				>
					<Form
						className="rounded-xl border border-gray-300 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-900/40"
						onSubmit={onSubmit}
					>
						<div className="grid grid-cols-1 gap-3 md:grid-cols-2 w-full">
							{children}

							<Divider className="md:col-span-2" />
							<div className="mt-1 flex flex-col md:flex-row flex-wrap items-stretch md:items-center gap-2 md:justify-end md:col-span-2">
								<Button
									type="submit"
									color="primary"
									size="sm"
									className="w-full md:w-auto"
									isDisabled={submitDisabled}
								>
									{tFields('apply')}
								</Button>
								<Button
									type="button"
									variant="light"
									size="sm"
									className="w-full md:w-auto"
									onPress={onCancel}
								>
									{tFields('cancel')}
								</Button>
								<Divider
									orientation="vertical"
									className="hidden md:block h-6"
								/>
								<Button
									className="dark:text-primary-foreground w-full md:w-auto"
									type="button"
									variant="flat"
									color="primary"
									size="sm"
									onPress={onSave}
									isDisabled={saveDisabled}
								>
									{tFields('save_preset')}
								</Button>
								<Button
									type="button"
									variant="bordered"
									color="danger"
									size="sm"
									className="w-full md:w-auto"
									onPress={onReset}
								>
									{tFields('reset_preset')}
								</Button>
							</div>
						</div>
					</Form>
				</motion.div>
			)}
		</AnimatePresence>
	);
};
