---
layout:     post
title:      "Life is easier with partial application"
author:     Ivan Demchenko
date:       2016-07-28 20:12:00
categories: functional programming
keywords:   "functional, js, javascript, partial application, curry, curried functions, higher order functions, nodejs, node, ramda, ramdajs"
desc:       "A small note about how useful it might be to use partial application in javascript"
permalink:  life-is-easier-with-partial-application
---
Partial application is a powerful thing. A function can be applied partially when it is curried. For example,

```js
///  greet :: string -> string -> string
var greet = function greet(a, b) {
     return a + ' ' + b;
}
```

This Haskell-like annotation from above gives you a hint about what type of data this function can operate on and what returns. The last item in this chain denotes the result. Curried function takes its arguments one by one returning partially applied function in between. Let's restate the annotation a bit in order to make it a bit clearer:

```js
///  greet :: string -> (string -> string)
```

[Ramda](http://ramdajs.com/) has a special function that takes a function and returns its curried variant:

```js
///  greet :: string -> string -> string
var greet = R.curry(function greet(a, b) {
     return a + ' ' + b;
});
```

Now, if we do

```js
var helloFn = greet('Hello');
```

then we get something like

```js
///  greet :: "Hello" -> string -> string
```

What I'm trying to say is that we can fix the values of the arguments, so to speak.

So now `helloFn` is a function with type `string -> string`

### Arbitrary number of arguments

Very often it happens that functions take arbitrary number of arguments. For instance, `path.join` from NodeJS can take N arguments. So, how can we partially apply such function? Easy! Ramda has an answer which is called `curryN`. As an example, let's assume that we need a function that will join three strings as a path:

```js
var joinAsPath = function(a, b, c) {
     return path.join(a, b, c);
};

joinAsPath('/home/', '..', '/my-dir/');
```

or

```js
var joinAsPath = R.curry(function(a, b, c) {
     return path.join(a, b, c);
});

var fromHome = joinAsPath('/home/');
fromHome('..', '/my-dir/');
```

However, we can do better. As you can guess from the name of `curryN`, it kind of limits the number of arguments. Thus,

```js
var joinAsPath = R.curryN(3, path.join);
```

That's it! It's like we saying "now this function should take only N arguments and we don't care their names". This compact expression gives us a curried variant of `path.join` function of three arguments:

```js
///  joinAsPath :: string -> string -> string -> string

var fromHome = joinAsPath('/home/');
fromHome('..', '/my-dir/');
```

Not only this technique saves you from annoying `function() {...}` but also allows you to give better names to the new function.

### "Native" partial application.

In JavaScript you can partially apply a function using higher order functions or `Function.prototype.bind()`.

Let's assume, you have such data:

```js
var data = [
  {i: 1, b: 12},
  {i: 2, b: 34},
  {i: 3, b: 29},
  {i: 4, b: 53},
  {i: 5, b: 95},
  {i: 6, b: 15}
]
```

and you need to filter out the records with `b < 20`. Let's create a predicate:

```js
function lessThan(limit, record) {
  return record.b < limit;
}
```

Thus, using `bind` method, not only can we specify the context of the function but also "fix" certain arguments:

```js
data.filter(lessThan.bind(null, 20));
// [{b: 12, i: 1}, {b: 15, i: 6}]
```

Another way is to refactor our predicate and use the benefits of static binding of JavaScript:

```js
function lessThan(limit) {
  return function(record) {
    return record.b < limit;
  };
}
```

and now our predicate returns a function which `filter` wants to use:

```js
data.filter(lessThan(20));
// [{b: 12, i: 1}, {b: 15, i: 6}]
```

However, from my point of view, both of these methods are not very practical.

### Arguments order

Also, note the importance of the order of the arguments on `lessThan` function. Here is another example. We want to set the content of the a certain DOM element by click:

```js
var setContent = R.curry(function(domEl, clickEvent) {
  domEl.innerHTML = clickEvent.target.innerHTML;
});

domEl.addEventListener('click', setContent($('#another-div')));
```

It is quite easy not to notice how important it is that MouseEvent argument comes last. After partial application of the `setContent` function you get another function that is waiting for the MouseEvent.

### Bonus

I cannot avoid mentioning Promises. The library [Q](https://www.npmjs.com/package/q) has an interesting method named `nfcall`

```js
///  Q.nfcall :: (a -> ... -> *) -> a -> a -> Promise a
```

I'll steal the example from the documentation:

```js
var promisedFileContent = Q.nfcall(fs.readFile, "a.txt", "utf-8");
promisedFileContent.then(handleSuccess).catch(handleError);
```

Pretty neat! However, we can make this helper even more universal:

```js
var asPromise = R.curry(Q.nfcall);
var readFileAsPromise = asPromise(fs.readFile);
readFileAsPromise("a.txt", "utf-8").then(...);
```

This is a good example of how bad order of arguments can obstruct us from writing nice code. Can you see the problem? Obviously, our function that reads files does not expect encoding but a file name. Thus, we have to `flip` the arguments. Observe:

```js
var asPromise = R.curry(Q.nfcall);
// flip reverses the order of arguments
var readFileAsPromise = R.flip(asPromise(fs.readFile))('utf-8');
var readBunchOfFiles = R.compose(Q.all, R.map(readFileAsPromise));
readBunchOfFiles(['a.txt', 'b.txt', 'c.txt']);
```

How good would it be if any function was curried by default in JS!

### Related articles

  * [ECMA-262-5 in detail. Chapter 3.1. Lexical environments: Common Theory.](http://dmitrysoshnikov.com/ecmascript/es5-chapter-3-1-lexical-environments-common-theory/)
  * [MDN: Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)
  * [Currying](https://en.wikipedia.org/wiki/Currying)
  * [Partial application](https://en.wikipedia.org/wiki/Partial_application)
