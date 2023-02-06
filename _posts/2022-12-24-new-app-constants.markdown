---
layout: post
title:  "New App - Constants"
date:   2022-12-24 09:00:00 -0300
tags: [swift, swiftui]
---

When starting a new app, it's important to set the constants that will be shared across the app correcly:

## Colors

* Create a new asset catalog where you will place your colors. Ideally, use the exact same names as your designers, and provide light/dark mode variations.
* In the build settings of the project, set the Global Accent Color Name to the primary color of your app.

Then you can create a simple file for representing your colors:

<script src="https://gist.github.com/mdb1/2334c5f872223a514be8d32a9a1461fd.js"></script>

Using the namespaces, you can then be very clear in your code:

<script src="https://gist.github.com/mdb1/e7773496e4db4426d7701a9683e500cd.js"></script>

<br>
<hr>
<br>

## Spacing

The same concept applies for Spacing constants, we can create a simple extension of CGFloat:

<script src="https://gist.github.com/mdb1/d51bc6d7399468f959603542605a3544.js"></script>

<br>
<hr>
<br>

### Sources:
* [Set SwiftUI app theme with AccentColor](https://sarunw.com/posts/swiftui-accentcolor/)
* [Create Custom Color Palettes in SwiftUI](https://betterprogramming.pub/create-custom-color-palettes-in-swiftui-f6f0abe7c828)