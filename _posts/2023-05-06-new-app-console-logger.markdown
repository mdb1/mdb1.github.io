---
layout: post
title:  "New App - Console Logger"
date:   2023-05-06 07:00:00 -0300
tags: [swift, swiftui, coding]
---

# Introduction:
When starting a new app, I usually like to set up a console logger right from the scratch.

I like to use a simple enum with different verbosity levels:

## Logger:
<script src="https://gist.github.com/mdb1/4f5b7f6e127985a930d858b9e799c728.js"></script>

## SwiftUI view to change the verbosity

I also like to have a Picker to display inside a DeveloperMenu to change the verbosity:

<script src="https://gist.github.com/mdb1/6dc6f55a87dd5a2417d8a3fe7aaec134.js"></script>

It looks like this:

![picker](/resources/console-logger/picker.png)

# Usage

With this code in place, you can call the Logger directly from any place in your app:

`Logger.log(.err, "Something went wrong")`

![log-error](/resources/console-logger/log-error.png)

---

## Network Logger

I've also written a [post](https://mdb1.github.io/2023-05-27-network-logger/) about a NetworkLogger, for logging information about networking requests/responses/object decoding/etc.

Do you use some sort of console logger in your apps?

