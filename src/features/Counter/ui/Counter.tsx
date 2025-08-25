'use client';
import { Button } from '@heroui/button';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/shared/lib/store';
import { decrement, increment } from '../model';

export const Counter = () => {
	const counter = useSelector((state: RootState) => state.counter);
	const dispatch = useDispatch();

	const inc = () => {
		dispatch(increment());
	};
	const dec = () => {
		dispatch(decrement());
	};
	return (
		<div>
			<Button onPress={inc}>+</Button>
			{counter.value}
			<Button onPress={dec}>-</Button>
		</div>
	);
};
