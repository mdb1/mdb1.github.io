---
layout: post
title: "Localization - Pluralizations"
subtitle: "The easiest way to support plurals"
date: 2025-04-29 07:00:00 -0300
tags: [ios]
thumbnail-img: "/resources/ep086-localization-handling-plurals/thumbnail.webp"
readtime: true
---

The String Catalogs file have built-in support for pluralization.

[Official Apple Docs](https://developer.apple.com/documentation/xcode/localizing-and-varying-text-with-a-string-catalog)

#### Table of Contents
- [String Catalogs](#string-catalogs)
- [Handling Plurals](#handling-plurals)
  - [Usage](#usage)
- [Related Articles](#related-articles)
  - [Featured in](#featured-in)

# String Catalogs

Adding a String Catalog to your app is as simple as creating the file:

![string-catalog]({{static.static_files}}/resources/ep086-localization-handling-plurals/string-catalog.png)

For a detailed guide on how to add the `localizable` extension to `String`, read [this Localization article](/2022-12-27-new-app-localization/).

# Handling Plurals

Handling plurals has never been easier, the String Catalog has built-in support:

![vary-by-plural]({{static.static_files}}/resources/ep086-localization-handling-plurals/vary-by-plural.png)

![pluralization]({{static.static_files}}/resources/ep086-localization-handling-plurals/pluralization.png)

Forget about the `if/else` statements for good 🙌

## Usage

Using it is as straight forward as using the in-line components:

```swift
@State private var itemCount = 0
Text("\(itemCount) Books") // 0 Books, 1 Book, 2 Books
```

Or, if you are using the String extensions from the [previous localization article](/2022-12-27-new-app-localization/):

```swift
@State private var itemCount = 0
Text("books".localized(with: [itemCount])) // 0 Books, 1 Book, 2 Books
```

---

# Related Articles

- [New App - Localization](/2022-12-27-new-app-localization/)
- [AdaptableStack](/2023-10-07-adaptable-stack/)
- [Components](/2023-01-04-new-app-components/)
- [Improve Build Times](/2023-08-18-improve-build-times-in-spm-packages-and-in-your-apps/)
- [Xcode Templates](/2023-01-27-new-app-xcode-templates/)
- [String Extensions](/2025-03-03-useful-string-extensions/)
- [ViewStateController](/2023-03-04-view-state-controller/)
- [ViewModifiers](/2023-01-03-new-app-view-modifiers/)

## Featured in

- [iOS Coffee Break #43](https://www.ioscoffeebreak.com/issue/issue43)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
