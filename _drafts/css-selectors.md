### Basic selectors

#### Type selector

{% highlight css %}
body {
    margin: 0;
}
{% endhighlight %}

#### Class selector

{% highlight css %}
.menu-item {
    display: inline-block;
}
{% endhighlight %}

{% highlight html %}
<ul>
    <li class="menu-item">Item 1</li>
    <li class="menu-item">Item 2</li>
    <li class="menu-item">Item 3</li>
</ul>
{% endhighlight %}

#### ID selector

{% highlight css %}
#my-element {
    color: green;
}
{% endhighlight %}

Applies to the markup like this:

{% highlight html %}
<body>
    <span id="my-element">This text will be green</span>
</body>
{% endhighlight %}

### Pseudo-classes selectors

:link
:visited
:active
:hover
:focus
:first-child
:last-child
:nth-child
:nth-last-child
:nth-of-type
:first-of-type
:last-of-type
:empty
:target
:checked
:enabled
:disabled

### Relational selectors

