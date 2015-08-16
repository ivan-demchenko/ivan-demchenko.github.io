# Pseudo selectors are tricky

Imaging you have a number of divs.

```html
<div class="a">1</div>
<div class="a">2</div>
```

... and you want to apply style for the first one:

```css
.a:first-child {
  color: blue;
}
```

Well, it will work untill the moment when you add another div in front of first `div.a`. 

```html
<div>0</div>
<div class="a">1</div>
<div class="a">2</div>
```

In this case, `first-child` will not style first `div.a` because it's not the first child anymore. So, the `first-child` means "am I really a first-child" and after goes the rest (am I have a class, attributes, etc.)

###Demo

<a class="jsbin-embed" href="http://jsbin.com/hurabivoqi/2/embed?html,css,output">JS Bin</a><script src="http://static.jsbin.com/js/embed.js"></script>