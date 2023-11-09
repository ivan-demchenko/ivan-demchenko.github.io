---
title: JavaScript is not viable any more
date: 2023-11-09
tags:
  - JavaScript
  - Observations
  - TypeScript
---

JavaScript is a dominant language for building web applications. I've been using it for a very long time. However, in my opinion, it just doesn't cut it any more. Luckily, there are some compelling alternatives.

## JavaScript: A Dominant Yet Flawed Language

JavaScript offers a quick and cheap solution for building web applications in the short term. However, in the long run, its design quirks and inherent flaws will work against its users. JavaScript is ignorant, designed to handle any input without complaint, which leads to its quirky behaviour and unpredictability. I wrote about it in my [previous post](/blog/js-and-ts-are-flawed-languages).

To ensure correctness, developers must write heaps of tests and runtime checks. It applies to even those functions that look straightforward and simple. In JavaScript, we cannot trust the input - it can be anything, and will change over time as other parts of the system evolve.

But all these checks are not free: someone needs to maintain and modify the (sometimes redundant) code and tests. Moreover, the infrastructure has to be maintained (linters, formatter, type checker, compiler, you name it).

## TypeScript: A Partial Solution with Limitations

First of all, I am a big advocate of TypeScript. I think this language has had a significant impact on JS ecosystem. However, compared to alternatives, TS requires discipline from developer and in the end, it is not immune to JS-related problems. After all,

> TypeScript is JavaScript with syntax for types.

While it provides some level of type safety, it falls short of offering the same guarantees as other strictly-typed languages. It still relies on DOM APIs designed for JavaScript and has an escape hatch: `any` type.

Moreover, adoption of TypeScript demands effort from engineers, including training, addressing TypeScript errors, and maintaining the necessary infrastructure. No surprise some people avoid TypeScript and projects drop it all together.

## Challenges Faced by Companies Using JavaScript

What does all this mean for a business? When a company opts for JavaScript, it must invest in extensive training for its engineers, ensuring they are well-versed in JavaScript's idiosyncrasies. Adding TypeScript on top means more training and adoption efforts. All of this is time and money spent on battling quirks of the language, ensuring correctness and maintaining the developer productivity rather than building a product.

But it gets event crazier. Companies hire entire teams, extensive tooling (and sometimes event other companies) to combat the quirks of JavaScript and it's ecosystem. It creates unnecessary dependencies and bottlenecks. If your company has to hire specialists from a company that develops a solution you use, you have a dependency. Similarly, companies can introduce [dependencies on frameworks](/blog/dependencies-on-frontend-frameworks).

## Exploring Promising Alternatives

Despite these challenges, there are promising alternatives reshaping the web development landscape:

- **ReScript** exemplifies the adoption of OCaml for JavaScript users, providing a robust alternative with a strong type system and seamless interoperability with JavaScript.
- **Elm** introduces an innovative language and architecture that has influenced the JavaScript ecosystem significantly. Its focus on simplicity, reliability, and maintainability makes it an attractive choice for modern web development.
- **Rust** (via WebAssembly) has proven to be a great alternative to JS
- For those hesitant to adopt radical changes, several TypeScript libraries enhance the language's safety and functionality, providing a middle ground between JavaScript and more robust alternatives.

I highly recommend to give [ReScript](https://rescript-lang.org/) a try.
