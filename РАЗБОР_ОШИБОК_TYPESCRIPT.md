# 🔍 Разбор ошибок TypeScript компиляции

Всего найдено **16 ошибок** в **9 файлах**. Ниже детальный разбор каждой ошибки.

---

## 📋 Группа 1: Ошибка возвращаемого типа в handleDeleteIngredient

### Ошибка #1
**Файл**: `src/features/IngredientsList/ui/IngredientsList.tsx:119`  
**Код ошибки**: `TS2345`  
**Сообщение**: `Argument of type '(id: string) => Promise<void | null>' is not assignable to parameter of type '(id: string) => Promise<void>'.`

**Где происходит**:
```typescript
// Строка 119 в IngredientsList.tsx
onDelete={(id) =>
  handleDeleteIngredient(
    id,
    setIsDeleteLoadingIngredient,
    deleteIngredientData,
  )
}
```

**Проблема**:
Функция `handleDeleteIngredient` возвращает `Promise<void | null>` (потому что в catch блоке возвращается `null`), но компонент `IngredientCard` ожидает функцию, которая возвращает `Promise<void>`.

**Текущий код функции** (`src/features/IngredientsList/model/ingredientsList.utils.ts:16-29`):
```typescript
export const handleDeleteIngredient = async (
  id: string,
  setIsDeleteLoadingIngredient: (id: string | null) => void,
  deleteIngredientData: (id: string) => Promise<void>,
) => {
  try {
    setIsDeleteLoadingIngredient(id);
    await deleteIngredientData(id);
  } catch (_) {
    return null;  // ❌ Проблема здесь - возвращается null
  } finally {
    setIsDeleteLoadingIngredient(null);
  }
};
```

**Решение**:
Уберите `return null;` из catch блока. Либо не возвращайте ничего (функция вернет `Promise<void>`), либо явно укажите `return;` или `return undefined;`.

---

## 📋 Группа 2: Index signature для типов фильтров

### Ошибка #2
**Файл**: `src/features/IngredientsList/ui/IngredientsListFilter.tsx:144`  
**Код ошибки**: `TS2322`  
**Сообщение**: `Type 'IngredientListFilter' is not assignable to type 'Record<string, string | number | string[] | Date | number[]>'. Index signature for type 'string' is missing in type 'IngredientListFilter'.`

### Ошибка #3
**Файл**: `src/features/RecipesList/ui/RecipesListFilter.tsx:265`  
**Код ошибки**: `TS2322`  
**Сообщение**: `Type 'RecipeListFilter' is not assignable to type 'Record<string, string | number | string[] | Date | number[]>'. Index signature for type 'string' is missing in type 'RecipeListFilter'.`

**Где происходит**:
```typescript
// IngredientsListFilter.tsx:144
<Filter
  filterFromLocalStorage={filterFromLocalStorage}  // ❌ Ошибка здесь
  ...
/>

// RecipesListFilter.tsx:265
<Filter
  filterFromLocalStorage={filterFromLocalStorage}  // ❌ Ошибка здесь
  ...
/>
```

**Проблема**:
Компонент `Filter` ожидает `filterFromLocalStorage` типа `Record<string, string | number | Date | string[] | number[]>`, но типы `IngredientListFilter` и `RecipeListFilter` не имеют index signature `[key: string]`, поэтому TypeScript не может гарантировать, что все свойства соответствуют требуемым типам.

**Тип, который ожидается** (`src/shared/ui/Filter/model/filter.types.ts:6-9`):
```typescript
filterFromLocalStorage: Record<
  string,
  string | number | Date | string[] | number[]
>;
```

**Решение**:
Добавьте index signature к типам `IngredientListFilter` и `RecipeListFilter`, либо приведите тип при передаче:
1. **Вариант 1**: Добавить index signature в типы
   ```typescript
   export interface IngredientListFilter {
     // ваши поля
     [key: string]: string | number | Date | string[] | number[] | undefined;
   }
   ```
2. **Вариант 2**: Приведение типа при передаче
   ```typescript
   filterFromLocalStorage={filterFromLocalStorage as Record<string, string | number | Date | string[] | number[]>}
   ```

**Файлы для исправления**:
- `src/features/IngredientsList/model/ingredientsList.types.ts`
- `src/features/RecipesList/model/recipeList.types.ts`

---

## 📋 Группа 3: Неправильный импорт типов в PageInfoBlock

### Ошибка #4
**Файл**: `src/shared/ui/PageInfoBlock/ui/PageInfoBlock.tsx:3`  
**Код ошибки**: `TS2307`  
**Сообщение**: `Cannot find module '../pageInfoBlock.types' or its corresponding type declarations.`

**Текущий код**:
```typescript
// Строка 3
import type { PageInfoBlockProps } from '../pageInfoBlock.types';
```

**Проблема**:
Импорт пытается найти файл `../pageInfoBlock.types`, но файл находится в `../model/pageInfoBlock.types.ts`.

**Решение**:
Измените путь импорта:
```typescript
import type { PageInfoBlockProps } from '../model/pageInfoBlock.types';
```

---

## 📋 Группа 4: Не экспортируются типы Recipe и RecipeDTO

### Ошибка #5
**Файл**: `src/features/RecipesList/model/recipesListSSR.server.ts:4`  
**Код ошибки**: `TS2305`  
**Сообщение**: `Module '"@/entities/recipe"' has no exported member 'Recipe'.`

