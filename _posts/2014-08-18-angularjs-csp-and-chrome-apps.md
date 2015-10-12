---
layout:     post
title:      "Angular, CSP & Chrome Apps"
author:     Ivan Demchenko
date:       2014-08-18 18:44:27
categories: AngularJS ChromeApps SCP
keywords:   "JavaScript, AngularJS, eval, beginners"
desc:       "The CSP (Content Security Policy) error accours when starting to write a Chrome App using AngularJS. This article is about why it happens and how to fix it."
---
If you want to develop a Chrome App using AngularJS, you would probably bump on an error related to [CSP (Content Security Policy)](https://developer.mozilla.org/en-US/docs/Web/Security/CSP).

_EvalError: Refused to evaluate a string as JavaScript because 'unsafe-eval' is not an allowed source of script in the following Content Security Policy directive: "default-src 'self' chrome-extension-resource:"._

This happens because libraries use `eval` or `Function` to get things done (render templates, for example). Put it simple, eval code is being executed in caller context in case of direct calls and in global context in case of indirect calls. [Here](http://perfectionkills.com/global-eval-what-are-the-options/) and [here](http://dmitrysoshnikov.com/ecmascript/es5-chapter-2-strict-mode/) are good articles. Examples:

```js
//es5
"use strict";

eval("var x = 10; alert(x);"); // 10
alert(x); // "x" is not defined

// while

"use strict";

(1, eval)("var x = 10; alert(x);"); // indirect, 10
alert(x); // 10
```

Thus, guys from Google decided to put a restriction on evals. And I agree.

In AngularJS you can get rid of this error by adding `ng-csp` directive. In my case, I had to add it to html tag.

So, we're getting from this

```html
<!DOCTYPE html>
<html lang="en" ng-app="testChromeApp">
```

... to this:

```html
<!DOCTYPE html>
<html lang="en" ng-app="testChromeApp" ng-csp>
```

After this, your AngularJS ChromeApp will work like it should.