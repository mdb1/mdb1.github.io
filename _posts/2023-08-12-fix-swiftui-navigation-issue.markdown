---
layout: post
title: "Fix to SwiftUI encountered an issue when pushing a NavigationLink"
date: 2023-08-12 07:00:00 -0300
tags: [iOS]
---

*Note: This issue will be automatically solved when using `iOS16+` as target, given the NavigationLink's `init(destination:isActive:label:)` has been deprecated.*

I recently came across this issue when trying to push a screen with a given element of a List in SwiftUI:

![logs]({{static.static_files}}/resources/swiftui-navigation-link-issue/log.png)

In the app, the problem is evident, the destination view is non-deterministic for each view tap:

<video width="909" height="812" controls>
    <source src="{{static.static_files}}/resources/swiftui-navigation-link-issue/issue.mp4" type="video/mp4">
</video>


## The Issue:

```swift
NavigationView {
    List(pokemons) { pokemon in
        NavigationLink(
            destination: PokemonDetailView(pokemon: selectedPokemon),
            isActive: $isDetailActive
        ) {
            Button(action: {
                selectedPokemon = pokemon
                isDetailActive = true
            }) {
                Text(pokemon.name)
            }
        }
    }
    .navigationTitle("Pokémon List")
}
```

The issue in this case, is that the `NavigationLink` initializer that uses the `isActive` parameter is inside the List, so there will be many NavigationLinks associated with the same parameter, which causes SwiftUI to encounter issues when trying to push.

## The Solution:

```swift
NavigationView {
    List(pokemons) { pokemon in
        Button(action: {
            selectedPokemon = pokemon
            isDetailActive = true
        }) {
            Text(pokemon.name)
        }
    }
    .background(
        NavigationLink(
            destination: PokemonDetailView(pokemon: selectedPokemon),
            isActive: $isDetailActive
        ) { EmptyView() }
    )
    .navigationTitle("Pokémon List")
}
```

The solution is really simple, just move the NavigationLink from inside each cell of the list to a `background` modifier on the List.

By doing so, now there is only one NavigationLink associated with the `isDetailActive` parameter, which causes the errors to disappear, and the app to work as expected:

<video width="909" height="812" controls>
    <source src="{{static.static_files}}/resources/swiftui-navigation-link-issue/fix.mp4" type="video/mp4">
</video>

---