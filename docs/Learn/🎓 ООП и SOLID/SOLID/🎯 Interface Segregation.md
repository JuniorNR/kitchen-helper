# 🎯 Interface Segregation Principle (ISP)

**Принцип разделения интерфейсов** — клиенты не должны зависеть от интерфейсов, которые они не используют.

## 🎯 Суть принципа

> "Клиенты не должны зависеть от методов, которые они не используют"

Создавайте маленькие, специфичные интерфейсы вместо больших общих.

## ❌ Проблема: Нарушение ISP

```typescript
// ❌ ПЛОХО: Огромный интерфейс со всеми методами
interface Worker {
  work(): void;
  eat(): void;
  sleep(): void;
}

class Human implements Worker {
  public work(): void {
    console.log("Human working");
  }

  public eat(): void {
    console.log("Human eating");
  }

  public sleep(): void {
    console.log("Human sleeping");
  }
}

class Robot implements Worker {
  public work(): void {
    console.log("Robot working");
  }

  // ❌ Проблема: Робот не ест и не спит!
  public eat(): void {
    throw new Error("Robots don't eat!");
  }

  public sleep(): void {
    throw new Error("Robots don't sleep!");
  }
}
```

**Проблемы:**
- Robot вынужден реализовывать методы, которые ему не нужны
- Нарушение принципа разделения интерфейсов
- Принуждение к пустым реализациям или исключениям

## ✅ Решение: Применение ISP

```typescript
// ✅ ХОРОШО: Разделенные интерфейсы

// Интерфейс только для работы
interface Workable {
  work(): void;
}

// Интерфейс только для еды
interface Eatable {
  eat(): void;
}

// Интерфейс только для сна
interface Sleepable {
  sleep(): void;
}

// Human реализует все нужные интерфейсы
class Human implements Workable, Eatable, Sleepable {
  public work(): void {
    console.log("Human working");
  }

  public eat(): void {
    console.log("Human eating");
  }

  public sleep(): void {
    console.log("Human sleeping");
  }
}

// Robot реализует только нужный интерфейс
class Robot implements Workable {
  public work(): void {
    console.log("Robot working");
  }
  // Не нужно реализовывать eat() и sleep()
}

// Функции работают только с нужными интерфейсами
function makeWork(worker: Workable): void {
  worker.work();
}

function makeEat(eater: Eatable): void {
  eater.eat();
}
```

## 💡 Пример: Принтер

### ❌ Без ISP

```typescript
interface Machine {
  print(): void;
  scan(): void;
  fax(): void;
}

class Printer implements Machine {
  public print(): void {
    console.log("Printing");
  }

  // ❌ Старый принтер не может сканировать
  public scan(): void {
    throw new Error("This printer can't scan");
  }

  // ❌ Старый принтер не может отправлять факсы
  public fax(): void {
    throw new Error("This printer can't fax");
  }
}

class ModernPrinter implements Machine {
  public print(): void {
    console.log("Printing");
  }

  public scan(): void {
    console.log("Scanning");
  }

  public fax(): void {
    console.log("Faxing");
  }
}
```

### ✅ С ISP

```typescript
// Разделенные интерфейсы
interface Printer {
  print(): void;
}

interface Scanner {
  scan(): void;
}

interface FaxMachine {
  fax(): void;
}

// Старый принтер реализует только нужный интерфейс
class OldPrinter implements Printer {
  public print(): void {
    console.log("Printing");
  }
}

// Современный принтер реализует все интерфейсы
class ModernPrinter implements Printer, Scanner, FaxMachine {
  public print(): void {
    console.log("Printing");
  }

  public scan(): void {
    console.log("Scanning");
  }

  public fax(): void {
    console.log("Faxing");
  }
}

// Функции работают только с нужными интерфейсами
function printDocument(printer: Printer): void {
  printer.print();
}

function scanDocument(scanner: Scanner): void {
  scanner.scan();
}
```

## 🎯 Преимущества ISP

### 1. Гибкость
Классы реализуют только то, что им нужно.

### 2. Чистота кода
Нет пустых реализаций или исключений.

### 3. Легкость изменений
Изменения в одном интерфейсе не затрагивают другие.

### 4. Меньше связанности
Классы зависят только от нужных интерфейсов.

## 🔄 Композиция интерфейсов

