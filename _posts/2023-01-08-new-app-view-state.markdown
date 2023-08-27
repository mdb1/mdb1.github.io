---
layout: post
title:  "New App - View State"
date:   2023-01-08 07:00:00 -0300
comments: true
tags: [iOS]
---

When starting a new SwiftUI app, I like to have a reusable approach for managing the view state using generics.

In order to do that, we can use the following `ViewState` enum with the `ViewStateWrapper` struct:

<script src="https://gist.github.com/mdb1/e3a65b84ccc3340b27b524fd05b6eced.js"></script>

---

A demonstration on how to use them can be found [here](https://gist.github.com/mdb1/dd71a798e7a9a5e91c4fc9885f990d93).