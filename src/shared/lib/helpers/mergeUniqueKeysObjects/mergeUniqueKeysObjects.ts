export const mergeUniqueKeysObjects = <T extends object, U extends object>(
	obj1: T,
	obj2: U,
): T & U => {
	const newObject = { ...obj1, ...obj2 };
	const objectWithoutUndefinedValues = Object.fromEntries(
		Object.entries(newObject).filter((item) => item[1] !== undefined),
	);
	return objectWithoutUndefinedValues as T & U;
};
