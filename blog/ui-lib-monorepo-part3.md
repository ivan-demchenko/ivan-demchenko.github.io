---
title: UI library as a mono-repository. Part 3
date: 2021-10-27
tags: ["front-end", "architecture"]
---
As we progressed with our mono-repository endeavour, we noticed some weird behaviour. It worked like charm in the apps. But not in our Storybook. Besides, sometimes tests would fail for no obvious reason.

Storybook is a de-facto standard tool for developing and demonstrating your components in action in the real environment. We also used Jest for testing. So, naturally, we didn't want to give them up. Seems like our setup is not finished yet.

In mono-repository, components reference other components by package names:

```ts
// button.tsx
import { Icon } from '@highlight-ui/icon';
```

Thus, when we build the components, the `dist` folder will be used (dependency resolution process algorithm) as hashing of CSS classes will be different and the plugin that generates props tables will not work and if there’s no `dist` folder then files are not found 😱.

## The Storybook setup tweaks

We needed to make sure our Storybook always use source files.

Webpack is a mighty beast (to say the least). We decided to extend the resolution process. We needed a way to point resolvers to source files for our packages.

As such, we needed to add fields with references to source files entry points:

```json{9,10}
{
  "name": "@highlight-ui/button",
  "version": "8.0.1",
  // ...
  "main": "dist/cjs/index.js",
  "module": "dist/esm/index.js",
  "types": "dist/cjs/index.d.ts",
  "style": "dist/esm/index.css",
  "src:scss": "./index.scss",
  "src:ts": "./index.ts",
  // ...
}
```

We already had `index.ts` files in our packages and we only needed to add `index.scss` files. These files are intended for local use only. Remember, we treat CSS dependencies the same way we treat JS dependencies.

```scss
// packages/ui/button/index.scss
@import './src/Button.module'
```

Now as it’s all set, first, we can tell Webpack to look for `src:ts` field in the `package.json` file:

```js
webpackFinal: async (config) => {
  // ...
  config.resolve.mainFields.unshift('src:ts')
  // ...
  return config;
}
```

Now we need to adapt the configuration for Sass files. Look, we can tweak the resolution process based on the test field ([more](https://webpack.js.org/configuration/module/#ruletest) and [more](https://github.com/webpack/webpack/blob/4837c3ddb9da8e676c73d97460e19689dd9d4691/test/configCases/resolve-merging/override/webpack.config.js)):

```js{6}
{
  test: /\.s[ac]ss$/i,
  use: [ /* loaders */ ],
  // rest of the config
  resolve: {
    mainFields: ['src:scss', 'style'],
  },
}
```

This is what our final Webpack config looks like:

```js
webpackFinal: (config) => {
  config.resolve.mainFields.unshift('src:ts');
  
  const extraRules = [
    {
      test: /\.css$/i,
      resolve: {
        mainFields: ['src:scss', 'style'],
      },
    },
    {
      test: /\.s[ac]ss$/i,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: { ... },
        },
        {
          loader: 'sass-loader',
          options: { ... },
        },
      ],
      sideEffects: true,
      include: path.resolve(__dirname, '..'),
      resolve: {
        mainFields: ['src:scss', 'style'],
      },
    },
  ];
  
  config.module.rules.push(...extraRules);

  return config;
},
```

Read more about Webpack rules [here](https://webpack.js.org/configuration/module/#rule).

## Tweaking Jest

Knowing all of this, configuring Jest was trivial. Jest allows customising the resolution process via custom resolvers:

```js
{
  // base-jest/index.js
  module.exports = {
    ...
    resolver: path.join(__dirname, 'resolver.js'),
    ...
  }
}
```

Secondly, we need to create a resolver:

```js
module.exports = (request, options) => {
  // Call the defaultResolver, so we leverage its cache, error handling, etc.
  return options.defaultResolver(request, {
    ...options,
    packageFilter: (pkg) => ({
      ...pkg,
      main: pkg['src:ts'] || pkg.main,
    }),
  });
};
```

Notice how we simply add a field - `src:ts` - to look for. If there's no such field in the `package.json` file, it will keep looking for other default fields.

## Conclusion

Now it doesn't matter if packages have `dist` folders or not. Source files will always be used instead. Technically, it'd be great to be able to run Storybook against `dist` folders. This way you could verify what exactly do consumers get before publishing. However, this is relatively easy to achieve using a simple flag.