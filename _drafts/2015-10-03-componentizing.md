Everybody talk about components now. WebComponents are gaining momentum, JS frameworks adopts the ideas of componentization. But is it something really new? Let's find out.

### Entropy and components

We always struggle with chaos. Every system has a certain level of chaos. When there's no order, no structure, no idea behind, things become messy which means that the entropy of the system grows.

Now, let's think about a component in general. From my point of view, a component is a self-contained piece of software. For us, as users, the only important thing is that when give some input, a component does something. In other words, components are encapsulations and building blocks. The same idea as OOP or FP cenveys.

As the good examples I can mention such projects as Bootstrap/Foundation/etc or jQuery/Ramda/AngularJS/etc. They are just sets of reusable components that encapsulate some functionality. It might be just a button or a function or something more sophisticated. But the important thing is that we don't care about this. For us, this is just another "building block".

Every kind of system with a certain level of entropy tends to order. For example, recently I found this piece of markup:

```
<div class="text-2em text-red m-l-05em float-right top-2em bottom-3em scrollable"></div>
```

This is almost one-to-one with the original. What can we say about the codebase written in this manner? Well, only one thing: it has a high level of entropy which results in a low readability of the markup. In other words, there is no order, no standard which would help a developer to choose a class to use. What does this set of classes tells us? Well, maybe it will give us some hint about color of text or positioning. But it has no meaning. A lot of things may be positioned and given text color. Meaningless code is unsupportable code.

Talking about support, whenever you encounter a bug in a component, you can fix it in one place and it will be fixed everywhere in the app. This encourages consistency.

### How does AngularJS help

One of the projects I used to work on was based on AngularJS, so I'll be refering to it. First of all, AngularJS is not a panacea, it doesn't solve all of your problems, don't cherish illusions. Somethimes it might even help to make things worse when used improperly. So, *please*, pay special attention to best practices and documentation.

#### Directives

However, AngularJS implements a number of patterns that help to organise the codebase. But the most helpful feature in terms of *componentization* is the ability to create our own *directives*. They are cool not just because we can "extend HTML", but also because using directives we can encapsulate huge pieces functionality that normally just makes it hard to understand business logic. I talking about UI logic. For example, very often, just in order to get a quick result, people put everythin in a controller.

Let's consider a situation when we need to send some data to backend when a user clicks a button. We want to disable the button and show loading indicator next to label while we are waiting for the response. So we encapsulated the button in a directive and called it `action-button`. It takes promise and validation function that returns boolean upon which we decide whether the button should be disabled or enabled. It seems like an effort won't pay off. But it will. Because we removed noise from all our templates and controllers.

Using `action-button` we created a bit more sofisticated component `save-cancel`. As you may guess, these are two buttons that saves edited data and closes edit form.

Again, we encapsulated noisy functionality into this component and next time we don't care about how to place buttons or which classes to use. We just know that we need to pass a promise and two functions and it just works.

Thus, on the project I mentioned, we made a few basic directives for displaying lists, list items, behaviours for them, action buttons and few inputs. The funny part is that with this set of basic components we already covered approximately 35% of out app.

#### Angular's Dependency Injection

This pattern helps us a lot to share functionality among different parts of our application. We extract any kind of business logic to services. Thus, we are trying to keep our controllers as stupid as possible. For example, `personService` may have a method like `getPrimaryEmail` that takes some data that describes a person and this method knows how to extract the primary email from the data provided. Thus, a component doesn't care about the structure of data, it just displayes it.

#### Globalised controllers

The linking chain between directives and services are *controllers*. For example, they may inject services and ask for data and pass it to directive via scope. Or a method that can be passed to a component. But the important rule here is to **put any kind of business logic in services**. So, controllers in our app are used for binding the representation layer with business logic layer. Employing this model, we could split these two layers in two projects.

#### Share data between controllers

This is a commonly asked question. Well, we tried different approaches and what did worked out for us was that we used so-called "page controller" that was holding the state for the whole page. The next level were directives. Somethimes like this:

```html
<section ng-controller="UserPageController as ctrl">
    <user-generic-info data="ctrl.user"></user-generic-info>
    <user-activitied data="ctrl.user_activities"></user-activitied>
</section>
```

### CSS Side

#### Preprocessing

