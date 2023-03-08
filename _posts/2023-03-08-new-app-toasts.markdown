---
layout: post
title:  "New App - Toasts"
date:   2023-03-08 07:00:00 -0300
categories: swift
---

When starting a new app, I like to have a toast displaying mechanism in-place.

In this post, I will share how easy it is to display toasts in SwiftUI, and I will link to some code to have configurable toasts/snackbars ready to use in your SwiftUI apps.

```swift
struct SimpleToastModifier: ViewModifier {
    @Binding var isShowing: Bool

    func body(content: Content) -> some View {
        ZStack(alignment: .top) {
            content

            Text("I'm a toast")
                .foregroundColor(.white)
                .padding()
                .background(Color.gray)
                .cornerRadius(8)
                .onTapGesture {
                    isShowing = false
                }
        }
    }
}
```

This simple modifier is enough to display a Toast in SwiftUI. However, there are no configuration options, and everything is hardcoded.

You can take a look at the code [here](https://github.com/mdb1/ViewStateController/blob/main/Sources/ViewStateController/ViewModifiers/ToastModifier.swift), where I have a ToastModifier that is very customizable.

With that code, you can specify different parameters:
* Type (Toast, SnackBar, or a custom view)
  * Both Toast and SnackBar have their own customization options (colors, texts, paddings, corner radius, etc)
* Transition Options (including duration)
* Positioning Options
* An optional action for the tapGesture

## Demo

<video width="397" height="810" controls>
    <source src="/resources/new-app-toasts/toast.mp4" type="video/mp4">
</video>

The app used for this video can be downloaded from [this repository](https://github.com/mdb1/ViewStateControllerExampleApp).

### Custom Snack Bar
Let's say we want a snack bar to be displayed at the bottom of the screen, we can achieve that with these lines of code:

```swift
@State private var displayToast: Bool = false

...

YourView
    .toast(
        isShowing: $displayToast,
        type: .snackBar(options: .init(message: .init(text: "Hey There"))),
        transitionOptions: .init(transition: .move(edge: .bottom).combined(with: .opacity)),
        positionOptions: .init(position: .bottom)
    )
```

<br>

<video width="396" height="250" controls>
    <source src="/resources/new-app-toasts/snackbar.mp4" type="video/mp4">
</video>

---

Are you using any type of toast/snack bar in your applications?
