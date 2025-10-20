export const layoutConfig = (() => {
	const headerHeight = '100px';
	const footerHeight = '100px';
	const mainHeight = `calc(100vh - ${headerHeight})`;

	return {
		headerHeight,
		footerHeight,
		mainHeight,
	} as const;
})();
