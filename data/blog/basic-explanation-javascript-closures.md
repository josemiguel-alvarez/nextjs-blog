---
title: "Basic explanation of JavaScript closures"
summary: "Learn what a JavaScript closure is."
date: "2022-03-06"
tags: ["javascript"]
draft: false
---

In JavaScript a **closure** is the combination of a function bundled together (enclosed) with references to its surrounding state (the lexical environment). This means that **a function will have access to its outer context**.

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

In the previous example `newFunc` has access to the variable `x`. The closure is giving `newFunc` access to its outer context and `x` is defined there.

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

In this example we get an error because `y` is defined inside `newFunc` and not in its outer context.

```js
function makeFunc() {
  const x = 10;
  function newFunc() {
    const y = 5;
    return x + y;
  }

  function otherFunc() {
    return newFunc();
  }

  return otherFunc;
}

const otherFunc = makeFunc();
otherFunc(); // 15
```

Notice how `otherFunc` has access to `newFunc` in this last example to see the difference.

### Resources

- [Closures - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
