---
layout: post
title: "NavigationRouter"
subtitle: "A simple stack-based navigation system for SwiftUI apps"
date: 2025-04-24 07:00:00 -0300
tags: [ios]
thumbnail-img: "/resources/ep84-navigation-router/thumbnail.png"
readtime: true
---

We will discuss about a simple stack-based navigation system for SwiftUI applications. 

`iOS 17.0+`

#### Table of Contents
- [The Code](#the-code)
- [Usage](#usage)
- [Find a place to store the routers](#find-a-place-to-store-the-routers)
- [😡 But you are coupling the views and the navigation!](#-but-you-are-coupling-the-views-and-the-navigation)
- [Adding some unit tests](#adding-some-unit-tests)
- [Related Articles](#related-articles)
- [Related Reading](#related-reading)

# The Code

Let's start out with the code:

<script src="https://gist.github.com/mdb1/9eb7c3ee9bcad89fb0a83159b9c17b44.js"></script>

- We have a `generic` NavigationRouter
- The `class` is marked with the `@Observable` notation
- SwiftUI views can react to changes in the router's properties.
- The router containts a `navigationPath` property, which will be an array of `Hashable` objects.
- We have some UIKit-ish named methods for `push`, `pop`, `pop(to:)`, and `popToRoot` which will manipulate the `path` array.
- The `push` method adds a new item to the end of the `navigationPath` array.
- The `pop` method removes the last item from the `navigationPath` array.
- The `pop(to:)` method removes all items from the `navigationPath` array, until it finds the given item.
- The `popToRoot` method removes all items from the `navigationPath` array.

# Usage

Basic usage of this router, will consist on:

`1.` Create an enum with all possible destinations:

```swift
enum Route: Hashable {
    case detail(id: Int)
    case profile
}
```

`2.` We need to decide where the router will be stored, for example, if it's a simple flow, it could live on the first screen. In other cases, we could store it on the app level, or in the first screen of each Tab. It will depend on the requirements:

```swift
struct SomeScreen: View {
  @State private var router = NavigationRouter<Route>() // Define the Router
}
```

`3.` Then we add a NavigationStack into the body:

```swift
var body: some View {
  NavigationStack(path: $router.navigationPath) { // Here we use the navigationPath from the Router
    // Will Fill this on point number 4
  }
}
```

`4.` Then, we add the possible navigationDestinations for the flow:

```swift
var body: some View {
  NavigationStack(path: $router.navigationPath) {
    BaseScreen()
      .navigationDestination(for: Route.self) { destination in
        switch destination { // We define a destination for each case
        case .detail(id: let id):
            DetailScreen(id: id)
        case .profile:
            ProfileScreen()
        }
      }
  }
}
```

`5.` We need to provide a way to share the router with the childs, we can do this using the `environment` modifier:

```swift
var body: some View {
  NavigationStack(path: $router.navigationPath) {
    // content
  }
  .environment(router) // Share the router with the children screens/views.
}
```

`6.` Finally, in the child screens, we can access the router via the `@Environment` modifier:

```swift
struct ProfileScreen: View {
  @Environment(NavigationRouter<Route>.self) private var router

  var body: some View {
    Button("Push Detail") {
      router.push(.detail(id: 1))
    }
  }
}
```

# Find a place to store the routers

It's important to notice, that an app could have multiple routers, one for each tab, or one for each flow.

To this point, each app will have its own way of storing the routers. That way will depend basically on how the navigation happens on the app.

I'd say that the best way is to store the router on the first screen of the flow, or on the first screen of the tab. However, if, for some reason, some screen in the third tab can decide the navigation of another tab, we would need to move the routers up the view hierarchy.

My recommendation would be to store them as low in the view hierarchy as possible for each one, and move them up only if needed by the business decisions.

# 😡 But you are coupling the views and the navigation!

One of the potential drawbacks of using this system is that the views are now tightly coupled with the navigation. 

In any case, I believe this system is so simple that it shouldn't be a big deal.

If you want to have logic over which view to present next, you can move that logic into a view model, and add unit tests over it.

If your flow is too complex, you could add automated testing, or UI testing, instead of unit testing.

The case in point here, is that this is a simple navigation system, and you probably won't need anything more complex than this, so starting to geek out on abstractions to make a solution that works well with SwiftUI could be an overkill.

As most times, the rule of starting simple and only adding complexity as needed applies really well to this case.

# Adding some unit tests

Finally, we could add some basic unit tests to make sure the navigationPath is being modified correctly:

<script src="https://gist.github.com/mdb1/64004c408e52e931b13cb846fa964f93.js"></script>

---

# Related Articles

- [Simple Modularization Setup](/2025-02-27-simple-modularization-setup/)
- [New App Checklist](/2022-12-24-new-app-checklist/)
- [Enhancing Testability without Protocols](/2023-02-03-enhancing-testability-without-protocols/)
- [ViewStateController](/2023-03-04-view-state-controller/)

# Related Reading

- [NavigationStack](https://developer.apple.com/documentation/swiftui/navigationstack)
- [Migrating from the Observable Object protocol to the Observable macro](https://developer.apple.com/documentation/swiftui/migrating-from-the-observable-object-protocol-to-the-observable-macro)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
