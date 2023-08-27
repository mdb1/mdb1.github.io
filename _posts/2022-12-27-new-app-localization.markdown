---
layout: post
title:  "New App - Localization"
date:   2022-12-27 07:00:00 -0300
comments: true
tags: [swift, swiftui]
---

When starting a new app, it's important to have a mechanism in place for Localization.
In this case, we will keep it simple by having a local Localizable file, with one variation in English and one in Spanish.

The benefit of having this mechanism in place before starting coding the new app, is that we will be able to collect all the strings the app needs to display in one single place.

We can use that file in the future to decide if we want to keep having local translations, or if we want a more dynamic approach using a backend.

## Create the Localizable file

This is the easiest step, just create a new `Strings` file in Xcode and call it `Localizable`.

In the right panel, you can select more languages. Each language will have it's own `.strings` file.

Example Localizable file:

English:
```swift
"Welcome$1" = "Welcome %@";
"Nice to meet you" = "Nice to meet you";
```

Spanish:
```swift
"Welcome$1" = "Bienvenido %@";
"Nice to meet you" = "Encantado de conocerte";
```

## Add the String extension

To be able to localize our strings from the code, we can create this simple extension to String:

<script src="https://gist.github.com/mdb1/5aba7dd6fb5861717e610ee3b71a1606.js"></script>

## Usage

The last step is to actually use the localized strings.
Even though SwiftUI's Text automatically looks for the localized strings, I think it's more clear to always include the `.localized` suffix to the strings:

<script src="https://gist.github.com/mdb1/316701b0f20383de33cb27e948d54b12.js"></script>

## The result

| English | Spanish |
| - | - |
| ![English]({{static.static_files}}/resources/new-app-localization/english.png) | ![Spanish]({{static.static_files}}/resources/new-app-localization/spanish.png)  | 
