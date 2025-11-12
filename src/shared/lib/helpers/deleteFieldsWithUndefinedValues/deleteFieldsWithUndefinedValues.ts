export const deleteFieldsWithUndefinedValues = <T extends object>(
	object: T,
) => {
	return Object.fromEntries(
		Object.entries(object).filter((item) => item[1] !== undefined),
	);
};
