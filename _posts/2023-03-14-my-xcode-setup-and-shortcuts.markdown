---
layout: post
title:  "My Xcode Set Up and Short Cuts"
date:   2023-03-14 07:00:00 -0300
tags: [swift, productivity]
---

In this article, we'll explore some of the Xcode configurations and shortcuts that I find most useful and that can save you time and effort when working on your  projects.

# Xcode Configurations

## 1. Check Spelling While Typing
I love this one, it makes finding/preventing/fixing typos so much easier.

To enable it, go to: `Edit -> Format -> Spelling and Grammar -> Check Spelling While Typing`

![spelling](/resources/xcode-setup/spelling.png)

Then Xcode will underline with a red line the words with typos.

## 2. Disable `print` keyboard binding shortcut

The default keyboard shortcut for `printing` the code (IN PAPER!!) is `⌘ + P`, which is really close to our beloved `⌘ + Shift + O`, and sometimes we hit it by mistake.

A quick solution for that is to change or remove the binding of the `print` action.

Double click on the key column and replace or remove the binding:

![print](/resources/xcode-setup/print-shortcut.png)

## 3. Use `⌘ + Click` to jump to definition

![jump](/resources/xcode-setup/jump-to-def.png)

## 4. Text Editing Configurations

![t1](/resources/xcode-setup/t1.png)
![t2](/resources/xcode-setup/t2.png)
![t3](/resources/xcode-setup/t3.png)

## 5. Play sound on succeeded build

One quick way to know that a build was successful is to make Xcode reproduce a sound:

![success](/resources/xcode-setup/success.png)

# Shortcuts

## macOS
* Custom: `⌘ + Shift + S` → Select area + screenshot + copy it to clipboard
* `⌘ + ⌃ + Space` → Open Emoji Keyboard
* `^ + →` → Move one space to the right
* `^ + ←` → Move one space to the left 
* `^ + ↑` → Open Mission Control
* `⌘ + Space` → Open Spotlight Search
* `⌘ + delete` → Send item to trash
* `⌘ + Shift + delete` → Empty trash
* `⌘ + ⌥ + W` → Close all windows

### Typing
* `⌥ + delete` → Delete entire word
* `⌘ + delete` → Delete entire line

### Finder
* `⌘ + ⌥ + W` → Close all windows

## Chrome
* `Command + T` → New tab
* `Command + Shift + T` → Reopen closed tab
* `Command + L` → Focus on the address bar

## Notion
* `⌘ + K` → Global Search

## Xcode
* `⌘ + Shift + O` → Open file/method/struct quickly
* `⌘ + Shift + J` → Display selected file in the folder hierarchy
* `^ + Shift + Drag click` → Multi Cursor
* `⌘ + ^ + ←` → Back to previous file
* `⌘ + ^ + →` → Forward to next file
* `⌘ + A` + `^ + I` → Indent file
* `⌘ + ,` → Open Preferences
* `⌘ + N` → New File
* `^ + ⌘ + L + → + →` → Show/Hide all issues
* `⌥ + ⌘ + W` → Close all tabs but the current one
* `⌥ + ⌘ + ]` → Move line up
* `⌥ + ⌘ + [` → Move line down
* `⌥ + ⌘ + /` → Add docs template to the selected method/property

# Time Savers

## Xcode Templates
Create your own [Xcode templates](/2023-01-27-new-app-xcode-templates/) for your files

## Console Aliases

I also like to have some handy aliases for the console. [Here](https://linuxhint.com/configure-use-aliases-zsh/) is a step by step guide on how to create aliases.

### Remove derived data folder

`alias rmdd='rm -rf ~/Library/Developer/Xcode/DerivedData'`

Then you can just type the `rmdd` command on your console, and it will remove the DerivedData folder.

### Change directory to your project folder

`alias cdp='cd ~/projects/your-project/'`

Then you can just type the `cdp` command on your console, and it will change the directory to your project directory.

### Automatic Formatter

`alias pformat='cd ~/projects/your-project/ && swift run -c release swiftformat --swiftversion 5.7'`

Then you can just type the `pformat` command on your console, and it will run the formatter on your project.

---

<br>

# Conclusion

In conclusion, these Xcode configurations and shortcuts are just a few examples of how customizing your development environment can help you work more efficiently and effectively. Whether you're a seasoned iOS or macOS developer or just starting out, taking the time to optimize your IDE can make a big difference in your productivity and satisfaction with the development process. So give these configurations and shortcuts a try, and don't be afraid to experiment with your own customizations to find what works best for you.