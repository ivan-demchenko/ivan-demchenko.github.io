---
title: UI library as a mono-repository. Part 2
slug: ui-lib-monorepo-part2
date: "2021-10-26"
tags:
  - front-end
  - architecture
---

Let's talk about CSS files and modules. Unfortunately, they are often treated as if they were a second class entities. We need to fix this situation.

## Treating CSS dependencies the way we treat other dependencies

Let's talk about the dependencies between UI components.

In JS files, we mark dependencies by `import`-ing or `require`-ing them. Packages clearly define dependencies in the `package.json` file. But a package is not only JS files, but also CSS files.

Consider a typical app:

![Typical structure of a React application](./c1p1.png)

Basically, it is a directed graph of dependencies between components. This is our mental model - JS files that reference each other. And it works well as each of those app-specific components import their CSS file and a bundler takes care of reducing all this to 2-3 files.

But let's keep in mind that we're building a set of NPM packages that contain JS and CSS files. For example, the `Button` package depends on the `Icon` package. This means, there's a dependency between JS _and CSS_ files. However, typically, these relations are neglected.

```js
// button/index.js
var Icon = require("@highlight-ui/icon");
```

```css
/* button/index.css */
/* where's my Icon? */
.Button-module {
  /*...*/
}
```

Therefore, we decided to introduce such dependency declarations in CSS files as well.

This way, we get the full picture, like shown on this diagram:

![Dependencies between components](./c1p2.png)

## Let’s test it

Let's make our Button’s Sass file include the dependency:

![Button includes the CSS of Icon as a dependency](./c1p3.png)

just as we do in the TS file:

![Button includes JS of Icon as a dependency](./c1p4.png)

The resulting build looks like this:

![Resulting CSS of Button](./c1p5.png)

At this moment, we have the Button at version 3.0.0, which depends on the Icon at version 2.0.6.

Great. Now, let’s go back to our App and install the Button package. We used `yalc` for the local experiments as it replicated the whole release-publish-install cycle:

![Importing local dependency using yalc](./c1p6.png)

Now let's use the Button in our App. This the `app.tsx`:

![Using Button component in the App](./c1p7.png)

In our App we have a special file where we `@include` the CSS of our components.

![Importing Button CSS in App CSS](./c1p8.png)

When we built it, we got the following results:

![The result of a build](./c1p9.png)

Notice that because there was an `@import` in the Button's CSS, Icon’s CSS was included as well, thanks to `css-loader`.

However, what if our App already had Icon as a dependency? Let’s simulate this and install the Icon package of version, say, 2.0.1:

![App depends on Button and Icon](./c1p10.png)

To summarise, the Button v3.0.0 depends on the Icon v2.0.6, our App depends on Icon v2.0.1 and the Button v3.0.0: Our dependency tree will look like this:

![File structure of dependencies](./c1p11.png)

_Note: `button` package now has its `node_modules` with `icon` package._

We’ll include it in source files, `app.tsx`:

![App uses Icon and Button in JS](./c1p12.png)

as well as in the `highlight-ui.scss`:

![Include Icon CSS in App CSS](./c1p13.png)

Let’s build it now and see what happens:

![The final CSS contains two versions on Icon and Button](./c1p14.png)

Okay, both versions are there!

However, what about JS? In JS we also reference CSS classes. Well, in the browser everything works as expected as well. This is the screenshot of Chrome DevTools:

![In DevTools one can see different versions of Icon](./c1p15.png)

How cool is that to have all these dependenceis visible here!

## Conclusion

It turned out that thinking about CSS files as any other software modules helps building a system of healthy relationship between these modules.
I would like to invite to [the Part 3: improving the developer experience](/ui-lib-monorepo-part3/)
