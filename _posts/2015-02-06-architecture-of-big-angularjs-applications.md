---
layout:     post
title:      "Architecture of big AngularJS applications"
author:     Ivan Demchenko
date:       2015-02-06 10:58
categories: AngularJS architecture
keywords:   "JavaScript, AngularJS, architecture, dry"
desc:       "My thoughts about building big AngularJS applications with heavy business logic"
---

Building a domain-specific application can be tricky. Here I want to outline my thought about how to organise your AngularJS code in a way that helps to solve some common problems and help not to end up with unmaintainable code base in the future.

## Prehistory

Currently I am working on a CRM system which is meant to be used on mobile devices. The system is bloated with domain logic full business rules, validations and so on. It's very easy to mess things up: business logic with UI logic or services with resources. Especially when you are under pressure of deadlines or your team is young. Thus, I came up with a couple of ideas for our project and decided to note them down here.

## Split things up

The basic question is *how to control the development of an application in a way that it stays easy to maintain and extend*. Another problem is how to make different people with different background to write code in more or less standardised way? For example, some people like to put business logic in controllers or inject one controller into another. Although official documentation doesn't recommend it, AngularJS allows it. Well, those are the questions of understanding and using of a certain design pattern. Another situation is when a person knows all the best practices and applies them quite often, sometimes it happens that he or she mess things up because of a deadline or other unpleasant circumstances. So, the question is *how to help developers to estimate better*?

Such things happen all the time and *nobody* writes the great, clean code. Multinational teams usually struggle with naming simply because English is not perfect. For example, if your code should define whether an organisation is supplier or being supplied with something, good level of English grammar may help here a lot:

```
this.isSupplierOfGoods = function () { ... };
```

vs 

```
this.isSuppliedOfGoods = function () { ... };
```

Of course, you can ask to write comments, explain this method on the next knowledge sharing meeting, etc. But this only means that you are going to postpone the problem of understanding the code for the next generation of developers who will maintain and support the app.

Once we were asked to start a new project with the same business logic but for another platform (and another UI). We quickly created a prototype that simply works. As my experience suggests, if this idea is successful, then nobody will give us any time for the full refactoring. We simply have to deliver a new product. You probably familiar with the situations like that.

> Manager: We need a simple app that works. Nothing special, just a couple of screens and buttons.
> Developer: Okay, we can build this one in a couple of days.
> Manager: Perfect! I'll schedule a demo session then.

After a while:

> Manager: Okay, our client love the idea, he can support the development financially, we need a full app to be ready within a month.

Sure, you will try to convince that the prototype you've build is just a prototype, the code is ugly and you need to start from scratch. But this will probably not happen. You understand that this is going to be a month of copy-paste with modifications because you still need the business logic to be implemented.

Likely for my team and me, our managers are aware of such situations and they always understand developer's problems. Although, nobody is insured agains such situations. Having all this in mind, I came up with an idea of splitting the our code base into *layers* and each such layer is *a different project*.

We use AngularJS and it's modular system can help us a lot here. So, I can extract following layers:

* `UI layer` - on this level we define our user interface with help of CSS-frameworks, components, directives, controllers, views, etc. This is where designer is needed
* `Business logic layer` - here we specify a number of services which describe business logic. We tend to write statefull services that helps us to share the data between UI parts.
* `Resources layer` - this layer is for data fetchers. Those services simply fetch data and probably extract it from the server responses.

Each of those layers is a separate project (*module* in AngularJS terminology) that we can distribute as a Bower components using [Private Bower](https://www.npmjs.com/package/private-bower).

## An example

So, you shippable application, called `x-myApp`, depends on your modules:

```js
var myApp = angular.module('x-myApp', [
    'x-business-logic',
    'x-resources',
    'x-ui-components'
]);
```

It contains:

* controllers and routes that use services from `x-business-logic` and resources from `x-resources`.
* views that can be build with help of directives from `x-ui-components`

Here is one point that I want to stress out. From my point of view, `x-business-logic` should not depend on `x-resources`. I mean, your BL-services should be written in such a way that they only use data you provide. This data can be fetched with help of resource within a controller or router's `resolve` section. Thus, you end up with a service that does something valuable from business perspective and that can easily be tested using mock data.

## Benefits

I think, the most valuable outcome of organising the code this way is that it is harder to write bad code. I am not saying it solve all the problems. But at least it is easier to find a bad-code-spot and fix it. For example, if you see one controller out of many full of business logic, you probably will try to extract it into a service within another project. This helps to share the code between different projects.

Another strong point is portability of the code. Instead of copy-pasting, you can simply `bower install` your BL or Resources that has already been written and be sure that it works.

Moreover, you can add another layer with filters, for example. Recently I read a [article](http://www.webcodegeeks.com/javascript/angular-js/angularjs-tip-using-a-filter-with-ngclass/) that explains how to use a filter for manipulating the class set of DOM element. This means, that having such filters in a separate layer can help you in writing your CSS in more controlled way. Imagine you have a list item that may have different states according to some rules. You can describe this behaviour in one place and reuse class names and a filter within different projects.

Furthermore, it also helps to clean up your CSS. Your UI components use their own styles, so only need to write a very specific CSS code for this very project. Another project will reuse component's CSS and at the same time will have it's own specific styles.

To wrap up, it also helps to test. I mean, if you have services that only implement business logic and have no influence from controllers, it is easier to mock data for them and test.