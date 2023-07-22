---
layout: post
title:  "New App - Configuring SwiftFormat"
date:   2023-07-22 07:00:00 -0300
tags: [swift]
---

When starting a new app, I usually like to set up an automatic code formatter. By agreeing with your team about the rules, and setting a tool to automatically enforce them, you can avoid formatting discussions in the PRs, and you can achieve a codebase where every file looks similar in format.

I like to use [SwiftFormat](https://github.com/nicklockwood/SwiftFormat) as the formatter for my projects.

# 1. Install using SPM

Following the instructions on their Readme:

`1.` Create a folder called `BuildTools` in the same folder as your xcodeproj file.

`mkdir BuildTools`

`2.` Create a file called `Empty.swift` with nothing in it inside the BuildTools folder.

`cd BuildTools && touch Empty.swift`

`3.` Create a file called `Package.swift` in the BuildTools folder, with the following contents:

```swift
// swift-tools-version:5.7
import PackageDescription

let package = Package(
    name: "BuildTools",
    platforms: [.macOS(.v13)],
    dependencies: [
        .package(url: "https://github.com/nicklockwood/SwiftFormat", from: "0.51.13")
    ],
    targets: [.target(name: "BuildTools", path: "")]
)
```

`touch Package.swift && vim Package.swift` -> Then paste the contents from above and save.

# 2. Add a BuildPhase to the project

`1.` Click on your project in the file list, choose your target under TARGETS, click the Build Phases tab.

`2.` Add a New Run Script Phase by clicking the little plus icon in the top left.

`3.` Uncheck the Based on dependency analysis checkbox.

`4.` Drag the new Run Script phase above the Compile Sources phase, expand it and paste the following script:

```bash
SDKROOT=(xcrun --sdk macosx --show-sdk-path)
swift run \
    -c release \
    --package-path BuildTools \
    swiftformat "$SRCROOT" \
    --minversion 0.51.13 \
    --config BuildTools/.swiftformat \
    --swiftversion 5.7
```

`5.` It is recommended to add the following to your .gitignore file: BuildTools/.build and BuildTools/.swiftpm.

`vim .gitignore`

Paste the following:

```bash
BuildTools/.build
BuildTools/.swiftpm
```

_Note: Running SwiftFormat has the undesired side-effect of removing the undo/redo actions, so I recommend adding the BuildPhase to one of the test's target instead of the app's target._

# 3. Configure the Rules

SwiftFormat comes with a [set of rules](https://github.com/nicklockwood/SwiftFormat/blob/master/Rules.md) to choose from. Here is the list I like to use:

```bash
# format options
--allman false
--indent 4
--maxwidth 120
--commas inline
--decimalgrouping 3
--wraparguments before-first

# rules
--enable isEmpty
--disable redundantType
--disable wrapMultilineStatementBraces
```

To configure the rules:

`cd BuildTools && touch .swiftformat && vim .swiftformat` -> Paste the rules from above and save the file.

# 4. Test the implementation

`1.` Build the target where you added the Build Phase.

_Note: The first time you build it, the phase will fetch the SwiftFormat package from the internet, so it might take a while, after that one, every build should be fast._

`2.` Check that the files where modified after the build.

### Before:

```swift
struct ContentView: View {
    @State private var isPresentingSheet: Bool = false
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
            .foregroundColor(.accentColor)
            Text("Hello, world!"
                        )
            Button {
                isPresentingSheet = true }
        label: {
                Label("Present Bottom Sheet", image: "star")
            }
        }
        .padding()
        .sheet(
            isPresented: $isPresentingSheet)
        {
            Text("Hey!")
        }
    }
}
```

### After:

```swift
struct ContentView: View {
    @State private var isPresentingSheet: Bool = false
    var body: some View {
        VStack {
            Image(systemName: "globe")
                .imageScale(.large)
                .foregroundColor(.accentColor)
            Text(
                "Hello, world!"
            )
            Button {
                isPresentingSheet = true
            }
            label: {
                Label("Present Bottom Sheet", image: "star")
            }
        }
        .padding()
        .sheet(
            isPresented: $isPresentingSheet
        ) {
            Text("Hey!")
        }
    }
}
```

Here is an [example repository](https://github.com/mdb1/SwiftFormatInstallationInstructions) where everything is configured.

# Run SwiftFormat from the console

Sometimes you want to run the formatter from the console directly, to do so, I like to set up some bash scripts and add them to my `.zshrc` for convenience:

`1.` Create the script

```bash
cd ~/path-to-the-project-root && swift run -c release --package-path BuildTools swiftformat . --minversion 0.51.13 --config BuildTools/.swiftformat --swiftversion 5.7
```

`2.` Add it to the `.zshrc`

`vim ~/.zshrc`

Add a new entry:

`alias format='Paste the script from point 1 here'`

Save it.

`3.` Reload the `zshrc` file:

`source ~/.zshrc`

`4.` Run the formatter from anywhere in the console:

`format`

---

I hope you found this article helpful, see you next time! 😄