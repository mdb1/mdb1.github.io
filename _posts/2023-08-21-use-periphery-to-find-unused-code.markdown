---
layout: post
title: "Use Periphery to find unused code"
date: 2023-08-21 07:00:00 -0300
tags: [coding, swift, swiftui]
thumbnail-img: /resources/periphery/logo.png
---

From time to time, it might be a good idea to spend a couple of hours checking if there is some code in the codebase that is not being used anymore.

Luckily for us, there is a tool out there that can make the job easier.

[Periphery](https://github.com/peripheryapp/periphery): _A tool to identify unused code in Swift projects._

## Using Periphery on a project

If you want to use Periphery on your `.xcodeproj`:

1. Install it: `brew install peripheryapp/periphery/periphery`
2. Navigate to your project and set it up: `periphery scan --setup`
  * Select the project
  * Select the build target
  * Select the scheme
  * Set your configuration options
  * Save the configuration file
3. The next time you can just run: `periphery scan` and it will use the same configuration previously saved.

![setup](/resources/periphery/setup.png)

As you can see, the tool found 1 property that is not being used:

`Property 'hey' is unused`

We can navigate to it and remove it.

## Using Periphery on an SPM Package

Periphery uses `swift build` to compile the code, so if your SPM package supports `macos`, the process is exactly the same as for `.xcodeproj` files.

However, if your package only supports iOS, there are some additional steps needed to make it work:

1. Build the package using `xcodebuild`:
  * Provide the scheme name
  * Provide an iOS Simulator as the destination
  * Provide a path for the derived data
  * `xcodebuild -scheme UnusedCodeExamplePackage1 -destination 'platform=iOS Simulator,OS=16.4,name=iPhone 14' -derivedDataPath '../dd' clean build`
2. Set up periphery:
  * Use `--skip-build` option
  * Provide the path to the derived data folder
  * `periphery scan --skip-build --index-store-path '../dd/Index.noindex/DataStore/' --setup`
  * Set up the configuration file and save it
3. The next time you can just run: `periphery scan`.

![scan-spm](/resources/periphery/scan-spm.png)

**Notes:**
* Remember to delete the `../dd` folder before pushing (or just use another destination for the derived data folder).
* `periphery scan` will fail if the derived data folder does not exist, in that case, just run the `xcodebuild` command again.

---

Over the long run, keeping the code as clean as possible will be a benefit for everyone in the team, given less code means less time compiling, and unused code just adds unneeded noise to the codebase.

---

Are you using [Periphery](https://github.com/peripheryapp/periphery) or something similar in your projects?

