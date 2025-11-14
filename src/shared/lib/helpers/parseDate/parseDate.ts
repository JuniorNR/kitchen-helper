export const parseDate = (value: string, locale: string): Date | null => {
	const parseDateToRUS = (value: string): Date | null => {
		const match = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(value);
		if (!match) return null;
		const [, ddStr, mmStr, yyyyStr] = match;
		const dd = Number(ddStr);
		const mm = Number(mmStr);
		const yyyy = Number(yyyyStr);
		const d = new Date(yyyy, mm - 1, dd);
		if (
			Number.isNaN(d.getTime()) ||
			d.getFullYear() !== yyyy ||
			d.getMonth() !== mm - 1 ||
			d.getDate() !== dd
		) {
			return null;
		}
		return d;
	};
	if (locale === 'ru') {
		return parseDateToRUS(value);
	}
	return null;
};
