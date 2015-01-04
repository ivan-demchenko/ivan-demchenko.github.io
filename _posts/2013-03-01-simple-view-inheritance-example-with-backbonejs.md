---
layout:     post
title:      "Simple view inheritance example with BackboneJS"
author:     Ivan Demchenko
date:       2013-03-01 12:42:18
categories: backbone inheritance
keywords:   "backbonejs, inheritance, view, extend view"
desc:       "In this article I want to tell about extending views in BackboneJS app"
permalink:  simple-view-inheritance-example-with-backbonejs
---
Let's imagine that we have two views in our Backbone.js app and we the first one to be inherited from the second one.

So, here goes the first view:

```js
/* Prototype file */
define([
'jquery', 'underscore', 'backbone'
],
function($, _, Backbone){
    var View = Backbone.View.extend({
        tagName: 'section',
        className: 'item',
        initialize: function() {
            _.bindAll(this, 'selectMe','render');
            this.model.on('change:isActive', this.setMeActive);
        },
        events: {
            'click': 'selectMe'
        },
        selectMe: function(e) {
            alert('clicked!');
        },
        render: function() {
            var itemHTML = _.template(this.template, this.model.toJSON());
            this.$el.append(itemHTML);
        }
    });
    return View;
});
```

And here is the second one, child:

```js
/* View file */
define([
'jquery', 'underscore', 'backbone'
// Prototype
'itemProto',
],
function($, _, Backbone, ViewPrototype){
    var View = ViewPrototype.extend({
        initialize: function() {
           ViewPrototype.prototype.initialize.apply(this,arguments);
        }
    });
    return View;
});
```

The main trick here is in this line:

```js
// ...
var View = ViewPrototype.extend({});
// ...
```
