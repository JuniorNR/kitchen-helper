import { NumberInput, type NumberInputProps } from '@heroui/number-input';
import { Select, SelectItem, SelectSection } from '@heroui/select';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { getUnitGroupsOptions } from '@/shared/lib/constants';
import { classNames } from '@/shared/lib/helpers';
import type { UnitInputProps } from '../model/unitInput.types';
import styles from './unitInput.module.scss';

export const UnitInput: FC<NumberInputProps & UnitInputProps> = ({
	value,
	onUnitChange,
	unit,
	onUnitUnitChange,
}) => {
	const { t: tFields } = useTranslation('fields');
	const { t: tUnits } = useTranslation('units');
	const unitGroupsOptions = getUnitGroupsOptions(tUnits);
	return (
		<div className="flex w-full">
			<NumberInput
				className={classNames('w-[60%] min-w-[150px] rounded-r-none', {
					[styles.radiusInput]: true,
				})}
				name="countUnit"
				label={tFields('count_unit')}
				minValue={1}
				hideStepper
				value={Number(value)}
				onValueChange={(value) => onUnitChange(value)}
			/>
			<Select
				name="unit"
				label={tFields('unit')}
				className={classNames('w-[40%] min-w-[100px]', {
					[styles.radiusSelect]: true,
				})}
				value={unit}
			>
				{unitGroupsOptions.map((group) => (
					<SelectSection key={group.group} title={group.group}>
						{group.options.map((option) => (
							<SelectItem
								key={option.value}
								onPress={() => onUnitUnitChange(option.value)}
							>
								{option.label}
							</SelectItem>
						))}
					</SelectSection>
				))}
			</Select>
		</div>
	);
};
