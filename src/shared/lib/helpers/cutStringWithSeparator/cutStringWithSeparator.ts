export const cutStringWithSeparator = (
	string: string,
	countSlice: number,
	separator?: string,
) => {
	const separatorRaw = separator || '..';
	return `${string.slice(0, countSlice)}${separatorRaw}`;
};
