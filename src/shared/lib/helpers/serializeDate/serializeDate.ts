export const serializeDate = (d?: string | Date): string | undefined => {
	return typeof d === 'string' ? d : d?.toISOString();
};
