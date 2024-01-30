---
layout: post
title: "ViewModifiers: Image Picker"
subtitle: "An easy way to let users select images"
date: 2024-01-30 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/modifiers-image-picker/thumbnail.jpg"
readtime: true
---

Here is some sample code that let you easily present a confirmation dialog that allows users to select a picture from their gallery or take a picture with their camera.

#### Table Of Contents:
- [Demo](#demo)
- [ImageSelectorOptionsModifier](#imageselectoroptionsmodifier)
  - [Image Picker](#image-picker)
  - [Usage](#usage)
- [Demo Code](#demo-code)
- [Related Articles](#related-articles)

# Demo

<video style="width: 70%; @media (max-width: 768px) { width: 50%; }" controls>
    <source src="{{static.static_files}}/resources/modifiers-image-picker/picker.mp4" type="video/mp4">
</video>

Note that given the video is recorded in the Canvas' Preview, the Camera option is not available.

# ImageSelectorOptionsModifier

<script src="https://gist.github.com/mdb1/e7eb3b43942a8087a1c22ff1c59da733.js"></script>

## Image Picker

<script src="https://gist.github.com/mdb1/7fce7f08155bffb17560757bc06ec4bc.js"></script>

## Usage

```swift
@State private var isPresentingImagePickerOptions = false
@State private var selectedImage: UIImage?

// ...

someView
    .imageSelectorOptions(
        isPresentingSourceSelector: $isPresentingImagePickerOptions,
        selectedImage: $selectedImage
    )
```

---

# Demo Code

```swift
import SwiftUI

struct ContentView: View {
    @State private var isPresentingImagePickerOptions = false
    @State private var selectedImage: UIImage?

    var body: some View {
        VStack {
            if let selectedImage {
                Image(uiImage: selectedImage)
                    .resizable()
                    .frame(width: 100, height: 100)
                    .clipShape(Circle())

                Button("Clear Selection") {
                    withAnimation {
                        self.selectedImage = nil
                    }
                }
                .tint(.red)
            }
            Button("Present Picker") {
                isPresentingImagePickerOptions = true
            }
            .imageSelectorOptions(
                title: "Select Source",
                titleVisibility: .visible,
                isPresentingSourceSelector: $isPresentingImagePickerOptions,
                selectedImage: $selectedImage
            )
        }
        .padding()
        .buttonStyle(.bordered)
    }
}

#Preview {
    ContentView()
}
```

---

# Related Articles

* [New App - ViewModifiers](/2023-01-03-new-app-view-modifiers/)
* [Shrink Modifiers](/2023-10-22-shrink-modifiers)

<!-- Do not remove - SEO meta tags -->
{% seo %}