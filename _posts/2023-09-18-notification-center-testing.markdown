---
layout: post
title: "Testing NotificationCenter: Concurrency vs Threading"
subtitle: "Explaining the differences for effective unit testing of each scenario"
date: 2023-09-18 07:00:00 -0300
tags: [iOS, testing]
thumbnail-img: "/resources/test-notification-center/thumbnail.jpg"
readtime: true
---

I want to talk a little bit about testing the code around the NotificationCenter and the differences between notifications that execute code synchronously and asynchronously on a different thread.

_Note: Some of the code used in this article can be found in [this previous article](/2023-08-12-new-app-notification-center-protocols/)._

#### Table Of Contents:
- [Testing Synchronous Code](#testing-synchronous-code)
- [Testing code that is executed on a different thread](#testing-code-that-is-executed-on-a-different-thread)
- [Conclusion](#conclusion)
- [Related Articles](#related-articles)

# Testing Synchronous Code

This is the easiest one, given the NotificationCenter code _[runs synchronously on the posting thread](https://developer.apple.com/documentation/foundation/notificationcenter/1411723-addobserver)_ we can just test our code synchronously.

**The real class to test:**

```swift
import Combine

final class ViewModel {
    private let center: NotificationPublisherProtocol
    private var subscribers: [AnyCancellable] = []
    var number: Int = 0

    init(center: NotificationPublisherProtocol = NotificationCenter.default) {
        self.center = center
        addObservers()
    }

    func addObservers() {
        center.publisher(for: .someNotification)
            .sink { [weak self] _ in
                self?.number += 1 // -> This is what we want to test
            }
            .store(in: &subscribers)
    }
}
```

**The test:**

```swift
final class ViewModelTests: XCTestCase {
    private var center: NotificationCenterMock!
    private var sut: ViewModel!

    override func setUp() {
        super.setUp()
        center = .init()
        sut = .init(center: center)
    }

    func testViewModelSubscriber() {
        // Given
        XCTAssertEqual(sut.number, 0)
        // When
        center.post(name: .someNotification)
        // Then
        XCTAssertEqual(sut.number, 1) // Synchronous code
    }
}
```

Then if we run the tests, we get a green check ✅.

Just to make sure there is no flakiness, we can run it 10.000 times:

![Repeat tests]({{static.static_files}}/resources/test-notification-center/repeat-tests.png)

**Results:**

```
Test Suite 'ViewModelTests' passed at 2023-09-18 12:55:04.484.
	 Executed 10000 tests, with 0 failures (0 unexpected) in 7.035 (14.860) seconds
```

# Testing code that is executed on a different thread

So far, we haven't had any issues testing our notification center code, but what happens if we need to execute a `Task` inside our publisher?

Let's say we modify our publisher observer code in the view model to:

```swift
func addObservers() {
    center.publisher(for: .someNotification)
        .sink { [weak self] _ in
            guard let self else { return }
            Task {
                // Note: We could have some async code here.
                self.number += 1 // -> This is what we want to test
            }
        }
        .store(in: &subscribers)
}
```

If we run the test again we get a failure ❌:

`XCTAssertEqual failed: ("0") is not equal to ("1")`

_Note: on some machines this could work, given the test is now a flaky one._

What happens here, is that the `Task` modifier is creating a new async context where the code will be executed (probably on a different thread), so the assertion line is executed before the code inside the `Task`.

**So how do we fix it without compromising the source code?**

The easiest fix would be to add a `Task.sleep` line in our test, but that is not the best solution we can think of. The main issue with this is that the optimal amount of time to sleep does not exist, given it would depend on the hardware of the computer running the test, so no matter which number we choose, it will either be too big (slowing down the test times), or too small (increasing the chance of failing on some machines and introducing flakiness).

**So what about polling?** We could create a helper method that posts the notification and then polls every `n` milliseconds until some arbitrary condition is met:

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

Now we can modify our test case to:

```swift
func testViewModelSubscriber() {
    // Given
    XCTAssertEqual(sut.number, 0)
    // When
    postAndProcessNotification(
        .someNotification,
        with: center,
        until: { [weak self] in
            self?.sut.number == 1
        }
    )
    // Then
    XCTAssertEqual(sut.number, 1)
}
```

Then if we run the tests, we get a green check again ✅.

Just to make sure there is no flakiness, we can run it 10.000 times:

**Results:**

```
Test Suite 'ViewModelTests' passed at 2023-09-18 13:05:55.444.
	 Executed 10000 tests, with 0 failures (0 unexpected) in 12.525 (18.106) seconds
```

As it was expected, the tests take a little bit more time to execute that the synchronous ones, but given we are polling every 0.0001 seconds, the difference is not that big:

* With Task: 18,106 seconds for 10.000 tests = ~0,0018 seconds per test
* Synchronous: 14,86 seconds for 10.000 tests = ~0,0014 seconds per test

Even though there is a 28% time difference per test, we have successfully tested the NotificationCenter publishers with `Task`s, so I think the trade-off is more than fine (subjective thought).

# Conclusion

Testing NotificationCenter code can be straightforward when the code runs synchronously. However, when introducing asynchronous code or custom queues, additional strategies like polling are needed to ensure our tests are both accurate and efficient.

It's crucial to weigh the trade-offs when choosing a testing strategy. While adding a sleep might seem like the quickest fix, it can introduce flakiness. Polling, on the other hand, is more reliable but might slightly increase the test execution time.

By understanding the nuances of how NotificationCenter works and how to effectively test it, you can write more robust and reliable iOS applications.

---

# Related Articles

- [NotificationCenterProtocols](/2023-08-12-new-app-notification-center-protocols/) 

<!-- Do not remove - SEO meta tags -->
{% seo %}