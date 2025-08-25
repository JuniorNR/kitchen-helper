import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CounterState } from './counter.types';

const initialState: CounterState = {
	value: 1,
};

export const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increment: (state) => {
			state.value = state.value + 1;
		},
		decrement: (state) => {
			state.value = state.value - 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
	},
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
