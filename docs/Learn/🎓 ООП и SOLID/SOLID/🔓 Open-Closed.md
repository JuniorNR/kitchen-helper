# 🔓 Open-Closed Principle (OCP)

**Принцип открытости/закрытости** — программные сущности должны быть открыты для расширения, но закрыты для модификации.

## 🎯 Суть принципа

> "Программные сущности должны быть открыты для расширения, но закрыты для модификации"

Можно добавлять новую функциональность, не изменяя существующий код.

## ❌ Проблема: Нарушение OCP

```typescript
// ❌ ПЛОХО: При добавлении нового типа нужно изменять класс
class AreaCalculator {
  public calculateArea(shape: any): number {
    if (shape.type === "circle") {
      return Math.PI * shape.radius * shape.radius;
    } else if (shape.type === "rectangle") {
      return shape.width * shape.height;
    } else if (shape.type === "triangle") {
      return (shape.base * shape.height) / 2;
    }
    // При добавлении нового типа нужно изменять этот метод!
    throw new Error("Unknown shape type");
  }
}
```

**Проблемы:**
- При добавлении нового типа нужно изменять существующий код
- Нарушение принципа открытости/закрытости
- Высокий риск внесения багов в существующий код
- Сложно тестировать

## ✅ Решение: Применение OCP

```typescript
// ✅ ХОРОШО: Открыто для расширения, закрыто для модификации

// Абстракция - открыта для расширения
abstract class Shape {
  abstract calculateArea(): number;
}

// Конкретные реализации - можно добавлять новые без изменения существующих
class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  public calculateArea(): number {
    return Math.PI * this.radius * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(private width: number, private height: number) {
    super();
  }

  public calculateArea(): number {
    return this.width * this.height;
  }
}

class Triangle extends Shape {
  constructor(private base: number, private height: number) {
    super();
  }

  public calculateArea(): number {
    return (this.base * this.height) / 2;
  }
}

// Класс закрыт для модификации, но открыт для расширения
class AreaCalculator {
  public calculateTotalArea(shapes: Shape[]): number {
    return shapes.reduce((total, shape) => {
      return total + shape.calculateArea();
    }, 0);
  }
}

// Можно добавить новый тип БЕЗ изменения существующего кода
class Square extends Shape {
  constructor(private side: number) {
    super();
  }

  public calculateArea(): number {
    return this.side * this.side;
  }
}
```

## 🎯 Преимущества OCP

### 1. Безопасность изменений
Не нужно изменять существующий код, значит меньше риск багов.

### 2. Расширяемость
Легко добавлять новую функциональность.

### 3. Стабильность
Существующий код остается неизменным и стабильным.

### 4. Тестируемость
Не нужно переписывать тесты для существующего кода.

## 💡 Пример: Система скидок

### ❌ Без OCP

```typescript
class PriceCalculator {
  public calculate(price: number, customerType: string): number {
    if (customerType === "regular") {
      return price;
    } else if (customerType === "vip") {
      return price * 0.9; // 10% скидка
    } else if (customerType === "premium") {
      return price * 0.8; // 20% скидка
    }
    // При добавлении нового типа нужно изменять этот метод!
    return price;
  }
}
```

### ✅ С OCP

```typescript
// Абстракция - стратегия расчета цены
interface PricingStrategy {
  calculate(price: number): number;
}

// Конкретные стратегии
class RegularPricing implements PricingStrategy {
  public calculate(price: number): number {
    return price;
  }
}

class VipPricing implements PricingStrategy {
  public calculate(price: number): number {
    return price * 0.9; // 10% скидка
  }
}

class PremiumPricing implements PricingStrategy {
  public calculate(price: number): number {
    return price * 0.8; // 20% скидка
  }
}

// Класс закрыт для модификации
class PriceCalculator {
  public calculate(price: number, strategy: PricingStrategy): number {
    return strategy.calculate(price);
  }
}

// Можно добавить новую стратегию БЕЗ изменения существующего кода
class StudentPricing implements PricingStrategy {
  public calculate(price: number): number {
    return price * 0.85; // 15% скидка
  }
}
```

## 🔄 Паттерны для OCP

### Strategy Pattern
Разные алгоритмы инкапсулируются в отдельные классы.

```typescript
interface SortStrategy {
  sort(data: number[]): number[];
}

class QuickSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Quick sort implementation
    return data.sort((a, b) => a - b);
  }
}

class MergeSort implements SortStrategy {
  sort(data: number[]): number[] {
    // Merge sort implementation
    return data.sort((a, b) => a - b);
  }
}

class Sorter {
  constructor(private strategy: SortStrategy) {}

  public sort(data: number[]): number[] {
    return this.strategy.sort(data);
  }
}
```

### Template Method Pattern
Определяет скелет алгоритма, детали реализуются в подклассах.

```typescript
abstract class DataProcessor {
  // Шаблонный метод - закрыт для модификации
  public process(): void {
    this.loadData();
    this.transformData();
    this.saveData();
  }

  // Абстрактные методы - открыты для расширения
  protected abstract loadData(): void;
  protected abstract transformData(): void;
  protected abstract saveData(): void;
}

class CSVProcessor extends DataProcessor {
  protected loadData(): void {
    console.log("Loading CSV");
  }

  protected transformData(): void {
    console.log("Transforming CSV");
  }

  protected saveData(): void {
    console.log("Saving CSV");
  }
}
```

## 🔍 Как применить OCP?

### 1. Используйте абстракции
Интерфейсы и абстрактные классы вместо конкретных реализаций.

### 2. Применяйте полиморфизм
Разные реализации через единый интерфейс.

### 3. Используйте композицию
Объединяйте поведение через композицию, а не наследование.

### 4. Применяйте паттерны проектирования
Strategy, Template Method, Factory и другие.

## 📝 Практические советы

1. **Программируйте на уровне абстракций**
   - Зависьте от интерфейсов, а не от конкретных классов

2. **Избегайте if/switch по типам**
   - Используйте полиморфизм вместо проверок типов

3. **Применяйте Strategy Pattern**
   - Для разных алгоритмов или стратегий

4. **Используйте Template Method**
   - Когда алгоритм похож, но детали различаются

5. **Предпочитайте композицию наследованию**
   - Композиция более гибкая для расширения

## ⚠️ Когда НЕ применять OCP?

- **Простой код** — не усложняйте простые задачи
- **Одноразовый код** — если функциональность точно не будет расширяться
- **Прототипирование** — на ранних этапах можно нарушить принцип

## 🔗 Связь с другими принципами

### OCP и SRP
SRP создает маленькие классы, которые легче расширять (OCP).

### OCP и LSP
LSP гарантирует, что расширения работают правильно (OCP).

### OCP и DIP
DIP обеспечивает зависимость от абстракций для расширения (OCP).

## 🔗 Связанные документы

- [[🔌 Single Responsibility|🔌 Single Responsibility]] - SRP помогает применять OCP
- [[🔄 Liskov Substitution|🔄 Liskov Substitution]] - Правильное расширение
- [[🏗️ Dependency Inversion|🏗️ Dependency Inversion]] - Зависимость от абстракций
- [[🔀 Полиморфизм|🔀 Полиморфизм]] - Основа для OCP
- [[🎯 SOLID|🎯 SOLID]] - Обзор всех принципов

---

*Расширяйте функциональность, не изменяя существующий код.*

