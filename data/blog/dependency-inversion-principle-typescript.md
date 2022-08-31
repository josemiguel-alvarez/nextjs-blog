---
title: "Dependency Inversion Principle in TypeScript"
summary: "Learn how to apply the Dependency Inversion Principle in TypeScript."
date: "2022-08-21"
tags: ["typescript", "software-design", "solid-principles"]
images: ["/static/images/dependency-inversion-principle-typescript.png"]
draft: false
urls:
  ["https://dev.to/jmalvarez/dependency-inversion-principle-in-typescript-4nm0"]
dev_to: "https://dev.to/jmalvarez/dependency-inversion-principle-in-typescript-4nm0"
---

> Depend upon abstractions, not concretions.

In our applications we can differentiate between two types of classes:

- **Low level classes** which do operations like reading from a database or saving a file.
- **High level classes** which implement the business logic and use those low level classes.

What this principle proposes is that high level classes depend on interfaces instead of concrete implementations. This is easier to understand with an example.

---

In the following bad example we have the `OrderService` class that saves orders in a database. The `OrderService` class depends directly on the low level class `MySQLDatabase`.

If in the future we wanted to change the database that we are using we would have to modify the `OrderService` class.

```ts showLineNumbers
class OrderService {
  database: MySQLDatabase;

  // constructor

  save(order: Order): void {
    if (order.id === undefined) {
      this.database.insert(order);
    } else {
      this.database.update(order);
    }
  }
}

class MySQLDatabase {
  insert(order: Order) {
    // insert
  }

  update(order: Order) {
    // update
  }
}
```

We can improve this by creating an interface and make the `OrderService` class dependant of it. This way, we are inverting the dependency. Now the high level class depends on an abstraction instead of a low level class.

```ts showLineNumbers
class OrderService {
  database: Database;

  // constructor

  save(order: Order): void {
    this.database.save(order);
  }
}

interface Database {
  save(order: Order): void;
}

class MySQLDatabase implements Database {
  save(order: Order) {
    if (order.id === undefined) {
      // insert
    } else {
      // update
    }
  }
}
```

Now we can add new databases without modifying the `OrderService` class.
