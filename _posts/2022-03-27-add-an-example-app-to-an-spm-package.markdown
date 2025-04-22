---
layout: post
title:  "Add an Example App to an SPM Package"
date:   2022-03-27 20:10:00 -0300
comments: true
tags: [iOS]
thumbnail-img: "/resources/ep05-add-an-example-app-to-an-spm-package/thumbnail.png"
---

## Creating the Package

To create a new SPM Package just follow this sequence:

```
It’s important to notice that your Package.swift must be placed
in the root of the repository.
This is only needed if the package will have it's own repository.
```

1. Open Xcode
2. Go to File → New → Package → Give it a name and hit Create.

That’s it. **You have created your Package** 🎉.

## Creating the ExampleApp

To create the ExampleApp just follow this sequence:

1. Open Xcode
2. File → New → Project → App → Give it a name and hit Create.

That’s it. **You have created your ExampleApp** 🎉.

Now we can do some clean up to make the ExampleApp as simple as possible:

1. Remove Main.storyboard
2. Remove SceneDelegate.swift
3. In the Info.plist, remove the following entries:
- Main storyboard file base name
- Application Scene Manifest
4. Remove all the code in the AppDelegate and replace it with this:

```swift
import UIKit

@main
final class AppDelegate: UIResponder, UIApplicationDelegate {
    var window: UIWindow?
    private lazy var navigationController = UINavigationController()

    func application(
        _: UIApplication,
        didFinishLaunchingWithOptions _: [UIApplication.LaunchOptionsKey: Any]?
    ) -> Bool {
        window = UIWindow()
        guard let window = window else { fatalError("Can't start without a window") }

        navigationController.setViewControllers([ViewController()], animated: true)
        window.rootViewController = navigationController
        window.makeKeyAndVisible()

        return true
    }
}
```
## Linking the ExampleApp and the Package

In Xcode with the ExampleApp project open:

1. File → Add packages... → Add Local → Select the root directory (The package) → Add Package.
2. Now go to the Build Phases of the project → Link Binary with Libraries → Hit the `+` button → Select the package.

That’s it. **Now the ExampleApp can import the Package** 🎉.

## Importing the Package on another project
```
This section assumes that your package is hosted on github.
```

Open your project in Xcode:

1. File → Add packages... → Search for the github URL of the project → Add the dependency rules that you want → Add to your project → Add Package.
2. Now you have to wait for Xcode to fetch the package.

That’s it. **Now your project can import the Package** 🎉.

<!-- Do not remove - SEO meta tags -->
{% seo %}