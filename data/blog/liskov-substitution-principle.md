---
title: "Liskov Substitution Principle in TypeScript"
summary: "Learn how to apply the Liskov Substitution Principle in TypeScript."
date: "2022-08-19"
tags: ["typescript", "software-design", "solid-principles"]
images: ["/static/images/ts.png"]
draft: false
urls:
  ["https://dev.to/jmalvarez/liskov-substitution-principle-in-typescript-3i87"]
---

> When extending a class, remember that you should be able to pass objects of the subclass in place of objects of the parent class without breaking the client code.

The goal of this principle is that subclasses remain compatible with the behavior of the parent class. Subclasses should extend the behavior of the parent class and not replace it by something different.

If you follow this principle you will be able to replace a parent class by any of its subclasses without breaking the client code.

---

Imagine that we have an application that accepts orders. There are two possible states for an order: draft or confirmed. If an order was not confirmed, it cannot be payed.

In the following example we are breaking the substitution principle because the parent class has the method `markAsPaid` which does not throw any errors. On the contrary, the subclass `DraftOrder` throws an error in that method because draft orders cannot be payed. Replacing the parent class `Order` by its subclass `DraftOrder` may break the code if we were calling `markAsPaid`.

```ts showLineNumbers
class Order {
  id: number;
  items: string[];
  payed: boolean;

  // constructor

  markAsPaid(): void {
    this.payed = true;
  }
}

class DraftOrder extends Order {
  markAsPaid(): void {
    throw new Error("Draft orders can't be payed");
  }
}
```

We can improve this by making draft orders the parent class and confirmed orders the subclass. This way it is possible to replace the parent class by the subclass without breaking the code.

```ts showLineNumbers
class Order {
  id: number;
  items: string[];

  // constructor
}

class ConfirmedOrder extends Order {
  payed: boolean;

  // constructor

  markAsPaid(): void {
    this.payed = true;
  }
}
```
