---
layout:     post
title:      "A small note about AngularJS"
author:     Ivan Demchenko
date:       2013-04-02 9:56:23
categories: angularjs beginners
keywords:   "angularjs"
desc:       "My first look at AngularJS and how to share data among many controllers"
---
Recently I tried AngularJS. This framework is awesome! Now I want to write a small note of my vision of how an application with multiple controllers and services can work.

Let's imagine that we have a list and a form surrounded by another div, a wrapper. Generally, something like this:

```html
<div ng-controller="cApp">
  <form ng-controller="cForm"></form>
  <ul ng-controller="cList"></ul>
</div>
```

The main idea is to make these controllers independent within `cApp`. Here is our skeleton:

```js
function cApp($scope, myService) {

}

function cForm($scope, myService) {

}

function cList($scope, myService) {

}
```

Let's suppose we want the list loads when application started. Ok, we call method of service to load data.

```js
function cApp($scope, myService) {
  myService.loadData($scope);
}
```

Somewhere in `myService`:

```js
...

loadData: function(scope) {
  ...
  // Ajax call finished successfully
  success: function(data) {
    scope.$dispatch('data.loaded', data);
  }
  ...
},

...
```

And here is a trick. I passed general scope to the service. It will dispatch some events to that scope. Later I can listen to that events in my controllers:

```js
function cForm($scope, myService) {
  $scope.$on('data.loaded', function(e, data) {...});
}

function cList($scope, myService) {
  $scope.$on('data.loaded', function(e, data) {...});
}
```

And so on. So, the main idea is to use `$on` and `$dispatch` methods of `$scope`. This approach makes your application flexible for development within a team. You can add some other controllers, for instance, with notifications, and all you need for it is only add some listeners.
