---
title: Use Tailwind as CSS abstraction in CSS modules
slug: use-tailwind-with-abstraction
date: "2022-02-26"
tags:
  - front-end
  - architecture
---

Tailwind provides a solid base level, sort of a starting point for your application. The library is a set of utility CSS classes that use [Custom CSS properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) (a.k.a CSS variables). Some of these variables abstract away a default set of design tokens. As such, it is easy to create a dark theme (should a user prefer dark mode) or take some accessibility aspect into account (like reduced animations). I only described the tip of the iceberg. There is a whole ecosystem to support your developer experience.

Tailwind's approach makes it easy to build UI elements and compose them together. Yet, it does not dictate any UI patterns or solutions to UX problems.

However, when utilised naively, the utility-first approach has one downside: a long list of classes in DOM elements. Though, there are two simple solutions:

- use `@apply` directive;
- create abstractions on top of the HTML elements.

The point is: a combination of utility classes may represent different things in different contexts. Tailwind is an abstraction layer on top of CSS. However, it is also rather low-lever from the perspective of UI elements. Therefore, we can give distinct names for such collections and use those abstractions instead.

As I mentioned above, we can create abstractions on top of the HTML elements:

```jsx
const MyButton = ({ children }) => {
  return (
    <button className="dark:bg-gray-900 bg-gray-100 m-2 py-2 px-6 rounded-full uppercase ">
      {children}
    </button>
  );
};
```

This approach, however, has its limitations:

- We might need to swap classes, and it can quickly get cumbersome
- Every abstraction adds a layer to the component tree

There is another popular mechanism to style UI elements - CSS modules. But to make it comparable to Tailwind (in terms of flexibility and speed) one needs to invest quite some time. Besides, what is the point of re-inventing an existing library?

However, we could combine the two approaches. This way, we could get the best from both worlds: class names representing higher-level entities based on the pre-defined system of design tokens abstracted away by an extensive collection of utility classes.

I used this approach to style this website. In my opinion, the separation of concerns gets even cleaner this way. Let me demonstrate.

Here is the TypeScript code of the PostTag component:

```jsx
import * as React from "react";
import { Link } from "gatsby";
import * as PostTagCSS from "./PostTag.module.css";

export type PostTagProps = {
  tag: string,
};

export const PostTag: React.FC<PostTagProps> = ({ tag }) => {
  return (
    <Link className={PostTagCSS.tag} to={`/tag/${tag}`}>
      {tag}
    </Link>
  );
};
```

And this is the CSS module for this component:

```css
.tag {
  @apply dark:bg-gray-900 bg-gray-100 m-2 py-2 px-6 rounded-full uppercase font-bold text-sm tracking-wide;
}
```

Having this in mind, we can come up with a neat mental model for all the layers:

```
      UI entities
---------- ^ -----------
      CSS modules
---------- ^ -----------
 Tailwind: CSS classes
    and abstractions
---------- ^ -----------
   CSS   |  Raw values
------------------------
```
