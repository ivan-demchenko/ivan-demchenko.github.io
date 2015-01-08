---
layout:     post
title:      "Nice menu effect with pure CSS3"
author:     Ivan Demchenko
date:       2013-04-13 12:55:23
categories: css3 menu effects ui
keywords:   "css3, dropdown menu, pure css, animation, css3 animations"
desc:       "How to create a dropdown menu with pure CSS3 using animation for beautiful effect"
---
We always struggle with menu and CSS and even try to use some jQuery plugins. However, recently I used nice solution for menu. The secret is very simple: you should expand menu items instead of menu box itself. Let me explain.

To begin with, let's imagine we have a standard ul-li-menu

```html
<ul class="anim">
    <li><a href="#">Item 1</a></li>
    <li><a href="#">Item 2</a>
        <ul class="anim">
            <li><a href="#">Sub item 1</a></li>
            <li><a href="#">Sub item 2</a></li>
            <li><a href="#">Sub item 3</a></li>
        </ul>
    </li>
    <li><a href="#">Item 3</a>
        <ul class="anim">
            <li><a href="#">Sub item 1</a></li>
            <li><a href="#">Sub item 2</a></li>
            <li><a href="#">Sub item 3</a></li>
            <li><a href="#">Sub item 4</a></li>
            <li><a href="#">Sub item 5</a></li>
        </ul>
    </li>
</ul>
```

Quite simple, isn't it?

Now we have to write some CSS in order to make it look like a menu:

```css
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

ul li {
  float: left;
  display: block;
  position: relative;
  padding: 10px;
}

ul li ul {
  position: absolute;
  width: 100px;
  margin-top: -10px;
}

ul li ul li {
  float: none;
  height: 0;
  padding: 0 4px;
  opacity: 0;
  overflow: hidden;
}
```

And here is the trick! The `ul li ul li` style sample. I make them invisible with `opacity`, `padding` and `height` rules.

Now I am going to add some dynamics:

```css
ul li:hover {
  background:#f0f0f0;
}
ul li:hover ul {
  background: white;
  box-shadow: 0 0 8px #999;
  margin-top: 0px;
}
ul li:hover li {
  -webkit-transition: inherit;
  height: 16px;
  padding: 4px;
  opacity: 1;
  overflow: hidden;
}
```

And now you can see another trick. Just expand the inner element to expand the outer element. Easy!

Finally I'm going to add some animation class:

```css
.anim {
  -webkit-transition: .3s;
}
```

If you want to change the way of menu shows up then just change the value of `margin-top` in `ul li ul` style block. For instance,

```css
ul li ul {
  position: absolute;
  width: 100px;
  margin-top: 30px;
}
```

for "butterfly" effect.

Here is the final demo:

<iframe width="100%" height="300" src="http://jsfiddle.net/raqystyle/3uLNx/2/embedded/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>