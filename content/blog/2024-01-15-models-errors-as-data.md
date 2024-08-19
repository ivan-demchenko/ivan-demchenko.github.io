---
title: Model errors as data for better user and developer experience
slug: models-errors-as-data
date: "2024-01-15"
tags:
  - architecture
  - developer experience
  - user experience
  - typescript
---
A great product experience is when the product works as expected in the scenario it was designed for, and communicates with users in a meaningful way. As developers, we cannot control how and where our product will be used, or the user input. But we have the tools to guard the flow from unexpected inputs. In this post, I want to give two pieces of advice for people working in the JS ecosystem on how to create better programs.

I briefly spoke about these ideas in my other [blog post](/blog/common-mistakes-when-using-typescript/) and went into more detail in my [video](https://www.youtube.com/watch?v=GfM5BzW5Slc).

## Don't throw exceptions

Instead, return the data at all times. In JS (as well as TS), nobody is forced to handle exceptions! The problem is that exceptions break the flow, much like the `return` statement. Besides, you never know if the function you called may throw (unless you checked the source code) or whether your users will handle the exception. Therefore, the best you can do is to not use the exceptions to communicate an error or unexpected data. Instead, you can always return the data.

Bad:

```ts
const div = (a: number, b: number): number {
  if (b === 0) {
    // Callers have no way of knowing the function can fail
    throw new Error('Division by 0');
  }
  return a / b;
}
```

## Don't reject promises

Instead, resolve them with data at all times. You see, conceptually, there's no difference between rejecting promises and throwing an exception. Therefore, always return from your async function, or in other words, always resolve promises.

Bad:

```ts
const saveUser = async (user: User): Promise<void> {
  if (!user.someProperty) {
    throw new Error("Some property is missing");
  }
  return myDb.write(user);
}
```

## What kind of data to return?

The `Result` type. In TypeScript projects, I'd recommend starting with the [ts-results](https://github.com/vultix/ts-results) library. You see, other languages solved this problem years ago, for example, [Haskell](https://hackage.haskell.org/package/base-4.19.0.0/docs/Data-Either.html), [Rust](https://doc.rust-lang.org/std/result/), [Elm](https://package.elm-lang.org/packages/elm/core/latest/Result), etc. There are more robust libraries for TypeScript, but the [ts-results](https://github.com/vultix/ts-results) is very easy to adopt, and when you're hooked (you will be), you can take a look at something more encompassing.

Good:

```ts
import {Result, Ok, Err} from "ts-results"

// ...

const div = (a: number, b: number): Result<number, string> {
  if (b === 0) {
    return new Err("Division by 0");
  }
  return new Ok(a / b);
}

// ...

// Model the potential errors
type SaveUserError =
  | { _type: "missing_data", details: ... }
  | { _type: "db_error", details: ... }

const saveUser = async (
  user: User
): Promise<Result<void, SaveUserError>> {
  if (!user.someProperty) {
    return new Err({ _type: "missing_data", details: `property "Some" is missing` });
  }
  try {
    return new Ok(await myDb.write(user));
  } catch (e) {
    return new Err({ _type: "db_error", details: e });
  }
}
```

## Think about integrations

If you use a 3rd party library - which you can't control, it's in somebody's else mercy - just wrap the call in a try-catch and return a value of a `Result` type. As a nice bonus, you can monitor the actual defects in the library by adding logging to this place of your code. Same for the promise-returning functions.

Bad:

```ts
import { someFn } from "npm-wild-west";

function doStuff(): number {
  // let's pretend we trust it works 100% and always return a number
  return someFn()
}
```

Good:

```ts
import { someFn } from "npm-wild-west";

type DoStuffErr = { _type: "NPM_LIB_ERR", details: ... }

function doStuff(): Result<number, DoStuffErr> {
  try {
    return new Ok(someFn());
  } catch (e) {
    myLoggingSystem.error("Integration error", "someFn from npm-wild-west misbehaved");
    return new Err({ _type: "NPM_LIB_ERR", details: e });
  }
}
```

## Model the errors

Imagine a user receiving a cryptic error message, something about EACCES. Think about your colleagues (or yourself) parsing through the logging system and seeing those cryptic error messages originating from a minified JS code. To make it worse, let's say it comes from a global handler for unhandled rejections or exceptions.

A good debugging experience starts with code that is easy to debug, the code that gives you clues. Conceptually, there's no difference between a frustrated developer (in front of a logging system) and a frustrated user (trying to understand what is happening). Therefore, use the opportunity to guard yourself against errors that a 3rd party system of a library may produce, log them and write meaningful (in the context of the system) messages. Create a thin wrapper around the integration with that 3rd party to translate exceptions into values. The users (perhaps even yourself) of your code will then be forced to handle both cases (unless you use JS which is bollocks).

A type checker can check many things for you in real time, eliminating some trivial sanity-check unit tests. You'd better use the energy to write more meaningful tests (unit, integration, e2e, whatever).

## Conclusion

This whole topic is about a mindset. Thinking about the exceptional state the program may end up in during the execution and modelling the errors as data will help your users understand what went wrong, and help you understand where the error comes from and why. Adopting an errors-as-a-data mindset leads to a better user experience and developer experience.
