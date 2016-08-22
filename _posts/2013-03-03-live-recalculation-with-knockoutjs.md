---
layout:     post
title:      "Live recalculation with KnockoutJS"
author:     Ivan Demchenko
date:       2013-03-03 12:42:18
categories: knockoutjs
keywords:   "knockoutjs, live, recalculations"
desc:       "How to make KnockoutJS to update values after recalculation of model in live"
---
I really love this framework. And here I want to present a very small sample of code for beginners. How to make my app recalculate values of form automatically in live? It is very easy with KnockoutJS!

Here is our hypothetical Model:

```js
function MyModel (data) {
  var self = this;
  self.mv1 = ko.observable(data.val1 || 0);
  self.mv2 = ko.observable(data.val2 || 0);
  self.rv3 = ko.observable(data.val3 || 0);

  self.reCalc = function () {
    var newVal = parseFloat(self.mv1() || 0) * parseFloat(self.mv2() || 0);
    self.rv3(newVal );
  };

};
```

And this is our View:

```html
<form>
Value 1 <input data-bind="value: mv1, valueUpdate: 'afterkeydown', event: { keyup: reCalc }">
Value 2 <input data-bind="value: mv2, valueUpdate: 'afterkeydown', event: { keyup: reCalc }">
<br>
Result:
<input data-bind="value: rv3">
</form>
```

The trick here is to manually set when we will update values with `valueUpdate: 'afterkeydown'` and do recalculation exactly after `keyup` event fired.
