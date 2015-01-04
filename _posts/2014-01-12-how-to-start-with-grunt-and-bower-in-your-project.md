---
layout:     post
title:      "Howto: start with Grunt and Bower in your project"
author:     Ivan Demchenko
date:       2014-01-12 21:01:02
categories: grunt bower
keywords:   "GruntJS, grunt, bower, startup, project"
desc:       "Here I want to go in details through the process of setting up a new project using GruntJS and Bower"
---
This note is about Grunt and Bower. For beginners. I use these cool tools every day and I can't imagine my life without them. However, I remember myself when I was trying to understand how all this work together. Now, when it is done, I want to share my knowledge with other people. If you find Grunt or Yeoman or Mimosa hard, then this article might help you and save a lot of time in future.

### Lyrics

So, we're about to start a new front-end project. We want to concentrate on task-solving, not on

* keeping different libraries up-to-date,
* compiling * to JavaScript, CSS or HTML.

And we also want to have some kind of base for further projects. We can use something like Yeoman or Mimosa. Frankly speaking, I've tried to use generators for AngularJS from Yeoman. And it gives nice base to start a project. But in most cases I had to remove a half of Gruntfile. And something was always broken :)

So, I decided to create my own bicycle and, at the same time, get **better understanding** of how this stuff works.

### Section for beginners

All the stuff that we'll talk about here works with [NodeJS](http://nodejs.org/) and [NPM](https://www.npmjs.org/). So, please try to google how to install this on your machine.

### What do we want

Let's decide on this. I'm quite a big fan of using CoffeeScript, Stylus and Jade. I also fell in love with AngularJS, but the framework itself is not very important, we can choose any. So, my requirements are:

* install libraries easily
* compile CoffeeScript
* compile Jade
* compile Stylus
* watch files and run correspondent tasks as some of them are changed
* prepare production version
* prepare development version
* run tests
* run all this tasks with one command

Grunt and Bower will help us.

### First step

We need to install some packages from NPM.

```
npm install -g grunt-cli bower
```

I also used to install Stylus, CoffeeScript and Jade modules globally because I'm using them all the time. But if you don't use them, just install then without -g flag. So,

```
npm install -g stylus jade coffee-script
```

It is also a good time to decide the directory skeleton. My proposition looks like that:

```
OurApp
|
+- frontend
   |
   +- builds
      |
      +- dev
      +- prod

   +- src
      |
      +- coffee
      +- jade
      +- stylus

   +- tests
      |
      +- coffee
      +- js

   +- vendor

+- sever
```

### Second step

Now, we have everything we need. We also need to understand that there will be more packaged that we'll depend on, but they are local (not global like `grunt-cli`, for example). Every node-based project need a `package.json` file. There is a good way to create it:

```
cd OurApp
npm init
```

This wizard will ask a few simple questions like name of a project, keywords, license and so on. As a result you'll have `package.json` file.

### Third step

Bower. This is a really great tool for managing front-end libraries your project. Roughly speaking, NPM is for backend, Bower is for front-end. But we need to specify paths for Bower packages. We need a file called `.bowerrc` and placed in `OurApp/.bowerrc` for this.

```json
{
  "directory": "frontend/vendor"
}
```

Having this file, Bower will install all the packages into right directory. For example, if we need to install jQuery, we can simply type `bower install jquery --save-dev` and that's it, jQuery will be present in `frontent/vendor` directory.

### Hello Grunt!

It's high time to start dealing with Grunt. Let's create a new file `Gruntfile.js`. With following content:

```js
module.exports = function(grunt) {

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      
    },

    coffee: {
      
    },

    stylus: {
      
    },

    jade: {
      
    }

  });

  grunt.registerTask('default', []);

};
```

As you can understand from this, here we have some sort of skeleton for each of our language.

Every entry is a task. I mean, in future you'll able to write `grunt jade` and everything that is described in jade section will be called.

