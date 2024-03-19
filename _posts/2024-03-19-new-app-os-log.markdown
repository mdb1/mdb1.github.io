---
layout: post
title: "New App - OSLog Console Logger"
subtitle: "Leveraging OSLog in your console"
date: 2024-03-19 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/new-app-os-log/logs.png"
readtime: true
---

An updated version of the original [console log post](/2023-05-06-new-app-console-logger/), this time, using Apple's OSLog instead of a custom enum.

#### Table Of Contents:
- [OSLog](#oslog)
- [Logger as Dependency](#logger-as-dependency)
  - [Usage](#usage)
- [Levels](#levels)
- [In the Console](#in-the-console)
- [Privacy](#privacy)
- [Related Articles](#related-articles)

# OSLog

OSLog is Apple's unified logging system. It's really simple to use, and it allows a lot of customization in the console.

It's fast and you don't need to worry about not logging in Release mode.

# Logger as Dependency

Using the approach from the [Centralized Dependencies](/2024-02-29-centralized-dependencies/) post, we can add the Logger to the World struct:

```swift
import OSLog

struct World {
    // ...
    var logger: Logger { Logger(subsystem: "your.app.bundleId", category: "PackageName") }
}
```

## Usage

Then, we can just use it from anywhere in our package:

```swift
Current.logger.debug("Something to debug")
```

# Levels

```swift
import SwiftUI

struct ContentView: View {
    var body: some View {
        VStack {
            Button("Debug") { Current.logger.debug("Debug") }
            Button("Info") { Current.logger.info("Info") }
            Button("Notice") { Current.logger.notice("Notice") }
            Button("Error") { Current.logger.error("Error") }
            Button("Critical") { Current.logger.critical("Critical") }
        }
        .padding()
    }
}
```

# In the Console

In Xcode's console, you can adjust the metadata you want to see in the logs:

![metadata]({{static.static_files}}/resources/new-app-os-log/metadata.png)

![logs]({{static.static_files}}/resources/new-app-os-log/logs.png)

You can also go directly to the line of code that produced the log:

![jump-to-line]({{static.static_files}}/resources/new-app-os-log/jump.png)

The filters are also great:

![filters]({{static.static_files}}/resources/new-app-os-log/filters.png)

# Privacy

In release mode, all interpolated strings will be hidden by default. You can override this using the `privacy` parameter:

```swift
Current.logger.debug("Debug: \(userId, privacy: .public)")
```

---

I think it's a pretty straight forward way to log information to the console. It's really useful if you have multiple packages to filter the logs of just a small subset of modules.

---

# Related Articles

* [New App - Checklist](/2022-12-24-new-app-checklist/)
* [NetworkLogger](/2023-05-27-network-logger/)


<!-- Do not remove - SEO meta tags -->
{% seo %}