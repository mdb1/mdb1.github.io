---
layout: post
title: "Combine Repository"
subtitle: "Publishing Changes to all the observers"
date: 2023-08-28 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/repository-combine/thumbnail.jpg"
readtime: true
---

In the last article ([UI vs API models](/2023-08-25-ui-vs-api-models-different-layers/)) we talked briefly about the Repository layer. 

Now it's time to look closer into this layer, and how we can use Combine publishers to help drive the state of our views and our apps.

We will continue using the same [Example app](https://github.com/mdb1/ModelsExampleApp/) from the previous post.

![diagram]({{static.static_files}}/resources/repository-combine/diagram.png)

## Repository

```swift
public final class PokemonRepository: ObservableObject {
    public var pokemonsPublisher = CurrentValueSubject<LoadingState<[Pokemon]>, Never>(.idle)
    private let dependencies: Dependencies
    private var inMemoryPokemons: [Pokemon] = []

    public convenience init() {
        self.init(dependencies: .default)
    }

    init(dependencies: Dependencies) {
        self.dependencies = dependencies
    }
}

public extension PokemonRepository {
    @MainActor
    func loadAllPokemons() async {
        pokemonsPublisher.send(.loading)

        do {
            let apiPokemons = try await dependencies.getAllPokemons()
            let pokemons = apiPokemons.map(\.uiModel)
            inMemoryPokemons = pokemons
            pokemonsPublisher.send(.success(inMemoryPokemons))
        } catch {
            pokemonsPublisher.send(.failure(error))
        }
    }
}
```

From this sample code, there are a few things to notice:

1. We use a `CurrentValueSubject` to publish values to all the observers.
2. We use the [Dependencies approach](/2023-02-03-enhancing-testability-without-protocols/) to talk to the backend (or inject mocks in previews/tests).
3. We store the `inMemoryPokemons` in this class (we will use them later).
4. We provide a `public` initializer that uses the production service.
5. We provide an `internal` initializer to inject dependencies in the tests/previews (via `@testable import`).
6. We provide a `public` method to `load` all the pokemons. This method publishes a loading state, then perform some work via its dependency and then either publish a success or an error value (and it stores the array of pokemons inMemory).

## Usage

From our SwiftUI view:

* We access the repository via `EnvironmentObject`:

```swift
@EnvironmentObject private var repository: PokemonRepository
```

* We can just use the `onReceive` modifier to observe changes in the publisher:

```swift
.onReceive(repository.pokemonsPublisher) { newState in
    model.updateStates(with: newState)
}
```

### Model

The model is a `@State` property in the view. It is the one that drives the UI:

```swift
extension PokemonListView {
    struct Model {
        var pokemons: [Pokemon] = []
        var isLoading: Bool = false
        var error: Error? = nil
        var isDisplayingDeletionErrorToast: Bool = false
    }
}

extension PokemonListView.Model {
    mutating func updateStates(with newState: LoadingState<[Pokemon]>) {
        switch newState {
        case .idle:
            pokemons = []
            isLoading = false
            error = nil
        case .loading:
            isLoading = true
        case .success(let t):
            pokemons = t
            isLoading = false
            error = nil
        case .failure(let e):
            error = e
            if e as? PokemonRepository.Errors == .deletionError {
                isDisplayingDeletionErrorToast = true
            }
            isLoading = false
        }
    }
}
```

<video style="width: 70%; @media (max-width: 768px) { width: 50%; }" controls>
    <source src="{{static.static_files}}/resources/repository-combine/demo.mp4" type="video/mp4">
</video>

## Optimistic approach

This is the basic usage, but what happens if we want for example, an optimistic approach for the `delete` function.

```swift
@MainActor
/// Removes the pokemon with the given id.
/// - Parameters:
///   - id: the `id` of the pokemon.
///   - optimisticDelete: if `true` the repository will send the updated list of pokemons automatically,
///   while deleting with the API in the background. If the API call fails, the repository will re-publish the entire list.
func removePokemon(
    id: String,
    optimisticDelete: Bool = false
) async {
    do {
        var mutablePokemons = inMemoryPokemons
        mutablePokemons.removeAll { pokemon in
            pokemon.id == id
        }
        if optimisticDelete {
            pokemonsPublisher.send(.success(mutablePokemons))
        } else {
            pokemonsPublisher.send(.loading)
        }

        // Delete the pokemon.
        try await dependencies.deletePokemon(id)
        // Refetch all the pokemons.
        await loadAllPokemons()
    } catch {
        pokemonsPublisher.send(.failure(Errors.deletionError))
        /// Re-Publish all the pokemons (without the deletion)
        pokemonsPublisher.send(.success(inMemoryPokemons))
    }
}
```

This is why we store the array of `inMemoryPokemons` in the repository. It makes it super easy to have optimistic features when dealing with the API.

Then from the view, we can use the optimistic approach, and then react to the `Errors.deletionError` if needed and display an alert.

<video style="width: 70%; @media (max-width: 768px) { width: 50%; }" controls>
    <source src="{{static.static_files}}/resources/repository-combine/optimistic+error.mp4" type="video/mp4">
</video>

_Side note: We could use [Toasts](/2023-03-08-new-app-toasts/) instead._

## Wipe method

We should provide a way to `wipe` the repository in case for example, the user logs out, or you want to provide a way to `clear` all the data:

```swift
@MainActor
func wipe() {
    pokemonsPublisher.send(.idle)
    inMemoryPokemons = []
}
```

## Testing

Both the Repository and the State Model should be covered with unit tests:

* [Testing the Repository](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Tests/PokemonDataTests/PokemonRepositoryTests.swift)

Testing the repository is quite simple, given we can inject whatever dependencies we want, so we can easily check the success and error states.

* [Testing the State changes](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Tests/PokemonUITests/PokemonListView%2BModelTests.swift)

Testing the model state changes is also really simple, given we just need to call the `updateStates` method with different states and then make some assertions.

---

## Next iteration

The next natural step, would be to add an `in-disk` cache for our repositories, but that would be part of a future article!

* [Complete Repository Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonData/PokemonRepository.swift)

## Related Articles

- [UI vs API Models](/2023-08-25-ui-vs-api-models-different-layers/)
- [SwiftUI: Repository as a single source of truth](/2023-04-30-repository-as-single-source-of-truth/)
- [Enhancing testability without protocols](/2023-02-03-enhancing-testability-without-protocols/)
- [ViewState](/2023-01-08-new-app-view-state/)
- [Toasts](/2023-03-08-new-app-toasts/)

<!-- Do not remove - SEO meta tags -->
{% seo %}