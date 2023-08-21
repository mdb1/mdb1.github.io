---
layout: post
title: "Improve the build times of your SPM Packages and your apps"
date: 2023-08-18 07:00:00 -0300
tags: [coding, swift, swiftui]
thumbnail-img: /resources/build-times/spm-before-timeline.png
---

Get ready to uncover some of the secrets of faster build times – an investment that's not just about speed, but about creating a more satisfying and efficient development journey for you and your entire team.

# Measuring and Improving Build Times

## Measure the time of the builds

Alright, first of all, we need to understand that in order to measure concrete results, we need to do our best effort to use the same environment for the before / after tests. For example: use the same machine, connected to power, without running other applications.

Now, we need to think about which build do we want to improve:

* `Clean Builds`: Clean builds, also known as full builds, involve compiling the entire codebase from scratch, regardless of whether any changes have been made. To improve clean builds' time:
  * Check the [Improve Compile Time in Xcode Projects](#improve-compile-time-in-xcode-projects) section
  * Check the [Improve Compile Time in SPM Packages](#improve-compile-time-in-spm-packages) section
  * Check the [Build with Timing Summary + Recent Build TimeLine](#build-with-timing-summary-and-recent-build-timeline) section

* `Incremental Builds`: Incremental builds involve compiling only the code that has changed since the last build. To improve incremental builds' time:
  * Use modules (SPM Packages work great)
  * Use the correct Access Level in your code
  * Check the [Build with Timing Summary + Recent Build TimeLine](#build-with-timing-summary-and-recent-build-timeline) section

## Build with Timing Summary and Recent Build TimeLine:

Xcode provides two great tools to measure the compilation time:

### 1. Build with Timing Summary: 
From the `Product` Menu -> Perform Action -> Build With Timing Summary:
  * _Note: For clean builds, remember to clean the build folder (`Command + Shift + K`) before performing the build._
  * Once the build finishes, select it from the `Report navigator`, select `Recent` and `All Messages` sub tabs, then scroll all the way down to check the report.

**Clean Build:**
![clean-build](/resources/build-times/before-clean-build.png)

**Incremental Build:**
![incremental-build](/resources/build-times/before-incremental-build.png)

_Note: This is a brand new project with only one file. There is test code inside that file to make the compilation slower, for the sake of this article._

As we can see, the Clean build is taking `~6 seconds` to compile and `~5 seconds` in a PhaseScriptExecution. Whereas the Incremental build only reports the same `~5 seconds` in the same PhaseScriptExecution.

So, if we take a look at why is the `PhaseScriptExecution` taking too long, we can save up valuable time on `each` build! That's a lot of saved time over time. 

You can do the math, if you have 5 developers, running 30 incremental builds a day, just saving up `2 seconds` per build will end up in `25 saved minutes` per week. And that's without counting the CI time.

In this example, by cutting down all the extra work in the `PhaseScriptExecution`, we've reduced the incremental build time by 5 seconds:

![after-incremental-build](/resources/build-times/after-incremental-build.png)

We'll take a look at how to reduce the clean build time in the [Improve Compile Time in Xcode Projects](#improve-compile-time-in-xcode-projects) section.

### 2. Recent Build TimeLine

The `Recent Build TimeLine` feature is quite handy for analyzing build times. To access it, select a recent build and go to `Editor -> Assistant`. This timeline view provides a visual representation of build processes and times, helping you identify areas that need optimization.

**Clean Build:**

![timeline-before](/resources/build-times/timeline-before.png)

Note that each row represents a different core, on a bigger project, each core should be filled up with work in parallel, to make the build run faster. In this example, the project only needs to compile one file, that's why what we see is only one core doing most of the work.

We can also see, that there are 2 main blocks of work:
1. Compiling the ContentView.swift file 
2. The `PhaseScriptExecution`

After the fix to the `PhaseScriptExecution` (Incremental Build):

![timeline-after](/resources/build-times/timeline-after.png)

## Improve Compile Time in Xcode Projects:
It's time to roll up our sleeves and reduce the compilation time of our code.

The first step is to make Xcode display warnings in the code that takes too long to compile:

1. Select your target project
2. Go to the `Build Settings` tab.
3. Select the `All` sub tab.
4. Filter `Other Swift Flags`.
5. Add the following:

```bash
-Xfrontend -warn-long-function-bodies=<milliseconds>
-Xfrontend -warn-long-expression-type-checking=<milliseconds>
```

I usually start replacing the `<milliseconds>` part with `50`.

These flags enable warnings for long function bodies and expression type checking, allowing you to identify potential bottlenecks in your codebase.

![other-swift-flags](/resources/build-times/other-swift-flags.png)

### Example

Here is a method that takes too long to type-check:

![warnings](/resources/build-times/nested-inference-warnings.png)

We can reduce the build time by being more explicit with the types, and avoid using too many chained high order functions:

![fix](/resources/build-times/nested-inference-fix.png)

Now, we can check our build times again:

**Clean Build:**
![after-clean](/resources/build-times/after-clean-build.png)

**Incremental Build:**
![warnings](/resources/build-times/after-incremental-build.png)

## Improve Compile Time in SPM Packages:

We can actually do the same For SPM packages, by applying the following `swiftSettings` to the target:

```swift
.target(
    name: "BuildTimesPackage",
    dependencies: [],
    swiftSettings: [
        .unsafeFlags([
            "-Xfrontend",
            "-warn-long-function-bodies=50",
            "-Xfrontend",
            "-warn-long-expression-type-checking=50"
        ])
    ]
),
```

_You could build your whole app target with multiple SPM packages using those settings, or just build a specific module as a standalone target with those settings._

### Example
_Note: I've added the exact same code that took ~5 seconds to compile in the main app target to the SPM Package._


Now we can perform a clean build and measure the time:

**TimeLine:**
![timeline](/resources/build-times/spm-before-timeline.png)

**Timing Summary:**
![timing-summary](/resources/build-times/spm-before-timing-summary.png)

**Warnings:**
![clean-build-warning](/resources/build-times/spm-before-clean-build.png)

```
🤯 This actually blew my mind. 
The exact same code took ~1.3 seconds
to compile in a clean build in the SPM package. 
That's almost 75% faster than the main app target, 
just by moving it to a package.

I will have to do more research, 
but it seems that the SPM compiler 
is far more efficient than the one in Xcode.
```

We can also see that now the `TimeLine` displays a more efficient use of the cores.

It's also worth noticing, that when using different modules, the `TimeLine` is way more useful than the `Timing Summary` to identify the issues.

**Fix:**

After applying the same fix as above, we can make a new clean build and:

![clean-build-fix](/resources/build-times/spm-after-timing-summary.png)

## SwiftLint Rules:

`So, is there a way to enforce the avoidance of type inference?`

Yes, we can use a couple of SwiftLint rules:

The [explicit_init](https://realm.github.io/SwiftLint/explicit_init.html) and [explicit_type_interface](https://realm.github.io/SwiftLint/explicit_type_interface.html) rules can indeed help streamline your code and potentially reduce build times. Ensuring clarity in your code's initialization and type interfaces can prevent unnecessary ambiguity that might slow down the build process.

We could also add this custom rule, to avoid the usage of the `.init` sugar syntax.

```yml
  init_with_name:
    name: "Init With Name"
    message: "Prefer let object = Class() instead of let object: Class = .init()"
    included: ".*.swift"
    regex: '(?<!self|super)\.init\('
    match_kinds:
      - identifier
      - keyword
    severity: warning
```

![swiftlint-rules](/resources/build-times/swiftlint-rules.png)

```
Note: I'm not 100% sure if helping the compiler by
providing all the types, and avoiding the type inference
actually saves time for each method / property.

However, most of the times that I've seen methods taking
longer than 50ms to compile, providing the explicit types
seems to fix the warnings.

At the end of the day, I think opting in to these rules or not
should be a team decision, keeping an eye to the build time
and to the way they like to work with syntactic sugar.
```

## Other Xcode optimizations

If you create a new Xcode project today, these settings will already be set correctly to optimize the build by default, but in case you are working with a legacy project (or a project where these settings were changed), here is the list of the build settings that are established as the better ones for improving the build times:

**Swift Compiler:**

![code-gen](/resources/build-times/xcode-config/compiler-code-generation-compilation-mode.png)

![optimization](/resources/build-times/xcode-config/compiler-code-generation-optimization-level.png)

**Architectures:**

![architectures](/resources/build-times/xcode-config/architectures.png)

**Build Options:**

![build-options](/resources/build-times/xcode-config/build-options.png)

---

# Additional Tips:

* Check that your scheme's build configuration is set to `Debug`.
* Use a modularized architecture: Take advantage of how easy it's to move code to modules using SPM.
* Avoid Type Inference: Explicitly defining types can prevent the compiler from spending extra time inferring types, leading to faster builds.
* Avoid shorthand enums usage. Instead of `status == .blocked`, use `status == UserStatus.blocked`. _Note: I couldn't find a way to enforce this rule with a linter yet._
* Use View Composition: Embracing view composition can result in more modular and focused code, which can lead to improved build times.
* Access Control: Employing the correct access control for your code can help the compiler optimize compilation, reducing unnecessary work.
* Use [Periphery](https://github.com/peripheryapp/periphery) to find and delete unused code.
  * Or read [my Periphery guide](https://mdb1.github.io/2023-08-21-use-periphery-to-find-unused-code/).
* Watch the [Demystify parallelization in Xcode builds](https://developer.apple.com/videos/play/wwdc2022/110364/) `WWDC 2022` video.
* Read the [Build performance analysis for speeding up Xcode builds](https://www.avanderlee.com/optimization/analysing-build-performance-xcode/) article from [Antoine van der Lee](https://twitter.com/twannl)
* Read the [How to optimize Xcode project Build time](https://medium.com/naukri-engineering/improve-your-xcode-project-compile-time-8c60bd53011f) article from [Rushabh Singh](https://rushabhsingh777.medium.com/)

---

Let me know if you try some of the things explained in this article and if that helped to improve your build times. I'll be happy to talk about it 😁.

Are there any other improvement tips that I missed and you are using in your projects?

---