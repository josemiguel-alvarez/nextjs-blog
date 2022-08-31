---
title: "Testing implementation details"
summary: "Developers test implementation details in the frontend very frequently. Why is this a bad idea?"
date: "2022-08-30"
tags: ["testing"]
images: ["/static/images/testing-implementation-details.png"]
draft: false
urls: ["https://dev.to/jmalvarez/testing-implementation-details-gkg"]
dev_to: "https://dev.to/jmalvarez/testing-implementation-details-gkg"
---

I see developers testing implementation details in the frontend very frequently. **Why is this a bad idea?**

In this post I'm referring to _unit tests in the frontend_. There are other specific cases where it can make sense to test the implementation details, check the resources at the bottom to read more about this.

## It makes it harder to maintain tests

Imagine that you have the following function:

```js showLineNumbers
function multiply(x, y) {
  let total = 0;
  for (let i = 0; i < y; i++) {
    total = add(total, x);
  }
  return total;
}

function add(total, quantity) {
  return total + quantity;
}
```

And then you have the following tests:

```js showLineNumbers
test("returns the correct result", () => {
  expect(multiply(5, 3)).toEqual(15);
});

test("calls the add function the correct number of times", () => {
  multiply(5, 3);
  expect(add).toHaveBeenCalledTimes(3);
});
```

In the first test we are checking that the **output** of the method is correct. But in the second test we are testing **implementation details**. If someone later comes and updates our function to the following:

```js showLineNumbers{2}
function multiply(x, y) {
  return x * y;
}
```

The first test will still pass but the second will fail. The function is **still working fine**, the output is the expected one. But still, we have to go and update the tests because one of them is returning a **false negative**.

Because of this **we cannot rely on our tests**. We cannot have confidence on them to know if the refactor was correct or not.

**We should be testing our code as how other users are going to use it**. If we are testing a React component, we should check what the user will get. If it is a library, our tests should resemble how other apps will use it.

By testing the output of our code we improve the developer experience with the consequence of improving the code quality of our software.

**It should be easy to know if, after a refactor, our code still works or not.**

## Resources

- [Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)
- [Why You Should Sometimes Test "Implementation Details"](https://codingitwrong.com/2018/12/03/why-you-should-sometimes-test-implementation-details.html)
