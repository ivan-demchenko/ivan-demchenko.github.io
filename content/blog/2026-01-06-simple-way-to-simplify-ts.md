---
title: Types Are Sets (and Optional Properties Blow Them Up)
date: "2026-01-22"
slug: types-are-sets
categories:
  - blog
tags:
  - TypeScript
---

One widely used TypeScript feature is the ability to have optional keys on objects. However, this poses a problem that becomes more significant as the system and state become more complex. Other type systems allow this problem to be circumvented. Let's take a closer look.

## Before we dive-in

In TypeScript (and most type systems), a type is best understood as a set of possible values. In other words,

```ts
type Name = string | null;
```

... means "Name is the set of **all strings** *plus* the value null". This is why it is called a Sum type, or [Tagged union](https://en.wikipedia.org/wiki/Tagged_union).

The compiler isn’t "thinking" about intent — only membership.

## Contrived example and 243 states

```ts
type Person = {
    name?: string | null
};
```

This allows three states:

1. missing
2. present with string
3. present with null

For two such fields, we have nine options:

```ts
function printPerson(data: {
    name?: string | null
    age?: number | null
}) {...}

printPerson({});
printPerson({ name: '...' });
printPerson({ name: null });
printPerson({ age: 42 });
printPerson({ age: null });
printPerson({ name: null, age: null });
printPerson({ name: '...', age: null });
printPerson({ name: null, age: 42 });
printPerson({ name: '...', age: 42 });
```

For five fields, we allow `3⁵ = 243`  states!

Worth noting that optional properties are unions in disguise:

```ts
type Person = {
    name?: string | null
};

// Is equivalent to:

type Person = {
    name: string | null | undefined
} | {};

// In set terms:

{ name: "X" }
{ name: null }
{ name: undefined }
{}
```

By writing:

```ts
name?: string | null
```

we declare:

> All three of these states are acceptable everywhere.

But that’s rarely true.

> At system boundaries, data is unknown. Inside the system, ambiguity is a liability.

TypeScript can significantly reduce this ambiguity and make system a lot more robust.

## Less contrived example

Imagine fetching a user profile:

```ts
type UserRequest = {
    data?: User
    error?: string
    lastUpdatedAt?: Date
};
```

This looks innocent. But the state is encoded implicitly.

What states does this represent?

All of these are valid:

```ts
{}                                  // nothing started?
{ lastUpdatedAt: new Date() }       // updated… but with what?
{ data: user }                      // success?
{ error: "timeout" }                // failure?
{ data: user, error: "oops" }       // ❌ impossible
{ data: user, lastUpdatedAt: null } // ❌ contradictory
```

Every consumer now has to reverse-engineer the state:

```ts
if (req.data) {
    // probably success
} else if (req.error) {
    // probably error
} else {
    // loading? idle?
}
```

The type doesn’t tell you what’s happening — it forces you to infer it.

### Fixing the keys?

```ts
type UserRequest = {
    data: User | null
    error: string | null
    lastUpdatedAt: Date | null
};
```

Helps to some extend, but doesn't eliminate the problem:

```ts
{
    data: user,
    error: "timeout",
    lastUpdatedAt: new Date()
}
```

Still valid and still impossible.

### Make data follow explicit state

Now let’s encode meaning instead of availability:

```ts
type UserRequest =
    | {
        status: "idle";
      }
    | {
        status: "loading";
        startedAt: Date;
      }
    | {
        status: "success";
        data: User;
        receivedAt: Date;
      }
    | {
        status: "error";
        error: string;
        failedAt: Date;
      };
```

This is not a Cartesian product. It’s a disjoint union of four sets. Here's what we achieved:

- every state has a name
- each state carries only the data that makes sense
- impossible combinations are unrepresentable

Now, TypeScript can guide us as we write/generate code, ensuring that our program does not end up in an exceptional state. This is how exceptions are eliminated. This is clearly visible on the consumer side, where things become straightforward:

```ts
function render(req: UserRequest) {
    switch (req.status) {
        case "idle":
            return "Not started";

        case "loading":
            return `Loading since ${req.startedAt.toISOString()}`;

        case "success":
            return `Hello ${req.data.name}`;

        case "error":
            return `Failed: ${req.error}`;
    }
}
```

Therefore, if we forbid `?`, we can force LLMs and humans to provide those variants.

## Departing from hope-driven programming

TypeScript alone is not enough, after compilation you'll end up with plain JS anyway. That's why libraries like Zod are important.

Let's encode the same constraints in Zod:

```ts
import { z } from "zod";

const UserSchema = z.object({
    name: z.string(),
    // ...
});

const UserRequestSchema = z.discriminatedUnion("status", [
    z.object({
        status: z.literal("idle"),
    }),
    z.object({
        status: z.literal("loading"),
        startedAt: z.date(),
    }),
    z.object({
        status: z.literal("success"),
        data: UserSchema,
        receivedAt: z.date(),
    }),
    z.object({
        status: z.literal("error"),
        error: z.string(),
        failedAt: z.date(),
    }),
]);

// And the type for the compiler:
type UserRequest = z.infer<typeof UserRequestSchema>;
```

Now the same rules exist twice: in the type system and runtime. Use this at the edge of your program:

```ts
function parseUserRequest(input: unknown): UserRequest {
    return UserRequestSchema.parse(input);
}
```

You may want to log all the attempts to pass invalid data here, return "Bad request" to your clients, return an error (no need to throw, btw), etc.

From this point on, your system operates on a closed world:

- no optional keys
- no impossible states
- no defensive checks

Everything downstream can assume invariants.

In fancy terms, turn a dynamic problem into a construction-time problem:

```ts
// Not great:
if (data && data.status === "success" && data.data) {
    // maybe safe?
}

// Great:
const req = UserRequestSchema.parse(input);
```

## Okay, what about testing?

TypeScript can reduce the amount of testing required. Imagine a simple REST endpoint:

```ts
POST /users

// Again, a bit contrived, but not unimaginable
type CreateUserRequest = {
    name?: string | null
    age?: number | null
};
```

From the type alone, the endpoint accepts 9 distinct shapes. Unit tests become combinatorial:

```ts
it("accepts missing name");
it("accepts null name");
it("accepts valid name");

it("accepts missing age");
it("accepts null age");
it("accepts valid age");

it("accepts missing name and age");
it("accepts null name and age");
// ...
```

Fixing the shape collapses the test space:

```ts
type CreateUserRequest = {
    name: string | null
    age: number | null
};

// The set shrinks from 9 to 3.
it("creates user with name and age");
it("creates user with null name");
it("creates user with null age");
```

State machines reduce tests even further:

```ts
type UserResponse =
    | { status: "loading" }
    | { status: "success"; data: User }
    | { status: "error"; error: string };
```

Here we would to cover **exactly three** cases - there's no more. Each state is disjoint, no overlap or ambiguity. You don’t need tests asserting “this never happens” — the type already says it can’t.

E2E tests benefit even more. These tests don’t care about internal branches — they care about observable behaviour. With explicit schemas, each test corresponds to a business scenario, not a parsing accident.

> You can test every element of a large set, or you can design a smaller set.

## Conclusion

If optional fields are how bugs enter your system, runtime validation is how you stop them at the door.