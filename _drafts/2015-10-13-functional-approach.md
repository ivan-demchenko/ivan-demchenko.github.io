From my gut feeling, functional programming is gaining momentum nowadays. Especially in front-end development. Memory and computational power, in general, are not in scarce anymore. Thus, we can afford to think less about performance (although it is still very important) and pay more attention to other issues like code quality.

### Why functional style?

Only recently did I dive into the world of functional programming and acquired some the understanding of what does it mean - functional code. So, for me, right now, the biggest benefit from writing in functional style is that you can avoid dealing with data directly. It means that you minimise the probability of making a mistake and at the end you code is much easier to support, refactor and understand.

### Example, of course

Let's consider the following task. We have to display events in a calendar. Let's say, day-columns and 24-hours scale and square blocks scattered around as a representation of events. Just like any other calendar in a week representation. But we will show as many days as we received. Let's think about data structure (a bit idealistic) that may represent this calendar. It may look like this:

```
data = [
  {
    entries: [
      { name: 'Entry #', time: 10 }, ...
    ]
  }, ...,
];
```

`time` here is just an offset from the 00:00. Let's suppose back-end has calculated it for us.

### Before we start

... we need to understand that in order to write functional code we have to learn a few concepts. Not much, though. In case you are already doing functional programming and interested in the final result, just skip this part. In case you have any comments to my solution, I would be extremely grateful!

### Concepts

JavaScript is a functional language. It means that function is a value. You can assign it to a variable, return it from another function and pass it as an argument. For example, let's think about `map` function from `Array.prototype`. It takes another function and runs it on every element in the array. On each step, it grabs the returned value and puts it to another array which will be returned from `map`. Well, here is a better explanation:

```
var a = [1,2,3];

function add1(x) { return x + 1; }

var b = a.map(add1); // [2,3,4]
```

By the way, I'm going to use `ramdajs` as I personally find it cool. And it's not an ad.

We can think about this a bit differently: the transformational relation between `[1,2,3]` and `[2,3,4]` is function `add1`. In other words, `A0 = B0, ..., An = Bn`

```
A = [1 2 3]
     ^ ^ ^
B = [2 3 4]
```

Cool, right? But this `+ 1` is rather boring. We want to plus any number! Well, we need to pass what any number in. As we know, `map` takes a function and pass an element of an array in. So, we can't use a function like

```
function sum(a, b) { return a + b; }
```

Because, it returns a result of `+` (obviously when both `a` and `b` are numbers we get a number). Looks like two functions are involved here. Well, we know that in JS we can return one function from another. Thus, one will take our number and return a function that will be passed to `map`.

```
function add(any) {
  return function sum(x) {
    return any + x;
  };
}
```

If we do `add(5)` we will get a function `sum` that does `any + x`. But because of closure we'll have `any` set as `5`. Thus, we can finally do cool things:

```
var b = a.map(add(5)); // [6,7,8]
```

Also, functions can be curried. What does it mean is that when we have a function like this:

```
function sum(a, b, c) { return a + b + c; }
``

we can throw arguments in it and it won't be executed until all the arguments will be passed and if too few arguments were passed it will return a function of the rest of unused arguments. Okay, just look:

```
sum(1, 2, 3) // 1 + 2 + 3 = 6
sum(1)(2)(3) // 1 + 2 + 3 = 6
sum(1, 2)(3) // 1 + 2 + 3 = 6
sum(1)(2, 3) // 1 + 2 + 3 = 6
var a1 = sum(1) // a = 1
a1(2, 3) // 1 + 2 + 3 = 6
var a12 = a1(2);
a12(3) // 1 + 2 + 3 = 6
```

Well, you got it, right? This is called partial application. You just partially applied a function. What a nice concept! But how can it help us? Although we've covered just a simple example, we already can benefit from currying by simplifying our `add` function (the one that returns another function). I mentioned `ramdajs`, it has `curry` method. Here we go:

```
var add = function(a, b) { return a + b };
var cadd = R.curry(add);
var b = [1,2,3].map(cadd(2)); // [3,4,5]
```

Nice, I like simplification! The great thing about functional programming is that you can create new functions using the ones you already have. Unfortunately, in JS many things are not truly functional. Moreover, in many third party libraries things are not truly functional either (although they claim they are). The real `map` function should take an arguments and an array. Here is why. When you do something like this:

```js
let mapped = (fn, arr) => map(fn, arr)
```

you can simplify this to

```js
let mapped = (fn) => map(fn)
```

in other words, we can partially apply `map`

```js
let add = (a) => a + 1;

let x = (fn, arr) => R.map(fn, arr);
let res1 = x(add, [1,2,3]);

console.log(res1); // [2,3,4]

let y = (fn) => R.map(fn);
let adder = y(add);
let res2 = adder([1,2,3]);

console.log(res2); // [2,3,4]

let adder2 = R.map(add);
let res3 = adder2([1,2,3]);

console.log(res3); // [2,3,4]
```

This means, you can create a new function from existing ones.
