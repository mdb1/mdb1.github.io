---
layout: post
title: "SwiftUI: Adaptable Stack"
subtitle: "A Step Towards Accessibility"
date: 2023-10-07 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/adaptable-stack/thumbnail.jpg"
readtime: true
---

In the world of mobile app development, `accessibility` is not just a feature; it's a `necessity`. 

Designing your app to be accessible to everyone, including people with disabilities, is not only a good practice but also opens your app to a wider audience. One of the challenges in achieving this is to make your UI adaptable to different text sizes, especially when you're working with stacks like `HStack` and `VStack` in SwiftUI. That's where `AdaptableStack` comes in handy.

## What is an AdaptableStack?

`AdaptableStack` is a custom SwiftUI view that dynamically switches between `HStack` and `VStack` based on the user's dynamic text size settings. This is particularly useful for supporting accessibility features like Dynamic Type, which allows users to adjust the text size across the system and in apps that support it.

Here's the code for `AdaptableStack`:

<script src="https://gist.github.com/mdb1/2080d31fe626dd42b17f97d2b9337db6.js"></script>

*Note 1: You could opt to create two separate components (`AdaptableHStack` and `AdaptableVStack`) instead of one to avoid the `axis` parameter, and make the code more similar to the originals HStack and VStack.*

*Note 2: `HStackLayout` and `VStackLayout` require iOS16+ as target.*

## Why is it important?

**Accessibility:** The primary advantage of using `AdaptableStack` is to improve the accessibility of your app. By automatically adjusting the layout based on the user's text size settings, you're making your app more accessible to users with visual impairments.

**User Experience:** Another benefit is the enhanced user experience. Not all users are comfortable with the default text size, and some might need larger text to read comfortably. `AdaptableStack` ensures that your app's UI adjusts itself to meet these varying needs, providing a better experience for all users.

## How to use it?

Using `AdaptableStack` is as simple as using SwiftUI's native HStack or VStack. Here's a quick example:

```swift
struct ContentView: View {
    var body: some View {
        AdaptableStack(.horizontal, vSpacing: 32, hSpacing: 16) { // -> Starts as HStack, switches to VStack once the threshold is surpassed.
            AdaptableStack(.vertical) { // -> Starts as VStack, switches to HStack once the threshold is surpassed.
                Circle()
                    .frame(width: 100, height: 100)
                Text("Hello, world!")
                    .font(.largeTitle)
            }

            VStack(alignment: .leading) { // -> Always VStack
                Text("Title")
                    .font(.title)
                    .bold()
                    .frame(maxWidth: .infinity, alignment: .leading)
                Text("Some description")
                    .font(.subheadline)
            }
            .frame(maxWidth: .infinity)
            .padding()
            .background {
                RoundedRectangle(cornerRadius: 16)
                    .foregroundStyle(.placeholder)
            }
        }
        .padding()
    }
}

#Preview {
    VStack {
        ContentView()
        Spacer()
    }
}
```

## The Result

![Adaptable]({{static.static_files}}/resources/adaptable-stack/adaptable.png)

### Demo:

<video style="width: 70%; @media (max-width: 768px) { width: 50%; }" controls>
    <source src="{{static.static_files}}/resources/adaptable-stack/demo.mp4" type="video/mp4">
</video>

---

Whereas **without** the AdaptableStack, here is how the same code would look:

![Non-Adaptable]({{static.static_files}}/resources/adaptable-stack/fixed.png)

---

## Conclusion

`AdaptableStack` offers a simple yet effective way to make your SwiftUI apps more accessible and user-friendly. 

By taking into account the user's dynamic text size settings, it ensures that your app's UI is adaptable and inclusive. 

So the next time you're working on a SwiftUI project, consider using `AdaptableStack` to make your stacks more adaptable and your app more accessible.

---

## Related Articles

* [New App - Checklist](/2022-12-24-new-app-checklist/)
* [New App - Components](/2023-01-04-new-app-components/)

<!-- Do not remove - SEO meta tags -->
{% seo %}