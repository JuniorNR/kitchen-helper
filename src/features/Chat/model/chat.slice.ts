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
		changeChatCardColorBg: (state, action: PayloadAction<ChatThemeColor>) => {
			state.settings.theme.chatCardColorBg = action.payload;
		},
		changeChatCardActiveColorBg: (
			state,
			action: PayloadAction<ChatThemeColor>,
		) => {
			state.settings.theme.chatCardActiveColorBg = action.payload;
		},
		changeChatCardOwnMessageColorBg: (
			state,
			action: PayloadAction<ChatThemeColor>,
		) => {
			state.settings.theme.chatCardOwnMessageColorBg = action.payload;
		},
		changeChatCardMessageColorBg: (
			state,
			action: PayloadAction<ChatThemeColor>,
		) => {
			state.settings.theme.chatCardMessageColorBg = action.payload;
		},
		changeChatMessageOwnComponentColorBg: (
			state,
			action: PayloadAction<ChatThemeColor>,
		) => {
			state.settings.theme.chatMessageOwnComponentColorBg = action.payload;
		},
		changeChatMessageComponentColorBg: (
			state,
			action: PayloadAction<ChatThemeColor>,
		) => {
			state.settings.theme.chatMessageComponentColorBg = action.payload;
		},
	},
});

export const {
	changeWindowColorBg,
	changeChatColorBg,
	changeAsideColorBg,
	changeChatCardColorBg,
	changeChatCardActiveColorBg,
	changeChatCardOwnMessageColorBg,
	changeChatCardMessageColorBg,
	changeChatMessageOwnComponentColorBg,
	changeChatMessageComponentColorBg,
} = chatSlice.actions;
export const chatReducer = chatSlice.reducer;
