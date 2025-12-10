# 🏗️ Dependency Inversion Principle (DIP)

**Принцип инверсии зависимостей** — зависимости должны быть направлены на абстракции, а не на конкретные реализации.

## 🎯 Суть принципа

> "Модули высокого уровня не должны зависеть от модулей низкого уровня. Оба должны зависеть от абстракций"

Зависьте от интерфейсов, а не от конкретных классов.

## 📐 Два правила DIP

1. **Модули высокого уровня не должны зависеть от модулей низкого уровня. Оба должны зависеть от абстракций.**
2. **Абстракции не должны зависеть от деталей. Детали должны зависеть от абстракций.**

## ❌ Проблема: Нарушение DIP

```typescript
// ❌ ПЛОХО: Зависимость от конкретных классов

// Модуль низкого уровня
class MySQLDatabase {
  public save(data: string): void {
    console.log(`Saving to MySQL: ${data}`);
  }

  public find(id: string): string {
    console.log(`Finding in MySQL: ${id}`);
    return "data";
  }
}

// Модуль высокого уровня зависит от модуля низкого уровня
class UserService {
  private database: MySQLDatabase; // ❌ Зависимость от конкретного класса

  constructor() {
    this.database = new MySQLDatabase(); // ❌ Создание конкретного объекта
  }

  public saveUser(user: string): void {
    this.database.save(user);
  }

  public getUser(id: string): string {
    return this.database.find(id);
  }
}
```

**Проблемы:**
- UserService жестко связан с MySQLDatabase
- Невозможно заменить базу данных без изменения кода
- Сложно тестировать (нужна реальная БД)
- Нарушение принципа инверсии зависимостей

## ✅ Решение: Применение DIP

```typescript
// ✅ ХОРОШО: Зависимость от абстракций

// Абстракция (интерфейс)
interface Database {
  save(data: string): void;
  find(id: string): string;
}

// Модуль низкого уровня зависит от абстракции
class MySQLDatabase implements Database {
  public save(data: string): void {
    console.log(`Saving to MySQL: ${data}`);
  }

  public find(id: string): string {
    console.log(`Finding in MySQL: ${id}`);
    return "data from MySQL";
  }
}

// Другая реализация низкого уровня
class PostgreSQLDatabase implements Database {
  public save(data: string): void {
    console.log(`Saving to PostgreSQL: ${data}`);
  }

  public find(id: string): string {
    console.log(`Finding in PostgreSQL: ${id}`);
    return "data from PostgreSQL";
  }
}

// Модуль высокого уровня зависит от абстракции
class UserService {
  private database: Database; // ✅ Зависимость от абстракции

  constructor(database: Database) { // ✅ Инъекция зависимости
    this.database = database;
  }

  public saveUser(user: string): void {
    this.database.save(user);
  }

  public getUser(id: string): string {
    return this.database.find(id);
  }
}

// Использование
const mysqlDb = new MySQLDatabase();
const userService1 = new UserService(mysqlDb);

const postgresDb = new PostgreSQLDatabase();
const userService2 = new UserService(postgresDb);
```

## 💡 Пример: Система уведомлений

### ❌ Без DIP

```typescript
// Конкретные классы
class EmailService {
  public send(to: string, message: string): void {
    console.log(`Sending email to ${to}: ${message}`);
  }
}

class SMSService {
  public send(to: string, message: string): void {
    console.log(`Sending SMS to ${to}: ${message}`);
  }
}

// Сервис зависит от конкретных классов
class NotificationService {
  private emailService: EmailService; // ❌ Зависимость от конкретного класса
  private smsService: SMSService;     // ❌ Зависимость от конкретного класса

  constructor() {
    this.emailService = new EmailService();
    this.smsService = new SMSService();
  }

  public notify(user: string, message: string): void {
    this.emailService.send(user, message);
    this.smsService.send(user, message);
  }
}
```

### ✅ С DIP

