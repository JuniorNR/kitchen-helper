# 📋 ContextMenu в Next.js 15

Документация по работе с контекстным меню (правой кнопкой мыши) в Next.js 15.

## 📍 Расположение

`docs/technologies/contextmenu/`

## 📝 Описание

Контекстное меню (context menu) — это меню, которое появляется при нажатии правой кнопки мыши на элементе. В Next.js 15 и React это реализуется через обработку события `contextmenu`.

## 🧭 Базовые концепции

### Событие `contextmenu`

Событие `contextmenu` срабатывает при нажатии правой кнопки мыши (или длительном нажатии на мобильных устройствах).

```tsx
'use client';

import { useRef, useState } from 'react';

export const ContextMenuExample = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault(); // Отключаем стандартное меню браузера
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  const handleClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <div onContextMenu={handleContextMenu} onClick={handleClickOutside}>
      Правый клик здесь
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
            zIndex: 1000,
          }}
        >
          Меню
        </div>
      )}
    </div>
  );
};
```

## 📥 Установка и импорты

### Нативный подход (без библиотек)

Не требует установки дополнительных пакетов — используем встроенные возможности React и Next.js.

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
```

### С использованием HeroUI Dropdown

Если используете HeroUI, можно адаптировать `Dropdown` для контекстного меню:

```tsx
'use client';

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';
```

### С использованием HeroUI Tooltip

HeroUI `Tooltip` можно использовать для отображения подсказок с клавиатурными сокращениями и информацией о контекстном меню:

```tsx
'use client';

import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
```

## 🎬 Паттерны и примеры

### 1. Tooltip с подсказками о контекстном меню

Использование `Tooltip` для отображения подсказок о доступных действиях, включая правую кнопку мыши и клавиатурные сокращения:

```tsx
'use client';

import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';

export const ContextMenuTooltipExample = () => {
  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-1">
          <div>Правый клик для меню</div>
          <div className="text-xs text-default-400">
            Или нажмите <kbd className="px-1.5 py-0.5 bg-default-100 dark:bg-default-50 rounded text-xs">Ctrl+K</kbd>
          </div>
        </div>
      }
      placement="top"
      showArrow
    >
      <Button>Наведите для подсказки</Button>
    </Tooltip>
  );
};
```

### 2. Tooltip с клавиатурными сокращениями

Более продвинутый пример с форматированием клавиатурных сокращений:

```tsx
'use client';

import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';

interface KeyboardShortcut {
  keys: string[];
  description: string;
}

interface ContextMenuTooltipProps {
  children: React.ReactNode;
  shortcuts?: KeyboardShortcut[];
  contextMenuHint?: string;
}

