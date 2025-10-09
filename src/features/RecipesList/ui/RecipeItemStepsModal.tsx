import { Button } from '@heroui/button';
import {
	Modal,
	ModalBody,
	ModalContent,
	ModalHeader,
	useDisclosure,
} from '@heroui/modal';
import { Divider } from '@heroui/react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import type { RecipeItemStepsModalProps } from '../model/recipeList.types';

export const RecipeItemStepsModal: FC<RecipeItemStepsModalProps> = ({
	recipeSteps,
	title,
}) => {
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const { t: tCommon } = useTranslation('common');
	return (
		<>
			<Button className="mb-2" color="primary" fullWidth onPress={onOpen}>
				{title}
			</Button>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					<ModalHeader>
						<h2>{title}</h2>
					</ModalHeader>
					<ModalBody>
						{recipeSteps.map((step) => (
							<div key={step.id}>
								<h4 className="text-lg font-bold">
									{tCommon('fields.step')} {step.order} - «{step.title}»
								</h4>
								<p className="text-sm">
									{tCommon('fields.description')}: {step.description}
								</p>
								<p className="text-sm">
									{tCommon('fields.duration')}: {step.duration}{' '}
									{tCommon('time.minute_short')}
								</p>
								<Divider />
							</div>
						))}
						<Button color="primary" fullWidth onPress={onOpenChange}>
							{tCommon('close')}
						</Button>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};