```typescript
// Абстракция
interface NotificationChannel {
  send(to: string, message: string): void;
}

// Конкретные реализации
class EmailService implements NotificationChannel {
  public send(to: string, message: string): void {
    console.log(`Sending email to ${to}: ${message}`);
  }
}

class SMSService implements NotificationChannel {
  public send(to: string, message: string): void {
    console.log(`Sending SMS to ${to}: ${message}`);
  }
}

class PushNotificationService implements NotificationChannel {
  public send(to: string, message: string): void {
    console.log(`Sending push to ${to}: ${message}`);
  }
}

// Сервис зависит от абстракции
class NotificationService {
  private channels: NotificationChannel[]; // ✅ Зависимость от абстракции

  constructor(channels: NotificationChannel[]) { // ✅ Инъекция зависимостей
    this.channels = channels;
  }

  public notify(user: string, message: string): void {
    this.channels.forEach(channel => {
      channel.send(user, message);
    });
  }
}

// Использование
const channels: NotificationChannel[] = [
  new EmailService(),
  new SMSService(),
  new PushNotificationService()
];

const notificationService = new NotificationService(channels);
notificationService.notify("user@example.com", "Hello!");
```

## 🔄 Dependency Injection (DI)

DIP часто реализуется через Dependency Injection:

### Constructor Injection
```typescript
class UserService {
  constructor(private database: Database) { }
}
```

### Property Injection
```typescript
class UserService {
  public database: Database;
}
```

### Method Injection
```typescript
class UserService {
  public process(database: Database): void {
    // Использование database
  }
}
```

## 🎯 Преимущества DIP

### 1. Гибкость
Легко заменять реализации без изменения кода.

### 2. Тестируемость
Можно использовать моки и стабы для тестирования.

### 3. Расширяемость
Легко добавлять новые реализации.

### 4. Слабая связанность
Модули слабо связаны через абстракции.

## 💡 Пример: Логирование

```typescript
// Абстракция
interface Logger {
  log(message: string): void;
}

// Реализации
class ConsoleLogger implements Logger {
  public log(message: string): void {
    console.log(message);
  }
}

class FileLogger implements Logger {
  public log(message: string): void {
    // Запись в файл
    console.log(`[FILE] ${message}`);
  }
}

class DatabaseLogger implements Logger {
  public log(message: string): void {
    // Запись в БД
    console.log(`[DB] ${message}`);
  }
}

// Сервис зависит от абстракции
class OrderService {
  constructor(private logger: Logger) { }

  public processOrder(orderId: string): void {
    this.logger.log(`Processing order: ${orderId}`);
    // Логика обработки заказа
    this.logger.log(`Order processed: ${orderId}`);
  }
}

// Можно использовать любую реализацию
const consoleLogger = new ConsoleLogger();
const orderService1 = new OrderService(consoleLogger);

const fileLogger = new FileLogger();
const orderService2 = new OrderService(fileLogger);
```

## 📝 Практические советы

1. **Зависьте от интерфейсов, а не от классов**
   - Используйте интерфейсы для зависимостей

2. **Используйте Dependency Injection**
   - Передавайте зависимости через конструктор

3. **Избегайте создания объектов внутри классов**
   - Используйте фабрики или DI контейнеры

4. **Применяйте абстрактные фабрики**
   - Для создания семейств объектов

5. **Используйте DI контейнеры**
   - Для управления зависимостями в больших проектах

## 🔍 Как применить DIP?

### Шаг 1: Определите зависимости
Найдите конкретные классы, от которых зависит ваш код.

### Шаг 2: Создайте абстракции
Создайте интерфейсы для этих зависимостей.

### Шаг 3: Реализуйте абстракции
Создайте конкретные классы, реализующие интерфейсы.

### Шаг 4: Инвертируйте зависимости
Измените код, чтобы зависеть от интерфейсов, а не от классов.

## 🔗 Связь с другими принципами

### DIP и SRP
SRP создает маленькие классы, которые легче заменять (DIP).

### DIP и OCP
DIP обеспечивает расширяемость через абстракции (OCP).

### DIP и ISP
ISP создает маленькие интерфейсы для инверсии зависимостей.

## 🔗 Связанные документы

- [[🔌 Single Responsibility|🔌 Single Responsibility]] - Создание заменяемых модулей
- [[🔓 Open-Closed|🔓 Open-Closed]] - Расширение через абстракции
- [[🎯 Interface Segregation|🎯 Interface Segregation]] - Маленькие интерфейсы для DIP
- [[📝 Абстракция|📝 Абстракция]] - Основа для DIP
- [[🎯 SOLID|🎯 SOLID]] - Обзор всех принципов

---

*Зависьте от абстракций, а не от конкретных реализаций.*

