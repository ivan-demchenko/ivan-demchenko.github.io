---
layout:     post
title:      "Abstractions and code"
author:     Ivan Demchenko
date:       2015-09-24 22:50:00
categories: programming
keywords:   "how to, learn, programming, self-education, architecture"
desc:       "This is rather philosophical note about the way we learn and improve"
permalink:  abstractons-and-code-the-way-we-learn
---
How do we know that we're good programmers or not? Maybe we should collect statistics of feedbacks about our code? Maybe we should attend meet-ups and talk to our colleagues and make sort of self-judgment? Probably. But on the other hand, you may ask *who   cares whether I am a good programmer or not! At the end, we make money and business is happy about a products I build.* To certain extent, it's true. But what if you are something more than just a regular programmer who wants to have safe and stable profession? If you are really passionated and interested in producing high quality code - I'm all ears.

From my side, I'd like to share one thought I had recently about the way we educate ourselves.

> Curiosity is our moving power. There is no book or person who will teach you how to write good code. If you curious, you will learn.

I spent two years of my student's life studying physics. Only after a few years I realised that the only thing required of us for is the understanding of concept. We had to think from abstract to concrete. This is the best lesson I could receive.

Front-end development is booming now. HTML5 has became a really powerful platform bla-bla-bla, we all know these headlines. Proof of this is the number of different frameworks. Nevertheless, most of the tasks we have to solve on daily basis are same old. For example, we need to show user's name if we have a user logged in or ask user to enter some data and then process it somehow or load data and display it. So, generally speaking, these are the same old things we had to tackle with 10-20 years ago using Delphi or Visual Basic. Thus, the only thing we can do is to improve the way we tackle these problems.

The question is how do we learn to improve, from where this improvement comes? I think it's good to ask yourself a simple question: what are the alternatives, can it be done better? And after that comes the standard interview question: what have I learned recently?

As an example, currently, I'm working on a quite a big AngularJS project with almost all the business logic on client side. We receive, process and send data back to backend. Usually, HTML5 apps work vise-versa, client is quite stupid, just displays data and validates and sends user input to back-end to process and store. So, all the heavy things stay at server-side. In our case, we're offline-first app, thus, we have to develop as if there was no backend.

Once I talked to a colleague of mine and we agreed that there are two constituents of good code: architecture/high-level ideas and readable code that implements concrete things. In both cases, bad decisions may destroy a product and consequently, a company. This is why everybody wants experienced developers.

Code quality is vital in projects like ours. From the very beginning. Our company's business model also adds fuel to the fire. Things like modularisation, proper usage of MVC and service layer is essential in our case. Thanks to AngularJS we have some of the problems solved out of the box, but it's just a drop in the ocean.

I'd like to share my vision of possible improvement using the example about user's name I mentioned above.

```js
var userNameDiv = document.querySelector('#userNameDiv');
if (user && user.name) {
  userNameDiv.innerHTML = '<strong>' + user.name + '</strong>';
}
```

This one seems to be simple. But this piece of code comprises of many useful pieces which can be reused after small alteration. Also, this type of code is hard to keep up to date with requirements or API changes.

We can extract some basic functions from this snippet. For example,

```js
function setHTML(element, content) {
  element.innerHTML = content;
  return element;
}

function wrapWith(tagName, content) {
  return setHTML(document.createElement(tagName), content).outerHTML;
}

function prop(name, obj) {
  return obj[name];
}
```

The ideas is that these are very simple functions that maybe even don't require tests. But the most important is that we can reuse them later. There are also couple of useful functions, like `compose` and `curry` that will help us.

Recently, a friend of mine who is fond of Haskell told me about Maybe monad. As a result, I'm learning Haskell now (and getting kick out of this, amazing language). Using the idea of this monad we can reshape the code to something like this:

```js
Maybe(user)
.bind(
  compose(
    setHTML(userNameDiv), wrapWith('strong'), prop('name')))
```

So, we've got three ideas (Maybe monad, function composition and currying) that help us build pipelines for data rather then describe steps and branches in code. In my opinion, updated snippet at least looks cleaner and we basically can read it as text. We also removed some duplication and can reuse function later to build another data pipelines.

The same thing happened with Promises. At some point people understood that callbacks are not good and may lead to certain problems. Thus, we've got a few implementations of that idea and a number of articles about how to use them properly. The minute you understand what the problem is and how Promises can help solving it, you'll return a Promise from every method of service you write.

### Conclusion

Well, I'd surprised yet grateful if you've reached this paragraph. My idea that I'm trying to convey here is that sometimes using very simple constructions we can improve our code a lot. Many of these concepts are so simple that couple of hours is enough to learn, implement and understand them. And even if you start learning yet another language, the core concepts are already there. The more we learn the more abstract our thinking should become.
