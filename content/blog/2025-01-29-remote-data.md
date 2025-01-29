---
title: Remote Data as Data
date: "2025-01-29"
slug: remote-data-as-data
tags:
  - TypeScript
---

Today I want to talk about an interesting (though not new) idea for representing remote resources. In fact, any resource that takes some time to retrieve. But most often we talk about network resources. At the same time, we're going to do a bit of TypeScript gymnastics.

## Data type for side effects

The state of a remote resource can be represented in four ways:
- `Idle` - we haven't even requested the resource yet
- `Loading` - we have requested the resource, but the operation is not yet complete
- `Ready<D>` - we have the data
- `Error<E>` - something has gone wrong

So, using a discriminated union feature of TypeScript, we can create a type for this situation:
- `RemoteData<D, E>`

Now we need some way(s) to construct a value of this type. Each of the variants we listed above is a constructor. Here's how we can construct them:

```ts
const Idle = () => ({ _kind: 'Idle' as const });
const Loading = () => ({ _kind: 'Loading' as const });
const Ready = <D, >(data: D) => ({ _kind: 'Ready' as const, data });
const Error = <E, >(error: E) => ({ _kind: 'Error' as const, error });
```

Those are just simple functions that return simple objects. Please note `as const` that help to narrow the type from `string` to a corresponding literal.
Using a `ReturnType` utility we can reuse those constructors the following way:

```ts
type RemoteData<D, E> =
  | ReturnType<typeof Idle>
  | ReturnType<typeof Loading>
  | ReturnType<typeof Ready<D>>
  | ReturnType<typeof Error<E>>
```

Therefore, the `_kind` field acts as a discriminator for this union type.

Okay, now we can use this type in other function. For example,

```ts
function renderRemoteString(data: RemoteData<string, SomeError>) {
  // ...
}
```

