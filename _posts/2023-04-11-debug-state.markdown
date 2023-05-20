---
layout: post
title:  "ViewStateController: Debug State"
date:   2023-04-11 07:00:00 -0300
tags: swiftui
---

In our previous posts, we discussed the [ViewStateController](https://mdb1.github.io/2023-03-04-view-state-controller/) package, which allows us to add consistent loading and error states to our SwiftUI views. Today we'll explore a new feature of the [framework](https://github.com/mdb1/ViewStateController), the `DebugState` modifier, which provides an easy way to debug the state of a view.

## DebugState Modifier

The DebugState modifier adds a debug interface to the view, allowing you to quickly test different states of a ViewStateController instance. Here's the code to add the modifier:

```swift
/// Applies the debug state modifier to the view.
/// By tapping 3 times on the view, a modal will be displayed with options to debug
/// the state of the controller.
extension View {
    public func debugState<Info>(
        controller: Binding<ViewStateController<Info>>,
        mockInfo: Info
    ) -> some View {
        #if DEBUG
        // Only apply the debug state modifier in debug builds
        self.modifier(DebugStateModifier(controller: controller, mockInfo: mockInfo))
        #endif
    }
}
```

To apply the modifier, simply call debugState on your view and pass in a binding to your ViewStateController instance and some mocked data:

```swift
yourView
    .debugState(
        controller: $controller, 
        mockInfo: .init(
            name: "Mock",
            age: 900,
            emoji: "😌"
        )
    )
```

Once you've applied the modifier, you can debug the state of your view by tapping the view three times. This will present a sheet with four buttons that allow you to change the state of the controller:

The `Loading` button sets the controller to the loading state.
The `Loaded` button sets the controller to the loaded state with the provided mocked data.
The `Error` button sets the controller to the error state with a static error.
The `Reset` button resets the controller to its initial state.

This could be very useful for developers and QA members to quickly check all the possible states of the components using mocked data.

## Demo

<video width="370" height="768" controls>
    <source src="/resources/view-state-debug/debug-state.mp4" type="video/mp4">
</video>

You can test the code yourself by downloading the [ExampleApp](https://github.com/mdb1/ViewStateControllerExampleApp).

## Conclusion

In conclusion, the `DebugState` modifier is a simple yet powerful feature of the ViewStateController package that can greatly speed up your development process. By providing an easy way to test different states of your views, it allows you to catch bugs and inconsistencies early on, saving you valuable time and effort.

With `DebugState`, you can quickly test how your view behaves in different states, and ensure that it works as expected. Whether you're a developer or a QA tester, this feature is a must-have tool in your toolkit.

If you're interested in learning more about ViewStateController, be sure to check out the [ViewStateController post](https://mdb1.github.io/2023-03-04-view-state-controller/). Thanks for reading!