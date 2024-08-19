---
title: TypeScript inherits all the flaws of JavaScript
slug: js-and-ts-are-flawed-languages
date: "2023-10-30"
tags:
  - JavaScript
  - Observations
  - TypeScript
  - Type systems
---

Being a big proponent of TypeScript, I keep noticing that this language inherits all the flaws of JavaScript. However, it does not mean we have no choice.

## The problem

Consider a function that turns an object representing a URL into a string:

```ts
type UrlRecord = {
  protocol: string;
  host: string[];
}

function urlToString(urlRecord: UrlRecord): string {
  const { protocol, host } = urlRecord;
  return `${protocol}://${host.join('.')}`;
}
```

This code snippet looks innocent and pretty solid. TypeScript compiler will let the users of this function know if they are passing the wrong data into the function:

```ts
console.log(urlToString({ protocol: 'http', host: 'g.com' }));
// > TS Error: Type 'string' is not assignable to type 'string[]'.
```

Great! However, how would TypeScript react to this change:

```ts
function urlToString(urlRecord: UrlRecord): string {
  const { protocol, host } = urlRecord;
  return `${protocol}://${host}`;
}
```

It is somewhat of a subtle change, and it is easy to overlook it during the code review. TypeScript was also okay with this change because the corresponding JavaScript code would work fine. The reason is the algorithm behind [String interpolation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#string_interpolation).

> Template literals [coerce their expressions directly to strings](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String#string_coercion), while addition coerces its operands to primitives first.

TypeScript inherits this behaviour. After all,

> TypeScript is JavaScript with syntax for types.

&copy; [TypeScript website](https://www.typescriptlang.org/)

We can even change `UrlRecord` type and it won't make any difference:

```ts
type UrlRecord = { protocol: string, host: string };
type UrlRecord = { protocol: string, host: Record<string, string[]> };
type UrlRecord = { protocol: string, host?: string | null };
type UrlRecord = { protocol: string, host: unknown };
type UrlRecord = { protocol: string, host: never };
```

TypeScript will correctly infer the type of `host`, but still won't bother about the string interpolation, because JavaScript will do its implicit [ToString](https://tc39.es/ecma262/#sec-tostring) business and make everything work no matter what. Only the users of the `urlToString` function will notice the difference. Don't get me wrong, it is already a big win compared to not having a compiler at all.

## Don't forget about the unit tests

Although this example may not look very convincing in isolation, within a larger codebase, mistakes like this may easily slip through unnoticed. It's easy to imagine a scenario when this function is used by other people in your organisation with a false impression that TypeScript will somehow guarantee correctness. This is why, sometimes, you may see weird things such as `http://undefined/api/...` or `Price: $ NaN`.

This example shows that because we rely on JavaScript's feature here (string interpolation), we need to be mindful of all possible edge cases and write all sorts of unit tests as if we didn't have any Type System. In fact, this function is a perfect candidate for TDD.

We need to always keep in mind that TypeScript is a layer on top of JavaScript, with all its quirks and weirdness. Having a type system should help discover such bugs early.

Besides, as authors (or maybe even users) of the `urlToString` function, we cannot know where the payload for it comes from. Fair enough, Type

## Can we do better?

Spoiler alert: yes, we can! Let's explore how ReScript handles this situation. This is the setup:

```ocaml
type urlObj = {
  protocol: string,
  host: string,
}

let urlObjToStr = obj => {
  `${obj.protocol}://${obj.host}`
}
```

This is how we would use the function:

```ocaml
Js.Console.log(urlObjToStr({ protocol: "http", host: "google.com" }))
(** > Ok *)

