import { Button } from '@heroui/button';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/modal';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@/shared/ui';
import { DeleteButton } from '@/shared/ui/DeleteButton';
import { DeleteIcon } from '@/shared/ui/icons/deleteIcon';
import { WarningIcon } from '@/shared/ui/icons/warningIcon';
import type { IngredientCardDeleteModalProps } from '../model/ingredientsList.types';

export const IngredientCardDeleteModal: FC<IngredientCardDeleteModalProps> = ({
	id,
	title,
	onDelete,
	isDeleting,
}) => {
	const { t: tCommon } = useTranslation('common');
	const { t: tIngredients } = useTranslation('ingredients');
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	return (
		<>
			<DeleteButton
				ariaLabel={title}
				size="sm"
				onPress={onOpen}
				isLoading={isDeleting}
			/>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
				<ModalContent>
					<ModalHeader className="flex flex-col gap-2 pb-2">
						<div className="flex items-center gap-3">
							<div className="flex flex-col">
								<Typography component="h2" className="text-lg font-semibold">
									{tIngredients('delete_modal.title')}
								</Typography>
								<Typography
									component="span"
									className="text-small text-default-500"
								>
									{tIngredients('delete_modal.warning')}
								</Typography>
							</div>
						</div>
						<div className="mt-1 inline-flex max-w-full items-center gap-2 rounded-md bg-default-100 px-2 py-1 text-small text-default-600">
							<Typography component="span" className="truncate">
								{title}
							</Typography>
						</div>
						<div className="mt-1 max-w-full rounded-md bg-warning-50 px-2 py-1 text-small text-warning-700">
							<span className="float-left mr-2 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-warning-100 text-warning-700">
								<WarningIcon className="h-4 w-4" />
							</span>
							<Typography component="span" className="block text-warning-800">
								В одном или нескольких рецептах находится данный ингредиент
							</Typography>
							<span className="block clear-both" />
						</div>
					</ModalHeader>
					<ModalBody className="pt-0">
						<Typography className="text-default-600">
							{tIngredients('delete_modal.description', { title })}
						</Typography>
					</ModalBody>
					<ModalFooter className="pt-0">
						<Button
							variant="light"
							onPress={onOpenChange}
							disabled={isDeleting}
						>
							{tCommon('close')}
						</Button>
						<Button
							color="danger"
							variant="shadow"
							onPress={() => onDelete(id)}
							isLoading={isDeleting}
							startContent={<DeleteIcon className="h-5 w-5" />}
						>
							{tCommon('delete')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
