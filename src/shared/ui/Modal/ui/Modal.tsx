import { Button, type ButtonProps } from '@heroui/button';
import {
	ModalBody,
	Modal as ModalComponent,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/modal';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { WarningIcon } from '../../icons/warningIcon';
import { Typography } from '../../Typography';
import type { ModalProps } from '../model/modal.types';

export const Modal: FC<ModalProps> = ({
	title,
	subtitle,
	accentItemTitle,
	warningFields = [],
	description,
	onConfirm,
	TriggerComponent,
	isLoading,
	confirmButtonText,
	confirmButtonColor,
	confirmButtonVariant,
	confirmButtonStartContent,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { t: tCommon } = useTranslation('common');
	return (
		<>
			{TriggerComponent ? (
				<TriggerComponent onPress={onOpen} />
			) : (
				<Button onPress={onOpen}>{tCommon('open')}</Button>
			)}
			<ModalComponent isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className="flex flex-col gap-2 pb-2">
						<div className="flex items-center gap-3">
							<div className="flex flex-col">
								<Typography component="h2" className="text-lg font-semibold">
									{title}
								</Typography>

								{subtitle && (
									<Typography
										component="span"
										className="text-small text-default-500"
									>
										{subtitle}
									</Typography>
								)}
							</div>
						</div>
						{accentItemTitle && (
							<div className="mt-1 inline-flex max-w-full items-center gap-2 rounded-md bg-default-100 px-2 py-1 text-small text-default-600">
								<Typography component="span" className="truncate">
									{accentItemTitle}
								</Typography>
							</div>
						)}
						{warningFields.length > 0 &&
							warningFields.map((warningField) => (
								<div
									key={warningField}
									className="mt-1 max-w-full rounded-md bg-warning-50 px-2 py-1 text-small text-warning-800"
								>
									<span className="float-left mr-2 mt-0.5 inline-flex items-center justify-center text-warning-700">
										<WarningIcon className="h-4 w-4" />
									</span>
									<Typography
										component="span"
										className="block text-warning-800"
									>
										{warningField}
									</Typography>
									<span className="block clear-both" />
								</div>
							))}
					</ModalHeader>
					<ModalBody>
						<Typography className="text-default-600">{description}</Typography>
					</ModalBody>
					<ModalFooter>
						<Button onPress={onOpenChange} variant="light">
							{tCommon('close')}
						</Button>
						<Button
							onPress={onConfirm}
							isLoading={isLoading}
							color={confirmButtonColor || 'primary'}
							variant={
								(confirmButtonVariant as ButtonProps['variant']) || 'solid'
							}
							startContent={confirmButtonStartContent}
						>
							{confirmButtonText || tCommon('confirm')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</ModalComponent>
		</>
	);
};
