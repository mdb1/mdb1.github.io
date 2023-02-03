---
layout: post
title:  "Enhancing Testability without protocols"
date:   2023-02-03 07:00:00 -0300
categories: swift
---

We have all used protocols to enhance testability in our apps, but that can become too verbose, and add extra layers of abstractions to the code.

Here is a different approach, without using protocols, that can achieve the same results with way less code.

Let's say we have a screen with a button that needs to perform a network request, display a loading while waiting for the response, and then display the result in a label.

We will model the state of the view using a lighter version of [ViewState](https://mdb1.github.io/swift/2023/01/08/new-app-view-state.html):

```swift
enum ViewState<Info> {
    case initial
    case loading
    case loaded(Info)
    case error
}
```

We can separate this into 3 layers:

## 1. View:
```swift
import SwiftUI

struct CatFactView: View {
    @StateObject var viewModel: ViewModel = .init(
        dependencies: .default // More on this later.
    )

    var body: some View {
        VStack {
            switch viewModel.state {
            case .initial:
                EmptyView()
            case .loading:
                ProgressView()
            case let .loaded(fact):
                Text(fact.fact)
            case .error:
                Text("Error")
            }
            Button("Fetch another") {
                viewModel.fetch()
            }
            .disabled(viewModel.state.isLoading)
        }
        .padding()
        .task {
            viewModel.fetch()
        }
    }
}
```

Nothing fancy here, just a view that switches through the view model's state property.

## 2. ViewModel

In the ViewModel, we will introduce the `Dependencies` mechanism, which is just a struct that lets us inject the dependencies of the view model as functions stored in variables.

By doing this, the view model becomes completely decoupled from the implementation of the dependencies, and will only have access to the provided methods. Think of this as a lightweight version of the Segregation Principle (The `S` in `SOLID`).

```swift
extension CatFactView {
    @MainActor final class ViewModel: ObservableObject {
        @Published var state: ViewState<CatFact> = .initial
        private let dependencies: Dependencies

        init(dependencies: Dependencies) {
            self.dependencies = dependencies
        }

        func fetch() {
            Task {
                do {
                    state = .loading
                    let fact = try await dependencies.fetchFact()
                    state = .loaded(fact)
                } catch {
                    state = .error
                }
            }
        }
    }
}

extension CatFactView.ViewModel {
    struct Dependencies {
        // Notice how the view model doesn't care about the implementation,
        // as long as we provide anything that conform to this signature,
        // the view model will compile correctly.
        var fetchFact: () async throws -> CatFact
    }
}
```

Another benefit of this approach, is that injecting mocked instances is really easy.

For example, we could go to the SwiftUI Previews and just use one mock for the success state and another one for the error state:

```swift
struct CatFactView_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            CatFactView(viewModel: .init(dependencies: .init(fetchFact: {
                try await Task.sleep(nanoseconds: 1_000_000_000)
                return .init(fact: "A mocked fact")
            })))

            CatFactView(viewModel: .init(dependencies: .init(fetchFact: {
                try await Task.sleep(nanoseconds: 1_000_000_000)
                throw NSError(domain: "domain", code: 123)
            })))

            Spacer()
        }
    }
}
```

<video width="483" height="304" controls>
    <source src="/resources/dependencies/mockedDependencies.mp4" type="video/mp4">
</video>

## 3. The Service

Now is the time for the service layer, this is the place where the real code will be executed:

```swift
struct CatFactsService {
    func fetchCatFact() async throws -> CatFact {
        /// This is using: https://github.com/mdb1/CoreNetworking
        try await HTTPClient.shared
            .execute(
                .init(
                    urlString: "https://catfact.ninja/fact/",
                    method: .get([]),
                    headers: [:]
                ),
                responseType: CatFact.self
            )
    }
}

struct CatFact: Decodable {
    let fact: String
}
```

Now we could also add some convenience code to make the initializer of the view model easier to read:
```swift
extension CatFactView.ViewModel.Dependencies {
    static var `default`: Self {
        .init(fetchFact: CatFactsService().fetchCatFact)
    }
}
```

## Testing

Using some of the helpers function from [this article](https://mdb1.github.io/swift/2023/02/02/new-app-testing-helpers.html), and injecting the dependencies as inline methods, we can easily test all the paths of the code in our view model:

```swift
import XCTest

@MainActor final class CatFactViewModelTests: XCTestCase {
    func testFetchCatFactSuccess() {
        // Given
        let mockFact = CatFact(fact: "A mocked fact")
        let sut = CatFactView.ViewModel(dependencies: .init(fetchFact: {
            mockFact
        }))

        // When
        sut.fetch()

        // Then
        asyncAssert("Fetch, then update the state") {
            XCTAssertEqual(sut.state.info, mockFact)
        }
    }

    func testFetchCatFactSuccessStates() {
        // Given
        let mockFact = CatFact(fact: "A mocked fact")
        let sut = CatFactView.ViewModel(dependencies: .init(fetchFact: {
            mockFact
        }))

        AssertState().assert(
            when: {
                // When
                sut.fetch()
            },
            type: ViewState<CatFact>.self,
            testCase: self,
            publisher: sut.$state,
            valuesLimit: 3,
            initialAssertions: {
                XCTAssertEqual(sut.state, .initial)
            },
            valuesAssertions: { values in
                // Then
                XCTAssertEqual(values.map { $0 }, [.initial, .loading, .loaded(mockFact)])
            }
        )
    }

    func testFetchCatFactError() {
        // Given
        let sut = CatFactView.ViewModel(dependencies: .init(fetchFact: {
            throw NSError(domain: "12", code: 12)
        }))

        // When
        sut.fetch()

        // Then
        asyncAssert("Fetch, then update the state") {
            XCTAssertEqual(sut.state, .error)
        }
    }

    func testFetchCatFactErrorStates() {
        // Given
        let sut = CatFactView.ViewModel(dependencies: .init(fetchFact: {
            throw NSError(domain: "12", code: 12)
        }))

        AssertState().assert(
            when: {
                // When
                sut.fetch()
            },
            type: ViewState<CatFact>.self,
            testCase: self,
            publisher: sut.$state,
            valuesLimit: 3,
            initialAssertions: {
                XCTAssertEqual(sut.state, .initial)
            },
            valuesAssertions: { values in
                // Then
                XCTAssertEqual(values.map { $0 }, [.initial, .loading, .error])
            }
        )
    }

    func testMemoryDeallocation() {
        // Given
        let mockFact = CatFact(fact: "A mocked fact")
        let sut = CatFactView.ViewModel(dependencies: .init(fetchFact: {
            mockFact
        }))

        // Then
        assertMemoryDeallocation(in: sut)
    }
}
```