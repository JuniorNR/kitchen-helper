import { localStorageHelper } from '@/shared/lib/helpers';
import type { ChatState, ChatTheme } from './chat.types';

export const LIMITS_MESSAGES = 25;

export const chatWindowColorBgVariants = {
	slate:
		'border-slate-200/90 bg-linear-to-br from-white via-slate-50 to-slate-100 p-6 shadow-[0_25px_70px_rgba(15,23,42,0.12)] backdrop-blur-sm dark:bg-none dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-900/40',
	lightblue:
		'border-blue-200/90 bg-linear-to-br from-white via-blue-50 to-blue-100 p-6 shadow-[0_25px_70px_rgba(37,99,235,0.12)] backdrop-blur-sm dark:bg-none dark:border-blue-800 dark:bg-blue-900/60 dark:shadow-blue-900/40',
	indigo:
		'border-indigo-200/90 bg-linear-to-br from-white via-indigo-50 to-purple-100 p-6 shadow-[0_25px_70px_rgba(99,102,241,0.12)] backdrop-blur-sm dark:bg-none dark:border-indigo-800 dark:bg-indigo-950/80 dark:shadow-indigo-900/40',
	emerald:
		'border-emerald-200/90 bg-linear-to-br from-white via-emerald-50 to-teal-100 p-6 shadow-[0_25px_70px_rgba(16,185,129,0.12)] backdrop-blur-sm dark:bg-none dark:border-emerald-800 dark:bg-emerald-950/80 dark:shadow-emerald-900/40',
	cyan: 'border-cyan-200/90 bg-linear-to-br from-white via-cyan-50 to-sky-100 p-6 shadow-[0_25px_70px_rgba(103,232,249,0.12)] backdrop-blur-sm dark:bg-none dark:border-cyan-900 dark:bg-cyan-950/60 dark:shadow-cyan-950/50',
} as const;

export const chatColorBgVariants = {
	slate:
		'border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-[0_20px_60px_rgba(148,163,184,0.25)] dark:bg-none dark:border-slate-800 dark:bg-slate-950 dark:shadow-[inset_0_1px_0_rgba(15,23,42,0.4)]',
	lightblue:
		'border-blue-200 bg-gradient-to-br from-blue-50 via-white to-blue-100 ring-1 ring-white/60 shadow-[0_12px_35px_rgba(37,99,235,0.25)] dark:bg-none dark:border-blue-800 dark:bg-blue-900/60 dark:ring-0',
	indigo:
		'border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-indigo-100 ring-1 ring-white/60 shadow-[0_12px_35px_rgba(99,102,241,0.25)] dark:bg-none dark:border-indigo-800 dark:bg-indigo-900/60 dark:ring-0',
	emerald:
		'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 ring-white/60 shadow-[0_12px_35px_rgba(16,185,129,0.25)] dark:bg-none dark:border-emerald-800 dark:bg-emerald-900/60 dark:ring-0',
	cyan: 'border-cyan-200 bg-gradient-to-br from-white via-cyan-50 to-sky-100 shadow-[0_20px_60px_rgba(103,232,249,0.25)] dark:bg-none dark:border-cyan-800 dark:bg-cyan-950 dark:shadow-[inset_0_1px_0_rgba(14,116,144,0.4)]',
} as const;

export const chatAsideColorBgVariants = {
	slate:
		'border-slate-200 bg-gradient-to-b from-white via-slate-50 to-slate-100 shadow-[0_20px_60px_rgba(148,163,184,0.25)] dark:bg-none dark:border-slate-800 dark:bg-slate-950 dark:shadow-[inset_0_1px_0_rgba(15,23,42,0.4)] dark:ring-0 dark:shadow-none',
	lightblue:
		'border-blue-200 bg-gradient-to-b from-blue-50 via-white to-blue-100 ring-1 ring-white/60 shadow-[0_12px_35px_rgba(37,99,235,0.25)] dark:bg-none dark:border-blue-800 dark:bg-blue-900/60 dark:ring-0 dark:shadow-none',
	indigo:
		'border-indigo-200 bg-gradient-to-b from-indigo-50 via-white to-indigo-100 ring-1 ring-white/60 shadow-[0_12px_35px_rgba(99,102,241,0.25)] dark:bg-none dark:border-indigo-800 dark:bg-indigo-900/60 dark:ring-0 dark:shadow-none',
	emerald:
		'border-emerald-200 bg-gradient-to-b from-emerald-50 via-white to-emerald-100 ring-1 ring-white/60 shadow-[0_12px_35px_rgba(16,185,129,0.25)] dark:bg-none dark:border-emerald-800 dark:bg-emerald-900/60 dark:ring-0 dark:shadow-none',
	cyan: 'border-cyan-200 bg-gradient-to-b from-cyan-50 via-white to-cyan-100 ring-1 ring-white/60 shadow-[0_12px_35px_rgba(103,232,249,0.25)] dark:bg-none dark:border-cyan-800 dark:bg-cyan-900/60 dark:ring-0 dark:shadow-none',
} as const;

const getChatTheme = (): ChatTheme => {
	const { item: localStorageTheme } =
		localStorageHelper<ChatTheme>('chat-theme');

	return {
		windowColorBg: localStorageTheme.windowColorBg ?? {
			colorName: 'slate',
			classes: chatWindowColorBgVariants.slate,
		},
		asideColorBg: localStorageTheme.asideColorBg ?? {
			colorName: 'slate',
			classes: chatAsideColorBgVariants.slate,
		},
		chatColorBg: localStorageTheme.chatColorBg ?? {
			colorName: 'slate',
			classes: chatColorBgVariants.slate,
		},
	};
};

export const getInitialState = (): ChatState => {
	return {
		settings: {
			theme: getChatTheme(),
		},
	};
};

export const initialState: ChatState = getInitialState();
