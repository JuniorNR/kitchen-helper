export const layoutConfig = (() => {
	const headerHeight = '100px';
	const footerHeight = '50px';
	const mainHeight = `calc(100vh - ${headerHeight} - ${footerHeight})`;
	const chatHeight = `calc(100vh - ${headerHeight} - ${footerHeight} - 44px)`;

	return {
		headerHeight,
		footerHeight,
		mainHeight,
		chatHeight,
	} as const;
})();
