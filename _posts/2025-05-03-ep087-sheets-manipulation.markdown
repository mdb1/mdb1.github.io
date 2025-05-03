---
layout: post
title: "Sheets Manipulation"
subtitle: "Enum-Based vs Boolean-Based approaches"
date: 2025-05-03 07:00:00 -0300
tags: [ios]
thumbnail-img: "/resources/ep087-sheets-manipulation/thumbnail.png"
readtime: true
---

We will discuss about which approach is better for each scenario. Enum-based vs Boolean-based.

We will add some documentation on usage on top of the SwiftUI built-in framework for sheets.

`iOS 17.0+`

#### Table of Contents
- [The Code](#the-code)
- [Usage](#usage)
  - [Boolean-based](#boolean-based)
  - [Enum-based](#enum-based)
- [@State vs @Observable](#state-vs-observable)
- [Adding Navigation to the presented sheets](#adding-navigation-to-the-presented-sheets)
- [Related Articles](#related-articles)
- [Related Reading](#related-reading)

# The Code

Let's start out with the code:

<script src="https://gist.github.com/mdb1/f41a7b677af6e8b00e47cfa35136bd22.js"></script>

- In the snippet, we are just adding a ViewModifier + a View extension to add a close button modifier to a Navigation Bar. Nothing Fancy.
- What's interesting about the snippet is the documentation we added on top of the code.
- Explaining when to go for `sheet(isPresented: Boolean)` vs `sheet(item: Enum)`.
- It will serve as the base for sheet manipulation for the whole app.

# Usage

## Boolean-based

If your screen can only present one type of sheet, then the easiest way is to use `sheet(isPresented:)`. We only need to manage one state property, so there is no need for the enum-based approach.

```swift
struct SomeScreen: View {
  @State private var isPresentingSheet: Bool = false

  var body: some View {
    Button("Present Sheet") {
      isPresentingSheet = true
    }
    .sheet(isPresented: $isPresentingSheet) {
      Text("Presented sheet")
    }
  }
}
```

## Enum-based

If your screen can present multiple types of sheets, then the best way is to use `sheet(item:)`. We need to manage an enum property, so there is no need for the enum-based approach.

```swift
struct SomeScreen: View {
  enum Sheet: String, Identifiable {
    case firstPresentedScreen, secondScreen, thirdScreen
    var id: String { rawValue }
  }
  @State private var presentedSheet: Sheet?

  var body: some View {
    VStack {
      Button("Present Sheet") {
        presentedSheet = .firstPresentedScreen
      }
      Button("Present Second Sheet") {
        presentedSheet = .secondScreen
      }
      Button("Present Third Sheet") {
        presentedSheet = .thirdScreen
      }
    }
    .sheet(item: $presentedSheet) { sheet in
      switch sheet {
      case .firstPresentedScreen:
        Text("First presented screen")
      case .secondScreen:
        Text("Second screen")
      case .thirdScreen:
        Text("Third screen")
      }
    }
  }
}
```

Something interesting about the `sheet(item:)` approach is that the system will take care of dismissing the current sheet, if by some reason, another sheet is presented using the same property.

Example:

- SomeScreen's presentedSheet is set to `.firstPresentedScreen`
- The FirstPresentedScreen is presented as a sheet
- SomeScreen's presentedSheet is set to `.secondScreen`
- The FirstPresentedScreen is dismissed
- The SecondScreen is presented as a sheet

# @State vs @Observable

In most cases, managing the state of the sheets directly on the SwiftUI views as a `@State` property should be enough. However, if there is some business logic involved, it might be a good idea to move the state to an `@Observable` object. The benefit of the `@Observable` object is that it can be shared with other views, and it can be used to trigger some actions when the state changes + we could add some unit tests over the logic.

# Adding Navigation to the presented sheets

It's really straight forward to add an stack-based navigation system to the presented sheets. We can just follow the same approach explained in the [NavigationRouter article](/2025-04-24-ep084-navigation-router/) for the Router of the Sheet-presented flow.

---

# Related Articles

- [NavigationRouter](/2025-04-24-ep084-navigation-router/)
- [Simple Modularization Setup](/2025-02-27-simple-modularization-setup/)
- [New App Checklist](/2022-12-24-new-app-checklist/)
- [ViewStateController](/2023-03-04-view-state-controller/)
- [Enhancing Testability without Protocols](/2023-02-03-enhancing-testability-without-protocols/)

# Related Reading

- [sheet(isPresented:ondismiss:content:)](https://developer.apple.com/documentation/swiftui/view/sheet(ispresented:ondismiss:content:))
- [sheet(item:ondismiss:content:)](https://developer.apple.com/documentation/swiftui/view/sheet(item:ondismiss:content:))

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
