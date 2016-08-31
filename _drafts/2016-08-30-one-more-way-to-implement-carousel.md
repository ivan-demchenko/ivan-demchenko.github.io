---
layout:     post
title:      "One more way to implement carousel"
author:     Ivan Demchenko
date:       2016-08-30 22:00
categories: front-end
keywords:   "flexbox, css, carousel, autoscout24, javascript, typescript, front-end masters"
desc:       "This essay is about how we used flexbox and typescript to implemented our own carousel"
permalink:  one-more-way-to-implement-carousel
---

There are lots of implementations of it: jQuery based, vanilla-js based, heavy and lightweight. Some even claim that their solution is the only one you might ever need. However, there will always be a situation when the existing solution simply doesn't work.

This, here at [AutoScout24](https://www.autoscout24.de/) we had to implement our own Carousel. We called it [showcar-carousel](https://github.com/AutoScout24/showcar-carousel) and I want to tell you about how we implemented it.

Our carousel should work in two modes: the one that moves a bunch of items left and right and the one that rotates the slides infinitely showing one at a time. The last one is particularly interesting because of the word **infinitely**.

First, explored all the existing carousels you can find out there. They all work really nice. However, the key requirement is that we have to be able to show an ad on the last slide or remove it if the ad has not been loaded. Thus, we cannot duplicate dom element. Otherwise, ads will be loaded twice. Besides, we didn't want to mutate the DOM at all.

We are among those lucky guys who decided that the Flexbox is the right choice for us. One of the most interesting abilities of the Flexbox is to change the visual order of the elements without changing the order of the DOM element. Thus, we can simply swap two images! I mean, you have two slides at a time in your container. That's enough for amination. And when the animation is finished, you just swap the previous slide with the next one behind the scene.

I prepared a few pictures to demonstrate how it works.

First we begin with the initial state

![initial state]({{ site.url }}/assets/one-more-way-to-implement-carousel/1.1.png)
