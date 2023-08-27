---
layout: post
title:  "Enhancing Testability with protocols"
date:   2023-02-13 07:00:00 -0300
tags: [iOS, testing]
---

In the [last post](/2023-02-03-enhancing-testability-without-protocols/) we’ve discussed hot to enhance testability without using protocols. In this one, we will build something similar but using protocols instead.

We will be using dependency injection to be able to inject the real objects in the app, and inject mock objects in the tests / previews.

We will also use the [Interface Segregation Principle](https://en.wikipedia.org/wiki/Interface_segregation_principle) (ISP) to enforce that the code does not depend on methods it does not use. 

---

We will model the state of the view using a lighter version of [ViewState](/2023-01-08-new-app-view-state/):

```swift
enum ViewState<Info> {
    case initial
    case loading
    case loaded(Info)
    case error
}
```

We can separate this into 3 layers:

## 1. View

```swift
struct CatFactView: View {
    @StateObject var viewModel: ViewModel = .init(service: CatService())

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
                    .foregroundColor(.red)
            }
            Button("Fetch another") {
                Task {
                    await viewModel.fetch()
                }
            }
            .disabled(viewModel.state.isLoading)
        }
        .padding()
        .task {
            await viewModel.fetch()
        }
    }
}
```

Almost identical to the one in the previous post, with the difference of the ViewModel not needing the dependencies struct.

## 2. ViewModel

```swift
extension CatFactView {
    @MainActor
    final class ViewModel: ObservableObject {
        @Published var state: ViewState<CatFact> = .initial
        private let service: FetchCatFactProtocol

        init(service: FetchCatFactProtocol = CatService()) {
            self.service = service
        }

        func fetch() async {
            do {
                state = .loading
                let fact = try await service.fetchCatFact()
                withAnimation { state = .loaded(fact) }
            } catch {
                withAnimation { state = .error(error) }
            }
        }
    }
}
```

Now, we inject a `FetchCatFactProtocol` object in the initializer. Which is a protocol that defines the `fetchCatFact` method. We can now proceed to the service layer.

## 3. Service

```swift
protocol FetchCatFactProtocol {
    func fetchCatFact() async throws -> CatFact
}

struct CatService: FetchCatFactProtocol {
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
```

This is where it gets interesting. Instead of just declaring a `CatService` struct with a lot of methods inside. We create different protocols for each method and then make the CatService conform to the protocols needed.

By doing this, we enforce the Interface Segregation Principle, and we can now use the protocols for dependency injection. It is impossible for the CatFactView.ViewModel to call the `updateName` method on the `CatService` struct, given it doesn’t know it exists.

In the real app code, we can use the CatService object where needed:

`CatFactView(viewModel: .init(service: CatService()))`

Whereas in the previews/tests, we can just create new mock objects that conform to the protocols:

```swift
#if DEBUG

struct FetchCatServiceMock: FetchCatFactProtocol {
    var throwsError: Bool
    var sleepNanoseconds: UInt64 = 1_000_000_000
    func fetchCatFact() async throws -> CatFact {
        try await Task.sleep(nanoseconds: sleepNanoseconds)
        if throwsError {
            throw NSError(domain: "1", code: 1)
        } else {
            return .init(fact: "A mocked fact")
        }
    }
}

struct CatFactView_Previews: PreviewProvider {
    static var previews: some View {
        VStack {
            CatFactView(viewModel: .init(service: FetchCatServiceMock(throwsError: false)))
            CatFactView(viewModel: .init(service: FetchCatServiceMock(throwsError: true)))
            Spacer()
        }
    }
}

#endif
```

<video style="width: 70%; @media (max-width: 768px) { width: 50%; }" controls>
    <source src="{{static.static_files}}/resources/protocols/protocols.mp4" type="video/mp4">
</video>


## Testing

Finally, on the testing side, we can leverage our protocols and leverage the already created mock in the main target.

```swift
import XCTest

@MainActor
final class CatFactViewModelTests: XCTestCase {
    func testFetchCatFactSuccess() async {
        // Given
        let mockFact = CatFact(fact: "A mocked fact")
        let sut = CatFactView.ViewModel(service: FetchCatServiceMock(
            throwsError: false,
            sleepNanoseconds: 0
        ))

        // When
        await sut.fetch()

        // Then
        XCTAssertEqual(sut.state.info, mockFact)
    }

    func testFetchCatFactSuccessStates() {
        // Given
        let mockFact = CatFact(fact: "A mocked fact")
        let sut = CatFactView.ViewModel(service: FetchCatServiceMock(
            throwsError: false,
            sleepNanoseconds: 0
        ))

        AssertState().assert(
            when: {
                Task {
                    await sut.fetch()
                }
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

    func testFetchCatFactError() async {
        // Given
        let sut = CatFactView.ViewModel(service: FetchCatServiceMock(
            throwsError: true,
            sleepNanoseconds: 0
        ))

        // When
        await sut.fetch()

        // Then
        XCTAssertEqual(sut.state, .error(NSError(domain: "1", code: 1)))
    }

    func testFetchCatFactErrorStates() {
        // Given
        let sut = CatFactView.ViewModel(service: FetchCatServiceMock(
            throwsError: true,
            sleepNanoseconds: 0
        ))

        AssertState().assert(
            when: {
                Task {
                    await sut.fetch()
                }
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
                XCTAssertEqual(
                    values.map { $0 },
                    [.initial, .loading, .error(NSError(domain: "1", code: 1))]
                )
            }
        )
    }

    func testMemoryDeallocation() {
        // Given
        let sut = CatFactView.ViewModel(service: FetchCatServiceMock(throwsError: false))

        // Then
        assertMemoryDeallocation(in: sut)
    }
}
```

```swift
Test Suite 'CatFactViewModelTests' passed at 2023-07-06 19:56:49.991.
Executed 5 tests, with 0 failures (0 unexpected) in 0.006 (0.017) seconds
```

---

The complete code can be found in [this repository](https://github.com/mdb1/CatProtocols).

You can also check out how to achieve the same results _without using protocols_ in [this post](/2023-02-03-enhancing-testability-without-protocols/).

<!-- Do not remove - SEO meta tags -->
{% seo %}