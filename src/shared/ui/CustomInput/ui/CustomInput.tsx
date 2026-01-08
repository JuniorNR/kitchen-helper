import { Input } from '@heroui/input';
import type { FC } from 'react';
import type { CustomInputProps } from '../model/customInput.types';

export const CustomInput: FC<CustomInputProps> = (props) => {
	const { variant = 'flat' } = props;
	return <Input {...props} variant={variant} />;
};
