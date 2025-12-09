# 🎠 Slider.tsx

Компонент слайдера для изображений (Swiper).

## 📍 Расположение

`src/shared/ui/Slider/ui/Slider.tsx`

## 📝 Описание

Обертка над Swiper для создания слайдеров изображений с различными эффектами.

## 🔧 Props

Принимает все props от `swiper/react` SwiperProps плюс:

```typescript
interface SliderProps {
  isOpen?: boolean;
}
```

## 💡 Использование

```typescript
import { Slider } from '@/shared/ui';

<Slider
  slidesPerView={1}
  navigation
  pagination={{ clickable: true }}
  effect="cube"
>
  <SwiperSlide>
    <Image src="/image1.jpg" alt="Image 1" />
  </SwiperSlide>
  <SwiperSlide>
    <Image src="/image2.jpg" alt="Image 2" />
  </SwiperSlide>
</Slider>
```

## 🎨 Особенности

- Поддержка эффектов: cube, cards
- Навигация стрелками
- Пагинация с динамическими буллетами
- Доступность (A11y)
- Модульная архитектура Swiper

## 🔗 Связанные документы

- [[🔧 Shared/ui|UI компоненты]]

