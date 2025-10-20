export const SKELETON_KEYS = [
	'recipe-skeleton-1',
	'recipe-skeleton-2',
	'recipe-skeleton-3',
	'recipe-skeleton-4',
];

export const getStepMinutes = (duration: string) => {
	const match = String(duration ?? '').match(/\d+/);
	return match ? Number(match[0]) : 0;
};
