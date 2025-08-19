export const classNames = (
	classes: string,
	modifiers?: Record<string, boolean | string>,
	additional?: string[],
): string => {
	let modifiersToReturn = '';
	const additionalToReturn = additional ? ` ${[...additional].join(' ')}` : '';
	if (modifiers && Object.keys(modifiers).length > 0) {
		Object.entries(modifiers).forEach((modifier) => {
			if (typeof modifier[1] === 'boolean' && modifier[1]) {
				modifiersToReturn += ` ${modifier[0]}`;
			}
			if (typeof modifier[1] === 'string' && modifier[1].length !== 0) {
				modifiersToReturn += ` ${modifier[1]}`;
			}
		});
	}
	return (classes + modifiersToReturn + additionalToReturn).trim();
};
