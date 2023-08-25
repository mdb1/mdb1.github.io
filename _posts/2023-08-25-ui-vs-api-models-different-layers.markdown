---
layout: post
title: "UI vs API Models - An structured approach"
date: 2023-08-25 07:00:00 -0300
tags: [coding, swift, swiftui]
thumbnail-img: /resources/ui-api-models/swiftui.jpeg
---

**UI and API models, where are they supposed to live in a codebase?**

There are different approaches to answer that question, and as always, there is no 1 silver bullet that is the best for everything. It will depend on some factors: like the existing architecture of the app, some preferences, what is the code supposed to handle best.

In this post, I will talk about the following approach:

* 1 SPM Package
* 2 Libraries
  * UI
    * SwiftUI Views
    * Imports Data
  * Data
    * Public UI Models
    * Internal API Models
    * Public Repository to publish UI Changes

You can find the complete codebase used for this post in [this repository](https://github.com/mdb1/ModelsExampleApp).
Let's start with a list of Pros/Cons before moving on to the actual code.

## Pros

* `Impossible` to use API models from the UI
* Clear separation between API and UI models
* Really easy to test the Data library
* API to UI Mapper methods/properties should be easy to test
* The whole UI layer can be built without ever knowing how the API models look.
  * Once you get a definition on the API models, you can just tweak that models, and the mapper to the UI models, and your app should continue to behave as it was behaving with mocks!

## Cons

* More internal libraries
* If two modules need the same API model, the only option is to duplicate them
* Could introduce some boilerplate, in particular when there is a 1:1 match between UI and API model
* Require mapper methods/properties to transform the models
* The public UI models will be available for packages importing the UI module, making it possible to use them from a package where they were not defined
* Could be an overengineered solution to a problem that is not that big anyways

# The Code

Let's start from the bottom and move our way up as we go.

## Set Up the SPM Package

Let's start by creating a new Xcode project and add a Local SPM Package to it. We will create a Pokemon List with the possibility to look at the Detail of a Pokemon.

This is how the `Package.swift` is defined:

```swift
// swift-tools-version: 5.8
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "Pokemon",
    platforms: [.iOS(.v16)],
    products: [
        .library(
            name: "PokemonUI",
            targets: ["PokemonUI"]
        ),
        .library(
            name: "PokemonData",
            targets: ["PokemonData"]
        )
    ],
    dependencies: [],
    targets: [
        .target(
            name: "PokemonUI",
            dependencies: [
                "PokemonData",
            ]
        ),
        .target(
            name: "PokemonData",
            dependencies: []
        ),
        .testTarget(
            name: "PokemonUITests",
            dependencies: [
                "PokemonUI",
                "PokemonData"
            ]
        ),
        .testTarget(
            name: "PokemonDataTests",
            dependencies: ["PokemonData"]
        )
    ]
)
```

![spm-structure](/resources/ui-api-models/spm-structure.png)

Basically, we have one Package for the `Pokemon` features, with two libraries: UI and Data.

_Remember to link the UI library to the App in the Build Phases._

## Data Library

Here we will have:

* Public UI Models
* Public Repositories that will publish data
* Internal API Models
* Internal Service Layers to talk to the backend
* Internal Disk Cache

### API models

API Models are the models defined by the Backend, the `Decodable` models.

We will make them `internal` to make the UI layer completely agnostic of these models:

```swift
struct APIPokemon: Decodable, Identifiable, Equatable {
    let id: String
    let name: String
    let imageUrl: String
    let type: `Type`
    let trainerId: String?
}

extension APIPokemon {
    enum `Type`: String, Decodable {
        case fire, water, grass
    }
}
```

* [API Model Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonData/Model/Pokemon%2BModelAPI.swift)

### UI Models

UI models are defined as `public`, these are the models that the UI layer will observe, and react to the changes in them.

```swift
public struct Pokemon: Decodable, Identifiable, Equatable {
    public let id: String
    public let name: String
    public let imageUrl: String
    public let type: `Type`
}

public extension Pokemon {
    enum `Type`: String, Decodable {
        case fire, water, grass, unknown
    }
}
```

* [UI Model Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonData/Model/Pokemon%2BModelUI.swift)

### Mapper

We need mappers between the API and UI layers, these mappers can be `internal`, given they will be used only inside the `Data` library:

```swift
extension APIPokemon {
    var uiModel: Pokemon {
        Pokemon(
            id: id,
            name: name,
            imageUrl: imageUrl,
            type: type.uiModel
        )
    }
}

extension APIPokemon.`Type` {
    var uiModel: Pokemon.`Type` {
        .init(rawValue: self.rawValue) ?? .unknown
    }
}
```

* [Mapper Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonData/Model/Pokemon%2BMapper.swift)
* [Mapper Tests](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Tests/PokemonDataTests/PokemonMapperTests.swift)

### Repository

The repository layer will be public and will use Combine to publish the UI models.

It's marked as ObservableObject to be able to inject it as `environmentObject` into the UI layer.

It will use the `Dependencies` approach to make it easier to use and to test.

We could add disk cache capabilities in this layer. We could also provide an enum with a FetchStrategy, so the UI can let the repository know which type of data it wants (ie: network, diskCache, inMemory, etc).

We should provide a way to "clear" the repositories, so, for example, we clear all the data on log out.

This layer will be covered deeply in a follow up article.

* [Repository Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonData/PokemonRepository.swift)
* [Repository Tests](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Tests/PokemonDataTests/PokemonRepositoryTests.swift)

### Service

The Services are the 'workers' that talk to the backend and return API model as results.

The Services are always marked as `internal`.

These objects will be injected to the Repository via the [Dependencies approach](https://mdb1.github.io/2023-02-03-enhancing-testability-without-protocols/).

For this example, we will just simulate a 1 second delay and then return results.

* [Service Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonData/PokemonService.swift)

## UI Library

It's time to build our UI and consume the data via the Repository's Publisher.

We will build 2 views:
* A PokemonList -> with a public initializer to access it from the main app target.
* A PokemonDetail -> Internal.

We won't spend too much time in the UI details, given this post is not related to that, and we will focus on how to make all the screens reactive to the same publisher.

### SwiftUI Views

For each view we will have 3 parts:

![ui-structure](/resources/ui-api-models/ui-structure.png)

**1. The SwiftUI View:**
```swift
public struct PokemonListView: View {
    // Environment object to share the same instance with all the sub views.
    @EnvironmentObject private var repository: PokemonRepository
    // State property to react to the changes.
    @State private var model: Model = .init()

    public init() {}

    public var body: some View {
        NavigationView {
            List {
                ForEach(model.pokemons) { pokemon in
                    pokemonRowView(pokemon)
                }
                loadButton
            }
            .navigationTitle("Pokemon List")
            // We subscribe to the repository's publisher.
            .onReceive(repository.pokemonsPublisher) { newState in
                // And every time we receive a value we update the state.
                model.updateState(with: newState)
            }
        }
    }
}
```

The Publisher publish a model called LoadingState, which I have described previously as [ViewState](https://mdb1.github.io/2023-01-08-new-app-view-state/).

* [SwiftUI View Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonUI/List/PokemonListView.swift)

**2. The Model**

```swift
extension PokemonListView {
    /*
     This is the source of truth for the view.
     Whenever anything changes in this model, the UI will react accordingly.
     */
    struct Model {
        var pokemons: [Pokemon] = []
        var isLoading: Bool = false
        var error: Error? = nil
    }
}

extension PokemonListView.Model {
    /*
     Whenever we receive a new update in the view, we will call this method to modify the state.
     This is the most important part of the UI layer to test.
     */
    mutating func updateState(with newState: LoadingState<[Pokemon]>) {
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
            isLoading = false
        }
    }

    var hasPokemons: Bool {
        !pokemons.isEmpty
    }
}
```

* [Model Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonUI/List/PokemonListView%2BModel.swift)
* [Model Test Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Tests/PokemonUITests/PokemonListView%2BModelTests.swift)

**3. The SwiftUI Preview**

We can use @testable import to the PokemonData library in this file, to be able to inject custom mock dependencies into the Repository.

* [Preview Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonUI/List/PokemonListView_Previews.swift)

---

#### Views with Bindings

Here are links to the Detail View files, that uses bindings for the pokemon object:

* [PokemonDetail SwiftUI View Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonUI/Detail/PokemonDetailView.swift)
* [PokemonDetail Model Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonUI/Detail/PokemonDetailView%2BModel.swift)
* [PokemonDetail Model Test Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Tests/PokemonUITests/PokemonDetailView%2BModelTests.swift)
* [PokemonDetail Previews Code](https://github.com/mdb1/ModelsExampleApp/blob/main/Packages/Pokemon/Sources/PokemonUI/Detail/PokemonDetailView_Previews.swift)

## App Layer

Finally on the App Layer, we just need to import the libraries, call the public view, and inject the environment object:

```swift
import PokemonData
import PokemonUI
import SwiftUI

@main
struct ModelsExampleAppApp: App {
    var body: some Scene {
        WindowGroup {
            PokemonListView()
                .environmentObject(PokemonRepository())
        }
    }
}
```

* [Main App Code](https://github.com/mdb1/ModelsExampleApp/blob/main/ModelsExampleApp/ModelsExampleAppApp.swift)

### Demo

<video width="545" height="912" controls>
    <source src="/resources/ui-api-models/demo.mp4" type="video/mp4">
</video>

Something to **worth noticing**, is that we were using mocks up to this point, but if we suddenly decide to use a real endpoint, we just need to:

* Adapt the `internal` API models on the `Data` library to match the real backend model.
* Adapt the mapper to UI model if needed.

**That's it**, the app should continue to work as expected, without any change to the `UI` library.

## What Happens when an SPM Package imports another one?

Sometimes, you will have modules that depend on other modules.

For example, we could have an Anime Module, that imports Pokemon.

In that scenarios, the Anime module will have access to the PokemonRepository, because it's a transitive dependency, and if necessary, it could also have views subscribed to that same publisher.

It's important to pay attention to detail when multiple views subscribed to the same publisher, or some views subscribed to more than one publisher. Given all the observers will be updated once one repository publishes new values.

## Conventions

Something that I like about this approach, is that we can define some conventions:

**In the UI Layer:**

* Each View contains:
  * NameView_Previews.swift
  * NameView.swift
    * Uses onReceive to react to changes
    * Uses @State for the model state of the view
    * Uses @EnvironmentObject for the repositories
 * NameView+Model.swift
   * Uses a mutating func to transform the properties

**In the Data Layer:**
* Each model contains:
  * Name+ModelAPI.swift -> always internal
  * Name+ModelUI.swift -> always public
* Repositories:
  * Always public
  * Use the [Dependencies approach](https://mdb1.github.io/2023-02-03-enhancing-testability-without-protocols/)
  * Transform API models to UI models
  * Publish UI models
* Services are internal
  * Always return API Models

We could also go ahead and [document](https://mdb1.github.io/2023-08-04-new-app-document-best-practices/) these conventions in the code repository, so every team member have access.

Another idea would be to create [Xcode Templates](https://mdb1.github.io/2023-01-27-new-app-xcode-templates/) to avoid the boilerplate.

## Conclusion

In conclusion, the decision of where to house UI and API models in your codebase depends on several factors, such as existing architecture, preferences, and specific requirements. The approach outlined in this post involves using a structured organization with a combination of SPM packages and libraries.

In terms of testing, these approach emphasizes the importance of the `Model` struct, which is the source of truth for the UI. Changes in the model state trigger reactions in the UI, making this component critical to test thoroughly.

I think it's really important to define a model strategy from the beginning, given these is the Foundation from where the app will evolve over time.

---

Let me know what you think, I'd love to hear different ideas, or if you'd rather just have one module with all the models together, instead of several modules!