We also need a `readme` file. I prefer [Markdown](http://daringfireball.net/projects/markdown/syntax) syntax, thus I'll create at `readme.md` file in the root of a project. 

Now we need to install certain dependencies for each entry. Get back to your console and type:

```
npm install --save-dev grunt grunt-contrib-watch grunt-contrib-jade grunt-contrib-coffee grunt-contrib-stylus
```

Thus you'll install modules in `node_modules` folder.

### I'm watching you!

One of our requirements is to make grunt watch our files and compile them on the fly. Here if the code

```js
...
watch: {
  coffee: {
    files: ['frontend/src/coffee/**/*.coffee'],
    tasks: ['coffee:dev']
  },
  stylus: {
    files: ['frontend/src/stylus/**/*.styl'],
    tasks:['stylus:dev']
  },
  jade: {
    files: ['frontend/src/jade/**/*.jade'],
    tasks: ['jade:dev']
  }
},
...
```

So, as you can see we specify the tasks and files for each of our languages. Now we need to assemble our tasks.

### Assembling tasks

Often tasks in Grunt looks like

```js
myTask: {
options: { ... },
  subTask1: {
    options: {
      // ...
    },
    files: {
      // ...
    }
  },
  subTask2: {
    // ...
  }
}
```

This means that you can call the separate task by `grunt myTask:subTask1`. You can read more about [configuring tasks](http://gruntjs.com/configuring-tasks). We will follow the same idea:

```js
// ...
coffee: {
  dev: {
    files: [{
      expand: true,
      cwd: 'frontend/src/coffee/',
      src: ['**/*.coffee'],
      dest: 'frontend/builds/dev/js/',
      ext: '.js'
    }]
  }
},
// ...
```

The idea for any other language is pretty much the same. We only need to change `coffee` and `js` to corresponding language name.

After all that we need to load tasks:

```js
module.exports = function(grunt) {


  grunt.initConfig({ ... });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');

  // ... and register task:

  grunt.registerTask('dev', [
    'coffee:dev', 'stylus:dev', 'jade:dev', 'watch'
  ]);

  grunt.registerTask('default', []);

};
```

This means, that now we can run `grunt dev` and all the tasks that are described here, in task `dev`, will be executed. There is also a `default` task. The name is self-explanatory, when you simply run `grunt`, the `default` task will be executed.

### First result

This is that we've got now:

```js
module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    watch: {
      coffee: {
        files: ['frontend/src/coffee/**/*.coffee'],
        tasks: ['coffee:dev']
      },
      stylus: {
        files: ['frontend/src/stylus/**/*.styl'],
        tasks:['stylus:dev']
      },
      jade: {
        files: ['frontend/src/jade/**/*.jade'],
        tasks: ['jade:dev']
      }
    },

    coffee: {
      dev: {
        files: [{
          expand: true,
          cwd: 'frontend/src/coffee/',
          src: ['**/*.coffee'],
          dest: 'frontend/builds/dev/js/',
          ext: '.js'
        }]
      }
    },

    stylus: {
      dev: {
        files: [{
          expand: true,
          cwd: 'frontend/src/stylus/',
          src: ['**/*.styl'],
          dest: 'frontend/builds/dev/css/',
          ext: '.css'
        }]
      }
    },

    jade: {
      dev: {
        files: [{
          expand: true,
          cwd: 'frontend/src/jade/',
          src: ['**/*.jade'],
          dest: 'frontend/builds/dev/templates/',
          ext: '.html'
        }]
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-jade');

  grunt.registerTask('dev', [
    'coffee:dev', 'stylus:dev', 'jade:dev', 'watch'
  ]);

  grunt.registerTask('default', []);

};
```

### Adding sugar

Now let's add some stuff that will help us to create a production version.

First of all, we want our scripts to be minified and combined. Let's see what we have in grunt plugins stack for that. I like to use [grunt-contrib-concat](https://www.npmjs.org/package/grunt-contrib-concat) and [grunt-contrib-uglify](https://www.npmjs.org/package/grunt-contrib-uglify). So, let's install them!

```
npm install grunt-contrib-uglify --save-dev
npm install grunt-contrib-concat --save-dev
```

Ok, ready.  Don't forget to register the task in Gruntfile!

But let's assume that somebody has just cloned your project and want to build the prod version immediately. This means that we need to compile our src files in some temporary directory, do the magic and remove it afterwards. We need to alter our `coffee` part for this by adding another subtask called `prod`. 

```js
prod: {
  files: [{
    expand: true,
    cwd: 'frontend/src/coffee/',
    src: ['**/*.coffee'],
    dest: 'frontend/temp/js/',
    ext: '.js'
  }]
}
```

After that, we can use file in `frontend/temp/js/`` for combining. Simple add a task!

```js
concat: {
  options: {
    separator: ';',
    stripBanners: true
  prod: {
    src: ['frontend/temp/js/**/*.js'],
    dest: 'frontend/builds/prod/app.js'
  }
}

// ...

grunt.registerTask('default', [
  'coffee:prod', 'concat'
]);
```

Cool! Now our files can be compiled and concatenated. The only this is to remove leftovers with `grunt-contrib-clean`. Install it and add a task like that:

```
npm install grunt-contrib-clean --save-dev
```

add to Grunt config under concat section

```js
clean: ['frontend/temp']
```

load it:

```js
grunt.loadNpmTasks('grunt-contrib-clean');
```

add register:

```js
grunt.registerTask('default', [
  'coffee:prod', 'concat', 'clean'
]);
```

Time to minify our app.js! Let's do it with `grunt-contrib-uglify`. As usual, install it, load and register:

```js
uglify: {
  options: {
    sourceMap: 'frontend/builds/prod/source-map.js',
    banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
    "<%= grunt.template.today(\"yyyy-mm-dd\") %> */\n"
  },
  prod: {
    files: {
      'frontend/builds/prod/app.min.js': ['frontend/builds/prod/app.js']
    }
  }
}

// ...

grunt.loadNpmTasks('grunt-contrib-uglify');

// ...

grunt.registerTask('default', [
  'coffee:prod', 'concat', 'clean', 'uglify'
]);
```

I think there no comments needed here.

### Conclusion. Sort of.

This is how we can assemble our developing process. There are a lot of cool features in Grunt that I will write about later. And you can discover them by yourself. However, I hope that you'll have better understanding what is going on here.