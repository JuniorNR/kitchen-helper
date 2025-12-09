# 🔍 Filter.tsx

Компонент фильтрации с бейджами и формой.

## 📍 Расположение

`src/shared/ui/Filter/ui/Filter.tsx`

## 📝 Описание

Комплексный компонент фильтрации с отображением активных фильтров в виде бейджей и формой для добавления новых фильтров.

## 🔧 Props

```typescript
interface FilterProps {
  children: React.ReactNode;
  badges: Record<string, any>;
  filterFromLocalStorage: Record<string, any>;
  onSubmit: (data: any) => void;
  onReset: () => void;
  onSave?: () => void;
  onCancel?: () => void;
  onDeleteBadge: (key: string, value: any) => void;
  saveDisabled?: boolean;
  submitDisabled?: boolean;
}
```

## 💡 Использование

```typescript
import { Filter } from '@/shared/ui';

<Filter
  badges={activeFilters}
  filterFromLocalStorage={savedFilters}
  onSubmit={handleSubmit}
  onReset={handleReset}
  onSave={handleSave}
  onDeleteBadge={handleDeleteBadge}
>
  <FilterFormContent />
</Filter>
```

## 🎨 Особенности

- Отображение активных фильтров как бейджей
- Группировка массивов значений
- Поддержка дат
- Локализация полей
- Различие между пользовательскими и сохраненными фильтрами
- Анимация открытия/закрытия формы

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]
- [[🥘 IngredientsList Feature|🎨 Features/🥘 IngredientsList]]

