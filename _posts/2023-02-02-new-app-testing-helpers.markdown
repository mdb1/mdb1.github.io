---
layout: post
title:  "New App - Testing Helpers"
date:   2023-02-02 07:00:00 -0300
comments: true
tags: [iOS, testing]
---

When starting a new app, I like to have some XCTest helpers to enhance testability.

# MemoryDeallocation

This is a method to be used at the end of the unit tests to determine that the instance gets deallocated from memory correctly; Way faster than using the memory graph 😉.

It leverages the addTeardownBlock method on XCTest:

`Teardown blocks are executed after the current test method has returned but before tearDown is invoked.`

<script src="https://gist.github.com/mdb1/938f05113a0fe384197a798c95096284.js"></script>

# AssertState

Runs the assertions provided for the publisher variable.
Very useful for testing state transitions when working with SwiftUI's views.

<script src="https://gist.github.com/mdb1/4240b2f34a862f1ca88bfa6223b7a1a0.js"></script>

# AsyncAssert

Runs the assertions provided in the main thread in an async way.
Useful for testing objects that make async requests (using mocked protocols for the responses)

<script src="https://gist.github.com/mdb1/b09873253b39278cff9875d553e9d354.js"></script>

# NotificationCenter helper for non-concurrent code

```swift
extension XCTestCase {
    /// Posts the given notification with the given instance of the NotificationCenter.
    /// Then polls every 0.1 milliseconds until the given `condition` is met.
    /// There is a timeout of 5 seconds, after which, if the condition has not been met, the test fails.
    func postAndProcessNotification(
        _ notification: Notification.Name,
        with notificationCenter: NotificationCenter,
        until condition: @escaping () -> Bool
    ) {
        // Post the notification
        notificationCenter.post(name: notification)
        // Set a timeout of 5 seconds.
        let timeout = Date(timeIntervalSinceNow: 5.0)

        while !condition() {
            if Date() > timeout {
                XCTFail("Timed out waiting for condition to be true")
                return
            }
            // Check if we have met the condition every `0.0001` seconds (0.1 milliseconds).
            RunLoop.current.run(mode: .default, before: Date(timeIntervalSinceNow: 0.0001))
        }
    }
}
```

## Related Articles

- [Testing Notification Center](/2023-09-18-notification-center-testing/) 

<!-- Do not remove - SEO meta tags -->
{% seo %}