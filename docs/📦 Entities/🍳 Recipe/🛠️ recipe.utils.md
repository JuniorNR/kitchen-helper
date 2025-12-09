# 🛠️ recipe.utils.ts

Утилиты для работы с рецептами.

## 📍 Расположение

`src/entities/recipe/model/recipe.utils.ts`

## 📝 Описание

Вспомогательные функции для преобразования данных рецептов.

## 🔧 Функции

### `buildRecipeCreateFormData(input: RecipeCreateFormInputType): FormData`

Построение FormData для создания рецепта.

**Параметры**:
- `input` - данные формы создания рецепта

**Возвращает**: `FormData` готовый для отправки на сервер

**Функциональность**:
- Преобразует camelCase ключи в snake_case
- Обрабатывает вложенные структуры (steps, ingredients, images)
- Добавляет файлы изображений
- Устанавливает флаги (isMain для изображений)

**Пример использования**:
```typescript
import { buildRecipeCreateFormData } from '@/entities/recipe';

const formData = buildRecipeCreateFormData(recipeData);
await createRecipe(formData);
```

## 🔗 Связанные документы

- [[🍳 Recipe|📦 Entities/🍳 Recipe]]
- [[🍳 Recipe/📡 recipe.api|recipe.api.ts]]
- [[➕ RecipeCreate Feature|🎨 Features/➕ RecipeCreate]]

