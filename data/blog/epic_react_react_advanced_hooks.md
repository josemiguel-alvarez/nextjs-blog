---
title: "Epic React: Advanced React Hooks"
summary: 'These are my notes from the workshop "Advanced React Hooks" of the Epic React course.'
date: "2022-03-22"
tags: ["react", "react hooks"]
draft: false
---

### Exercise 1

When should I use `useState`?  
When it's just an independent element of state you're managing.

When should I use `useReducer`?  
When one element of your state relies on the value of another element of your state in order to update.

If multiple `setStates` are called in an event handler or in a `useEffect`, then they are batched and only one rerender is triggered.

### Exercise 2

**Memoization**: a performance optimization technique which eliminates the need to recompute a value for a given input by storing the original computation and returning that stored value when the same input is provided.

The caching strategy React has adopted has a size of 1. That is, they *only* keep around the **most recent value** of the input and result.

React builds a tree in an object which keeps track of the hooks, that’s how React knows which hook was called and can return the correct values. Example of the tree:

```js
{
 state: 0,
 dispatcher: ReactDispatcher.someFunction
 next: {
  {
   state: "another state",
   dispatcher: ReactDispatcher.anotherFunction
  }
 }
}
```

### Exercise 3

**React Context** is used to share data that can be considered global.

In case that we want to only avoid prop drilling, usually a simpler solution is component composition. More info about this: [Using Composition in React to Avoid "Prop Drilling" - YouTube](https://youtu.be/3XaXKiXtNjw)

### Exercise 4

When to use...

- **useLayoutEffect:** If you need to mutate the DOM and/or **do need** to perform measurements.
- **useEffect:** If you don't need to interact with the DOM at all or your DOM changes are unobservable (most of the time you should use this).

### Exercise 5

`forwardRef` can be used to forward a reference to a DOM component which is rendered in one the children components.

```jsx
const MyInput = forwardRef((props, ref) => {
  return <input ref={ref} />;
});

const App = () => {
  const ref = React.useRef();

  const focus = () => {
    ref.current.focus();
  };

  return <MyInput ref={ref} />;
};
```

We could also expose imperative methods:

```jsx
const MyInput = forwardRef((props, ref) => {
  const inputRef = React.useRef();
  ref.current = {
    focusInput: () => inputRef.current.focus(),
  };

  return <input ref={inputRef} />;
});

const App = () => {
  const ref = React.useRef();

  const focus = () => {
    ref.current.focusInput();
  };

  return <MyInput ref={ref} />;
};
```

But, instead of manipulating directly the ref, React has a hook called `useImperativeHandle` which does this for us:

```jsx
const MyInput = forwardRef((props, ref) => {
  const inputRef = React.useRef();

  useImperativeHandle(ref, () => ({
    focusInput: () => inputRef.current.focus(),
  }));

  return <input ref={inputRef} />;
});

const App = () => {
  const ref = React.useRef();

  const focus = () => {
    ref.current.focusInput();
  };

  return <MyInput ref={ref} />;
};
```

### Exercise 6

`useDebugValue` makes it possible to provide extra information of a custom hook in the **React Dev Tools**. It only works inside custom hooks.

```js
function useFriendStatus(friendID) {
  const [isOnline, setIsOnline] = useState(null);

  // Show a label in DevTools next to this Hook
  // e.g. "FriendStatus: Online"
  useDebugValue(isOnline ? "Online" : "Offline");

  return isOnline;
}
```

### Resources

- [Using Composition in React to Avoid "Prop Drilling" - YouTube](https://youtu.be/3XaXKiXtNjw)
- [Hooks API Reference - React](https://reactjs.org/docs/hooks-reference.html)
