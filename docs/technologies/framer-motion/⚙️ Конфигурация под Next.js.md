# ⚙️ Конфигурация под Next.js

Framer Motion работает на клиенте, поэтому важно правильно расставить клиентские границы и провайдеры.

## 🧭 Общие правила
- Любая страница/виджет с анимациями должна быть клиентским: добавьте `'use client'` в начале файла.
- Выносите анимации в локальные компоненты, чтобы не делать корневые страницы целиком клиентскими.
- Для выхода анимаций используйте `AnimatePresence` рядом со списком/модалкой, а не глобально на весь Layout.

## 🗺️ Пример локального провайдера
```tsx
'use client';
import { AnimatePresence, LazyMotion, domAnimation } from 'framer-motion';

const MotionProvider = ({ children }: { children: React.ReactNode }) => (
  <LazyMotion features={domAnimation}>
    <AnimatePresence initial={false} mode="sync">
      {children}
    </AnimatePresence>
  </LazyMotion>
);

export default MotionProvider;
```
Используйте `LazyMotion` для подгрузки фич, `initial={false}` — чтобы избежать гидрационных расхождений при серверном рендере.

## 🛣️ Переходы между страницами
Для анимации смены роута в App Router можно оборачивать `children` layout-а:
```tsx
'use client';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';

export const AnimatedLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.18, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
```

## 🦾 Поддержка reduced motion
Учитывайте системные настройки пользователя:
```tsx
import { useReducedMotion } from 'framer-motion';

const AnimatedBlock = ({ children }: { children: React.ReactNode }) => {
  const shouldReduce = useReducedMotion();
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.2 }}
    >
      {children}
    </motion.div>
  );
};
```

## ✅ Чек по настройке
- [`use client`] стоит в компонентах с анимацией.
- `AnimatePresence` оборачивает _коллекции_ или _роуты_, а не весь App.
- Для списков ключи стабильны, чтобы `exit` срабатывал.
- При SSR избегаем расхождений: `initial={false}` либо совпадающий `initial/animate`.
- Используем `LazyMotion` там, где много анимаций на странице.

## 🔗 Навигация
- Следующий: [[🧭 Базовые концепции|framer-motion/🧭 Базовые концепции]]
- Назад: [[📥 Установка и импорты|framer-motion/📥 Установка и импорты]]
- Связанные: [[🎬 Паттерны и примеры|framer-motion/🎬 Паттерны и примеры]], [[🐞 Troubleshooting|framer-motion/🐞 Troubleshooting]]
