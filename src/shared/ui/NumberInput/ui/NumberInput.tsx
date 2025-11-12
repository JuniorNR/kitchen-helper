import {
	NumberInput as NumberInputHERO,
	type NumberInputProps,
} from '@heroui/number-input';
import type { FC } from 'react';

export const NumberInput: FC<NumberInputProps> = (props) => {
	const { value, minValue, onValueChange, ...restProps } = props;

	const normalizedValue: number =
		typeof value === 'number' && !Number.isNaN(value)
			? (value as number)
			: Number.NaN;

	const handleValueChange = (nextValue: unknown) => {
		if (typeof nextValue === 'number' && !Number.isNaN(nextValue)) {
			onValueChange?.(nextValue as number);
			return;
		}
		// When cleared, ensure the field becomes empty (undefined) instead of uncontrolled/NaN
		onValueChange?.(undefined as unknown as number);
	};

	return (
		<NumberInputHERO
			{...restProps}
			value={normalizedValue as unknown as number}
			minValue={
				Number.isNaN(normalizedValue)
					? undefined
					: (minValue as number | undefined)
			}
			onValueChange={handleValueChange}
		/>
	);
};
