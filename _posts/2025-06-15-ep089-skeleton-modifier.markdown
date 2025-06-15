---
layout: post
title: "Skeleton Modifier"
subtitle: "A simple shimmer SwiftUI modifier"
date: 2025-06-15 07:00:00 -0300
tags: [ios, swiftui]
thumbnail-img: "/resources/ep089-skeleton-modifier/thumbnail.webp"
readtime: true
---

This is a simple modifier to add a shimmer-style animation to any SwiftUI view.

#### Table of Contents
- [The Code](#the-code)
  - [Usage](#usage)
- [Demo](#demo)

# The Code

<script src="https://gist.github.com/mdb1/60dfd39fae233152ddcc01e569bab253.js"></script>

## Usage

If you build your "loaded" state using parameters, like this:

```swift
func charactersView(characters: [CharacterModel]) -> some View {
    ScrollView {
        ForEach(characters, id: \.id) { character in
            ImageAndTextRow(
                imageURLString: character.image,
                title: character.fullName
            )
            .padding(.horizontal, 16)
            .onTapGesture {
                router.push(.character(character))
            }
            Divider()
        }
    }
}
```

Then you can build your "loading" state using mocked information:

```swift
var loadingView: some View {
    charactersView(
        characters: [
            .mock(index: 1),
            .mock(index: 2),
            .mock(index: 3)
        ]
    )
    .skeleton()
    .task {
        await viewModel.fetchCharacters()
    }
}
```

# Demo

<video style="width: 70%; @media (max-width: 768px) { width: 50%; }" controls>
    <source src="{{static.static_files}}/resources/ep089-skeleton-modifier/demo.mp4" type="video/mp4">
</video>

---

# Related Articles

* [ViewModifiers](/2023-01-03-new-app-view-modifiers/)
* [ShrinkModifiers](/2023-10-12-shrink-modifiers/)
* [SkeletonModifier](/2025-06-15-ep089-skeleton-modifier/)
* [Simple Modularization Setup for a New App](/2025-02-27-simple-modularization-setup/)
* [Centralized Dependencies](/2024-02-29-centralized-dependencies/)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
