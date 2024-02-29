---
layout: post
title: "Centralized Dependencies"
subtitle: "A pragmatic approach to dependency management."
date: 2024-02-29 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/centralized-dependencies/thumbnail.jpeg"
readtime: true
---

This article is based on pointfree's [How to Control the World](https://www.pointfree.co/blog/posts/21-how-to-control-the-world) article.

You can find the complete code used for this article [here](https://github.com/mdb1/CentralizedDependencies).

#### Table Of Contents:
- [Usage](#usage)
- [Testing](#testing)
  - [SwiftUI Previews](#swiftui-previews)
- [Related Articles](#related-articles)

The core idea is to have a single object (the `World`) that will act as a wrapper for every "external" dependency. We will describe our dependencies here.

With the definition of external being: `Anything that is not the responsibility of our app`.

Some examples include:

- Calendar
- The current date
- The Locale
- DateFormatters
- The backend APIs

```swift
struct World {
    var calendar = Calendar.autoupdatingCurrent
    var date = { Date() }
    var locale = Locale.autoupdatingCurrent
    var timeZone = TimeZone.autoupdatingCurrent

    var notificationHandler: NotificationCenter = NotificationCenter.default
    var pokemonsAPI = PokemonsAPI()
}
```

After that, we will create a shared instance that will describe the `current` state of the World:

```swift
#if DEBUG
/// If we are in DEBUG mode, we will be able to `change` the world.
var Current = World()
#else
let Current = World()
#endif
```

In DEBUG mode, we can easily change the current date, we can mock the backend calls, etc. However, for RELEASE builds, we won't be able to do that, and the compiler will scream at us if we do.

Example:

```swift
Current.date = { .distantPast }
```

# Usage

Let's say we want to use the PokemonsAPI from our PokemonsViewModel:

```swift
struct PokemonsAPI {
    var fetchPokemons: () async throws -> [String] = {
        // This is the real code that hits the backend.
        try await Networking.fetchPokemons()
    }
}
```

In our ViewModel, we can just call the methods/properties of our Current object without injecting anything.

```swift
final class PokemonsViewModel: ObservableObject {
    @Published var pokemons: [String] = []
    @Published var error: Error?

    func fetchPokemons() async {
        do {
            // Here we can just use our global instance.
            let pokemons = try await Current.pokemonsAPI.fetchPokemons()
            self.pokemons = pokemons
        } catch {
            self.error = error
        }
    }
}
```

So far so good, but what about testing?

# Testing

This is one of the things I like the most about this approach.

In our testing suites, we can just override whatever dependency we want to test with an in-line mock implementation:

```swift
func test_fetchPokemons() async {
    // Given
    let expectedPokemons = ["1", "2", "3"]
    // Mock the dependencies of the Current World
    Current.pokemonsAPI.fetchPokemons = {
        expectedPokemons
    }

    let pokemonsVM = PokemonsViewModel()
    XCTAssertTrue(pokemonsVM.pokemons.isEmpty)
    XCTAssertNil(pokemonsVM.error)

    // When
    await pokemonsVM.fetchPokemons()

    // Then
    XCTAssertEqual(pokemonsVM.pokemons, expectedPokemons)
}

func test_fetchPokemons_error() async {
    // Given
    let error = NSError(domain: "", code: 1)
    // Mock the dependencies of the Current World
    Current.pokemonsAPI.fetchPokemons = {
        throw error
    }

    let pokemonsVM = PokemonsViewModel()
    XCTAssertTrue(pokemonsVM.pokemons.isEmpty)
    XCTAssertNil(pokemonsVM.error)

    // When
    await pokemonsVM.fetchPokemons()

    // Then
    XCTAssertTrue(pokemonsVM.pokemons.isEmpty)
    XCTAssertEqual(pokemonsVM.error?.localizedDescription, error.localizedDescription)
}
```

Another example, using dates (a problem that almost every app usually faces):

```swift
struct DateViewModel {
    func currentFormattedDate(
        dateStyle: DateFormatter.Style = .full,
        timeStyle: DateFormatter.Style = .full
    ) -> String {
        Current.dateFormatter(dateStyle: dateStyle, timeStyle: timeStyle)
            .string(from: Current.date())
    }
}
```

Then, we can mock absolutely everything in our test cases to get a deterministic result, which will be the same in every developer computer, and in the CI machines:

```swift
func test_currentDate_argentina() {
    // Given
    // Set Up World
    Current.date = { .distantFuture }
    Current.locale = .init(identifier: "es-AR")
    Current.timeZone = .init(abbreviation: "GMT-3")!
    let viewModel = DateViewModel()

    // When
    let actualString = viewModel.currentFormattedDate()

    // Then
    XCTAssertEqual(actualString, "domingo, 31 de diciembre de 4000, 21:00:00 GMT-03:00")
}
```

Just by changing the dependencies, we can move to a different point in time, in a different location:

```swift
func test_currentDate_london() {
    // Given
    // Set Up World
    Current.date = { .distantFuture }
    Current.locale = .init(identifier: "en-UK")
    Current.timeZone = .init(abbreviation: "UTC")!
    let viewModel = DateViewModel()

    // When
    let actualString = viewModel.currentFormattedDate()

    // Then
    XCTAssertEqual(actualString, "Monday, 1 January 4001 at 00:00:00 Greenwich Mean Time")
}
```

I believe this approach is by far, the one with the less extra boilerplate needed to achieve this level of coverage.

## SwiftUI Previews

In the SwiftUI Previews, we can just do the same as we did for testing.

```swift
#Preview("Fetch Pokemons Successfully") {
    #if DEBUG
    Current.pokemonsAPI.fetchPokemons = { ["Charizard"] }
    #endif

    return PokemonsScreen()
}

#Preview("Fetch Pokemons Error") {
    #if DEBUG
    Current.pokemonsAPI.fetchPokemons = { throw NSError(domain: "Something went wrong", code: 1) }
    #endif

    return PokemonsScreen()
}
```

---

What do you think about this approach?

---

# Related Articles

- [Enhancing Testability with Protocols](/2023-02-13-enhancing-testability-with-protocols/)
- [Enhancing Testability without Protocols](/2023-02-03-enhancing-testability-without-protocols/)
- [NotificationCenter protocols](/2023-08-12-new-app-notification-center-protocols/)
- [DateFormatters](/2023-01-10-new-app-date-formatters/)

<!-- Do not remove - SEO meta tags -->
{% seo %}