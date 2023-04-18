---
layout: post
title:  "UserPreferences: A wrapper for UserDefaults"
date:   2023-04-18 07:00:00 -0300
categories: swift
---

UserDefaults is a great way to store and retrieve app settings and user preferences in iOS apps. However, working with it can sometimes be a bit verbose, especially if you need to store or retrieve multiple values.

Fortunately, Swift allows us to add a subscript to UserDefaults to make working with it much more convenient:
```swift
extension UserDefaults {
    subscript<T>(key: String) -> T? {
        get { return object(forKey: key) as? T }
        set(newValue) {
            set(newValue, forKey: key)
            synchronize()
        }
    }
}
```

This makes it easier to store and retrieve values from the UserDefaults.

Something that I usually like to do in my projects, is to create a wrapper around UserDefaults to centralize all the code related to preferences inside it:

<script src="https://gist.github.com/mdb1/2c902ea002c071642ea9dc119633c304.js"></script>

With this class, you can now store and retrieve user preferences and settings using a convenient subscript syntax, like this:

```swift
UserPreferences.shared[.onBoardingSeen] = true
let value: Bool? = UserPreferences.shared[.onBoardingSeen]
```

You could also add some basic unit tests for this class:

<script src="https://gist.github.com/mdb1/cbac7df658d467c8c3e0e8084df49a5e.js"></script>

---

A great tip from [SwiftLee](https://www.avanderlee.com/swift/user-defaults-preferences/) is to create an AppGroup for your app:
1. Add the App Groups capability
2. Create an static instance
```swift
extension UserDefaults {
    static let group = UserDefaults(suiteName: "group.your.identifier")!
}
```
3. Use the instance:
```swift
/// Initializes the UserPreferences object with a UserDefaults instance.
init(userDefaults: UserDefaults = .group) {
    self.userDefaults = userDefaults
}
```

_Any app or extension configured with the same app group will now be able to read and write from the same UserDefaults instance._

---

The next iteration of the UserPreferences class would be to add some type-safe methods to retrieve the stored information.

I hope this tip helps you write more concise and readable code in your iOS apps!