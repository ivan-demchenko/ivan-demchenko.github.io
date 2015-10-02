---
layout:     post
title:      "Pseudo class selectors are tricky"
author:     Ivan Demchenko
date:       2015-06-18 16:15
categories: css
keywords:   "css, pseudo class selectors, last-child, first-child, css parse"
desc:       "This article is about how a browser applies css rules specified by pseudo class selectors"
permalink:  pseudo-elements-are-tricky
---
Pseudo class selectors are great mean to simplify our life as front-end (and sometimes even back-end) developers. However, there is a trick that both sides should know about and it's related to how the browser parse our CSS code.

Imagine you have a simple peace of markup:

```html
<div class="playground">
  <div class="a">1</div>
  <div class="a">2</div>
  <div class="a">3</div>
</div>
```

... and you want to make the text of color blue for the first `.a` inside `.playground`. The solution is quite straightforward, isn't it:

```css
.playground .a:first-child {
  color: blue;
}
```

Well, yes, it is! However, this works unless you add another `div` (or any other element) in front of the first `div.a`.

```html
<div class="playground">
  <div>0</div>
  <div class="a">1</div>
  <div class="a">2</div>
  <div class="a">3</div>
</div>
```

Here is the demo:

<a class="jsbin-embed" href="http://jsbin.com/mijeku/3/embed?html,css,output">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.34.2"></script>

But why the text inside `<div class="a">1</div>` is not blue in the second example? After all, this *is* the first child with class `a`!

In this case, `first-child` does not style first `div.a` because it's not the first child anymore. So, the `:first-child` means "am I really a first child" and after goes the rest (am I have a class, attributes, etc.). This behavior happens because of the way that the browser parses selectors.

As we all know, browsers read selectors from right to left. This means that when you write something like `.a .b .c .d`, browser will

1. find all the `.d`
2. narrow the search result to all the `.d`s that are inside of `.c`s
3. again, narrow the search result to all the `.d`s that are inside of `.c`s and inside `.b`s
and so on.

Thus, following this logic, `.playground .a:first-child` will get all the first children inside `.playground` elements and then narrow the search result to all the `.a`s that are first children inside the `.playground` elements.

This is why `<div class="a">1</div>` is not blue - it's not a first child anymore.
