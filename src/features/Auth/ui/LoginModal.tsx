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
	const { loginData, isLoginLoading } = useAuth();

	const handleLogin = async (data: LoginFormData) => {
		await loginData(data);
	};

	return (
		<>
			<Button
				onPress={onOpen}
				color="primary"
				variant="solid"
				className="shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-shadow"
			>
				{tCommon('login')}
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>
						<h2>{tCommon('login')}</h2>
					</ModalHeader>
					<ModalBody>
						<LoginForm formId={formId} onSubmit={handleLogin} />
					</ModalBody>
					<ModalFooter>
						<Button
							variant="bordered"
							size="md"
							className="border-default-300 text-foreground hover:bg-default-100"
							onPress={onOpenChange}
						>
							{tCommon('close')}
						</Button>
						<Button
							form={formId}
							type="submit"
							color="primary"
							variant="solid"
							className="shadow-md shadow-primary/30 hover:shadow-lg hover:shadow-primary/40 transition-shadow"
							isLoading={isLoginLoading}
						>
							{tCommon('login')}
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
