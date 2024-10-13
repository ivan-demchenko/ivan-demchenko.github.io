---
title: Why I chose Elm for my side project
date: "2024-10-13"
slug: why-elm-is-language-of-choice
tags:
  - elm
  - architecture
---

I built a browser extension using Elm - [GoalMet - Achieve your goals](https://chromewebstore.google.com/detail/goalmet-achieve-your-goal/pkgdgifbbikgbnocmhcbhpogipnaemog?authuser=0&hl=en-AU). Even though Elm's evolution is rather slow, the JS community can learn heaps from this wonderful language and its ecosystem. Here are the main reasons why I chose Elm for my side project.

### Stable ecosystem

Everything I learned about Elm 2-3 years ago still applies. Even though I used Elm for anything substantial around two years ago, I could jump in and be productive immediately. Can you say the same about any other popular JS framework?

On the contrary, I'm hesitant to make changes to any other project started more than six months ago and based on a JS/TS framework because the ecosystem has evolved and there's a good chance that breaking changes have been introduced. In other words, I have to keep the framework up-to-date constantly, and it's not always easy in a less strictly typed language.

In Elm, breaking changes (or any changes for that matter) are rare, but they happen for a good reason. The language is stable and the rate of change is slow. The core maintainers take time to observe and understand the problems faced by the language's users.

However, the community is divided on this issue. On the one hand, people say that there's no need to rush development and "stay in fashion" or react to trends. On the other hand, people are concerned that the slow pace of development will lead to lower adoption, which will shrink the user base and eventually lead to the language's demise.

Well, the Elm language is based on certain principles and ideas, such as being a small, easy-to-learn, purely functional language with a predefined architecture. It is really hard to combine the latest fads and trends in the industry with these principles. But in my opinion, Elm does it well and remains relevant thanks to careful consideration of the needs of the community and the ideology of the language.

Of course, Elm evolves and there have been breaking changes. There's no way around it. But the current version was released in October 2019!

### Stable architecture and the ecosystem.

Typically, when people think of Elm, The Elm Architecture - or TEA - comes to mind. It has been a source of inspiration for many famous projects. For example, [Redux was greatly inspired by TEA](https://redux.js.org/understanding/history-and-design/prior-art).

It's crazy to see how the React world is changing every day. Redux (or the Reducer pattern) is no longer cool and signals are a new hot topic.

In Elm, the opposite is true. The Model-View-Update trio is still at the core of the TEA, while signals (or FRP) are a thing of the past.

Looks like these days, people bet on large user bases (React and others) and raise venture capital to start companies around the "hot new meta-framework". The promise is to simplify and streamline the development process by abstracting away the complexity of modern tooling (instead of solving the root of the problem). The reality, however, is that when people or companies buy this "new technology", they also get a dependency on this black box (a mixed bag of tools and plugins) maintained by a third-party group of people with objectives and a roadmap of their own. But I am getting philosophical.

### Everything works right out of the box.

Elm comes with everything a project needs: a compiler, a bundler, a package manager and catalogue, a dev server, a REPL, and a code formatting tool/analyser. It is great to see that other projects are following suit. For example, Deno 2 provides `lint`, `test`, `fmt` and other commands that eliminate the need for tools like Prettier or ESLint.

Everyone who writes Elm uses the same tools because they're stable, mature and **work**. There's rarely a need to introduce new tooling. As a result, jumping into any codebase is easy because everything is familiar. For example, every code base is formatted the same way. And even if it wasn't, running `elm-format` will make the code look like every other codebase. Amazing!

Due to the system of commands and messages, functional purity of the language and the absence of the `any` or `unknown` types, the package manager can detect if a new version contains breaking changes and won't allow publishing without changing the major version. Just think about the consequences of such behaviour. Everyone can trust type signatures and the promises of that package. Although I've never noticed them, theoretically, there is room for logical bugs. But an accidental major change in behaviour is impossible.

### Developer experience

Another point to mention is the ergonomics of the language. The Product type (or `Record` in TS terms) does not have optional fields. The Sum types allow data modelling using finite sets of constructors with a concise syntax. There are no `exception`s, `null`s, `undefined`s, `any`s or `unknown`s to deal with. All of this removes a whole bunch of cases to keep in mind when writing code. Developers can focus on the happy paths and the compiler ensures that everything is defined at all times, preventing nasty surprises.

On the contrary, TypeScript helps a JavaScript codebase grow as the number of people working on it grows. Hence, the pitch line: "TypeScript is JavaScript with syntax for types". TypeScript solves only a subset of JavaScript problems such as function's input-output contract. But it also features loopholes, such as `any` and doesn't prevent shortcomings of JavaScript (exceptions, runtime type coercion, unsafe code, etc.)

Elm is known for not having runtime exceptions. Although it is mostly true, I noticed that some browser extensions can make the Elm program break. However, Elm programs are a lot safer (thanks to language design) than TypeScript programs, not to mention any JS codebase with unit tests. This means that the end users will receive a program that doesn't break due to some exceptional cases and the developers can focus on testing the actual user flows.

## Conclusion

Even though Elm is not the most popular language, there's a lot we can learn from it and apply it in our day-to-day work in other, more mainstream languages. I'm glad I chose Elm for my side project as all those points I mentioned above make my experience as a developer amazing.
