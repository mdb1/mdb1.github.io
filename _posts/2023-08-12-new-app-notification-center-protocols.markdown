---
layout: post
title: "New App - NotificationCenter protocols"
date: 2023-08-12 07:00:01 -0300
tags: [iOS, testing]
---

When starting a new app, I always bring these NotificationCenter protocols into the project.

The idea is that by having these protocols, we can inject the NotificationCenter to the classes/structs instead of using the `.default` instance.

By doing so, our ability to add unit tests to the code around notifications dramatically increases.

## Protocols

### Poster

<script src="https://gist.github.com/mdb1/6836664853dd8ad6cd34d4762e019b2b.js"></script>

### Observer

<script src="https://gist.github.com/mdb1/770bf255a64529b99eaac1208f89b8a2.js"></script>

### Publisher

<script src="https://gist.github.com/mdb1/623b7bc22ae2136dcdfae8ba56e39bc2.js"></script>

## Testing

Then in the testing target, we can create the Mock class of the NotificationCenter that we will inject into our `sut`s.

<script src="https://gist.github.com/mdb1/38d9873b9554fc6005b3e3cc6995ecbc.js"></script>

## Example

### ViewModel

```swift
import Combine

final class ViewModel: ObservableObject {
    @Published var count = 0
    private var notificationHandler: NotificationPublisherProtocol
    private var subscribers: [AnyCancellable] = []

    init(notificationHandler: NotificationPublisherProtocol = NotificationCenter.default) {
        self.notificationHandler = notificationHandler
        addObservers()
    }

    private func addObservers() {
        notificationHandler.publisher(for: .someNotification).sink { [weak self] _ in
            // Every time the notification is published, we increase the count by 1.
            self?.count += 1
        }
        .store(in: &subscribers)
    }
}

extension Notification.Name {
    static let someNotification = Notification.Name("someNotification")
}
```

### ViewModelTests

```swift
import XCTest

final class ViewModelTests: XCTestCase {
    private var sut: ViewModel!
    private var notificationCenter: NotificationCenterMock!

    override func setUp() {
        super.setUp()
        notificationCenter = .init()
        sut = .init(notificationHandler: notificationCenter)
    }

    func test_when_notificationIsPosted_countIncreases() {
        // Given
        XCTAssertEqual(sut.count, 0)
        XCTAssertEqual(notificationCenter.postCalls, 0)

        // When
        notificationCenter.post(name: .someNotification)

        // Then
        XCTAssertEqual(sut.count, 1)
        XCTAssertEqual(notificationCenter.postCalls, 1)
        XCTAssertEqual(
            notificationCenter.postedNotifications,
            [.someNotification]
        )
    }
}
```

✅

---

## Related Articles

- [Testing Notification Center](/2023-09-18-notification-center-testing/)

<!-- Do not remove - SEO meta tags -->
{% seo %}