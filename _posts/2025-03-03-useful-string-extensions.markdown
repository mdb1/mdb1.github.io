---
layout: post
title: "Useful String Extensions"
subtitle: "Great for the Utilities module"
date: 2025-03-03 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/string-extensions/thumbnail.png"
readtime: true
---

These are some String extensions that handle common scenarios gracefully. They are great fit for the Utilities module from the [Modularization article](/2025-02-27-simple-modularization-setup/).

#### Table of Contents
- [String Comparisons](#string-comparisons)
- [Automatic Plural handling](#automatic-plural-handling)
- [Related Articles](#related-articles)

## String Comparisons

The best way to compare strings is using the [compare](https://developer.apple.com/documentation/foundation/nsstring/1408732-compare) method. Using the [diacriticInsensitive](https://developer.apple.com/documentation/foundation/nsstring/compareoptions/1412313-diacriticinsensitive) option, Search ignores diacritic marks (café == Cafe).\

This is really useful when adding a searchable component to a list.

```swift
extension String {
    func matchesIgnoringCaseAndAccents(_ string: String) -> Bool {
        lowercased().compare(string.lowercased(),options: .diacriticInsensitive) == .orderedSame
    }
}

// Usage:
"café".matchesIgnoringCaseAndAccents("Cafe") // true
```

## Automatic Plural handling

Handle plurals automatically using inflection in SwiftUI views:

```swift
Text("You've used ^[\(creditCount) credit](inflect: true) this month!")
// This will read:
// You've used 0 credits this month!
// You've used 1 credit this month!
// You've used 2 credits this month!
```

---

## Related Articles

- [Simple Modularization Setup](/2025-02-27-simple-modularization-setup/)
- [Contributing Guidelines](/2023-01-02-new-app-contributing-guidelines/)
- [The Definition of Done](/2023-05-13-the-definition-of-done/)

<!-- Do not remove - SEO meta tags -->
{% seo %}

