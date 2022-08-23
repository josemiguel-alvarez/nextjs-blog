---
title: "Using the new :has pseudo-class as a CSS parent selector"
summary: "The :has pseudo-class has recently started to be supported by modern browsers. Learn how to use it here."
date: "2022-08-23"
tags: ["css"]
images: ["/static/images/using-has-pseudo-class-as-parent-selector.png"]
draft: false
urls: []
---

import { HasPseudoClassExample } from "@/components/posts/using-has-pseudo-class-as-parent-selector/example";

<TOCInline toc={props.toc} asDisclosure />

## Introduction

Modern browsers have started to [support](https://caniuse.com/css-has) the `:has` pseudo-class. Safari supports it since March 2022 and Chrome just released a new version in August 2022 that supports it. In Firefox it can used enabling the `layout.css.has-selector.enabled` flag.

The `:has()` pseudo-class selector can be used as a parent selector. It is very powerful because it accepts a relative selector list as an argument, therefore, possibilities are endless.

## Example

Let's see some examples of how the `:has` pseudo-class can be used. We have the following html structure:

```html showLineNumbers
<div>
  <div>
    <img src="ocean.jpeg" />
    <p>Image description.</p>
  </div>
  <div>
    <img src="html.jpg" />
  </div>
</div>
```

We have two images, one with a description and one without.

First, we are going to select the `div` element that contains the image with a description. For this we can use the **child selector** `>` like this: `div:has(> p)`. For our example it is enough, but we could do something more specific like combining the child selector and the **adjacent sibling selector** `+` like this: `div:has(> img + p)`.

- `div:has(> p)` is going to select the div elements that contain a paragraph.
- `div:has(> img + p)` is going to select the div elements that contain an image and a paragraph.

We can use both for our example.

```css showLineNumbers {1}
div:has(> p) {
  border: 2px solid #000;
  border-radius: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Now we are going to remove the margin of the image that has a description and we are going to give it some border radius.

```css showLineNumbers {1}
img:has(+ p) {
  margin: 0;
  border-radius: 5%;
}
```

Finally, we are going to give the image without a description some border radius. For this we are going to use the `:not()` pseudo-class.

- `img:not(:has(+ p))` is going to select the img elements that do not have a p element as an adjacent sibling.

```css showLineNumbers {1}
img:not(:has(+ p)) {
  border-radius: 50%;
}
```

You can see the final result below. Remember that only if you are using any of the browsers that already supports the `:has` pseudo-class you will see the result.

<HasPseudoClassExample />

## Resources

- [Browser support](https://caniuse.com/css-has)
- [:has() documentation - mdn web docs](https://developer.mozilla.org/en-US/docs/Web/CSS/:has)
