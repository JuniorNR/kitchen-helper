import { NumberInput, type NumberInputProps } from '@heroui/number-input';
import { Select, SelectItem } from '@heroui/select';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/helpers';
import type { PriceInputProps } from '../model/priceInput.types';
import styles from './priceInput.module.scss';

export const PriceInput: FC<NumberInputProps & PriceInputProps> = ({
	value,
	onPriceChange,
	priceUnit,
	onPriceUnitChange,
	size = 'md',
	...props
}) => {
	const { t: tFields } = useTranslation('fields');

	return (
		<div className="flex w-full">
			<NumberInput
				className={classNames('w-[75%] min-w-[150px] rounded-r-none', {
					[styles.radiusInput]: true,
				})}
				size={size}
				name="price"
				label={tFields('price')}
				value={Number(value)}
				onValueChange={(value) => onPriceChange(value)}
				minValue={1}
				hideStepper
				formatOptions={{
					style: 'currency',
					currency: priceUnit,
				}}
				{...props}
			/>
			<Select
				name="priceUnit"
				size={size}
				label={tFields('price_unit')}
				value={priceUnit}
				className={classNames('w-[25%] min-w-[100px]', {
					[styles.radiusSelect]: true,
				})}
			>
				<SelectItem onPress={() => onPriceUnitChange('USD')}>USD</SelectItem>
				<SelectItem onPress={() => onPriceUnitChange('RUB')}>RUB</SelectItem>
				<SelectItem onPress={() => onPriceUnitChange('EUR')}>EUR</SelectItem>
			</Select>
		</div>
	);
};
