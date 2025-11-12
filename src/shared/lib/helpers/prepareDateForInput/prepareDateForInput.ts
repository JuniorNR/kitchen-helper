export const prepareDateForInput = (date?: Date | string): string => {
	if (!date) return '';

	// Handle Date instance
	if (date instanceof Date) {
		return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
	}

	// Handle string inputs
	if (typeof date === 'string') {
		const trimmed = date.trim();
		if (!trimmed) return '';

		// Already in HTML date input format YYYY-MM-DD
		if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
			return trimmed;
		}

		// Convert DD.MM.YYYY -> YYYY-MM-DD
		const ddmmyyyyMatch = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(trimmed);
		if (ddmmyyyyMatch) {
			const [, dd, mm, yyyy] = ddmmyyyyMatch;
			return `${yyyy}-${mm}-${dd}`;
		}

		// Fallback: try to parse
		const parsed = new Date(trimmed);
		return Number.isNaN(parsed.getTime())
			? ''
			: parsed.toISOString().slice(0, 10);
	}

	return '';
};
