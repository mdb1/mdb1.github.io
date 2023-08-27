---
layout: post
title:  "Hot Reload in Swift!"
date:   2022-06-16 22:00:00 -0300
comments: true
tags: [iOS, tools]
---

{% seo %}

We finally have Hot Reload for Swift applications, thanks to the [Inject](https://github.com/krzysztofzablocki/Inject) tool written by Krzysztof Zabłocki, the great mind behind other amazing tools, like Sourcery.

In this article, we will create a simple project that uses the Inject library to make Hot Reload a reality in a Swift app.

You can download the Example project [here](https://github.com/mdb1/HotReloadExample).

## The project

We'll use a really simple view, that only contains a vertical stack view with 2 labels inside.

### Setting up `Inject`

We need to do only `3` things to configure the library:

1. Doenload [InjectionIII](https://apps.apple.com/ar/app/injectioniii/id1380446739?l=en&mt=12) from the Mac App Store.
2. Open the InjectionIII app, select `Open Project`, and select the project Directory
3. Add the `Inject` library as SPM Package to your app:
```
dependencies: [
    .package(
      name: "Inject",
      url: "https://github.com/krzysztofzablocki/Inject.git",
      from: "1.1.1"
    )
]
```

### Making a ViewController hot-reloadable

Now we just need to wrap the VC we want to be hot-reloadable in a `ViewControllerHost`:

```swift
import Inject
...
let vc = Inject.ViewControllerHost(HotReloadableViewController())
navigationController.setViewControllers([vc], animated: true)
...
```

**That's it**, now if we run the project, we will be able to edit things on that view controller and see the changes instantly by hitting `Cmd+S`.

If everything was set up correctly, you will see these messages in the console when reaching the injected view controller:

![injection-connected]({{static.static_files}}/resources/hot-reload/injection-connected.png)

## Demo

<iframe src="https://player.vimeo.com/video/721292169?h=6d7ea3f03f" width="640" height="564" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>