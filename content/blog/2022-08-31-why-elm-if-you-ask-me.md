---
title: "Why Elm, if You Ask Me"
slug: why-elm-if-you-ask-me
date: "2022-08-31"
draft: true
---

Elm claims to produce code that does not have runtime exceptions. And according to various testimonials, it delivers on this promise. Imagine we embarked on this journey one day. It was scary and unknown at the beginning - a new paradigm, new restrictions, lots of learning, head-wall banging... but then we deployed a rewritten module, opened our monitoring tool next day, and... no exceptions. It's not broken - the log messages are there. But no exceptions. How would we react to that? I bet everyone would be proud.

I used Elm for many of my pet projects, and I know how it delivers. It is strict (yet easy to use). There will be no exceptions like cannot read property "length" of undefined or similar. There will be "errors" related to intention coded in the program. For example, we showed the wrong message to the user. But our program will never find itself in an exceptional state - a state a human forgot to think about. This is guaranteed by how the language is structured and how the compiler reads it.

A flexible type system (like one of TypeScript or JavaScript) allows for things like `JSON.parse(response_body)`. Just how much uncertainty does this snippet convey? Is JSON well-formed? If so, do I get the data I expect? Can I trust the response?

Imagine there are two teams, A and B. B uses the service maintained by A. Now A needs to change the response format. For a handful of teams, this is a manageable task. However, the more teams there are, the more communication is required and things can go wrong. So, the best we can do is `JSON.parse(...)` and write the manual checks for each field. The larger the data structure, the less motivation to write these checks. A manual pull request review may not help here. So much uncertainty!

There is no choice in Elm. Everything has to be defined, otherwise it won't compile. For many reasons, a developer may choose not to use more liberal or less secure JS/TS, arguing that it takes more time and hinders productivity... Developers are forced to decode the incoming data and deal with the fact that the decoding may fail or succeed. There's no other way. Speaking of productivity, there's nothing "better" than debugging runtime errors from the reduced code. Well, we can mimic this decoding thing in TypeScript. But this is a manual imitation. Manual = error-prone.

In addition, a small ecosystem like Elm's comes with standardised tools - a compiler, a code formatting tool, etc. Rust, for example, has a similar toolset. Imagine how much time and energy we could save by not using Webpack. I wonder what the environmental impact of modern JavaScript is. The problem with tools like Webpack is the number of plugins needed to make it work. Each plugin is a dependency with its own roadmap. Trying to upgrade from Webpack 4 to 5 requires a team of full-time specialists. Not just at Postman - in many other companies too. Still, there's nothing better for TS/JS. I find it inefficient, to say the least.