Personally, I think that writing vanilla CSS is not optimal anymore. The main reason for this conclusion is maintainability of code. Thus, we're using Stylus preprocessor. Why Stylus? I like the way the code looks like. It is very clean, without unneeded symbols. `var`iables, `loop`s and `if` checks look very clean as well. We're using Kouto Swiss lib for additional mixins.

Generally, I'm very pleased with Stylus and after using it for a while, I can't understand how people can still write `{` and `}` or `:` and `;` and probably the most horrible - `$` for variables.

#### From generic things to concrete

If something has to be standardised, the values of it's properties has to be fixed. You might want to standardise colour pelette or typography or common dimentions. Following this idea, we have started with very generic classes.

Recently we dropped the support for IE9 so we are able to use Flexbox.

Our first two building blocks were `groups`. Horizontal and vertical. Other classes extended from these groups. For example, grid's `row` extends horizontal group and `column` extends vertical group. So, it looks like

```css
.flex
    display flex

.flex-row
    @extends .flex
    flex-direction row

.flex-col
    @extends .flex
    flex-direction column

.group--horizontal
    @extends .flex-row
    min-height 0%
    ...

.group--vertical
    @extends .flex-col
    min-width 0%
    ...
    
// ...

.row
    @extends .group--horizontal
    ...

.col
    @extends .group--vertical
    ...
```

This snipper will be compiled to this:

```css
.flex,
.flex-row,
.flex-col,
.group--horizontal,
.group--vertical,
.row,
.col {
  display: flex;
}
.flex-row,
.group--horizontal,
.row {
  flex-direction: row;
}
.flex-col,
.group--vertical,
.col {
  flex-direction: column;
}
.group--horizontal,
.row {
  min-height: 0%;
}
.group--vertical,
.col {
  min-width: 0%;
}
```

Already you can see how dificult would it be to write such code in vanilla CSS (*vccs*). This approach gives us several benefits:

 - *Minification by reusing code*. The duplication can be observed within class names. Nonetheless, in a big project you get much higher chances that *vcss* rules will be duplicated.
 - *Specificity*. It's very easy to overcome this common CSS problem by extending classes. Because of a relatively small number of basic building blocks, it is possible to spead them among different directories and import files from them in proper order.

We organised our code exactly in this way:

```
/ main.styl
common
    / general.styl
    / mixins.styl
    / ...
atoms
    / buttons.styl
    / forms.styl
    / typography.styl
    / ...
components
    / action-button
    / ...
layout
    / grid.styl
    / page.styl
```

Thus, in `main.styl` we just inject four main directories. Runs like clockwork.

### Documentation

Probably the most painful part in any project. You may argue that good code doesn't need documentation. Although it's true to some extent, there's also a part of false in there. Most of the time we need a well-known place with a quick reference and an overview of what we have at our disposal.

After certain unsuccessful attemps to find a proper documentation generator that just works, I gave up and decided to create my own. But before that I had to bring all the components to a common shape:

```
action-button
    / component.md
    / demo
        demo.ctrl.js
        demo1.html
        demo2.html
        ...
        demoN.html
    / source
        views
            / action-button.html
        actionButton.directive.js
        actionButton.directive.spec.js
        actionButton.styl
```

This works well for us for now. We can write everything we think we have to write about a particular component in the `components.md`. For instance, why we have this component, where to use it, which attributes it fetures, what kind of attributes they are and so on.

As a bonus, I wrote a small script that scaffolds a new component.

There was a problem with moving components directories around because you have references to the views in the directives. However, there is a nice trick that helps to dymanise the directory structure. It is `process` function in `grunt-contrib-copy` task config. Instead of specifying a value of `templateUrl` as something like `src/components/ui/input/views/some.html` we can write something like `{{__dir}}/views/some.html` and then replace `{{__dir}}` with proper path while processing files while copying them.

Our documentation site looks like a directory tree and an overview. The overview is components name, compiled content of `component.md` file, list of demos, demo preview and source of selected demo.

In order to build this site, again, I had to write a grunt task that will traverse specified directory and map it into JSON file.

### So?

Althoug, the basis is set, there is still a lot of work to do. The main problem is how to predict possible use cases for the CSS structure. In the beginning, the most common question was "which class should I use here?". But now, questions like this are quite rare.

Moving towards a standardised set of building blocks helped us a lot to align with our design department. However, sometimes we receive quite challenging requirements from our product owners. But now, due to reduced entropy, we can move forward faster and give more precise estimations.