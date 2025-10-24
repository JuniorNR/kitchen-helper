export interface ApiResponse<T> {
	data: T;
	code: string;
}

// Унифицированная форма ошибки от API
export type ApiErrorResponse = {
	status: number;
	data: {
		code: string;
		[key: string]: unknown;
	};
};

export const isApiErrorResponse = (
	error: unknown,
): error is ApiErrorResponse => {
	if (!error || typeof error !== 'object') return false;
	const e = error as Record<string, unknown>;
	if (typeof e.status !== 'number') return false;
	const data = e.data as Record<string, unknown> | undefined;
	if (!data || typeof data !== 'object') return false;
	return typeof data.code === 'string';
};