export const ContextMenuTooltip: React.FC<ContextMenuTooltipProps> = ({
  children,
  shortcuts = [],
  contextMenuHint = 'Правый клик для меню',
}) => {
  const formatKeys = (keys: string[]) => {
    return keys.map((key, index) => (
      <span key={index}>
        <kbd className="px-1.5 py-0.5 bg-default-100 dark:bg-default-50 rounded text-xs font-mono">
          {key}
        </kbd>
        {index < keys.length - 1 && <span className="mx-1">+</span>}
      </span>
    ));
  };

  return (
    <Tooltip
      content={
        <div className="flex flex-col gap-2 p-1">
          <div className="text-sm">{contextMenuHint}</div>
          {shortcuts.length > 0 && (
            <div className="border-t border-default-200 pt-2 mt-1">
              {shortcuts.map((shortcut, index) => (
                <div key={index} className="flex items-center gap-2 text-xs">
                  <div className="flex items-center gap-1">
                    {formatKeys(shortcut.keys)}
                  </div>
                  <span className="text-default-400">—</span>
                  <span>{shortcut.description}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      }
      placement="top"
      showArrow
      delay={300}
    >
      {children}
    </Tooltip>
  );
};

// Использование:
export const Example = () => {
  return (
    <ContextMenuTooltip
      contextMenuHint="Правый клик для дополнительных действий"
      shortcuts={[
        { keys: ['Ctrl', 'K'], description: 'Открыть меню' },
        { keys: ['Ctrl', 'C'], description: 'Копировать' },
        { keys: ['Delete'], description: 'Удалить' },
      ]}
    >
      <Button>Элемент с подсказками</Button>
    </ContextMenuTooltip>
  );
};
```

### 3. Базовое контекстное меню

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@heroui/button';

interface ContextMenuProps {
  children: React.ReactNode;
  items: Array<{
    label: string;
    action: () => void;
    icon?: React.ReactNode;
  }>;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({
  children,
  items,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <>
      <div onContextMenu={handleContextMenu}>{children}</div>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bg-white dark:bg-slate-800 border border-default-200 rounded-lg shadow-lg py-2 z-50 min-w-[150px]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-default-100 dark:hover:bg-default-50 flex items-center gap-2"
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
```

### 4. Контекстное меню с HeroUI

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/dropdown';

export const HeroUIContextMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsOpen(true);
  };

  return (
    <Dropdown
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom-start"
    >
      <DropdownTrigger>
        <div
          ref={triggerRef}
          onContextMenu={handleContextMenu}
          className="p-4 border border-default-200 rounded-lg"
        >
          Правый клик здесь
        </div>
      </DropdownTrigger>
      <DropdownMenu aria-label="Context menu">
        <DropdownItem key="copy">Копировать</DropdownItem>
        <DropdownItem key="cut">Вырезать</DropdownItem>
        <DropdownItem key="delete" color="danger">
          Удалить
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
```

### 5. Контекстное меню с позиционированием

```tsx
'use client';

import { useState, useRef, useEffect } from 'react';

interface PositionedContextMenuProps {
  children: React.ReactNode;
  menuItems: Array<{
    label: string;
    onClick: () => void;
    disabled?: boolean;
  }>;
}

export const PositionedContextMenu: React.FC<PositionedContextMenuProps> = ({
  children,
  menuItems,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let x = e.clientX;
    let y = e.clientY;

    // Проверяем границы экрана
    const menuWidth = 200; // предполагаемая ширина меню
    const menuHeight = menuItems.length * 40; // предполагаемая высота

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setPosition({ x, y });
    setIsOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} onContextMenu={handleContextMenu}>
      {children}
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bg-content1 border border-divider rounded-lg shadow-lg py-1 z-[9999] min-w-[180px]"
          style={{
            left: `${position.x}px`,
            top: `${position.y}px`,
          }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                if (!item.disabled) {
                  item.onClick();
                  setIsOpen(false);
                }
              }}
              disabled={item.disabled}
              className="w-full text-left px-4 py-2 text-sm hover:bg-default-100 dark:hover:bg-default-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
```

### 6. Хук для контекстного меню

```tsx
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';

interface UseContextMenuReturn {
  isOpen: boolean;
  position: { x: number; y: number };
  handleContextMenu: (e: React.MouseEvent) => void;
  closeMenu: () => void;
  menuRef: React.RefObject<HTMLDivElement>;
}

export const useContextMenu = (): UseContextMenuReturn => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const menuRef = useRef<HTMLDivElement>(null);

  const handleContextMenu = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    let x = e.clientX;
    let y = e.clientY;

    // Корректировка позиции относительно границ экрана
    const menuWidth = 200;
    const menuHeight = 300;

    if (x + menuWidth > window.innerWidth) {
      x = window.innerWidth - menuWidth - 10;
    }
    if (y + menuHeight > window.innerHeight) {
      y = window.innerHeight - menuHeight - 10;
    }

    setPosition({ x, y });
    setIsOpen(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu();
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeMenu();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeMenu]);

  return {
    isOpen,
    position,
    handleContextMenu,
    closeMenu,
    menuRef,
  };
};
```

### 7. Пример использования хука с Tooltip

Комбинированный пример: контекстное меню + Tooltip с подсказками:

```tsx
'use client';

import { Tooltip } from '@heroui/tooltip';
import { useContextMenu } from '@/shared/lib/hooks/useContextMenu';

export const ChatMessageWithContextMenu = () => {
  const { isOpen, position, handleContextMenu, closeMenu, menuRef } =
    useContextMenu();

  const menuItems = [
    { 
      label: 'Копировать', 
      action: () => console.log('Copy'),
      shortcut: 'Ctrl+C',
    },
    { 
      label: 'Ответить', 
      action: () => console.log('Reply'),
      shortcut: 'Ctrl+R',
    },
    { 
      label: 'Удалить', 
      action: () => console.log('Delete'),
      shortcut: 'Delete',
    },
  ];

  return (
    <>
      <Tooltip
        content={
          <div className="flex flex-col gap-1 text-xs">
            <div>Правый клик для меню</div>
            <div className="text-default-400">
              <kbd className="px-1 py-0.5 bg-default-100 dark:bg-default-50 rounded">
                Ctrl+K
              </kbd>{' '}
              для быстрого доступа
            </div>
          </div>
        }
        placement="top"
        showArrow
        delay={500}
      >
        <div onContextMenu={handleContextMenu} className="p-4 cursor-context-menu">
          Сообщение чата
        </div>
      </Tooltip>
      {isOpen && (
        <div
          ref={menuRef}
          className="fixed bg-content1 border border-divider rounded-lg shadow-lg py-1 z-[9999] min-w-[200px]"
          style={{ left: `${position.x}px`, top: `${position.y}px` }}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                item.action();
                closeMenu();
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-default-100 flex items-center justify-between group"
            >
              <span>{item.label}</span>
              {item.shortcut && (
                <kbd className="px-1.5 py-0.5 bg-default-100 dark:bg-default-50 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  {item.shortcut}
                </kbd>
              )}
            </button>
          ))}
        </div>
      )}
    </>
  );
};
```

## 💡 Best Practices

### 1. Используйте Tooltip для улучшения UX

Добавляйте подсказки с информацией о доступных действиях:

```tsx
<Tooltip
  content={
    <div>
      <div>Правый клик для меню</div>
      <div className="text-xs text-default-400 mt-1">
        <kbd>Ctrl+K</kbd> для быстрого доступа
      </div>
    </div>
  }
