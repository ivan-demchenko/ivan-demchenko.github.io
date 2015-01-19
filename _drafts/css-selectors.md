### Basic selectors

#### Type selector

```css
body {
    margin: 0;
}
```

#### Class selector

```css
.menu-item {
    display: inline-block;
}
```

```html
<ul>
    <li class="menu-item">Item 1</li>
    <li class="menu-item">Item 2</li>
    <li class="menu-item">Item 3</li>
</ul>
```

#### ID selector

```
#my-element {
    color: green;
}
```

Applies to the markup like this:

```html
<body>
    <span id="my-element">This text will be green</span>
</body>
```

### Pseudo-classes selectors

- `:hover`

#### Links

- `:link`
- `:visited`

#### Forms and/or links

- `:active`
- `:focus`
- `:checked`
- `:enabled`
- `:disabled`

#### Positional selectors

*Position is strict*

- `:first-child`
- `:first-of-type`
- `:last-child`
- `:last-of-type`

*Position is set by parameter*

- `:nth-child`
- `:nth-last-child`
- `:nth-of-type`

#### Other types

- `:empty`
- `:target`

### Relational selectors

#### parent > children { ... }

Those rules are applied to all the children of parent. For example, if you have a list that looks like following one:

```html
<ul>
    <li>item 1</li>
    <li>item 2/li>
    <li>
        <ul>
            <li>sub item 1</li>
            <li>sub item 2</li>
            <li>sub item 3</li>
        </ul>
    </li>
    <li>item 4</li>
</ul>
```

... and css like this:

```css
ul > li {
    color: red;
}
```

... then *all* the `li` elements will be red. So, what is the difference between `parent > children` and `parent children`? To figure it out we need more complex example. Here is the markup:

```html
<div>

  <p>level 1 text</p>
  
  <div>
    
    <p>level 2 first para</p>
    
    <div>
      
      <p>Level 3 text</p>
      
    </div>
    
    <p>level 2 second para</p>
    
  </div>
  
</div>
```

... and here is some CSS:

```css
div p {
  color: blue;
  font-weight: bold;
}

div div p {
  letter-spacing: 4px;
}

div > p {
  color: green;
}

div > div > p {
  font-style: italic;
}

div > div > div > p {
  color: red;
  text-decoration: underline;
}
```

So, the difference is the weight of selector. In other words, it is more specific.

#### selector + selector { ... }

Imagine you have a number of buttons in the `row`:

```html
<div class="row">
    <button>Button #1</button>
    <button>Button #2</button>
    <button>Button #2</button> 
</div>
```

... and you want all of them to have green text except the first one. For this you write:

```css
.row button + button {
    color: green;
}
```

#### selector1 ~ selector2 { ... }

This literally means app the siblings `selector 2` after `selector 1`. For example, having following markup:

```html
<p>1st paragraph</p>
  
<div>
    <p>2nd paragraph</p>
</div>

<p>3rd paragraph</p>
<p>4th paragraph</p>
```

... and css like:

```css
div ~ p {
  color: red;
}
```

means that 3rd and 4th paragraphs will become red.