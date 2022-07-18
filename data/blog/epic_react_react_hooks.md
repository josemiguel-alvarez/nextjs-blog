---
title: "Epic React: React Hooks"
summary: 'These are my notes from the workshop "React Hooks" of the Epic React course.'
date: "2022-03-11"
tags: ["react", "react hooks"]
draft: false
---

<TOCInline toc={props.toc} asDisclosure />

### Intro

Why React hooks?

- the reference to `this` is problematic in classes.
- management of lifecycle side effects in classes is divided in multiple places.

A **statement** performs an action. An **expression** returns a value.

### Exercise 1

**State** is data than changes over time. `setState` tells React to re-render the component with the value passed as argument.

React hooks add interactivity to our functional components.

### Exercise 2

`useState` hook accepts as first argument the initial value of the state. What is passed as initial value **is executed on every render**. That means that if the initial value is an expensive calculation, it will be executed on every render. `useState` accepts that the initial value is a function and, in that case, React will execute it **only once**. This is called **lazy initialization**.

```js showLineNumbers
// ❌ Executed on every render, bad performance
React.useState(someExpensiveComputation());

// ✅ Only executed once
React.useState(() => someExpensiveComputation());
```

The `setSate` function returned by `useState` accepts an argument which can be a value or a function. If the new state has to be calculated based on the previous state, a function has to be given to be sure that the correct value is applied.

```js showLineNumbers
// ✅ Correct
setCount((previousCount) => previousCount + 1);

// ❌ Wrong, this could lead to bugs
setCount(count + 1);
```

The `Object.is()` method determines whether two values are [the same value](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness).

A **custom hook** is a function which calls other hooks.

React only renders a component when it is going to be displayed/painted in the browser. In the following example the Child component will never be rendered.

```jsx showLineNumbers
const Child = () => {
  console.log("Child render");
  return <div>Child</div>;
};

const App = () => {
  console.log("App render");
  const children = <Child />;
  console.log("App render ends");

  return <div />;
};

// Output:
// App render
// App render ends
```

But in the next example it does:

```jsx showLineNumbers
const Child = () => {
  console.log("Child render");
  return <div>Child</div>;
};

const App = () => {
  console.log("App render");
  const children = <Child />;

  console.log("App render ends");
  return <div>{children}</div>;
};

// Output:
// App render
// App render ends
// Child render
```

### Exercise 3

- **Lifting state**: In React, sharing state is accomplished by moving it up to the closest common ancestor of the components that need it. This is called “lifting state up”.

- **Colocation**: Localising the code as close as possible as where it is used. It improves maintainability.

### Exercise 4

- **Managed state** is state that needs to be explicitly managed.

- **Derived state** is state that can be calculated based on other state.

### Exercise 5

Function components are only responsible of creating and returning React elements. The DOM nodes are only created when `ReactDOM.render` is executed. To get access to this DOM nodes we can use the hook `useRef`.

`useState` should be used when we need to rerender the component when the data changes. Otherwise, if we don’t want to trigger a rerender, we can use `useRef`.

### Exercise 6

**Error boundary** classes can be used to handle errors in React apps. This component will handle all the errors of its children.

We can unmount and mount components by giving it a different key prop.

### Resources

- [useState lazy initialization and function updates (kentcdodds.com)](https://kentcdodds.com/blog/use-state-lazy-initialization-and-function-updates)
- [Equality comparisons and sameness (developer.mozilla.org)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness)
