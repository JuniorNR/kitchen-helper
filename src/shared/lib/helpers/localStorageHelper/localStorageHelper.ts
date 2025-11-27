export const localStorageHelper = <T extends string | object>(key: string) => {
	const storageGetItem = (key: string) => {
		const raw = localStorage.getItem(key);
		if (!raw) return {};
		try {
			return JSON.parse(raw);
		} catch {
			return raw ?? null;
		}
	};
	const storageSetItem = (value: Partial<T>) => {
		localStorage.setItem(key, JSON.stringify(value));
	};
	const storageRemoveItem = () => {
		localStorage.removeItem(key);
	};
	const storageClear = () => {
		localStorage.clear();
	};

	const item = storageGetItem(key);
	return { item: item as T, storageSetItem, storageRemoveItem, storageClear };
};
