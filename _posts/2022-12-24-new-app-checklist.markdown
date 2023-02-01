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
- CI / CD
  - [Run unit tests in PRs](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane.md)
  - [Deploy builds](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane+Distribution.md)
  - Fastlane
- Networking
- [Constants](https://mdb1.github.io/swift/2022/12/24/new-app-constants.html)
  - Colors
  - Spacing
- [Fonts](https://mdb1.github.io/swift/2023/01/20/new-app-fonts.html)
- Extensions / Helpers
  - [ViewState](https://mdb1.github.io/swift/2023/01/08/new-app-view-state.html)
  - Images
  - [DateFormatters](https://mdb1.github.io/swift/2023/01/10/new-app-date-formatters.html)
  - NumberFormatters
  - [Default JsonEncoder/Decoder](https://mdb1.github.io/swift/2023/01/10/new-app-json-encoder-decoder.html)
  - NotificationCenter protocols
  - Handler/Action typealias for functions
- Logger
- Unit test helpers
  - assertMemoryDeallocation
  - assertState
  - asyncAssert
  - ServiceMock/CallsCounter
- [Components](https://mdb1.github.io/swift/2023/01/04/new-app-components.html)
  - LoadingButton
  - LinkButton
  - TextField
  - Custom Progress View
  - Title / Description Text with applied fonts
  - Retryable Error View
- [ViewModifiers](https://mdb1.github.io/swift/2023/01/03/new-app-view-modifiers.html)
  - RoundedOverlayBorder
  - Scrollable
- [Localization](https://mdb1.github.io/swift/2022/12/27/new-app-localization.html)
- Developer Experience
  - [Xcode Templates](https://mdb1.github.io/swift/2023/01/27/new-app-xcode-templates.html)
  - [Contributing Guidelines](https://mdb1.github.io/swift/2023/01/02/new-app-contributing-guidelines.html)
    - Coding principles
    - Git strategy
    - Testing strategy
    - Coding conventions
    - Code of conduct
  - [PR Template](https://mdb1.github.io/swift/2023/01/09/new-app-pr-template.html)
- Scripts
  - [Sort Project Files](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/SortProject.md)
  - [Fix Conflicts in the .pbxproj file](https://github.com/Lightricks/Kintsugi)

---

This is an on going list, and I'll be referencing other posts from each item as I write more about them.