# 📝 Практический пример: Как добавить Index Signature

## 🎯 Что нужно сделать

Добавить **одну строку** в конец каждого интерфейса `IngredientListFilter` и `RecipeListFilter`.

---

## ✅ Шаг 1: IngredientListFilter

### Файл: `src/features/IngredientsList/model/ingredientsList.types.ts`

### БЫЛО (до исправления):
```typescript
export interface IngredientListFilter {
	priceFrom: number;
	priceTo: number;
	createdFrom: string;
	createdTo: string;
	categories: string[];
	units: string[];
}
```

### СТАЛО (после исправления):
```typescript
export interface IngredientListFilter {
	priceFrom: number;
	priceTo: number;
	createdFrom: string;
	createdTo: string;
	categories: string[];
	units: string[];
	
	[key: string]: string | number | string[] | Date | number[] | undefined;
}
```

**Что изменилось:**
- Добавлена одна строка в конец интерфейса: `[key: string]: string | number | string[] | Date | number[] | undefined;`

---

## ✅ Шаг 2: RecipeListFilter

### Файл: `src/features/RecipesList/model/recipeList.types.ts`

### БЫЛО (до исправления):
```typescript
export interface RecipeListFilter {
	priceOfDishFrom: number;
	priceOfDishTo: number;
	priceToBuyFrom: number;
	priceToBuyTo: number;
	caloriesFrom: number;
	caloriesTo: number;
	fatsFrom: number;
	fatsTo: number;
	proteinsFrom: number;
	proteinsTo: number;
	carbohydratesFrom: number;
	carbohydratesTo: number;
	ration: string[];
	type: string[];
	createdFrom: string;
	createdTo: string;
}
```

### СТАЛО (после исправления):
```typescript
export interface RecipeListFilter {
	priceOfDishFrom: number;
	priceOfDishTo: number;
	priceToBuyFrom: number;
	priceToBuyTo: number;
	caloriesFrom: number;
	caloriesTo: number;
	fatsFrom: number;
	fatsTo: number;
	proteinsFrom: number;
	proteinsTo: number;
	carbohydratesFrom: number;
	carbohydratesTo: number;
	ration: string[];
	type: string[];
	createdFrom: string;
	createdTo: string;
	
	[key: string]: string | number | string[] | Date | number[] | undefined;
}
```

**Что изменилось:**
- Добавлена одна строка в конец интерфейса: `[key: string]: string | number | string[] | Date | number[] | undefined;`

---

## 📋 Итоговая инструкция

1. Откройте файл `src/features/IngredientsList/model/ingredientsList.types.ts`
2. Найдите интерфейс `IngredientListFilter`
3. После последнего свойства (после `units: string[];`) добавьте пустую строку
4. Добавьте строку: `[key: string]: string | number | string[] | Date | number[] | undefined;`
5. Повторите для `src/features/RecipesList/model/recipeList.types.ts` с интерфейсом `RecipeListFilter`

---

## 🔍 Визуально

```
БЫЛО:
┌─────────────────────────────────┐
│ export interface Filter {       │
│   field1: number;               │
│   field2: string;               │
│ }                               │
└─────────────────────────────────┘

СТАЛО:
┌─────────────────────────────────┐
│ export interface Filter {       │
│   field1: number;               │
│   field2: string;               │
│                                 │
│   [key: string]: ...;           │ ← ДОБАВИТЬ ЭТУ СТРОКУ
│ }                               │
└─────────────────────────────────┘
```

---

## ✅ Проверка

После добавления этой строки, TypeScript перестанет ругаться на ошибку:
```
Type 'IngredientListFilter' is not assignable to type 'Record<...>'
```

Проверьте командой:
```bash
pnpm run typecheck
```

Ошибки в строках 144 и 265 должны исчезнуть!
