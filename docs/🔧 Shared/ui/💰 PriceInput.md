# 💰 PriceInput.tsx

Компонент ввода цены с выбором валюты.

## 📍 Расположение

`src/shared/ui/PriceInput/ui/PriceInput.tsx`

## 📝 Описание

Комбинированный компонент для ввода цены и выбора валюты (USD, RUB, EUR).

## 🔧 Props

```typescript
interface PriceInputProps {
  value: number;
  onPriceChange: (value: number) => void;
  priceUnit: 'USD' | 'RUB' | 'EUR';
  onPriceUnitChange: (unit: 'USD' | 'RUB' | 'EUR') => void;
  size?: 'sm' | 'md' | 'lg';
}
```

## 💡 Использование

```typescript
import { PriceInput } from '@/shared/ui';

const [price, setPrice] = useState(100);
const [currency, setCurrency] = useState<'USD' | 'RUB' | 'EUR'>('RUB');

<PriceInput
  value={price}
  onPriceChange={setPrice}
  priceUnit={currency}
  onPriceUnitChange={setCurrency}
/>
```

## 🎨 Особенности

- Форматирование цены как валюта
- Выбор валюты через Select
- Минимальное значение: 1
- Скрытые стрелки увеличения/уменьшения
- Адаптивная ширина (75% для цены, 25% для валюты)

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]