At this point, we need to talk about a mental model for [Sum types](https://en.wikipedia.org/wiki/Algebraic_data_type) (or discriminated unions). All these constructors return a value of type `RemoteData<D, E>`. In other words, the value of type `RemoteData<D, E>` can be constructed in 4 ways. Therefore, within the `renderRemoteString` function, we don't really know which constructor has been used. So we need to deal with all 4:

```ts
function renderRemoteString(data: RemoteData<string, SomeError>) {
  switch (data._kind) {
    case 'Idle': return //...
    case 'Loading': return //...
    case 'Ready': return //...
    case 'Error': return //...
  }
}
```

However, TypeScript doesn't force us to handle all cases in this `switch`. Other languages do though. Let's have a look. This is [Rescript](https://rescript-lang.org/docs/manual/v11.0.0/pattern-matching-destructuring):

```rescript
type remoteData<'d, 'e> =
	| Idle
	| Loading
	| Ready('d)
	| Error('e)

let render = (data: remoteData<'d, 'e>) =>
  switch data {
  | Idle => "idle"
  | Loading => "Loading"
  | Ready(_data) => "Ready"
  | Error(_err) => "Error"
  }
```

if we "forget" about, for example, the `Error` case, the compiler will let us know:

```
You forgot to handle a possible case here, for example: 
  | Error(_)
```

Here's [Elm](https://guide.elm-lang.org/types/custom_types):

```elm
type RemoteData d e
  = Idle
  | Loading
  | Ready d
  | Error e
  
renderRemoteData : RemoteData String String -> String
renderRemoteData data =
  case data of
    Idle -> "Idle"
    Loading -> "Loading"
    Ready(_) -> "Ready"
    Error(_) -> "Error"
```

If we forget, say, `Loading` variant, we get one of those famous error messages:

```
This `case` does not have branches for all possibilities:

11|>  case data of
12|>    Idle -> "Idle"
13|>    -- Loading -> "Loading"
14|>    Ready(_) -> "Ready"
15|>    Error(_) -> "Error"

Missing possibilities include:

    Loading

I would have to crash if I saw one of those. Add branches for them!
```

But we can trick TypeScript to perform the [exhaustive check](https://gibbok.github.io/typescript-book/book/exhaustiveness-checking/) by introducing an impossible state:

```ts
switch (state._kind) {
  case 'Idle': return // ...
  case 'Loading': return // ...
  case 'Ready': return // ...
  case 'Error': return // ...
  default:
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
}
```

Although the error message is not as fancy as with other languages,
```
Type '{ _kind: "Error"; error: E; }' is not assignable to type 'never'.
```
... it does the job.

## Folding

I think there's an even better way to handle our data type and help our users. What if we could reduce (or fold) the whole situation of 4 constructors and the data they carry to a single value? Here's an idea:

```ts
function fold<D, E, R>(state: RemoteData<D, E>): R {
  // magic
}
```

But that's not all. Our users (including ourselves) will need to specify handlers for all of these options:

```ts
const data = Loading() // or Idle, or maybe Ready... who knows...

fold(data, {
  Idle: () => 'idle',
  Loading: () => 'loading',
  Error: (_) => 'error',
  Ready: (_) => `ready`,
})
```

Ah-ha! Our `fold` function should take a second argument:

```ts
function fold<D, E, R>(
  state: RemoteData<D, E>
  matcher // Magic moves here
): R {
  // do the folding...
}
```

Let's define a type for our `matcher` argument:

```ts
// First, let's collect all the _kind literals
type Kinds<A, B> = RemoteData<A, B>['_kind'];

// This helper type pick one variant by _kind field
type PickVariant<A, B, K extends Kinds<A, B>>
  = Extract<RemoteData<A, B>, { _kind: K }>;

// Finally, we can construct an object
// that has a function for each literal in _kind
type Matchers<D, E, R> = {
  [K in Kinds<A, B>]: (
    // here I'll just omit _kind field from function's argument
    args: Omit<PickVariant<A, B, K>, "_kind">
  ) => R
};
```

Now we can finish our `fold` implementation like this:

```ts
function fold<D, E, R>(
  state: RemoteData<D, E>,
  matcher: Matchers<D, E, R>
): R {
  switch (state._kind) {
    case 'Idle': return matcher.Idle({});
    case 'Loading': return matcher.Loading({});
    case 'Ready': return matcher.Ready({ data: state.data });
    case 'Error': return matcher.Error({ error: state.error });
    default:
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
  }
}
```

## All four? Every time?

A common complaint I get about this approach is that people don't want to deal with all the variants all the time. In fact, sometimes we just want to deal with a single case. In this case, due to the lack of [pattern matching](https://en.wikipedia.org/wiki/Pattern_matching) in TypeScript, we have to get creative. You see, in other languages you can specify a single branch for all the cases you don't care about. For example, in Elm:

```elm
renderRemoteData : RemoteData String String -> String
renderRemoteData data =
  case data of
    Idle -> "Idle"
    _ -> "whatever..."
    
    
main =
  Html.text <| renderRemoteData <| Loading
```

This will render `whatever...` on the screen.

We can achieve a similar result in TypeScript by adding an additional type:

```ts
type MatcherWithDefault<D, E, R> =
  Partial<Matchers<D, E, R>> & { _: () => R }
```

This type will be used for the `matchers` argument.

```ts
function fold<D, E, R>(
  state: RemoteData<D, E>,
  matcher: Matchers<D, E, R> | MatcherWithDefault<D, E, R>
): R
```

And this is how we would handle a variable now:

```ts
case 'Idle': return matcher.Idle
  ? matcher.Idle({})
  : (matcher as MatcherWithDefault<D, E, R>)._();
```

Here's the whole function:

```ts
function fold<D, E, R>(
  state: RemoteData<D, E>,
  matcher: Matchers<D, E, R> | MatcherWithDefault<D, E, R>
): R {
  switch (state._kind) {
    case 'Idle': return matcher.Idle
      ? matcher.Idle({})
      : (matcher as MatcherWithDefault<D, E, R>)._();
    case 'Loading': return matcher.Loading
      ? matcher.Loading({})
      : (matcher as MatcherWithDefault<D, E, R>)._();
    case 'Ready': return matcher.Ready
      ? matcher.Ready({ data: state.data })
      : (matcher as MatcherWithDefault<D, E, R>)._();
    case 'Error': return matcher.Error ?
      matcher.Error({ error: state.error })
      : (matcher as MatcherWithDefault<D, E, R>)._();
    default:
      const exhaustiveCheck: never = state;
      return exhaustiveCheck;
  }
}
```

Now, finally, our users can chose if they want to handle all the cases, or provide a "catch all" branch:

```ts
fold(Loading(), {
  Loading: () => 'loading',
  _: () => 'whatever...'
})
```

Here's a link to a [TypeScript Playground](https://www.typescriptlang.org/play/?noFallthroughCasesInSwitch=true#code/HYQwtgpgzgDiDGEAEAlCYD2AXCAREWISA3gFBIVIQAeMGATlkvBsFEwJIAmANsgLxIAFAEok-AHzDiSAPoBrAJbAuALiQBybnw1IQUZq3ZIAviIDc5SjTqNDbJgBkMILsoDm44WMnS5SlXUNZ1cPXX17YzNLSipaBiYWB1QIVwBPLwAeABUAGiQJIS4CEHVsnykhGQVlNU00dPCDJPZ84sJTCysKGwTIpgBRenoGLIH8wohhhnUBir8awM0hkfom-vyp1c7LbrjbJiw0mGQAZUIcHPyBqX492IAfFKwAV3pgbOOITKOTjAAzJDaCASe6UJ5oV7vT4nH5fAFIEJuYDuUGxR7PN4fL5wv6AhpcNI5CRo9EUCEQKHY2G-CAIlYMTI3UF7WlIADStSgmQAgvkAEK3JDnAjfPlIQUAbQ0iy4GgAujFKGyAAqKeDyABqIHoihAwCwvIF+XZcRwKgMnItRolJK8A2oWHoCENIsu4sF+WqATqppMEl2sTZAFkCPAABZTbke-IoIVkMkUSWm5Qcrk2wXy9RCHXuKDqADyYEUhrVGu1uv1hpjHIk+QARLL6xJ5ig9iZA8qvkhQ1gI1MAOol8O4CD-EAvHjV42oIUqnVYPU8TK9-v0aMzuNSABkJDk2dbpj2e16dn+L2A8EXrCQ-wwPC4VyQ41nQjBFHYovUbu+eWfdffJAwDDSN6HUVdQO5P8XzjJAnggwdh1HcdJ0NaDY1JCgRHUFASEAqAAHcSwjYRPxwAA6WUxATRNYngfRkC0XgIA0dR6EpLEgJAqZyOBJAAH4uL7UDeOYqozCQbNgOEqY9AMBD6CHLARzHCcpyfGCW0o0QlVoih6KgRikTCNiOPeIS13I4yUQEiyROs9xxLEKTuPoOSe1cpSVJQ9T0NnERtK6PTKAMxiCTSVikHYqk7J48LbOkyzwqqJB2lKJAyIgci0s6SThES0D3IUrzkLUtDrgwgLZB0wC6IY5ZpjWUyYoKniGTcwTWvocj2pSrYZgyi4sv6tyJJcmS3IiYqkNU1CNMqwLdL0rhZqnVRasTFomBocMJ3YRQADcIAAYUjDV1GACAjrcwRMqW4KKGizidr2xcjtOiANXuygTHbUhftINBMBwfBCHIu8HyEIHsDwEorJcZFHJEL09gcg9xCkDQeARsJcj2WR0d8DQCN2nBrvIimNH+kQgA) with the code