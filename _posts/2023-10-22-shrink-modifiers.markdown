---
layout: post
title: "ViewModifiers: Shrinking views"
subtitle: "Some simple modifiers to shrink views on tap or long press"
date: 2023-10-22 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/modifiers-shrink/thumbnail.jpg"
readtime: true
---

These are some simple view modifiers that add shrinking customizable animations to the tap gesture or the long press gesture of any view.

I find these modifiers pretty useful when trying to add some interactions to my UIs.

## Demo

In this video:

* The `plus` image has the `LongPressShrink` modifier, so the count increases once the LongPress gesture is successfully finished (0.5 seconds of continuous tap).
* The `Hello, World!` Text has the `TapShrink` modifier, so the count increases once the tap gesture ends. 

<video style="width: 70%; @media (max-width: 768px) { width: 50%; }" controls>
    <source src="{{static.static_files}}/resources/modifiers-shrink/shrink.mp4" type="video/mp4">
</video>

## TapShrinkModifier

<script src="https://gist.github.com/mdb1/4680d796b91c370eb07ba6f6da1d6775.js"></script>

### Usage:

```swift
someView
    .shrinkOnTap {
        // This will be executed once the tap gesture finishes.
        print("Tapped")
    }
```

## LongPressShrinkModifier

<script src="https://gist.github.com/mdb1/85215950d5066dcd3c320a39eae0be7c.js"></script>

### Usage:

```swift
someView
    .shrinkOnLongPress {
        // This will be executed once the user long pressed the view for the given time.
        // (0.5s by default).
        print("Long Press Finished")
    }
```

## The Code from the video:

If you want to try it out, just create some files with the view modifiers code from above. Here is the code from the Preview in the Demo Video:

```swift
struct ContentView: View {
    @State private var count: Int = 0

    var body: some View {
        VStack {
            Image(systemName: "plus")
                .resizable()
                .frame(width: 50, height: 50, alignment: /*@START_MENU_TOKEN@*/.center/*@END_MENU_TOKEN@*/)
                .foregroundStyle(.tint)
                .shrinkOnLongPress {
                    count += 1
                }

            Text("Increase Count")
                .font(.title3)
                .foregroundStyle(.secondary)
                .shrinkOnTap {
                    count += 1
                }
                .padding(.bottom)

            Text("Count: \(count.description)")
                .foregroundStyle(.black)
        }
        .padding()
        .imageScale(.large)
    }
}

#Preview {
    ContentView()
}
```

---

## Related Articles

* [New App - Checklist](/2022-12-24-new-app-checklist/)
* [New App - Components](/2023-01-04-new-app-components/)
* [New App - ViewModifiers](/2023-01-03-new-app-view-modifiers/)

<!-- Do not remove - SEO meta tags -->
{% seo %}