```typescript
// Базовые интерфейсы
interface Readable {
  read(): string;
}

interface Writable {
  write(data: string): void;
}

interface Deletable {
  delete(): void;
}

// Композиция интерфейсов
interface ReadWriteFile extends Readable, Writable {
  // Объединяет чтение и запись
}

interface FullAccessFile extends Readable, Writable, Deletable {
  // Полный доступ: чтение, запись, удаление
}

// Реализации
class ReadOnlyFile implements Readable {
  public read(): string {
    return "File content";
  }
}

class ReadWriteFileImpl implements ReadWriteFile {
  public read(): string {
    return "File content";
  }

  public write(data: string): void {
    console.log(`Writing: ${data}`);
  }
}
```

## 💡 Пример: Система управления пользователями

### ❌ Без ISP

```typescript
interface UserService {
  createUser(user: User): void;
  updateUser(user: User): void;
  deleteUser(id: string): void;
  getUser(id: string): User;
  getAllUsers(): User[];
  sendEmail(user: User, message: string): void;
  generateReport(): Report;
}

// Администратор использует все методы
class AdminService implements UserService {
  // Реализует все методы
}

// Обычный пользователь не должен удалять или генерировать отчеты
class RegularUserService implements UserService {
  // ❌ Вынужден реализовывать методы, которые не должен использовать
  public deleteUser(id: string): void {
    throw new Error("Not allowed");
  }

  public generateReport(): Report {
    throw new Error("Not allowed");
  }
}
```

### ✅ С ISP

```typescript
// Разделенные интерфейсы
interface UserReader {
  getUser(id: string): User;
  getAllUsers(): User[];
}

interface UserWriter {
  createUser(user: User): void;
  updateUser(user: User): void;
}

interface UserDeleter {
  deleteUser(id: string): void;
}

interface EmailSender {
  sendEmail(user: User, message: string): void;
}

interface ReportGenerator {
  generateReport(): Report;
}

// Администратор реализует все интерфейсы
class AdminService implements 
  UserReader, 
  UserWriter, 
  UserDeleter, 
  EmailSender, 
  ReportGenerator {
  // Реализация всех методов
}

// Обычный пользователь реализует только нужные интерфейсы
class RegularUserService implements UserReader, UserWriter, EmailSender {
  // Реализует только разрешенные методы
}
```

## 📝 Практические советы

1. **Создавайте маленькие интерфейсы**
   - Один интерфейс = одна ответственность

2. **Группируйте связанные методы**
   - Методы, которые используются вместе, должны быть в одном интерфейсе

3. **Избегайте "толстых" интерфейсов**
   - Если интерфейс имеет много методов, возможно, его нужно разделить

4. **Используйте композицию интерфейсов**
   - Объединяйте маленькие интерфейсы в большие при необходимости

5. **Следуйте правилу "клиент-интерфейс"**
   - Интерфейс должен быть специфичен для клиента

## 🔍 Как определить нарушение ISP?

### Признаки:

1. **Класс реализует методы, которые не использует**
   ```typescript
   class A implements Interface {
     method1() { } // Использует
     method2() { } // Не использует, но вынужден реализовать
   }
   ```

2. **Пустые реализации или исключения**
   ```typescript
   class A implements Interface {
     method(): void {
       throw new Error("Not implemented");
     }
   }
   ```

3. **Большой интерфейс с несвязанными методами**
   ```typescript
   interface BigInterface {
     method1(): void;
     method2(): void;
     method3(): void;
     method4(): void;
     method5(): void;
   }
   ```

## 🔗 Связь с другими принципами

### ISP и SRP
Оба принципа говорят о разделении ответственности.

### ISP и DIP
ISP создает маленькие интерфейсы для инверсии зависимостей (DIP).

### ISP и OCP
Маленькие интерфейсы легче расширять (OCP).

## 🔗 Связанные документы

- [[🔌 Single Responsibility|🔌 Single Responsibility]] - Похожий принцип для классов
- [[🏗️ Dependency Inversion|🏗️ Dependency Inversion]] - Зависимость от маленьких интерфейсов
- [[🔓 Open-Closed|🔓 Open-Closed]] - Расширение через интерфейсы
- [[🎯 SOLID|🎯 SOLID]] - Обзор всех принципов

---

*Клиенты не должны зависеть от того, что им не нужно.*

