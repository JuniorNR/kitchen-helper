import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/modal';
import { Button } from '@heroui/react';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import type { SignUpFormData } from '../model/types';
import { SignUpForm } from './SignUpForm';

export const SignUpModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { t: tCommon } = useTranslation('common');
	const formId = useId();

	const handleSignUp = (data: SignUpFormData) => {
		console.debug(data);
		onOpenChange();
	};
	return (
		<>
			<Button onPress={onOpen} color="primary" variant="solid">
				{tCommon('sign_up')}
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader className="cursor-pointer">
						<h2 className="text-2xl font-bold">{tCommon('sign_up')}</h2>
					</ModalHeader>
					<ModalBody>
						<SignUpForm formId={formId} onSubmit={handleSignUp} />
					</ModalBody>
					<ModalFooter>
						<Button onPress={onOpenChange}>{tCommon('close')}</Button>
						<Button form={formId} type="submit" color="primary">
							{tCommon('sign_up')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
