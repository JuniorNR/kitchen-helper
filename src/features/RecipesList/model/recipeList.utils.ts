export const SKELETON_KEYS = [
	'recipe-skeleton-1',
	'recipe-skeleton-2',
	'recipe-skeleton-3',
	'recipe-skeleton-4',
];

export const getStepMinutes = (duration: string) => {
	const match = String(duration ?? '').match(/\d+/);
	return match ? Number(match[0]) : 0;
};

export const handleDeleteRecipe = async (
	id: string,
	setIsDeleteLoadingRecipe: (id: string | null) => void,
	deleteRecipeData: (id: string) => Promise<unknown | null>,
) => {
	try {
		setIsDeleteLoadingRecipe(id);
		await deleteRecipeData(id);
	} catch (_) {
		return null;
	} finally {
		setIsDeleteLoadingRecipe(null);
	}
};