Js.Console.log(
  urlObjToStr({
    protocol: "http",
    host: list{"google", "com"}
          ~~~~~~~~~~~~~~~~~~~~~
          (** This has type: list<'a>  *)
          (** Somewhere wanted: string *)
  })
)
```

Essentially, this error says "You are giving it a list instead of a string"

So far so good, similar to the TypeScript, we cannot pass the wrong data into the function. However, if we change the function itself, we get a different outcome:

```ocaml
let urlObjToStr = obj => {
  `${obj.protocol}://${obj.host->Array.joinWith(".")}`
                       ~~~~~~~~
                       (** This has type: string       *)
                       (** Somewhere wanted: array<'a> *)
}
```

Interesting! ReScript figured out that `obj` is of type `urlObj` even without explicit type annotation! This is the power of a sound type system! Look what happens when we add the following type:

```ocaml
type urlObj2 = {
  protocol: string,
  host: array<string>,
}

let urlObjToStr = obj => {
  `${obj.protocol}://${obj.host->Array.joinWith(".")}`
}
(** > Ok *)
```

Now the compiler can infer that the type of `obj` is `urlObj2`, just by looking at the code! Now we get some proper guidance from the compiler:

```ocaml
Js.Console.log(
  urlObjToStr({
    protocol: "http",
    host: "google.com",
          ~~~~~~~~~~~~
          (** This has type: list<'a>         *)
          (** Somewhere wanted: array<string> *)
  }),
)
```

## Unknown source of data

Earlier I mentioned that we cannot be sure where the data comes from. If the input is generated by a program that is maintained by a colleague who sits right next to us, we still cannot trust the incoming data. Always keep in mind Murphy's law:

> Anything that can go wrong will go wrong

Let's say we read the data from `localStorage`:

```ocaml
let data = Dom.Storage.getItem("some-key", Dom.Storage.localStorage)
(** data : option<string> *)
```

In TypeScript, we could simply:

```ts
const data = window.localStorage.getItem("test");
// string | null
urlToString(JSON.parse(data || ""))
// Ok
```

This won't be possible in ReScript. Instead, we need to parse and decode the data. Without these steps, there's no way we can guarantee that the program works properly. Parsing and decoding steps may fail for different reasons and we, as the library authors have to handle this. So, here we go:

```ocaml
let safeParseJSON = (s: string): option<Js.Json.t> => {
  switch Js.Json.parseExn(s) {
  | val => Some(val)
  | exception _ => None
  }
}

let decodeUrlObj = (s: string): option<urlObj> => {
  (** make sure the string is a valid JSON *)
  safeParseJSON(s)->Option.flatMap(json =>
    (** let's see what is that JSON *)
    switch Js.Json.classify(json) {
    (** it is an object *)
    | Js.Json.JSONObject(value) =>
      value
      (** try reading the "protocol" field *)
      ->Js.Dict.get("protocol")
      (** ... and make sure it a string *)
      ->Option.flatMap(Js.Json.decodeString)
      ->Option.flatMap(protocol => {
        value
        (** try reading the "host" field *)
        ->Js.Dict.get("host")
        (** ... and make sure it a string *)
        ->Option.flatMap(Js.Json.decodeString)
        (** Finally, having everything we need, build a url object *)
        ->Option.map(host => {protocol, host})
      })
    | _ => None
    }
  )
}

switch data->Option.flatMap(decodeUrlObj) {
| Some(urlObj) => Console.log(urlObjToStr(urlObj))
| None => Console.log("Failed to parse the data")
}
```

First, `safeParseJSON` function helps us make sure that we received valid JSON. Then we run a decoder as part of the `decodeUrlObj` function. Notice that use pattern matching to handle different branches in the business logic. For example, we may receive a string with invalid JSON, or the JSON may not be an object, etc.

I used here a default, built-in JSON decoding facility. There are far more expressive and easy-to-use libraries for decoding out there.

The `flatMap` operator defined on `option<'t>` helps to chain the computation together without explicit pattern matching. This makes the code compact, yet descriptive.

The only issue I have with the code is that exception handling in the `safeParseJSON` function. If we remove that branch, the compiler won't complain. However, this issue can easily be prevented using ReScript's code analyser tool - it will notify us that the function may throw.

All of this shows how much validation we may miss when writing TypeScript simply because the language does not require any of that. Without these checks, we cannot guarantee that our program will not crash. Having types such as `option` instead of `null` or `undefined` being a part of the standard library is great! However, we can have a similar setup with TypeScript, which we'll explore in the following post. For now, I would highly encourage you to explore ReScript.
