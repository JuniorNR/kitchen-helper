export const localStorageHelper = <T extends object>(key: string) => {
	const storageGetItem = () => {
		try {
			return JSON.parse(localStorage.getItem(key) || '') as Partial<T>;
		} catch {
			return {};
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

	const item = storageGetItem();
	return { item, storageSetItem, storageRemoveItem, storageClear };
};