### Ошибка #6
**Файл**: `src/features/RecipesList/model/recipesListSSR.server.ts:4`  
**Код ошибки**: `TS2305`  
**Сообщение**: `Module '"@/entities/recipe"' has no exported member 'RecipeDTO'.`

### Ошибка #7
**Файл**: `src/features/RecipesList/ui/RecipesListSSR.tsx:3`  
**Код ошибки**: `TS2305`  
**Сообщение**: `Module '"@/entities/recipe"' has no exported member 'Recipe'.`

**Где происходит**:
```typescript
// recipesListSSR.server.ts:4
import type { Recipe, RecipeDTO } from '@/entities/recipe';
```

**Проблема**:
Типы `Recipe` и `RecipeDTO` определены в `src/entities/recipe/model/recipe.type.ts`, но не экспортируются через `src/entities/recipe/index.ts`.

**Текущий экспорт** (`src/entities/recipe/index.ts`):
```typescript
export { recipeApi } from './model/recipe.api';
export { useRecipe } from './model/useRecipe';
// ❌ Отсутствуют экспорты типов Recipe и RecipeDTO
```

**Решение**:
Добавьте экспорты типов в `src/entities/recipe/index.ts`:
```typescript
export type { Recipe, RecipeDTO, UseRecipe, RecipeStep, RecipeImage } from './model/recipe.type';
export { recipeApi } from './model/recipe.api';
export { useRecipe } from './model/useRecipe';
```

**Файлы для исправления**:
- `src/entities/recipe/index.ts`

---

## 📋 Группа 5: Ошибка типизации в RecipesListSSR.tsx

### Ошибка #8
**Файл**: `src/features/RecipesList/ui/RecipesListSSR.tsx:38`  
**Код ошибки**: `TS7006`  
**Сообщение**: `Parameter 'img' implicitly has an 'any' type.`

**Проблема**:
Параметр `img` в функции не имеет явного типа, и TypeScript не может его вывести.

**Решение**:
Добавьте явный тип для параметра `img`. Вероятно, это массив изображений рецепта.

---

## 📋 Группа 6: Ошибки типизации в ImagesPick

### Ошибка #9
**Файл**: `src/features/MarketCreate/ui/MarketCreateForm.tsx:139`  
**Код ошибки**: `TS2322`  
**Сообщение**: `Type '{ maxImages: number; variant: string; onFilesChange: (files: File[]) => void; }' is not assignable to type 'IntrinsicAttributes & ImagesPickProps'.`

**Проблема**:
Свойство `variant` имеет тип `string`, но `ImagesPickProps` ожидает более конкретный тип (например, `'none' | 'bordered'`).

**Решение**:
Используйте правильный тип для `variant` или приведите строку к нужному типу.

### Ошибка #10
**Файл**: `src/shared/ui/ImagesPick/ui/ImagesPick.stories.tsx:30`  
**Код ошибки**: `TS2353`  
**Сообщение**: `Object literal may only specify known properties, and 'errorMessage' does not exist in type 'Partial<ArgTypes<ImagesPickProps>>'.`

### Ошибка #11
**Файл**: `src/shared/ui/ImagesPick/ui/ImagesPick.stories.tsx:46`  
**Код ошибки**: `TS2353`  
**Сообщение**: `Object literal may only specify known properties, and 'errorMessage' does not exist in type 'Partial<...>'.`

**Проблема**:
В Storybook stories используется свойство `errorMessage`, которого нет в типе `ImagesPickProps`.

**Решение**:
Либо удалите `errorMessage` из stories, либо добавьте это свойство в тип `ImagesPickProps`, если оно должно быть.

---

## 📋 Группа 7: Ошибки типизации в PaginationBar.stories.tsx

### Ошибка #12
**Файл**: `src/shared/ui/PaginationBar/ui/PaginationBar.stories.tsx:30`  
**Код ошибки**: `TS2322`  
**Сообщение**: `Property 'args' is missing in type '{ render: ... }' but required in type 'StoryAnnotations<...>'.`

### Ошибка #13-15
**Файл**: `src/shared/ui/PaginationBar/ui/PaginationBar.stories.tsx:38,50,62`  
**Код ошибки**: `TS2322`  
**Сообщение**: `Type '{ currentPage: number; page: number; totalItems: number; }' is not assignable to type 'Partial<...>'. Property 'onPageChange' is missing...`

**Проблема**:
В Storybook stories отсутствует обязательное свойство `onPageChange` в объектах args, а также отсутствует свойство `args` в render функции.

**Решение**:
1. Добавьте `onPageChange: () => {}` в объекты args для всех stories
2. Добавьте свойство `args` в render функцию, если оно требуется

---

## 📊 Итоговая статистика

- **Всего ошибок**: 16
- **Критических**: 4 (группы 1-3)
- **Важных**: 8 (группы 4-6)
- **Вспомогательных**: 4 (группа 7 - Storybook)

## 🎯 Рекомендуемый порядок исправления

1. **Сначала**: Группа 3 (PageInfoBlock) - самое простое исправление
2. **Затем**: Группа 1 (handleDeleteIngredient) - логическая ошибка
3. **Далее**: Группа 4 (Recipe/RecipeDTO экспорты) - критично для SSR
4. **После**: Группа 2 (Index signature для фильтров) - потребует изменения типов
5. **В конце**: Группы 5-7 (дополнительные ошибки и Storybook)

---

## 💡 Советы

- Начните с самых простых ошибок (PageInfoBlock) для быстрого прогресса
- При исправлении групп 2 и 4 обязательно проверьте все места использования типов
- Storybook ошибки можно исправить в последнюю очередь - они не влияют на работу приложения
