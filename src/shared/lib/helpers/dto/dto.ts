export const dto = <T extends object | object[], U extends object>(
	type: 'toServer' | 'toClient',
	data: T,
): U => {
	if (data === null || data === undefined) {
		return data as unknown as U;
	}

	const isArray = Array.isArray(data);

	if (!isArray) {
		const dataEntries = Object.entries(data);
		if (type === 'toClient') {
			const dataToClient = dataEntries.map((item) => {
				const [key, value] = item;

				const keyToClient = key
					.split('_')
					.map((item, index) => {
						if (index !== 0) {
							return item.charAt(0).toUpperCase() + item.slice(1).toLowerCase();
						}
						return item;
					})
					.join('');

				if (Array.isArray(value)) {
					return [keyToClient, value];
				}

				if (typeof value === 'object') {
					return [keyToClient, dto(type, value)];
				}

				return [keyToClient, value];
			});
			return Object.fromEntries(dataToClient) as U;
		}

		if (type === 'toServer') {
			const dataToServer = dataEntries.map((item) => {
				const [key, value] = item;
				const keyToServer = key
					.split(/(?<=[a-z])(?=[A-Z])/)
					.join('_')
					.toLowerCase();

				if (Array.isArray(value)) {
					return [keyToServer, value];
				}

				if (typeof value === 'object') {
					return [keyToServer, dto(type, value)];
				}

				return [keyToServer, value];
			});
			return Object.fromEntries(dataToServer) as U;
		}
	}

	if (isArray) {
		return data.map((item) => {
			return dto<T, U>(type, item);
		}) as U;
	}
	return data as unknown as U;
};
