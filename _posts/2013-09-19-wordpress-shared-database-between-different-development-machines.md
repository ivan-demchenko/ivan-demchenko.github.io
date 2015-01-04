---
layout:     post
title:      "Shared database between different development machines for Wordpress."
author:     Ivan Demchenko
date:       2013-09-19 13:35:23
categories: wordpress database share
keywords:   "wordpress, database, sharing"
desc:       "How to set up wordpress to share one database for a number of developers"
---
A few days ago I'he been asked to join a guy who works on WordPress-based project. We started think about how to work on in simultaneously. So what that is that we've got for that moment:

* github repo
* remote server with db (staging, let's say `http://wp-example.com`)
* developer 1 and this ubuntu
* developer 2 and mac :)

So we wanted to share that remote DB among developers. To reach this goal we: 

* made virtual hosts on out dev machines (apache on ubuntu and nginx on mac) with the same names as staging (`http://wp-example.com`)
* wrote that to hosts (`/etc/hosts`).
* In `wp-config.php` we have specified remote db's credentials (db name, user, password, host).

And that's it! Work like a clock! Of course, db should be available for external connections. But this is not the big deal. Admin can give you an access by ip. We asked ours.

We pick up different tasks. A new branch for every task and rebase when finished. So when I `git pull` I can receive all the files that my colleague pushed. Well, obviously :D I mean images, pdfs, etc. Thus, we have three WP web sites (staging, dev1, dev2) and one DB. Files can be shared via github, for instance.

We also found some strange solutions that sync dbs by creating dumps each 5 seconds... And they are paid! I'm out the words.

So, I hope this small recipe will help you.