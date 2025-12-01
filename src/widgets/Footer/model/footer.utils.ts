export type Season = 'winter' | 'spring' | 'summer' | 'autumn';

export const detectSeason = (date: Date = new Date()): Season => {
	const month = date.getMonth();
	if (month === 11 || month <= 1) return 'winter';
	if (month >= 2 && month <= 4) return 'spring';
	if (month >= 5 && month <= 7) return 'summer';
	return 'autumn';
};

export const seasonToGradient: Record<Season, string> = {
	winter:
		'linear-gradient(0deg, rgba(147,197,253,0.60) 0%, rgba(59,130,246,0.38) 60%, rgba(15,23,42,0.0) 100%)',
	spring:
		'linear-gradient(0deg, rgba(190,242,100,0.60) 0%, rgba(132,204,22,0.45) 60%, rgba(15,23,42,0.0) 100%)',
	summer:
		'linear-gradient(0deg, rgba(74,222,128,0.60) 0%, rgba(34,197,94,0.50) 60%, rgba(15,23,42,0.0) 100%)',
	autumn:
		'linear-gradient(0deg, rgba(253,186,116,0.62) 0%, rgba(234,179,8,0.42) 60%, rgba(15,23,42,0.0) 100%)',
};

export const seasonToGradientDark: Record<Season, string> = {
	winter:
		'linear-gradient(0deg, rgba(30,58,138,0.65) 0%, rgba(30,64,175,0.45) 60%, rgba(15,23,42,0.12) 100%)',
	spring:
		'linear-gradient(0deg, rgba(77,124,15,0.60) 0%, rgba(101,163,13,0.45) 60%, rgba(15,23,42,0.12) 100%)',
	summer:
		'linear-gradient(0deg, rgba(21,128,61,0.65) 0%, rgba(22,163,74,0.45) 60%, rgba(15,23,42,0.12) 100%)',
	autumn:
		'linear-gradient(0deg, rgba(202,138,4,0.6) 0%, rgba(234,88,12,0.45) 60%, rgba(15,23,42,0.12) 100%)',
};

export const buildFooterGradient = (
	season: Season,
	theme: 'light' | 'dark',
): string => {
	return theme === 'dark'
		? seasonToGradientDark[season]
		: seasonToGradient[season];
};
