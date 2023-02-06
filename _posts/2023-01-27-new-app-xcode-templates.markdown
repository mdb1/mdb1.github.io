---
layout: post
title:  "New App - Xcode Templates"
date:   2023-01-27 07:00:00 -0300
tags: [swift, swiftui]
---

When starting a new app, after deciding which based design pattern you are going to use for the views, you can create some Xcode templates to help standardize how the files are written and speed up development.

For example, let's say we decide to use MVVM for our SwiftUI views. We also decide we will have 3 files for each view:
* MyView.swift
* MyView+Mocks.swift
* MyView+ViewModel.swift

## Create the Template

We can create a basic Xcode template that creates those 3 files with some basic code inside by following these steps:

1. Navigate to `~/Library/Developer/Xcode/Templates`. (Create the Templates folder if necessary).
2. Create a new `File Templates` folder inside.
3. Create a new folder called `SwiftUIView-ViewModel.xctemplate` inside `File Templates`.
4. Create these 4 files inside the new folder (code below):
* ___FILEBASENAME___.swift
* ___FILEBASENAME___+Mocks.swift
* ___FILEBASENAME___+ViewModel.swift
* TemplateInfo.plist

After this, reset Xcode and you will see this option when adding a new file:
![New File](/resources/new-app-xcode-templates/xcode-template-1.png)

## The code for the files

You can customize these files to suit your needs:

### View
<script src="https://gist.github.com/mdb1/6d0011a8933c9d16dc0477cdd17d8802.js"></script>

### Mocks

<script src="https://gist.github.com/mdb1/79dd89eee4bb56369816e3d180a4c6f5.js"></script>

### ViewModel

<script src="https://gist.github.com/mdb1/12886166dddb7b3b97fc8839fa7dbad4.js"></script>

### TemplateInfo.plist

<script src="https://gist.github.com/mdb1/8b8dde9b4ccf09d237eddd661e28eff9.js"></script>