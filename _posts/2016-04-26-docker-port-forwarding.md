---
layout:     post
title:      "Port forwarding for Docker on OSX"
author:     Ivan Demchenko
date:       2016-04-26 08:12
categories: tools
keywords:   "docker, port-forwarding, debug"
desc:       "This is a short post that describes how to set up proper port forwarding for docker machine in OSX"
permalink:  docker-port-forwarding
---

Sometimes you need to debug a mobile version of an app you're working on that runs in docker virtual machine. Thus, you need a port forwarding. In this article I'd love to share a few simple steps of how to do this on OSX.

### Set-up

This should work for docker-machine using VirtualBox on OSX.

1. `docker-machine ssh default`
3. `ifconfig`
4. get the ip for the `oth0`. There will be something like `inet addr: 10.0.2.15`
5. exit
6. get the ip of your physical machine.
7. go to the settings of the virtual machine.
8. in the network section, find the adapter that is attached to NAT, open Advanced section and open Port Forwarding dialog.
9. In this dialog add a new record like this:
 - Host IP: your machine's ip,
 - Host Port: pick the port,
 - Guest IP: is the ip from docker machine's ifconfig,
 - Guest Port: is the port your app in docker is bound to

For example, you have an Express web-server running in docker container bound to the port 3000, the ip of the VM is 1.2.3.4, the ip of the you laptop/desktop/etc is 5.6.7.8 and you want your app to be accessible via the port 12000. Thus, the settings would be like following:

- Host IP: 5.6.7.8,
- Host Port: 12000,
- Guest IP: 1.2.3.4,
- Guest Port: 3000
