---
layout:     post
title:      "Flexbox advantures"
author:     Ivan Demchenko
date:       2015-08-11 13:34:00
categories: css flexbox
keywords:   "css, flexbox, min-height, block extends, overflow"
desc:       "This note is about minimal height of flex items with overflow"
permalink:  flexbox-adventures-overflow-flex-item-stretch
---
Due to the fact that [flexbox' specification](http://www.w3.org/TR/css-flexbox-1/) is quite stable nowadays, it's cool to use it. Recently, I tried to use it for quite a complex UI.

The idea is to have sort of a framework to build the UI upon. I started with so-called `groups`. You can have vertical and horizontal groups of everything. In terms of flexbox it means `row` or `column` value of the `flex-direction` rule.

Our app also comprises of independent blocks. We call them `boxes` and put them inside the groups. Each `box` may have different size and grid system in it.

But the type of the content of the box itself is not very important. The important thing is **how the minimal heigh is being calculated for the box**.

Here's the preview of the result:

<a class="jsbin-embed" href="http://jsbin.com/cisiya/embed">JS Bin on jsbin.com</a><script src="http://static.jsbin.com/js/embed.min.js?3.34.2"></script>

You can notice the following:

```css
.group--vertical {
  min-height: 0%;
}
```

Without this rule `box` elements wouldn't be scrollable. It's said in specs that

> By default, flex items won’t shrink below their minimum content size (the length of the longest word or fixed-size element). To change this, set the min-width or min-height property.

In the example above, the content size of a `box` is a sum of heights of `p` elements. Consequently, the content size of the `group--vertical` elements will be the size of a `box` element inside of it. Thus, in order to prevent groups from stretching and make them sit inside of `wrapper` (which is a flexbox as well), we need to specify min-height for `groups`. Thus it will stop thinking that main size is the size of its content.

For me, it now becomes even more clearer that the key to success is simple yet effective solution that *can be reused*. I'm trying to say that we can write a couple of classes and then extend them by giving meaningful names and additional properties. For example, `rows` and `columns` are just `groups` that in turn are just `flexboxes`. So, the basic idea is just the same - everything is a flexbox and works as expected. I'm quite sure that the future is flexbox.
