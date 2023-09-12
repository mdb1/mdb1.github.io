---
layout: post
title: "StateObject vs ObservedObject"
subtitle: "The differences explained and some mistakes to avoid"
date: 2023-09-12 07:00:00 -0300
tags: [iOS, testing]
thumbnail-img: "/resources/state-vs-observed/thumbnail.jpg"
readtime: true
---

In this article, we'll dissect the differences between @StateObject and @ObservedObject, and when to use each. Let's dive right in!

## @StateObject
* Ownership: Use `@StateObject` when the view owns the object. This is typically the root view or the view where the object is initially created.
* Lifecycle: `@StateObject` ensures that the object will be de-initialized only when the view that owns it is removed from the hierarchy.
* Singleton-like Behavior: If the object should persist for the lifetime of the owning view, `@StateObject` is the way to go.
* Initialization: Ideal for objects that are expensive to create or must maintain their state throughout the lifecycle of the owning view.

**Usage:**
- Used to annotate `ObservableObjects` owned by the view and tied to the view’s lifecycle.
- Use it when you need a source of truth that is only needed for a single view. Example: a view model executing requests that are only related to that view.
- Use it when creating an instance of your `ObservableObject`.

### Examples:

**No dependencies:**

```swift
struct ContentView: View {
    @StateObject private var viewModel = ContentViewModel() // ✅
}
```

**With dependencies:**

If we are using the [Dependencies approach](/2023-02-03-enhancing-testability-without-protocols/):

This one is useful when we want to mock the dependencies in the Previews.

The downside of this approach, is that if the view needs to be public, we would also need to make the dependencies of the view model public.

```swift
struct ContentView: View {
    @StateObject private var viewModel: ViewModel

    init(dependencies: ViewModel.Dependencies = .default) {
        _viewModel = StateObject(
            wrappedValue: ViewModel(dependencies: dependencies)
        ) // ✅
    }
}
```

## ObservedObject

* Dependency: Use `@ObservedObject` when the view does not own the object but rather receives it as a dependency.
* Lifecycle: The object's lifecycle is not tied to the view. It can be de-initialized at any time.
* Reusability: Ideal for views that are reusable and can be instantiated multiple times with different observed objects.
* Pass-through: When you're passing an object down the view hierarchy, use `@ObservedObject`.

**Usage:**
- Used to annotate `ObservableObjects` that are not owned by the current view.
- Use it when yo have a child view that needs access to the `StateObject` in the parent. You can inject it as `ObservedObject`.

### Examples:

```swift
struct DetailView: View {
    @ObservedObject var viewModel: ContentViewModel ✅
}

// From the parent view:
DetailView(viewModel: viewModel.someChildViewModel)

// And then we can call methods on someViewModel from the parent view or view model.
```

## What not to do ❌

Creating the ViewModel inside the SwiftUI parent views:

```swift
// From parent:
var detailView: some View {
    let viewModel = ViewModel() // ❌❌❌
    return DetailView(viewModel: viewModel) 

    // The main problem here is that we don't know how many times the view will get redrawn.
    // So every time the view is redrawn, we create a new ViewModel instance, so we lose the previous state, and create a new reference.
}
```

*The ViewModel initializer:*

![github-hosted]({{static.static_files}}/resources/state-vs-observed/meme.jpg)

Instead do:
```swift
var detailView: some View {
    return DetailView() // ✅
    // Using @StateObject inside the DetailView, we let SwiftUI handle the lifecycle of the VM.
}
```

## Signs of Incorrect Usage

* State Loss: If you find that your view's state is not being preserved when you navigate back and forth in your app, you might be using `@ObservedObject` where `@StateObject` should be used. `If we are displaying a sheet view, and we start to drag it down and we either lose the state or see a blank screen -> ❌ We probably need a @StateObject instead of an @ObservedObject`. This issue happens mainly when the parent UI is reacting to different @Published properties, ending up in a lot of unneeded redraws of the view + creation of the child view models.

* Multiple Initializations: If you notice that your object is being initialized multiple times, leading to performance issues or incorrect behavior, double-check your usage of `@StateObject` and `@ObservedObject`. `It's easy to check this by placing a print inside the ViewModel's initializer`.

* Inconsistent Behavior: If you're experiencing erratic behavior in your app, like random UI updates or data loss, it could be a sign that the object's ownership and lifecycle are not managed correctly.

## Conclusion

I think the main conclusion is that we should always try to let SwiftUI handle it's own state whenever possible. 

If we do want some custom behavior, like retaining the state, or call view model methods from outside the view itself, we can opt to use `@ObservableObject`, but we should really think about the side-effects, and consider every possible scenario.

---

## Related Articles

- [Enhancing testability without protocols](/2023-02-03-enhancing-testability-without-protocols/)
- [ViewState](/2023-01-08-new-app-view-state/)
- [ViewStateController](/2023-03-04-view-state-controller/)

<!-- Do not remove - SEO meta tags -->
{% seo %}