---
title: Is JavaScript OOP or Functional?
slug: is-js-oop-or-functional
date: "2022-08-31"
tags:
  - JavaScript
---

A colleague of mine asked a good question: does TypeScript make JavaScript a better OOP language? To answer this question, I decided to compare OOP JavaScript to its opposite, Functional JavaScript.

TypeScript has become crazy popular. Many people bet on it as a magical language that will solve their JavaScript problems. Well, it won't. As Kyle Simpson described in his [upcoming book](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/types-grammar/ch4.md), the quirks of JavaScript don't disappear. In my opinion, we should not attribute any superpowers to TS apart from just helping developers to feel more confident in the larger codebase. As we know, all the type annotations are wiped out, and all we have left is pretty much JavaScript. Yes, the compiler may add some boilerplate code, like the inheritance implementation (depending on what is in the `tsconfig.json` file).

In my opinion, JS/TS is closer to the OOP language. The simplest reason is the syntax. Let me explain my point. We often need to provide an environment for computation. Here's a simple example:

```js
let a = 1;
let b = 2;
let c = a + b;
```

Here, the computation is `a + b`. The environment is the JS global context. Another way of doing this is via a function:

```js
function sum(a, b) {
  return a + b;
}
```

The context created by the sum function is the environment for that computation. If we use a bit more language-independent annotation, it may look like this: `sum :: (num, num) -> num`. The env here is a tuple `(num, num)`.

A similar thing happens when we start an app, and the program reads from a `.env` file. We create an environment (via a different mechanism) and provide some values to our computation.

In functional languages, people use a Reader monad. Why "Reader"? Because this monad provides a read-only env for a computation. Typically, we first build-up the definition of that computation and then run it:

```
run :: (env -> a) -> env -> a.
```

In other words, we provide a function that depends on `env` and later an `env` itself and get the result back. The `env` can look, for example, like this: `{ db_connection, file_system, port_number }`. In Haskell, it looks elegant because the syntax allows that.

The Reader monad reminds me of the Dependency Injection mechanism. Also, it makes me think of the Dependency Inversion principle. Don't we strive to do that in our day job to make the code more modular and testable?

There are implementations of the Reader monad for JS and TS too. However, they look unnatural in JS syntax. It's a matter of taste, of course. But some people like it and eventually switch to PureScript.

In JS, it is more natural or elegant (the path of the least resistance) to create a class and pass its dependencies via a constructor. TypeScript simply allows having more confidence here by specifying interfaces. And if there's a mismatch, your good and tireless friend will tell you. No code review process or unit testing can give that level of confidence. Of course, unit tests still play a vital role. But when you have a type system next to you, you think about what needs to be tested differently as you trust the compiler. The same applies to assertions in code.

Still, correct me if I am wrong (I don't remember the last time I opened the spec), but classes are syntactic sugar. Essentially, the `new` operator will act pretty much the same for
`class A { constructor(dep) {} }` and `function A(dep) {}`?
