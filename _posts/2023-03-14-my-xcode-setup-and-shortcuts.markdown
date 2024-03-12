---
layout: post
title:  "My Xcode Setup and Shortcuts"
date:   2023-03-14 07:00:00 -0300
tags: [iOS, tools, productivity]
---

In this article, we'll explore some of the Xcode configurations and shortcuts that I find most useful and that can save you time and effort when working on your  projects.

#### Table Of Contents:
- [Xcode Configurations](#xcode-configurations)
  - [1. Check Spelling While Typing](#1-check-spelling-while-typing)
  - [2. Disable `print` keyboard binding shortcut](#2-disable-print-keyboard-binding-shortcut)
  - [3. Use `⌘ + Click` to jump to definition](#3-use---click-to-jump-to-definition)
  - [4. Text Editing Configurations](#4-text-editing-configurations)
  - [5. Play sound on succeeded build](#5-play-sound-on-succeeded-build)
- [Shortcuts](#shortcuts)
  - [macOS](#macos)
    - [Typing](#typing)
    - [Finder](#finder)
  - [Chrome](#chrome)
  - [Notion](#notion)
  - [Xcode](#xcode)
    - [Xcode combos](#xcode-combos)
- [Time Savers](#time-savers)
  - [Xcode Templates](#xcode-templates)
  - [Console Aliases](#console-aliases)
    - [Remove derived data folder](#remove-derived-data-folder)
    - [Change directory to your project folder](#change-directory-to-your-project-folder)
    - [Automatic Formatter](#automatic-formatter)
    - [Find typos](#find-typos)
- [Conclusion](#conclusion)

# Xcode Configurations

## 1. Check Spelling While Typing
I love this one, it makes finding/preventing/fixing typos so much easier.

To enable it, go to: `Edit -> Format -> Spelling and Grammar -> Check Spelling While Typing`

![spelling]({{static.static_files}}/resources/xcode-setup/spelling.png)

Then Xcode will underline with a red line the words with typos.

## 2. Disable `print` keyboard binding shortcut

The default keyboard shortcut for `printing` the code (IN PAPER!!) is `⌘ + P`, which is really close to our beloved `⌘ + ⇧ + O`, and sometimes we hit it by mistake.

A quick solution for that is to change or remove the binding of the `print` action.

Double click on the key column and replace or remove the binding:

![print]({{static.static_files}}/resources/xcode-setup/print-shortcut.png)

## 3. Use `⌘ + Click` to jump to definition

![jump]({{static.static_files}}/resources/xcode-setup/jump-to-def.png)

## 4. Text Editing Configurations

![t1]({{static.static_files}}/resources/xcode-setup/t1.png)
![t2]({{static.static_files}}/resources/xcode-setup/t2.png)
![t3]({{static.static_files}}/resources/xcode-setup/t3.png)

## 5. Play sound on succeeded build

One quick way to know that a build was successful is to make Xcode reproduce a sound:

![success]({{static.static_files}}/resources/xcode-setup/success.png)

# Shortcuts

## macOS
* Custom: `⌘ + ⇧ + S` → Select area + screenshot + copy it to clipboard (Check how to add it in [this article](/2023-03-18-configuring-a-new-mac/))
* `⌘ + ⌃ + Space` → Open Emoji Keyboard
* `^ + →` → Move one space to the right
* `^ + ←` → Move one space to the left 
* `^ + ↑` → Open Mission Control
* `⌘ + Space` → Open Spotlight Search
* `⌘ + delete` → Send item to trash
* `⌘ + ⇧ + delete` → Empty trash
* `⌘ + ⌥ + W` → Close all windows
* With `FlyCut` installed: `⌘ + ⇧ + V` (Access Clipboard history)

### Typing
* `⌥ + delete` → Delete entire word
* `⌘ + delete` → Delete entire line

### Finder
* `⌘ + ⌥ + W` → Close all windows

## Chrome
* `⌘ + L` → Focus on the address bar
* `⌘ + T` → New tab
* `⌘ + ⇧ + T` → Reopen closed tab
* `⌘ + R` → Refresh
* `⌘ + ⇧ + R` → Force Refresh

## Notion
* `⌘ + K` → Global Search
* `⌘ + T` → New File
* `⌘ + R` → Refresh

## Xcode
* `⌃ + ⇧ + Click(s)` → Multi Cursor on selected clicks
* `^ + ⇧ + Drag click` → In-line Multi Cursor

* `⌘ + 0` → Hide/Show the Navigator (Left panel)
* `⌘ + ,` → Open Settings
* `⌘ + ;` → Check next typo in the current file
* `⌘ + L` → Go to line Number
* `⌘ + N` → New File

* `⌘ + ⇧ + J` → Display and select current file in the folder hierarchy
* `⌘ + ⇧ + O` → Open file/method/struct quickly

* `⌘ + ^ + ←` → Back to previous file
* `⌘ + ^ + →` → Forward to next file
* `⌘ + ^ + L` → Show/Hide all issues
* `⌘ + ^ + T` → New Editor to the right

* `⌘ + ⌥ + 0` → Hide/Show the Inspectors (Right panel)
* `⌘ + ⌥ + /` → Add docs template to the selected method/property
* `⌘ + ⌥ + ]` → Move line up
* `⌘ + ⌥ + [` → Move line down
* `⌘ + ⌥ + W` → Close all tabs but the current one

### Xcode combos
* Rename a file: 
1. `Highlight the new name`
2. `⌘ + C` → Copy
3. `⌘ + ⇧ + J` → Display and select current file in the folder hierarchy
4. `Enter` → Edit the file name
5. `⌘ + V` → Paste
6. `Enter` → Save the new name

* Indent file:
1. `⌘ + A` → Select All
2. `^ + I` → Indent file

* Add a new Editor (and space):
1. `⌘ + 0` → Hide/Show the Navigator (Left panel)
2. `⌘ + ⌥ + 0` → Hide/Show the Inspectors (Right panel)
3. `⌘ + ^ + T` → New Editor to the right

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

### Find typos

Follow the steps in the [SwiftTypoDetector article](/2023-08-30-swift-typo-detector/).

Then just run `typos` in the terminal.

---

<br>

# Conclusion

In conclusion, these Xcode configurations and shortcuts are just a few examples of how customizing your development environment can help you work more efficiently and effectively. Whether you're a seasoned iOS or macOS developer or just starting out, taking the time to optimize your IDE can make a big difference in your productivity and satisfaction with the development process. So give these configurations and shortcuts a try, and don't be afraid to experiment with your own customizations to find what works best for you.

<!-- Do not remove - SEO meta tags -->
{% seo %}