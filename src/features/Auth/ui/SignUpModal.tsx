'use client';
import { Button } from '@heroui/button';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
	useDisclosure,
} from '@heroui/modal';
import { useId } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/features';
import type { SignUpFormData } from '../model/auth.types';
import { SignUpForm } from './SignUpForm';

export const SignUpModal = () => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { t: tCommon } = useTranslation('common');
	const formId = useId();
	const { signUpData, isSignUpLoading } = useAuth();

	const handleSubmit = async (data: SignUpFormData) => {
		await signUpData(data);
		onOpenChange();
	};
	return (
		<>
			<Button
				onPress={onOpen}
				color="primary"
				variant="solid"
				className="shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-shadow"
			>
				{tCommon('sign_up')}
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>
						<h2 className="text-2xl font-bold">{tCommon('sign_up')}</h2>
					</ModalHeader>
					<ModalBody>
						<SignUpForm formId={formId} onSubmit={handleSubmit} />
					</ModalBody>
					<ModalFooter>
						<Button onPress={onOpenChange}>{tCommon('close')}</Button>
						<Button
							form={formId}
							type="submit"
							color="primary"
							variant="solid"
							className="shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-shadow"
							isLoading={isSignUpLoading}
						>
							{tCommon('sign_up')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
