---
title: "JavaScript Closures"
excerpt: "In JavaScript a closure is the combination of a function bundled together with references to its surrounding state"
coverImage: "/assets/blog/covers/javascript.jpeg"
date: "2022-03-06"
author:
  name: José Miguel Álvarez Vañó
  picture: "/assets/blog/authors/profile.jpeg"
ogImage:
  url: "/assets/blog/covers/javascript.jpeg"
---

In JavaScript a **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the **lexical environment**). This means that a function will have access to its outer context.

```js
function makeFunc() {
  const x = 10;
  function newFunc() {
    return x + 5;
  }

  return newFunc;
}

const newFunc = makeFunc();
newFunc(); // 15
```

In the previous example newFunc has access to the variable x because it’s its lexical environment.

```js
function makeFunc() {
  const x = 10;
  function newFunc() {
    const y = 5;
    return x + y;
  }

  function otherFunc() {
    return x + y;
  }

  return otherFunc;
}

const otherFunc = makeFunc();
otherFunc(); // ReferenceError: y is not defined
```

In this example we get an error because y is not defined in its lexical environment.

Source: [https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
