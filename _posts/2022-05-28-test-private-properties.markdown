---
layout: post
title:  "Test private properties using Mirror"
date:   2022-05-28 09:00:00 -0300
comments: true
tags: [iOS, testing]
---

{% seo %}

In this post, we'll learn how we can add unit tests to private properties without compromising their access level.

You can download the Example project [here](https://github.com/mdb1/MirrorObjectExample).

## The project

We'll use a really simple view, that only contains one button and one label.
Tapping on the button increases the number on the label.
We want to cover that behavior with unit tests.

![test-app]({{static.static_files}}/resources/test-private-properties/example-app.png)

```swift
import UIKit

final class InitialViewController: UIViewController {
    @IBOutlet private weak var incrementButton: UIButton!
    @IBOutlet private weak var valueLabel: UILabel!
    private var storedValue = 0

    @IBAction private func didTapIncrementButton(_ sender: Any) {
        storedValue += 1
        valueLabel.text = storedValue.description
    }
}
```

## The problem
So we could write something like this:

```swift
import XCTest
@testable import MirrorObjectExample

final class InitialViewControllerTests: XCTestCase {
    func testLabelInitialValue() {
        // Given
        let sut = InitialViewController()
        let expectedValue = "0"

        // Then
        XCTAssertEqual(sut.valueLabel.text, expectedValue)
    }
}
```

But then we get the following error:

![private-error]({{static.static_files}}/resources/test-private-properties/inaccessible-private.png)

A quick fix would be to change the access modifier of the label in the `InitialViewController`. But we don't want to compromise the access level just for the sake of testing.

## Mirror
Instead, we will rely on [Reflection](https://www.swiftbysundell.com/articles/reflection-in-swift/).

By "reflecting" our classes we will be able to add unit tests to the private properties.

### MirrorObject helper class
We can create a helper class that will act as a wrapper for Swift's `Mirror` struct.

```swift
/// This class is used as the base for accessing private properties of objects.
///
/// Usage:
/// - Create a new child class for the object you want to test
/// - Add the properties using the same name as in the original implementation.
class MirrorObject {
    private let mirror: Mirror

    init(reflecting: Any) {
        mirror = Mirror(reflecting: reflecting)
    }

    func extract<Class>(variableName: StaticString = #function) -> Class {
        extract(variableName: variableName, mirror: mirror)
    }

    private func extract<Class>(variableName: StaticString, mirror: Mirror) -> Class {
        guard let descendant = mirror.descendant("\(variableName)") as? Class else {
            guard let superclassMirror = mirror.superclassMirror else {
                fatalError("Expected Mirror for superclass")
            }
            return extract(variableName: variableName, mirror: superclassMirror)
        }
        guard let result: Class = try? XCTUnwrap(descendant) else {
            fatalError("Expected unwrapped result")
        }
        return result
    }
}
```

Once we have our base class, the usage is really simple:

```swift
final class InitialViewControllerMirror: MirrorObject {
    // We create a custom init that calls super with the custom object
    init(reflecting vc: InitialViewController) {
        super.init(reflecting: vc)
    }

    // And then we just declare the properties we want to test:
    var valueLabel: UILabel! { extract() }
    var incrementButton: UIButton! { extract() }
}
```

## Testing

Now, we can go back to our test, and use our new Mirror class:

```swift
func testLabelInitialValue() {
    // Given
    let storyboard = UIStoryboard(name: "Main", bundle: nil)
    guard let sut = storyboard
        .instantiateViewController(withIdentifier: "InitialViewController") as? InitialViewController else {
        XCTFail()
        return
    }
    _ = sut.view
    let mirror = InitialViewControllerMirror(reflecting: sut)
    let expectedValue = "0"

    // Then
    XCTAssertEqual(mirror.valueLabel.text, expectedValue)
}
```

We can run the test and it should pass correctly ✅.

## More Testing

We now want to test the button's tap behavior. We also want to move the initial shared configuration for all the tests to the `setUp` method:

```swift
import XCTest
@testable import MirrorObjectExample

final class InitialViewControllerTests: XCTestCase {
    private var sut: InitialViewController!
    private var mirror: InitialViewControllerMirror!

    override func setUp() {
        super.setUp()
        let storyboard = UIStoryboard(name: "Main", bundle: nil)
        sut = storyboard.instantiateViewController(withIdentifier: "InitialViewController") as? InitialViewController
        _ = sut.view
        mirror = InitialViewControllerMirror(reflecting: sut)
    }

    func testLabelInitialValue() {
        // Given
        let expectedValue = "0"

        // Then
        XCTAssertEqual(mirror.valueLabel.text, expectedValue)
    }

    func testButtonBehavior() {
        // Given
        let initialValue = "0"
        let expectedValueAfterTap = "1"
        XCTAssertEqual(mirror.valueLabel.text, initialValue)

        // When
        mirror.incrementButton.sendActions(for: .touchUpInside)

        // Then
        XCTAssertEqual(mirror.valueLabel.text, expectedValueAfterTap)
    }
}

final class InitialViewControllerMirror: MirrorObject {
    // We create a custom init that calls super with the custom object
    init(reflecting vc: InitialViewController) {
        super.init(reflecting: vc)
    }

    // And then we just declare the properties we want to test:
    var valueLabel: UILabel! { extract() }
    var incrementButton: UIButton! { extract() }
}
```

![coverage]({{static.static_files}}/resources/test-private-properties/coverage.png)

Now we have unit test coverage for the button action ✅.

---

I hope you found this article interesting!

![private-set]({{static.static_files}}/resources/test-private-properties/private(set).jpeg)

### Until the next one 👋