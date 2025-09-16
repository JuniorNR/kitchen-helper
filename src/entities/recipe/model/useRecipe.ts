import { useGetRecipesQuery } from './recipe.api';

export const useRecipe = () => {
	const { data, isLoading, error } = useGetRecipesQuery();
	return { recipes: data?.recipes, isLoading, error };
};
