---
layout: post
title:  "New App Checklist"
date:   2022-12-24 07:00:00 -0300
comments: true
thumbnail-img: "/resources/new-app-checklist/thumbnail.jpeg"
tags: [iOS, testing]
---

The idea of this post is to provide a list of things I like to have in-place when starting a new app from scratch.

- [BuildTools](/2023-01-01-new-app-build-tools/)
  - [SwiftFormat](/2023-07-22-new-app-swiftformat-config/)
  - [SwiftLint](/2023-07-23-enforce-minimum-swiftlint-version/)
  - [GHA: Cloning Private Dependencies](/2024-03-12-unit-tests-gha-with-private-dependencies)
- CI / CD
  - [Run unit tests in PRs](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane.md)
  - [Deploy builds](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane+Distribution.md)
- Architecture
  - [Centralized Dependencies](/2024-02-29-centralized-dependencies/)
  - [Enhancing Testability with Protocols](/2023-02-13-enhancing-testability-with-protocols/)
  - [Enhancing Testability without Protocols](/2023-02-03-enhancing-testability-without-protocols/)
  - [UI vs API Models](/2023-08-25-ui-vs-api-models-different-layers/)
  - [Combine based Repository](/2023-08-28-combine-based-repository/)
  - [UserPreferences Storage](/2023-04-18-user-preferences/)
  - [Networking](https://github.com/mdb1/CoreNetworking)
    - [NetworkLogger](/2023-05-27-network-logger/)
    - [Force Update Mechanism](/2023-09-29-force-update-mechanism/)
  - [State Object vs Observed Object](/2023-09-12-state-object-vs-observed-object/)
- Extensions / Helpers
  - [ViewState](/2023-01-08-new-app-view-state/)
  - [ViewStateController](/2023-03-04-view-state-controller/)
  - [Toasts](/2023-03-08-new-app-toasts/)
  - [DateFormatters](/2023-01-10-new-app-date-formatters/)
  - [Default JsonEncoder/Decoder](/2023-01-10-new-app-json-encoder-decoder/)
  - [NumberFormatters](/2023-06-12-new-app-number-formatters/)
  - [NotificationCenter protocols](/2023-08-12-new-app-notification-center-protocols/)
  - [Constants](/2022-12-24-new-app-constants/)
- [OSLog](/2024-03-19-new-app-os-log/)
- Developer Experience
  - [Improve Build Times](/2023-08-18-improve-build-times-in-spm-packages-and-in-your-apps/)
  - [Xcode Configurations](/2023-03-14-my-xcode-setup-and-shortcuts/)
  - [Xcode Templates](/2023-01-27-new-app-xcode-templates/)
  - [Periphery: Find unused code](/2023-08-21-use-periphery-to-find-unused-code/)
  - [Contributing Guidelines](/2023-01-02-new-app-contributing-guidelines/)
  - [Document Best Practices](/2023-08-04-new-app-document-best-practices/)
  - [The Code Review Process](/2022-03-10-the-code-review-process/)
  - [PR Template](/2023-01-09-new-app-pr-template/)
  - [The Definition of Done](/2023-05-13-the-definition-of-done/)
- Scripts
  - [Typo Detector](/2023-08-30-swift-typo-detector/)
  - [Sort Project Files](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/SortProject.md)
  - [Fix Conflicts in the .pbxproj file](https://github.com/Lightricks/Kintsugi)
- [Components](/2023-01-04-new-app-components/)
  - LoadingButton
  - LinkButton
  - TextField
  - Custom Progress View
  - Title / Description Text with applied fonts
  - Retryable Error View
- [Fonts](/2023-01-20-new-app-fonts/)
- [ViewModifiers](/2023-01-03-new-app-view-modifiers/)
  - RoundedOverlayBorder
  - Scrollable
  - DelayAppearance
  - [TapShrink / LongPressShrink](/2023-10-22-shrink-modifiers/)
  - [Image Picker](/2024-01-30-image-picker-modifier/)
- [Localization](/2022-12-27-new-app-localization/)
- Accessibility
  - [AdaptableStack](/2023-10-07-adaptable-stack/)
- [Unit test helpers](/2023-02-02-new-app-testing-helpers/)
  - assertMemoryDeallocation
  - assertState
  - asyncAssert
  - [NotificationCenter Testing](/2023-09-18-notification-center-testing/)

---

This is an on going list, and I'll be referencing other posts from each item as I write more about them.

<!-- Do not remove - SEO meta tags -->
{% seo %}