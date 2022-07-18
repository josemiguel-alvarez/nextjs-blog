---
title: "Epic React: React Fundamentals"
summary: 'These are my notes from the workshop "React Fundamentals" of the Epic React course.'
date: "2022-03-07"
tags: ["react"]
draft: false
---

<TOCInline toc={props.toc} asDisclosure />

### Exercise 1

The **Document Object Model (DOM)** is a programming interface for web documents. It makes it possible for programming languages to interact with it.

It is not related to any language, other languages apart from JavaScript can interact with it.

JavaScript programs are separated into **modules**. Modern browsers support module functionality natively. Usage of native JavaScript modules is dependent on the `import` and `export` statements.

### Exercise 2

- **Imperative** programming: **How** to do something.
- **Declarative** programming: **What** to do.

**React** is used to create elements. **ReactDOM** is used to render these elements in the DOM.

### Exercise 3

**JSX** is a syntax extension to JavaScript. The browser does not understand JSX, so we have to convert it to JavaScript using a tool called **code compiler** like Babel.

The curly braces `{}` tell the compiler that what’s written between them it’s JavaScript and should not be modified/converted.

### Exercise 4

React components are functions that return a React element.

The **prop-types** package can be used to validate the props of a React component.

### Exercise 5

Property names in **inline styles** in React are **camelCased**.

### Exercise 6

A React **ref** is an object that stays consistent between renders of a React component.

Because of accessibility reasons, labels should be linked to inputs. This way, the screen readers can associate the label to the input. Also, this way, when the user clicks on the label, the input gets the focus.

It is not needed that inputs are rendered inside forms to work properly.

### Exercise 7

When an array is mapped to React components without the `key prop` React cannot identify correctly the components, leading to bugs. For example, if you have a list of 4 items and remove the 1st, React does not know which one was removed, and therefore, it’s easy that the state of the components gets mixed up.

Using index as a props is also wrong, because, in the previous example, initially the 1st component had the key set to “1”. When the 1st component is removed, then the 2nd component gets the key “1” and React thinks that the 1st component is still there.

The best solution is to use a key which is unique to each component.

### Resources

- [Epic React by Kent C. Odds](https://epicreact.dev)
