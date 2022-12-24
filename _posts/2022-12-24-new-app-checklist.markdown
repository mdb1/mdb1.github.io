---
layout: post
title:  "New App Checklist"
date:   2022-12-24 07:00:00 -0300
categories: swift
---

The idea of this post is to provide a list of things I like to have in-place when starting a new app from scratch.

- BuildTools
  - SwiftFormat
  - SwiftLint
  - Fastlane
- CI
  - Run unit tests in PRs
  - Deploy builds
- Networking
- Unit test helpers
  - assertMemoryDeallocation
  - assertState
  - asyncAssert
  - ServiceMock/CallsCounter
- Constants
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
- Components
  - Buttons with loading states
  - Title / Description Text with applied fonts
  - Retryable Error View
- ViewModifiers
  - RoundedOverlayBorder
- Localization
- Coding Guidelines (Contributing template)
  - Git strategy
  - View.ViewModel namespace
  - Testing strategy
- PR Template

---

This is an on going list, and I'll be referencing other posts from each item as I write more about them.