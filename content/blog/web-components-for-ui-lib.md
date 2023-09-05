---
title: The Freedom of Web Components or Why UI Libraries Should Embrace Framework-Agnostic Solutions
date: "2023-09-05"
tags:
  - Front-end
  - Design system
  - UI library
---

In the ever-evolving landscape of web development, the choice of tools and technologies can have a profound impact on the flexibility, scalability, and longevity of a code base. One critical decision that developers often face is whether to use a framework or embrace more framework-agnostic solutions like Web Components when building a UI library. In this post, we'll explore why opting for Web Components can offer unparalleled advantages when it comes to ensuring flexibility and avoiding lock-in.

## The Shared Front-End Architecture Challenge

As we know, design systems and UI libraries are an essential part of any modern SaaS business. UI libraries provide a consistent and reusable set of components, styles and functionality that can significantly speed development, improve accessibility and testability, and maintain consistency across an application. However, there's a catch - choosing a particular framework to implement the UI library can undermine the entire implementation effort.

When a UI library is tightly coupled to a particular framework, it forces the entire project to adopt that framework as well. Can you imagine a performant application built with Angular that uses a UI library written in React? It is hard to remove the dependency on a framework, especially if the project evolves or you want to change frameworks in the future. There is the risk of having to rewrite the entire UI library if the company decides to use a different framework or even a language (like Elm or Rust).

## Enter Web Components: The Framework-Agnostic Solution

Web Components offer a different approach. As a set of web platform APIs, they allow you to create custom, reusable components that are not tied to a particular framework. These components encapsulate their HTML, CSS, and JavaScript, making them self-contained and portable.

Here are some reasons why Web Components are a good choise for UI libraries:

### 1. Freedom of Choice

With Web Components, you're no longer bound by the constraints of a specific framework. You can (almost) seamlessly integrate your UI library into projects built with various frameworks or even with vanilla JavaScript. This freedom of choice empowers developers to select the best technology stack for their project's specific needs, rather than being forced into a single framework.

### 2. Future-Proofing

The web development ecosystem is dynamic, with new frameworks and tools emerging regularly. In addition, there is always the risk that the framework authors will change their strategy and release a new version with an incompatible API. By adopting Web Components, you future-proof your UI library. It remains relevant and adaptable, regardless of which framework becomes the next big thing. This reduces the risk of tech debt and the need for costly rewrites.

### 3. Community and Ecosystem

Web Components are a web standard supported by all major browsers. They have a growing and vibrant community, resulting in a rich ecosystem of ready-made components and tools. Leveraging this ecosystem can significantly speed up development and reduce the need to reinvent the wheel.

## Bringing Web components into an existing app

Web components follow the imperative, object-oriented and event-based paradigms. The custom elements extend existing element classes to provide new functionality.

```js
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();
    // Element functionality written in here
  }

  action() {
    this.dispatchEvent(new Event('...'));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'disabled') {
      // handle when the disabled attribute has changed
    }
  }
}
```

On the other hand, modern frameworks such as React often follow the declarative, functional paradigm.

```js
// State -> JSX
function MyComponent(props) {
  // render the state passed via `props`
}
```

To make them work together, a thin adapter layer is required. As an example, the VSCode team provides a [UI toolkit](https://github.com/microsoft/vscode-webview-ui-toolkit) that is based on custom elements and adapters for different frameworks implemented with the [FAST](https://github.com/Microsoft/fast).

## Not without drawbacks

As mentioned in the articles linked below, Web components have certain drawbacks, most notably in the areas of SSR and accessibility. Some frameworks offer a solution to the SSR problem. Accessibility issues will soon be addressed at a specification level and can currently be avoided during component design.

## Conclusion

For me, it all comes down to either starting simple and fixing problems as they arise, or embracing accidental complexity right from the start, but being totally flexible. So I think it's better to stick to the platform as much as possible and write a fix down the road, rather than start with wristling the front-end ecosystem. So I am in favour of using Web Component in the UI libraries as much as possible.

Overall, I think the companies need to invest in simplification, finding new ways to simplify the stack and reduce the number of dependencies. Leaner processes and products are easier to develop and evolve, which is a real competitive advantage.

### Useful links

Articles:

- [Introduction to web components on webcomponents.org](https://www.webcomponents.org/introduction)
- [Use web components for what they’re good at](https://nolanlawson.com/2023/08/23/use-web-components-for-what-theyre-good-at/)
- [If Web Components are so great, why am I not using them?](https://daverupert.com/2023/07/why-not-webcomponents/)
- [Making Web Components reactive](https://www.horuskol.net/blog/2022-04-12/making-web-components-reactive/)
- [MDN: Using custom elements](https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements)

Libraries and frameworks:

- [FAST collection](https://github.com/Microsoft/fast)
- [Lit](https://lit.dev/)
- [StencilJS](https://stenciljs.com/)
- [Hybrids](https://hybrids.js.org/)
- [Rocket](https://rocket.modern-web.dev/)
- [Enhance](https://enhance.dev/)
