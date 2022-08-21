---
title: "Interface Segregation Principle in TypeScript"
summary: "Learn how to apply the Interface Segregation Principle in TypeScript."
date: "2022-08-20"
tags: ["typescript", "software-design", "solid-principles"]
images: ["/static/images/interface-segregation-principle.png"]
draft: false
urls:
  [
    "https://dev.to/jmalvarez/interface-segregation-principle-in-typescript-4dgb",
  ]
---

> Clients shouldn’t be forced to depend on methods they do not use.

The idea behind this principle is that it is better to have smaller and more specific interfaces rather than a big interface.

If we had just one interface that covered a lot of features, clients of that interface would have to implement behavior that they didn't need. Instead, if we have smaller interfaces, clients can implement just the needed behavior.

Another advantage is that when we update an interface, the changes will affect less clients, so there is less risk of breaking the code.

Remember that a class can implement multiple interfaces, so there is no need to include everything in just one interface.

---

In the following bad example we have an interface for animals with 2 methods: walk and fly.

As you can see, the `Dog` class has to implement the method fly even though that class does not need it.

```ts showLineNumbers
interface Animal {
  walk(): void;
  fly(): void;
}

class Dog implements Animal {
  walk() {
    console.log("Walking");
  }

  fly() {
    throw new Error("Dogs cannot fly");
  }
}

class Duck implements Animal {
  walk() {
    console.log("Walking");
  }

  fly() {
    console.log("Flying");
  }
}
```

Following this principle we can split the `Animal` interface into multiple ones. This way, the `Dog` class will only have to implement the methods that it needs.

```ts showLineNumbers
interface AnimalCanWalk {
  walk(): void;
}

interface AnimalCanFly {
  fly(): void;
}

class Dog implements AnimalCanWalk {
  walk() {
    console.log("Walking");
  }
}

class Duck implements AnimalCanWalk, AnimalCanFly {
  walk() {
    console.log("Walking");
  }

  fly() {
    console.log("Flying");
  }
}
```
