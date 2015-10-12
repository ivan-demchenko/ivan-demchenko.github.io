---
layout:     post
title:      "Clone object with observables"
author:     Ivan Demchenko
date:       2013-03-02 00:18
categories: knockoutjs
keywords:   "knockoutjs, observables, clone objects"
desc:       "This article is about how to clone an model which has observables values in KnockoutJS"
---
I was tackling the problem of cloning objects within KnockoutJS App. The original task was to create two lists and make them able to move items from one to another (observable arrays). A user also may has a possibility to roll-back last action. The items in second list are editable copies of the items from the first list. The solution appears to be incredibly simple!

When you want to create a copy of object and keep all the observables and functionality, _just create a new object with old one passed as a parameter_!

Here is the code. It is very simple and don't need any comments. It is very simplified copy of my original code.

```html
<div id="lista">List 1
    <ul data-bind="foreach: list">
        <li data-bind="click: ttl">
            <span data-bind="text: title"></span>
            <button data-bind="click: move">Move</button>
        </li>
    </ul>
</div>
<div id="listb">List 2
    <ul data-bind="foreach: list">
        <li data-bind="text: title"></li>
    </ul>
</div>
```

```js
var list1, list2;

function ItemA(data) {
    this.title = ko.observable(data ? data.title() : 'ItemA-' + (new Date()).getTime());

    this.move = function(item, e) {
        e.stopPropagation();
        var temp = new ItemA(item);
        list2.push(temp);
    };

    this.ttl = function() {
        this.title('ItemA-' + (new Date()).getTime());
    };
}

function ItemB() {
    this.title = 'ItemB-' + (new Date()).getTime();
}

function ViewModelA() {
    list1 = ko.observableArray([]);
    this.list = list1;
    this.list.push(new ItemA());
    this.list.push(new ItemA());
}

function ViewModelB() {
    list2 = ko.observableArray([]);
    this.list = list2;
    this.list.push(new ItemB());
    this.list.push(new ItemB());
    this.list.push(new ItemB());
}

ko.applyBindings(new ViewModelA(), document.getElementById('lista'));
ko.applyBindings(new ViewModelB(), document.getElementById('listb'));
```