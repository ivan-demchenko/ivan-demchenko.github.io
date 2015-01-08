---
layout:     post
title:      "A small note about good & bad code"
author:     Ivan Demchenko
date:       2014-08-14 12:36:32
categories: JavaScript jQuery refacotring
keywords:   "JavaScript, jQuery, refacotring"
desc:       "Here I want to share my recent experience with refactoring of a function that use jQuery"
---
Currently, I am doing refactoring of a piece of JavaScript code. Actually, this is pure jQuery-style code. The idea is to have an input that will clone itself when user move focus in the input. The old code look like that:

```html
<input name="adv[0]" data-maximal="10">
```

JavaScript:

```js
...
$('body').on('focus', 'input', function(){
  var $this = $(this),
      index = $this.index(),
      nextName = $this.attr('name').replace('[' + (index - 1) + ']', '[' + index + ']');

  if (!$this.next().length && index < $this.data().maximal) {
    var clone = $this.clone();
    clone.attr('name', nextName).val('').css('display', 'none');
    $this.after(clone);
    clone.fadeIn(250);
  }
});
```

Although, this code works, it looks ugly and unreadable from the first sight. I mean, you really need to learn and play around with such code to understand what it suppose to do. So, from business prospective, it costs more to support bad code rather than good code.

So, how can we improve it? Let's try to understand the tasks it suppose to do:

- get a new name for the new element
- check if it is possible to add another input
- add another input

These are the candidates for new methods:

```js
function getNewName(oldName, index) {
  return oldName.replace('[' + (index - 1) + ']', '[' + index + ']');
}

function isNewElementPossible(element) {
  var index = element.index();
  return !element.next('input').length && index < element.data('maximal')
}

function cloneInput(original) {
  var index = element.index(),
      clone = original.clone(),
      oldName = original.attr('name'),
      nextName = getNewName(oldName, index);
  clone.attr('name', nextName).val('').css('display', 'none');
  original.after(clone);
  clone.fadeIn(250);
}

function addAnotherInput() {
  var element = $(this);

  if (isNewElementPossible(element)) {
      cloneInput(element);
  }
}
```

It seems that we added a lot more code. But it is not, after running Uglify the difference is almost invisible. However, it looks now a lot more readable, isn't it? Well, some of you might argue. It is normal.
