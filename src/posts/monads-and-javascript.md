---
title: Monads and JavaScript
date: 2018-05-07
tags: ["post"]
---
There are countless articles that aim to describe what monads are. Sure, I can’t resist writing another one of my own.
<!--///-->

## Stepping into contexts

In order to understand what monad is, however, we should start with a `Functor`. The classical analogy for a functor is a _box_. The value sits inside that _box_. The only way to interact with that value is to use `map` function. Here is the signature for `map`:

`map :: f a -> (a -> b) -> f b`

This means that we can apply a function `a -> b` to a functor that holds a value of type `a` and get a functor with the a value of type `b` inside. The functor itself (or the _box_) remains the same. For example, an array is a valid `Functor`:

`Array<A>.prototype.map = <B>(fn: (a: A): B): Array<B>`.

_note: this is some sort of pseudocode_

The _box_ (or _wrapper_) analogy is good but not quite. The main purpose of a functor is to give a notion of a **context**. Here are few examples:

- `Maybe a = Just a | Nothing` for the computation that might fail.
- `Either a b = Left a | Right b` for the computation might have two outcomes.
- Traditionally, `Left` value is for an unfortunate or erroneous result. `Right` is for a successful outcome. Notice that this type takes two other types - `a` and `b`. As such, when you `map` over `Either`, you only exchange `b`. Therefore, if the computation failed, the error is propagated further, not `b`.
- `Task e r` it models an asynchronous action but doesn’t run it.
- `Future e r` similar `Task` but is strict.
- `Reader e r` this is a cool one. It represents a computation that depends on the environment `e` and the result would be `r`. A Function, really.

## Context-returning functions and composition

We are getting closer to Monads. Say you have two functions like this:

- `f :: a -> m b`
- `g :: b -> m c`

What does this `m` stand for? This is a context. Consider a function like this: `const f = (userId: number): Promise<Account> => { ... }`. `Promise` here is our `m`. Functions like these called Kleisli arrows. If we skipped `m ?` part of the signature, we could compose them easily into a function `a -> c`. But now we can’t. Say, you wanted to fetch all friends of a user knowing only a `userId`. You could make an API call to fetch an Account and then make another call to fetch a list of Friends. As such, we could have two functions:

- `const fetchAccount = (userId: number): Promise<Account>`
- `const fetchFriends = (account: Account): Promise<Array<Friend>>`

In theory, I can’t compose these function as they are not just simple functions. However, Promises implement a swiss-knife-method which is `Promise.prototype.then`. In this particular case, `.then` can “extract” `Account` from the first promise and “pass it” to `fetchFriends`. In Haskell, this operator is denoted as `>>=` (also known as `bind`, `chain`, `flatMap`, `andThen`, and, of course, the only one, the super-star… `smooshMap`). `.then` can also be used as `.map`. Also, it can handle errors…

