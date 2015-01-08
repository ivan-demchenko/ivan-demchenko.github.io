---
layout:     post
title:      "RequireJS & Bundles"
author:     Ivan Demchenko
date:       2014-06-30 17:34:52
categories: requirejs bundles
keywords:   "requirejs, bundles, code organisation, architecture"
desc:       "How to organise your code in bundles using RequireJS"
---
Nice way to organise your code in bundles with RequireJS

```js
define('primary', function(require) {
  return {
    util: require('util'),
    main: require('main')
  };
});

require(['primary'], function(primary) {
  // primary.util, primary.main
  // with destructuring assignment:
  var { util, main } = primary;
});
```

Took it from [here](https://github.com/jrburke/requirejs/issues/1034).