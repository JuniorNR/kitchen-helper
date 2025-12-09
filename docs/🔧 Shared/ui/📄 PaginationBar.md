# 📄 PaginationBar.tsx

Компонент панели пагинации.

## 📍 Расположение

`src/shared/ui/PaginationBar/ui/PaginationBar.tsx`

## 📝 Описание

Отображает панель пагинации для навигации по страницам данных.

## 🔧 Props

```typescript
interface PaginationBarProps {
  currentPage: number;
  page: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
}
```

## 💡 Использование

```typescript
import { PaginationBar } from '@/shared/ui';

<PaginationBar
  currentPage={1}
  page={currentPage}
  onPageChange={handlePageChange}
  totalItems={100}
/>
```

## ⚙️ Особенности

- Автоматический расчет количества страниц (6 элементов на страницу)
- Отображение контролов навигации
- Поддержка начальной страницы
- Стилизация с границами

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]

