---
title: One more way to implement a carousel
slug: one-more-way-to-implement-a-carousel
date: "2016-08-30"
tags:
  - front-end
---

There are lots of implementations of it: jQuery based, vanilla-js based, heavy and lightweight. Some even claim that their solution is the only one you might ever need. However, there will always be a situation when the existing solution simply doesn’t work.

Here, at [AutoScout24](https://www.autoscout24.de/) we just had such situation and we decided to implement our own Carousel. We called it `showcar-carousel`. Please, do not hesitate to check the code out on [GitHub repo for showcar-carousel](https://github.com/AutoScout24/showcar-carousel).

Our carousel should work in two modes: the one that moves a bunch of items left and right and the one that rotates the slides infinitely showing one at a time. The last one is particularly interesting because of the word **infinitely**.

First, we explored all the existing carousels one can find out there. They all work really nice. However, our key requirement is that we have to be able to show an ad on the last slide or remove it if the ad has not been loaded. Thus, we cannot duplicate dom elements. Otherwise, ads will be loaded twice. Besides, we didn’t want to mutate the DOM at all.

We are among those lucky guys who decided that the Flexbox is the right choice for us. One of the most interesting abilities of Flexbox is to change the visual order of the elements without changing the order of the DOM elements. Thus, we can simply swap two images! I mean, you have two slides at a time in your container. That’s enough for amination. And when the animation is finished, you just swap the previous slide with the next one behind the scene.

I prepared a few pictures to demonstrate how it works. First we begin with the initial state:

![Initial state of the carousel](./1.1.png)

The blue area is our viewport, what the user sees. The green block is the flex container that holds the items. And the yellow ones are the slides. As you can see we have two slides in the container at a time. When the user navigates to the next slide we have enough slides for a smooth transition. We then just `translate` the green div. So, it looks like this:

![The second slide eases in in the viewport](./1.2.png)

And now we use the magic of the flexbox `order` property. We have to do two things at the same time:

- Reorder items
- Move the green div back without transition

What I mean by reordering is easier to demonstrate with JavaScript arrays:

- before: `[0, 1, 2, 3, 4]`
- after: `[4, 0, 1, 2, 3]`

Thus, our first image becomes the last one and the second image become the fist one and so on. After reordering and jumping back, the situation looks like this:

![The state of the carousel after all the transitions](./1.3.png)

And we’re ready to go to the next slide again.

Okay, what about going backwards? Well, it is simple. You just have to do things in the reversed order:

- reorder
- jump
- transition

As simple as that.

The carousel is quite specific for AutoScout24 needs and it is work in progress. Despite that, everybody is welcome to use and contribute!
