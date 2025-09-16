import type { Control } from 'react-hook-form';
import type { RecipeCreateFormInputType } from './recipeCreate.schema';

export interface RecipeCreateProps {
	setCreated: (created: boolean) => void;
}

export interface RecipeCreateStepIngredientsProps {
	control: Control<RecipeCreateFormInputType>;
	stepIndex: number;
}
