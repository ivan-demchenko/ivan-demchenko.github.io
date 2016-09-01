---
layout:     post
title:      "How to generate documentation for your project"
author:     Ivan Demchenko
date:       2015-03-14 21:03
categories: documentation
keywords:   "documentation, generation, automation"
desc:       "In this post I would like to describe how to generate documentation for your project automaticaly based on comments in your code"
---

Keeping documentation up to date is always hard. Especially for young projects, when the API is unstable.

## Where to start...

I tried a couple of plugins for docs generation and my favourite so far is (https://github.com/darcyclarke/grunt-dss)[`grunt-dss`]. It has a nice template system and is quite flexible in term of adding functionality.

## DSS config

```js

dss: {
    docs: {
        options: {
            template: 'template/',
            parsers: {
                icons: function (i, line, block) {
                    var res = require('./helper/icons')(line);
                    return res;
                },
                section: alwaysLine,
                anchor: alwaysLine,
                topic: alwaysLine
            }
        },
        files: {
            'docs/': [
                'src/components/components.styl',
                'src/components/*.styl',
                'src/css/css.styl',
                'src/css/*.styl',
                'src/structure/structure.styl',
                'src/structure/*.styl',
                'src/*.styl',
                '!src/app.styl',
                '!src/base.styl'
            ]
        }
    }
},

```

alwaysLine function:
```
function alwaysLine(i, line, block) {
    return line;
}
```

## CSS file structure


```
/*
@topic Components
*/
@import "alerts.styl"
@import "calendar.styl"
@import "datetime.styl"
// and so on
```


```
/*
@section Alerts
*/

.ys-alert
    display block
    padding .8em 1em


/*
@name Error alert
@description Error alert
@anchor c-alerts-error
@markup
<div class="ys-alert-error">
    This is an error    
</div>
*/
    &-error
        background #e1251d
        color white

```

Thus you have structure like

```text
files
    blocks
        name
        topic
        section
```

In template we can use the blocks we specified:

- section
- anchor
- description
- markup

```
{% raw %}
{{#if markup}}
    <div class="ys-sg-def-example">
        <p class="ys-sg-def-example-marker">Example</p>
        <div class="ys-sg-def-example-sandbox">
            {{{markup.example}}}
        </div>
    </div>

    {{#if state}}
    <dic class="ys-sg-def-stateslist">
        {{#state}}
        <div class="ys-sg-def-example ys-sg-def-state {{class}}">
            <div class="ys-sg-def-example-name">{{name}}</div>
            {{{../markup.example}}}
        </div>
        {{/state}}
    </dic>
    {{/if}}

    <div class="ys-sg-def-code">
        <pre class="prettyprint lang-html markup">{{{markup.escaped}}}</pre>
    </div>
{{/if}}
{% endraw %}
```

## DSS template

```text
/template
    /assets
        /css
        /js
    index.handlebars
```

In `index.handlebars` you can simply use links to your assets. Thus, you can customise your template as you wish