So, why did I mentioned Kleisli arrows? Because `>>=` helps to compose such functions. “Normal” or “simple” functions are composed using `(.)` operator ([compose](http://ramdajs.com/docs/#compose) function in Ramda). Kleisli arrows are composed using `>>=` operator ([composeK](http://ramdajs.com/docs/#composeK)). Simple.

## When context switching is good

Okay, so now we can easily compose functions that use the same context. However, sometimes it is now enough. We need a way to jump from one context into another. Why? Consider a `head` function (or `array[0]`). It might return an `undefined`. And then we get `Cannot read .whatever from undefined` or something in our logs and our users keep clicking that button having no clue that the console could tell them that we forgot to check for the case of an empty array. However, we could spare another `if/else` if we did choose a type-safe way. We could build a nicer `head` function that could take us from a List/Array (one context) to a Maybe (another context). Like this:

```js
const safeHead = <X>(arr: Array<X>): Maybe<X> { ... }
```

We could refactor this:

```js
const friend = myFriends[0];
if (friend) {
  return goForSomeBeers(friend);
}
```

… into this:

```js
return saveHead(myFriends).map(goForSomeBeers);
```

Good, we're getting closer to…

### Natural Transformation

Okay, you’ve seen that we can move from one context into another. Let’s say, there’s a function that returns a value of `Either e a` and another function that takes a value of `Maybe a` type. Fairly common situation. In this case, we can just naturally transform one into another.

- `List a -> Maybe a`
- `Maybe a -> List a`
- `Either e a -> Maybe a`
- `Either e a -> Task e a`

There’s a catch though, not always we can easily jump between contexts. Sometimes, it is even impossible. For example,

- `Task e a -> Either e a` as we have no idea when the async operation will produce a result. Therefore, we have to remain in the context of async operations.
- `Maybe a -> Either () a` in this case, we should choose some “default” value for the first type argument for `Either`.

Some libraries implement methods that allow folding the data structure. For example, [Folktale](http://folktale.origamitower.com/) implements `.matchWith` for data structures to fold into a value. But we can use this method to implement Natural Transformations. Here’s the example:

```js
const Result = require('folktale/result');
const Task = require('folktale/concurrency/task');

// -- validateEmail :: String -> Result String String
const validateEmail = (email) =>
  email.indexOf('@') > -1 ? Result.Ok(email)
                            : Result.Error('Bad email');

// -- resultToTask :: Result String String -> Task String String
const resultToTask = (result) =>
  result.matchWith({
    Ok:    ({ value }) => Task.of(value),
    Error: ({ value }) => Task.rejected(value)
  });

resultToTask(validateEmail('abc@example.com'))
  .run()
  .promise()
  .then(console.log)
```

Here, `resultToTask` takes us from `Result a b` to `Task a b` and then `.promise()` converts a task into a promise.

Okay, having all this under our belts, we can finally move on to monad transformers.

Let’s meet another monad, `Reader`. This is a type that represents a computation that depends on the environment. Here’s the example:

```js
const Reader = require('fantasy-readers');

const DB = {
  getUser: (id) => ({ id: id, name: `User${id}` })
};

const fetchUser = (userId) => Reader((env) => {
  return env.db.getUser(userId);
});

fetchUser(1).run({db: DB});
// > { id: 1, name: 'User 1' }
```

There is a function that returns a `Reader e a` type. Let’s say having a user we have to fetch or generate an avatar.

```js
const Reader = require('fantasy-readers');

const DB = {
  getUser: (id) => ({ id: id, name: `User${id}` })
};

const Network = {
  fetchAvatar: (userName) => `/img/${userName.toLowerCase()}.jpeg`
}

// -- fetchUser :: Int -> Reader Env User
const fetchUser = (userId) => Reader((env) => {
  return env.db.getUser(userId);
});

// -- fetchAvatar :: User -> Reader Env String
const fetchAvatar = (user) => Reader((env) => {
  return env.network.fetchAvatar(user.name);
});

console.log(fetchUser(1).chain(fetchAvatar).run({
  db: DB,
  network: Network
}));
```

Look how nicely we can pass our dependencies using `Reader`! Now, remember Kleisli arrows? There are two functions here:

- `fetchUser :: Int -> Reader Env User`
- `fetchAvatar :: User -> Reader Env String`

If we strip reader noise away we get:

- `fetchUser :: Int -> User`
- `fetchAvatar :: User -> String`

As you can see without `Reader` we could have composed those functions easily using `compose`. However, we are in the context. Therefore, we use monadic interface - `.chain`. This is that simple. Now both function can read from the same `Env` but perform different operations and pass data according to the direction of the composition.

However, a computation might fail. Well, we have a context (or should I say Functor) for this! However, now we’re going to have a context within a context. Something like `Reader Env (Result e a)`. This means that if we want to reach to `a` we would need to `map` twice, `chain` twice and so on. And if we have yet another layer, then we would get triple maps/chains/etc. Not good. Instead, we could use **Monad Transformers** and, sort of, combine monads together. Here we’re going to use `Reader.ReaderT` and mix it with `Result`.

```js
const Reader = require('fantasy-readers');
const Result = require('folktale/result');

const ReaderResult = Reader.ReaderT(Result);

const DB = {
  getUser: (id) =>
    typeof id === 'number'
      ? Result.Ok(({ id: id, name: `User${id}` }))
      : Result.Error('Bad userId')
};

const Network = {
  fetchAvatar: (userName) =>
    Result.of(`/img/${userName.toLowerCase()}.jpeg`)
}

const fetchUser = (userId) => ReaderResult((env) => {
  return env.db.getUser(userId);
});

const fetchAvatar = (resUser) => ReaderResult((env) => {
  return env.network.fetchAvatar(resUser.name);
});

fetchUser(1).chain(fetchAvatar).run({
  db: DB,
  network: Network
});
// > folktale:Result.Ok({ value: "/img/user1.jpeg" })
```

Can you spot what has changed? Right, instead of `Reader` we use our `ReaderResult`, also `DB.getUser` and `Network.fetchAvatar` returns a value of the type `Result`.

I think we could stop here, there’s a lot to go through. Anyway, I hope you got a better understanding of what monads are and what are they for.
