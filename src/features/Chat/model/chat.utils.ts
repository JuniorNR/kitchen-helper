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

export const chatCardColorBgVariants = {
	slate:
		'border-slate-200/70 bg-white/90 hover:border-slate-300 hover:bg-white dark:border-slate-800/40 dark:bg-slate-900/40 dark:hover:border-slate-700 dark:hover:bg-slate-900/70',
	lightblue:
		'border-blue-200/70 bg-white/90 hover:border-blue-300 hover:bg-white dark:border-blue-800/40 dark:bg-blue-900/40 dark:hover:border-blue-700 dark:hover:bg-blue-900/70',
	emerald:
		'border-emerald-200/70 bg-white/90 hover:border-emerald-300 hover:bg-white dark:border-emerald-800/40 dark:bg-emerald-900/40 dark:hover:border-emerald-700 dark:hover:bg-emerald-900/70',
	cyan: 'border-cyan-200/70 bg-white/90 hover:border-cyan-300 hover:bg-white dark:border-cyan-800/40 dark:bg-cyan-900/40 dark:hover:border-cyan-700 dark:hover:bg-cyan-900/70',
	rose: 'border-rose-200/70 bg-white/90 hover:border-rose-300 hover:bg-white dark:border-rose-800/40 dark:bg-rose-900/40 dark:hover:border-rose-700 dark:hover:bg-rose-900/70',
} as const;

export const chatCardActiveColorBgVariants = {
	darkblue:
		'border-emerald-300 bg-gradient-to-br from-white via-emerald-50 to-slate-50 dark:bg-none dark:border-emerald-500/40 dark:bg-slate-950 dark:shadow-emerald-900/30',
	purple:
		'border-purple-300 bg-gradient-to-br from-white via-purple-50 to-violet-50 dark:bg-none dark:border-purple-500/40 dark:bg-slate-950 dark:shadow-purple-900/30',
	amber:
		'border-amber-300 bg-gradient-to-br from-white via-amber-50 to-orange-50 dark:bg-none dark:border-amber-500/40 dark:bg-slate-950 dark:shadow-amber-900/30',
	teal: 'border-teal-300 bg-gradient-to-br from-white via-teal-50 to-cyan-50 dark:bg-none dark:border-teal-500/40 dark:bg-slate-950 dark:shadow-teal-900/30',
	fuchsia:
		'border-fuchsia-300 bg-gradient-to-br from-white via-fuchsia-50 to-pink-50 dark:bg-none dark:border-fuchsia-500/40 dark:bg-slate-950 dark:shadow-fuchsia-900/30',
} as const;

export const chatCardOwnMessageColorBgVariant = {
	emerald:
		'border-emerald-200 bg-gradient-to-br from-emerald-50 via-white to-emerald-100 shadow-[0_8px_20px_rgba(16,185,129,0.18)] dark:border-emerald-500/30 dark:from-emerald-500/10 dark:via-slate-900 dark:to-slate-950',
	violet:
		'border-violet-200 bg-gradient-to-br from-violet-50 via-white to-violet-100 shadow-[0_8px_20px_rgba(139,92,246,0.18)] dark:border-violet-500/30 dark:from-violet-500/10 dark:via-slate-900 dark:to-slate-950',
	sky: 'border-sky-200 bg-gradient-to-br from-sky-50 via-white to-sky-100 shadow-[0_8px_20px_rgba(14,165,233,0.18)] dark:border-sky-500/30 dark:from-sky-500/10 dark:via-slate-900 dark:to-slate-950',
	orange:
		'border-orange-200 bg-gradient-to-br from-orange-50 via-white to-orange-100 shadow-[0_8px_20px_rgba(249,115,22,0.18)] dark:border-orange-500/30 dark:from-orange-500/10 dark:via-slate-900 dark:to-slate-950',
	pink: 'border-pink-200 bg-gradient-to-br from-pink-50 via-white to-pink-100 shadow-[0_8px_20px_rgba(236,72,153,0.18)] dark:border-pink-500/30 dark:from-pink-500/10 dark:via-slate-900 dark:to-slate-950',
} as const;

export const chatCardMessageColorBgVariants = {
	slate:
		'border-slate-200 bg-white/95 text-slate-800 shadow-[0_15px_35px_rgba(15,23,42,0.12)] dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-100',
	zinc: 'border-zinc-200 bg-white/95 text-zinc-800 shadow-[0_15px_35px_rgba(39,39,42,0.12)] dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-100',
	stone:
		'border-stone-200 bg-white/95 text-stone-800 shadow-[0_15px_35px_rgba(41,37,36,0.12)] dark:border-stone-800 dark:bg-stone-900/60 dark:text-stone-100',
	neutral:
		'border-neutral-200 bg-white/95 text-neutral-800 shadow-[0_15px_35px_rgba(38,38,38,0.12)] dark:border-neutral-800 dark:bg-neutral-900/60 dark:text-neutral-100',
	gray: 'border-gray-200 bg-white/95 text-gray-800 shadow-[0_15px_35px_rgba(55,65,81,0.12)] dark:border-gray-800 dark:bg-gray-900/60 dark:text-gray-100',
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
		chatCardColorBg: localStorageTheme.chatCardColorBg ?? {
			colorName: 'slate',
			classes: chatCardColorBgVariants.slate,
		},
		chatCardActiveColorBg: localStorageTheme.chatCardActiveColorBg ?? {
			colorName: 'darkblue',
			classes: chatCardActiveColorBgVariants.darkblue,
		},
		chatCardOwnMessageColorBg: localStorageTheme.chatCardOwnMessageColorBg ?? {
			colorName: 'emerald',
			classes: chatCardOwnMessageColorBgVariant.emerald,
		},
		chatCardMessageColorBg: localStorageTheme.chatCardMessageColorBg ?? {
			colorName: 'slate',
			classes: chatCardMessageColorBgVariants.slate,
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
