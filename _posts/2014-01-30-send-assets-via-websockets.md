---
layout:     post
title:      "Send assets via WebSockets"
author:     Ivan Demchenko
date:       2014-01-30 09:03:34
categories: websockets http spdy assets
keywords:   "WebSockets, HTTP, SPDY, assets"
desc:       "In this project I tried to send assets like CSS and JavaScript files via WebSocket using socket.io"
---
Recently I was watching a [video](http://www.youtube.com/watch?v=WkLBrHW4NhQ) about SPDY and later I got a nice idea about something similar. Why can't we send assets via [WebSockets](https://developer.mozilla.org/ru/docs/WebSockets)? So, I decided to create an example. You can see it in [my GitHub repo](https://github.com/raqystyle/socketsAssets). It is build with help of [socket.io](http://socket.io/).