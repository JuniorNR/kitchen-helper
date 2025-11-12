export const omitKeyObject = <T extends object, U extends keyof T & string>(
	key: U,
	object: T,
): Omit<T, U> => {
	const { [key]: _, ...rest } = object;

	return rest;
};
