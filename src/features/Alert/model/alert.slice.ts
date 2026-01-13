import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
	AlertsProps,
	AlertType,
} from '@/shared/ui/Alerts/model/alert.types';

const initialState: AlertsProps = {
	alerts: [],
};

export const alertSlice = createSlice({
	name: 'alerts',
	initialState,
	reducers: {
		addAlert: (state, action: PayloadAction<AlertType>) => {
			state.alerts.push(action.payload);
		},
		removeAlert: (state, action: PayloadAction<string>) => {
			state.alerts = state.alerts.filter((alert) => {
				return alert.id !== action.payload;
			});
		},
	},
});

export const { addAlert, removeAlert } = alertSlice.actions;
export const alertReducer = alertSlice.reducer;
