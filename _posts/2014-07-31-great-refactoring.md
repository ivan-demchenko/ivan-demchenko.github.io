---
layout:     post
title:      "Great refactoring"
author:     Ivan Demchenko
date:       2014-07-31 11:26:27
categories: JavaScript refactoring
keywords:   "JavaScript, refactoring"
desc:       "My recent project needs refactoring. So in this article I want to write about the problems and my experience with refactoring of JavaScript code."
---
A couple of days ago, I have finished the great refactoring of JavaScript part of our project.

In one of my previous posts I just thrown a couple of words about the quality of project I started on. So, what was wrong? Here is the list:

- *No documentation for ugly code.* I mean, good code usually doesn't need the documentation. But the problem is that the whole project doesn't have any documentation. Previous developer just told us "please, do not change anything here, here and here". Great!

- *No naming convention.** You could easily find a function called "doThisBaby" or "doTheJob".

- *No modules.* I mean, the cool thing is that "modules", sort to speak, were wrapped in self-invocation functions. But no [AMD](http://requirejs.org/docs/whyamd.html) or [CommomJS](http://wiki.commonjs.org/wiki/CommonJS) or anything else.

- The good thing is that Bower is used. But digging into the project I found that a lot of jQuery *plugins were simply copy-pasted to files*. So, what does Bower do here?

- *A lot of repetitions of the same functionality.* Even variables names. Simple copy-paste.

So I started with directories organisation. The main problem for other developers was to debug js-code because it was always minified. A "javascript-components" directory (in which Bower was putting components) was unreachable for a browser. I mean, we had the following structure:

```
- database
- ...
-frontend
    - javascript
    - javascript-components
    - scss
    - ...
    - pub
        - javascript
        - css
        - fonts
```

So, only "pub" was reachable for a browser. And Grunt was set to minify all the stuff in "pub/javascript". Cool, huh? And of course, "javascript-components" was present in git-repo. So, the structure was altered to be like this:

```
- database
- ...
- frontend
    - scss
    - pub
        - scripts
            - src
            - build
            - vendors
                - jquery
                - requirejs
                - ...
        - css
        - fonts
```

So, I altered Bower to use `pub/scripts/vendors`. I found all the plugins and libraries which are used in the project and reinstalled them. After that there is no `javascript-components` folder in git repo anymore.

The first thing I thought after I saw the code is that AMD or CommonJS is needed here. So, I have chosen RequireJS because I had more experience with it. In our project BODY tag has a `page-identifier`. It is a data-attribute with name of a view that came from PHP. Why not to use this?

I added two folders `bundles` and `common` into `src`. In `common` I have the things that are being used on every page, like `login` or `main menu`.

Bundles for each view look like this:

```js
// file: pub/scripts/src/bundles/homeview/bundle.js

define([

    '../../common/init',
    '../../common/adSense',
    '../../common/mainMenu',
    '../../common/login',
    '../../common/utils',
    './highlights',
    './selectedTopics'

], function() {});
```

This is a simple file that describes dependencies. in Grunt config for RequireJS module you can specify:

```js
requirejs: {
    compile: {
        options: {
            appDir: 'frontend/pub/scripts/src',
            dir: 'frontend/pub/scripts/prod',
            mainConfigFile: 'frontend/pub/scripts/build.config.js',
            optimize: 'uglify2',
            removeCombined: true,
            skipDirOptimize: true,
            findNestedDependencies: true,
            preserveLicenseComments: false,
            logLevel: 0,

            modules: [{
                name: 'bundles/homeview/bundle'
            }]
        }
    }
}
```

You can see in `modules` section I specified the path to the bundles. I have more of them in the project. So, the next step for me is to write a function that will generate those paths. After all the bundles are being built, you can use then like this:

```js
requirejs.config({
    baseUrl: '/scripts/prod/',
    deps: ['require'],
    callback: function(require) {
        var bundles = ['bundles/' + document.body.dataset.view + '/bundle'];

        // isIE function...

        if (isIE()) {
            bundles.push('bundles/ie/bundle');
        }

        require(bundles);
    }
});
```

After this, you can easily split the code into modules, reduce the amount of code that is being repeated and so on. There is a [great article](http://javascriptplayground.com/the-refactoring-tales/refactoring-tales.html) about refactoring.

I don't want to write about details. But I want to give a good example about modules. That is module in JavaScript. As far we still use ES5, there are no native support of modules. However, in general module is a self-sufficient peace of code that can work. Right? Well, maybe not the best definition, but the idea is clear.

We have login and registration forms in tabs. So, tabs, validators, triggers, everything was in one file. I mean,

```js
$('.login').click(functino(){
// 100-200 lines of code that do everything.
});

$('.register').click(functino(){
// 100-200 lines of code that do everything.
});
```

So, in one file I've got functionality for popup dialog, login form, registration dialog, logout and password reset functionality. Thanks god, previous developer heard about [AmplifyJS](http://amplifyjs.com/) and he used it the project. One of the coolest features in this library is [Publish–Subscribe](http://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern) functionality. Thus, I can split this one big file into several with modules. So, I ended up with a file in which I simply trigger the events and bunch of files that listen to such events. For example.

```js
// triggers.js

define([

    'jquery', 'amplify'

], function($, amplify) {

    $('body').on('click', '[data-type="login"]', function(e) {
        e.preventDefault();

        var btn = $(this);

        amplify.publish('loginRegister:login:showDialog', {
            action: 'login',
            redirectUrl: btn.attr('href') || null
        });
    });
...
});
```

and

```js
// dialogs.js

define([

    'jquery', 'amplify', '../slider', '../popup'

], function($, amplify, slider, popup) {
 
    amplify.subscribe('loginRegister:login:showDialog', showLoginRegisterDialog);

...

});
```

I have some more files that are working like that. But the main idea behind this is that I decouple the modules. One module do not use function from other module. Instead, they simply send the messages.

This kind of decoupling is important. However, you may get lost in channels :)

That's it for now.