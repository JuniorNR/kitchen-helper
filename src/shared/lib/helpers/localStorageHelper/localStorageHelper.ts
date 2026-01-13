const isClient = typeof window !== 'undefined';

export const localStorageHelper = <T extends string | object>(key: string) => {
	const storageGetItem = (key: string) => {
		if (!isClient || !localStorage) return {};
		const raw = localStorage.getItem(key);
		if (!raw) return {};
		try {
			return JSON.parse(raw);
		} catch {
			return raw ?? null;
		}
	};
	const storageSetItem = (value: Partial<T>) => {
		if (!isClient || !localStorage) return;
		localStorage.setItem(key, JSON.stringify(value));
	};
	const storageRemoveItem = () => {
		if (!isClient || !localStorage) return;
		localStorage.removeItem(key);
	};
	const storageClear = () => {
		if (!isClient || !localStorage) return;
		localStorage.clear();
	};

	const item = storageGetItem(key);
	return { item: item as T, storageSetItem, storageRemoveItem, storageClear };
};
