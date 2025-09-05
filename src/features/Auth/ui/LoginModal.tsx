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
import type { LoginFormData } from '../model/auth.types';
import { useAuth } from '../model/useAuth';
import { LoginForm } from './LoginForm';

export const LoginModal = () => {
	const formId = useId();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { t: tCommon } = useTranslation('common');
	const { loginData } = useAuth();

	const handleLogin = async (data: LoginFormData) => {
		await loginData(data);
	};

	return (
		<>
			<Button onPress={onOpen}>{tCommon('login')}</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>
						<h2>{tCommon('login')}</h2>
					</ModalHeader>
					<ModalBody>
						<LoginForm formId={formId} onSubmit={handleLogin} />
					</ModalBody>
					<ModalFooter>
						<Button onPress={onOpenChange}>{tCommon('close')}</Button>
						<Button form={formId} type="submit" color="primary">
							{tCommon('login')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
