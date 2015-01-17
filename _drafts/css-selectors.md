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