---
layout:     post
title:      "Quick union and States hierarchy algorithms"
author:     Ivan Demchenko
date:       2014-02-05 17:34:52
categories: algorythms quickunion states
keywords:   "algorythms, quick union, state hierarchy"
desc:       "Here I want to demonstrate quick union and states hierarchy algorithms written in JavaScript"
---
### Quick Union Implementation for an array of integers

```js
var qu = {
  data: [],
  createAnArray: function (N) {
    for(var i = 0; i<N; i++) this.data.push(i);
  },
  connect: function (c, p) {
    this.data[c] = p;
  },
  root: function (c) {
    while(this.data[c] != c) c = this.data[c];
    return c;
  },
  isConnected: function (p, q) {
    return this.root(p) === this.root(q);
  }
};

qu.createAnArray(10);
qu.connect(3, 5);
qu.connect(5, 6);
qu.connect(6, 1);
alert(qu.isConnected(3, 1));
```

### States hierarchy

```js
var states = {};

function isConnected (c, p) {
  if (c === p) return true;

   while(c !== states.root) {
    if (c !== p) {
      c = c.parent;
    } else {
      return true;
    }
  }
  return false;
}

states.root = {name: 'root'};

states.a = {name: 'a', parent: states.root};
states.aa = {name: 'aa', parent: states.a};
states.ab = {name: 'ab', parent: states.a};
states.ac = {name: 'ac', parent: states.a};

states.b = {name: 'b', parent: states.a};
states.ba = {name: 'ba', parent: states.b};
states.baa = {name: 'baa', parent: states.ba};
states.bab = {name: 'bab', parent: states.ba};

states.bb = {name: 'bb', parent: states.b};
states.bc = {name: 'bc', parent: states.b};
states.bd = {name: 'bd', parent: states.b};

console.log(isConnected(states.bab, states.a));
```