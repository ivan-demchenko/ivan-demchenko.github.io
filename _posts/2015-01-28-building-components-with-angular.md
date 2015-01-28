---
layout:     post
title:      "How to build components with AngularJS"
author:     Ivan Demchenko
date:       2014-01-28 21:57:27
categories: AngularJS components directives
keywords:   "JavaScript, AngularJS, components, directives"
desc:       "In this article I want to start my story of building components with AngularJS"
---
First of all, I'd love to start with a small preface. Currently, I'm working on a big project. It is complicated. It renders a lot of data, it has a lot of business logic on client, it should work offline on mobile devices. We have a big feature upcoming and we faced a problem. Due to the fact, that the software we're building is very specific, we couldn't user any existing UI framework. Thus, team decided to build their own framework. However, as it usually happens, the only first step has been made toward the thing that can be called a freamework. Thus, we decided to build a library of UI Components and at the same time develop CSS framework for our needs.

AngularJS has a sheer number of features that help to build hight quality software. On the other hand, it is very easy to make a lot of mistakes if you don't follow rules and best practices. So, obviously we're using directives for building our components. While talking about architecture, we decided that we need atomic components (such as list, button, datepicker, etc.) and behaviours (clickable, selectable, etc.). So, basicall, it might resemble something like that:

```html
<pi-list data-model="ctrl.people" pi-multi-selectable>
    <pi-person data="item"></pi-person>
</pi-list>
```

It means, that ideally you can put your components in any scope, tell it where to get the data from and that's it. It also has some logic behind it. But this is UI logic and Business logic goes to services of main application.

As you can see, we deliberately added prefixes to components and behaiours in order to distinguish them from parameters of component.

Okay, you have your controller, you have you component. How to bind them togather? How to make a directive to manipulate parent scope? It's rather easy.

First let's start with `module`:

```js
angular.module('app', []);
```

Then we can define our controller:

```js
angular
    .module('app')
    .controller('mainCtrl', function () {
        this.helloStr = 'This is a sting';
    })

```

Now we need to decide which Component we need. Let's say that we the one that will change controller's data when clicked. Okay, we know what it should do. The most important part is to decide on API of our component. This is really a preasure because if you don't think about it now and just create a component, any changes, any refactoring might be very hard in future. In this case, it's rather good to talk to your team. Well, let's assume that we decided on API.

```html
<div ng-controller="mainCtrl as ctrl">
    {{ctrl.helloStr}}
    <my-dir param="ctrl.helloStr"></my-dir>
</div>
```

Great, we know that it should do and how. Let's write some JS-code:

```js
angular
    .module('app')

    // Component's controller
    // It contains UI logic and behaiour for the component.
    .controller('myDirCtrl', function ($scope) {
        this.setData = function () {
            this.param = 'Hi!';
        };
    })

    // Component definition
    .directive('myDir', function () {
        return {
            restrict: 'E',
            bindToController: true,
            scope: {
              param: '='
            },
            template: '<div ng-click="ctrl.setData()">Click {{ctrl.param}}</div>',
            controller: 'myDirCtrl',
            controllerAs: 'ctrl'
        };
    });
```

I really like to split directive's controller as a separate function (ideally in a separate file :). This helps to keep the directive definition very laconic and the controller very clean. Please, notice `bindToController` param. It is rather new one that flags that data should be bounded to directive's controller, not to the scope.

As a result we bind directive's scope to outer scope via parameters (`param` in this case). We don't care about what happens inside the directive, we only need to get our result. Just like you normally do with `ng-model` and `input`.

This approach seems to be very simple and obvious. However, it's very compelling at the beginning to start piling `div`s one on top of another and then copy-paste them from one view to another. This approach helps to avoid it. Moreover, it helps to set some coding culture in your team as startups usually can do "everythin they need/want to skyrocket" the project.

In my next note, I'll tell how we distribute our components via Bower.