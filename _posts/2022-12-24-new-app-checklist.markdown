---
layout: post
title:  "New App Checklist"
date:   2022-12-24 07:00:00 -0300
categories: swift
---

The idea of this post is to provide a list of things I like to have in-place when starting a new app from scratch.

- [BuildTools](https://mdb1.github.io/swift/2023/01/01/new-app-build-tools.html)
  - SwiftFormat
  - SwiftLint
  - Fastlane
- CI
  - [Run unit tests in PRs](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane.md)
  - [Deploy builds](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane+Distribution.md)
- Networking
- Unit test helpers
  - assertMemoryDeallocation
  - assertState
  - asyncAssert
  - ServiceMock/CallsCounter
- [Constants](https://mdb1.github.io/swift/2022/12/24/new-app-constants.html)
  - Colors
  - Spacing
- Extensions
  - ViewState
  - Images
  - DateFormatters
  - NumberFormatters
  - Default JsonEncoder/Decoder
  - Handler/Action typealias for functions
- Logger
- NotificationCenter protocols
- [Components](https://mdb1.github.io/swift/2023/01/04/new-app-components.html)
  - LoadingButton
  - Title / Description Text with applied fonts
  - Retryable Error View
- [ViewModifiers](https://mdb1.github.io/swift/2023/01/03/new-app-view-modifiers.html)
  - RoundedOverlayBorder
  - Scrollable
- [Localization](https://mdb1.github.io/swift/2022/12/27/new-app-localization.html)
- [Contributing Guidelines](https://mdb1.github.io/swift/2023/01/02/new-app-contributing-guidelines.html)
  - Coding principles
  - Git strategy
  - Testing strategy
  - Coding conventions
  - Code of conduct
- PR Template
- Scripts
  - [Sort Project Files](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/SortProject.md)

---

This is an on going list, and I'll be referencing other posts from each item as I write more about them.