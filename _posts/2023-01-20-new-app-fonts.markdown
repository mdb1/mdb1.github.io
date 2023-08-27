---
layout: post
title:  "New App - Fonts"
date:   2023-01-20 07:00:00 -0300
comments: true
tags: [iOS]
---

When starting a new app, you need to decide which fonts/typographies the app is going to use.

You can choose between using the default installed fonts on iOS, or use custom fonts.

## Setting up Custom Fonts:

If you want to use a custom set of fonts, you only need to:
1. Add the custom fonts (.ttf files) to the `.xcassets` folder.
2. Add the following code

<script src="https://gist.github.com/mdb1/07048ee9eaf93b33c311ea6bfe5ecbd1.js"></script>

<br>

## Creating Typography helper properties

Either way (custom fonts, or default fonts), you will probably want to add some convenience ways to use your most used typographies across the app.

Ideally, you should match the typographies names with the ones defined by your design team.

Here is some code that can help you with that:

<script src="https://gist.github.com/mdb1/193d89b5be523007078f9889a2b439fd.js"></script>

### Usage

```swift
Text("Charmander")
    .font(.PublicSans.h1)
```

<br>

Lastly, you could create a SwiftUI preview to display them:

### Preview
![Preview]({{static.static_files}}/resources/new-app-fonts/preview.png)

### A11y1
![A11y1]({{static.static_files}}/resources/new-app-fonts/a11y1.png)

### A11y2
![A11y2]({{static.static_files}}/resources/new-app-fonts/a11y2.png)

### A11y3
![A11y3]({{static.static_files}}/resources/new-app-fonts/a11y3.png)

<!-- Do not remove - SEO meta tags -->
{% seo %}