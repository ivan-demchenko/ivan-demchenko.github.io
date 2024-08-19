---
title: JavaScript is not viable any more
slug: js-is-not-viable-anymore
date: "2023-11-09"
tags:
  - JavaScript
  - Observations
  - TypeScript
---

JavaScript is a dominant language for building web applications. I've been using it for a very long time. However, in my opinion, it just doesn't cut it any more. Luckily, there are some compelling alternatives.

## JavaScript: A Dominant Yet Flawed Language

JavaScript offers a quick and cheap solution for building web applications in the short term. However, in the long run, its design quirks and inherent flaws will work against its users. JavaScript is ignorant and designed to handle any input without complaint, which leads to its quirky behaviour and unpredictability. I wrote about it in my [previous post](/blog/js-and-ts-are-flawed-languages).

EcmaScript specification can explain every line in the following snippet. In other words, JavaScript works the way it does by design. For example, have a look at [ToString](https://262.ecma-international.org/14.0/#sec-tostring). Here's what I mean:

```js
[] + []
//> ''
{} + []
//> 0
[] + {}
//> '[object Object]'
true - []
//> 1
[] - true
//> -1
```

Here are some interesting pages to explore:

- [JSFuck](https://en.wikipedia.org/wiki/JSFuck)
- [JavaScript, the weird parts](https://gist.github.com/piratefsh/160d94a27aca200dcef8)

Again, those are not bugs. Those are the language design.

To ensure correctness, developers must write heaps of tests and runtime checks. It applies to even those functions that look straightforward and simple. In JavaScript, we cannot trust the input - it can be anything, and will change over time as other parts of the system evolve. I am pretty sure almost every codebase has code similar to this:

```js
try {
  const response = await fetch("https://...");
  if (!response.ok) {
    // handle failed request
  }
  renderMyData(await response.json())
} catch (e) {
  console.error(e)
}
```

That's pretty much an [example from MDN](https://developer.mozilla.org/en-US/docs/Web/API/Response/json#examples). We then ship such code to our users and rely on other people not to break the contract. Sure, there will be some tests for this code, and maybe those tests will even use the real end-point. However, will it be a production end-point? How do we know it still works and returns the expected data?

## TypeScript: A Partial Solution with Limitations

First of all, I am a TypeScript advocate. This language has had a significant impact on the JavaScript ecosystem. However, compared to alternatives, TS requires discipline from a developer and in the end, it is not immune to JS-related problems. After all,

> TypeScript is JavaScript with syntax for types.

TypeScript can be good at being sceptical. For example, consider a function from my [previous blog post](/blog/js-and-ts-are-flawed-languages):

```ts
function urlToString(urlRecord: unknown): string {
  const { protocol, host } = urlRecord;
  //      ^^^^^^^^  ^^^^ <- Errors here
  return `${protocol}://${host}`;
}
```

To make TS happy we need to prove we know what we are doing:

```ts
if (urlRecord !== null &&
    typeof urlRecord === 'object' &&
    'protocol' in urlRecord &&
    'host' in urlRecord
) {
  // const { protocol, host } = urlRecord;
  // return `${protocol}://${host}`;
}
```

It is an improvement, but the code is still buggy because we can call our function like this:

```ts
const data = localStorage.getItem('whatever') as MyData;
console.log(
  urlToString(data)
)
```

... and TypeScript will be okay with this. If you felt scepticism looking at it, congratulations! On top of that, these lines are isolated. Imagine, reviewing a real PR while explaining to your manager why you won’t finish your feature on time on Slack.

While TypeScript provides some level of type safety, it falls short of offering the same guarantees as other strictly-typed languages. It still relies on DOM APIs designed for JavaScript and has an escape hatch: `any` type.

Moreover, the adoption of TypeScript demands effort from engineers, including training, addressing TypeScript errors, and maintaining the necessary infrastructure. It is no surprise some people avoid TypeScript and projects drop it altogether.

## Challenges Faced by Companies Using JavaScript

What does all this mean for a business? When a company opts for JavaScript, it must invest in extensive training for its engineers, ensuring they are well-versed in JavaScript's idiosyncrasies. Adding TypeScript on top means more training and adoption efforts. All of this is time and money spent on battling quirks of the language, ensuring correctness and maintaining the developer productivity rather than building a product. The examples above show how bugs appear in production.

But it gets even crazier. Companies hire entire teams and extensive tooling (and sometimes even other companies) to combat the quirks of JavaScript and its ecosystem. It creates unnecessary dependencies and bottlenecks. If your company has to hire specialists from a company that develops a solution you use, you have a dependency. Similarly, companies can introduce [dependencies on frameworks](/blog/dependencies-on-frontend-frameworks).

## Exploring Promising Alternatives

There is a light at the end of the tunnel though. There are promising alternatives:

- **ReScript** exemplifies the adoption of OCaml for JavaScript users, providing a robust alternative with a strong type system and seamless interoperability with JavaScript.
- **Elm** introduces an innovative language and architecture that has influenced the JavaScript ecosystem significantly. There are no runtime exceptions in Elm programs!
- **Rust** features great type system and runtime safety, and can be used for back-end and front-end development.
- For those hesitant to adopt radical changes, several TypeScript libraries enhance the language's safety and functionality, providing a middle ground between JavaScript and more robust alternatives.

I highly recommend to give [ReScript](https://rescript-lang.org/) a try.