>
  <Button>Элемент</Button>
</Tooltip>
```

### 2. Всегда предотвращайте стандартное меню

```tsx
const handleContextMenu = (e: React.MouseEvent) => {
  e.preventDefault(); // Обязательно!
  // ...
};
```

### 3. Закрывайте меню при клике вне его

```tsx
useEffect(() => {
  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    document.addEventListener('mousedown', handleClickOutside);
  }

  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, [isOpen]);
```

### 4. Корректируйте позицию относительно границ экрана

```tsx
let x = e.clientX;
let y = e.clientY;

if (x + menuWidth > window.innerWidth) {
  x = window.innerWidth - menuWidth - 10;
}
if (y + menuHeight > window.innerHeight) {
  y = window.innerHeight - menuHeight - 10;
}
```

### 5. Используйте высокий z-index

```tsx
<div style={{ zIndex: 9999 }}> {/* или z-[9999] в Tailwind */}
```

### 6. Обрабатывайте клавишу Escape

```tsx
useEffect(() => {
  const handleEscape = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  if (isOpen) {
    document.addEventListener('keydown', handleEscape);
  }

  return () => {
    document.removeEventListener('keydown', handleEscape);
  };
}, [isOpen]);
```

### 7. Используйте `fixed` позиционирование

```tsx
<div
  style={{
    position: 'fixed', // не 'absolute'!
    left: `${position.x}px`,
    top: `${position.y}px`,
  }}
>
```

## 🐞 Troubleshooting

### Меню не появляется

**Проблема**: Меню не показывается при правом клике.

**Решение**:
- Убедитесь, что вызываете `e.preventDefault()` в обработчике
- Проверьте, что `isOpen` устанавливается в `true`
- Убедитесь, что компонент имеет `'use client'` директиву

### Меню появляется не в том месте

**Проблема**: Меню появляется не там, где кликнули.

**Решение**:
- Используйте `e.clientX` и `e.clientY` для позиции
- Убедитесь, что используете `position: fixed`
- Проверьте, нет ли конфликтующих стилей

### Меню не закрывается

**Проблема**: Меню остается открытым после клика.

**Решение**:
- Убедитесь, что обработчик клика вне меню правильно настроен
- Проверьте, что `stopPropagation` не блокирует события
- Добавьте обработчик Escape

### Конфликты с другими меню

**Проблема**: Несколько меню открываются одновременно.

**Решение**:
- Используйте глобальное состояние или контекст для управления открытым меню
- Закрывайте другие меню при открытии нового

## ⚙️ Конфигурация

### Создание глобального провайдера контекстного меню

```tsx
'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ContextMenuContextType {
  openMenu: (x: number, y: number, items: MenuItem[]) => void;
  closeMenu: () => void;
  isOpen: boolean;
  position: { x: number; y: number };
  items: MenuItem[];
}

interface MenuItem {
  label: string;
  action: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(
  undefined,
);

export const ContextMenuProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [items, setItems] = useState<MenuItem[]>([]);

  const openMenu = (x: number, y: number, menuItems: MenuItem[]) => {
    setPosition({ x, y });
    setItems(menuItems);
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <ContextMenuContext.Provider
      value={{ openMenu, closeMenu, isOpen, position, items }}
    >
      {children}
      {/* Глобальный компонент меню */}
    </ContextMenuContext.Provider>
  );
};

export const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error('useContextMenu must be used within ContextMenuProvider');
  }
  return context;
};
```

## 🔗 Связанные документы

- [[🎨 HeroUIProvider|HeroUI Provider]]
- [[💬 Chat|Chat Feature]]
- [[🔧 Shared/lib/hooks|Custom Hooks]]
- [HeroUI Tooltip Documentation](https://www.heroui.com/docs/components/tooltip)

## 📚 Дополнительные ресурсы

- [MDN: contextmenu event](https://developer.mozilla.org/en-US/docs/Web/API/Element/contextmenu_event)
- [React: SyntheticEvent](https://react.dev/reference/react-dom/components/common#react-event-object)
- [Next.js 15: Client Components](https://nextjs.org/docs/app/building-your-application/rendering/client-components)
