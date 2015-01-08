---
layout:     post
title:      "Working environment & Linux"
author:     Ivan Demchenko
date:       2014-07-14 12:01:27
categories: linux macosx environment elementaryos
keywords:   "Linux, Mac OS X, ElementaryOS, Ubuntu, working environment, customisation, keyboard"
desc:       "This article is about how to switch to Linux and make it work and feel like Mac OS X."
---
Currently, I am working in a post-Microsoft company. It means we have a lot of old PCs with Windows. However, I used to Mac. I asked about providing the me with Mac, but company simply said that we have tons of old hardware so we won't buy you a Mac. Put it simply, keep calm and write code. So, they gave me the old PC with Windows 7. I tried virtual machine, but for some reason it crash all the time. So, I decided switch to Linux.

I don't really know what kind of crap I am working on but as soon as I installed Ubuntu and all the updates, the system crash and don't boot. I tried a bunch of distros, same old story, installation, updated, crash. Probably, the problem was with drivers for a video card. But I had no time to dig into it.

I tried ElementaryOS. It works fine for now. It seems to be the most stable distro (even comparing to new Ubuntu 14.04).

Next step is to make it usable. Mac keyboards are perfect, at least for me. I have the position of Ctrl button. So, I switched Left Alt to Left Ctrl by doing following.

```bash
touch ~/.Xmodmap
nano ~/.Xmodmap
```

and put this in the file

```bash
clear control
clear mod1
keycode 37 = Alt_L Meta_L
keycode 64 = Control_L
add control = Control_L Control_R
add mod1 = Alt_L Meta_L
```

After that you only need to update your key bindings in `Settings > Keyboard` section.

Also, don't forget to to install Elementary-Tweaks app.

```bash
sudo apt-add-repository ppa:versable/elementary-update -y
sudo apt-get update
sudo apt-get install elementary-tweaks -y
```

I also used this post [20 things to do after installing Elementary OS 0.2 Luna](http://www.binarytides.com/better-elementary-os-luna/) to get all the good ideas of how to make system better. Also, I [installed Mac OS fonts](http://customizeubuntu.com/appearance/fonts/install-mac-os-fonts-in-ubuntu).

Now I have a pretty good system to work on :)