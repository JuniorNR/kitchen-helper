import { serializeDate } from './serializeDate';

describe('serializeDate', () => {
	it('return string, if arg is string', () => {
		const input = '2023-05-01';

		const result = serializeDate(input);

		expect(result).toBe(input);
	});

	it('convert Date to ISO string', () => {
		const date = new Date('2023-05-01T12:34:56.789Z');

		const result = serializeDate(date);

		expect(result).toBe('2023-05-01T12:34:56.789Z');
	});

	it('return undefined, if arg is undefined', () => {
		const result = serializeDate();

		expect(result).toBeUndefined();
	});
});
