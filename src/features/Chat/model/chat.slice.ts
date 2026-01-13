import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ChatThemeColor } from './chat.types';
import { initialState } from './chat.utils';

const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		changeWindowColorBg: (state, action: PayloadAction<ChatThemeColor>) => {
			state.settings.theme.windowColorBg = action.payload;
		},
		changeChatColorBg: (state, action: PayloadAction<ChatThemeColor>) => {
			state.settings.theme.chatColorBg = action.payload;
		},
		changeAsideColorBg: (state, action: PayloadAction<ChatThemeColor>) => {
			state.settings.theme.asideColorBg = action.payload;
		},
	},
});

export const { changeWindowColorBg, changeChatColorBg, changeAsideColorBg } =
	chatSlice.actions;
export const chatReducer = chatSlice.reducer;
