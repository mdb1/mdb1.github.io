---
layout: post
title: "GHA: Cloning Private Dependencies"
subtitle: "Using SSH keys to access your private repositories in Github Actions"
date: 2024-03-12 07:00:00 -0300
tags: [iOS, testing]
thumbnail-img: "/resources/unit-tests-gha-with-private-dependencies/thumbnail.jpeg"
readtime: true
---

A simple github action that will allow you to build/test your Xcode projects in CI, even if your package declares dependencies that are stored in private repositories.

#### Table Of Contents:
- [Sample Package.swift](#sample-packageswift)
- [Step 1. Create the SSH Key + Add it to your Github Account](#step-1-create-the-ssh-key--add-it-to-your-github-account)
- [Step 2. Add the Github Account in Xcode](#step-2-add-the-github-account-in-xcode)
- [Step 3. Configuring CI](#step-3-configuring-ci)
  - [Add the private SSH Key as a repository secret](#add-the-private-ssh-key-as-a-repository-secret)
  - [Create the yml file](#create-the-yml-file)
- [Related Articles](#related-articles)

# Sample Package.swift

Let's say your Package.swift looks like this:

```swift
// swift-tools-version: 5.7
// The swift-tools-version declares the minimum version of Swift required to build this package.

import Foundation
import PackageDescription

let package = Package(
    name: "PackageName",
    platforms: [.iOS(.v17)],
    products: [
        .library(
            name: "PackageName",
            targets: ["PackageName"]
        )
    ],
    dependencies: [
        .package(
            url: "git@github.com:orgname/private-repo-name.git",
            exact: "1.0.1"
        ),

        .package(
            url: "git@github.com:orgname/private-repo-2-name.git",
            exact: "2.1.0"
        )
    ],
    targets: [
        ...
    ]
)
```

Notice that we are using `SSH` for the dependencies (instead of HTTP). This is important, given we will be using `SSH` in the GHA to clone them.

# Step 1. Create the SSH Key + Add it to your Github Account

The first thing we need to do (even to correctly run that package in Xcode) is to create the SSH Key in the console. 

_It goes without saying, that the account where you are adding the SSH key must have access to the private repositories you want to access._

* [Here](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) is the official Github documentation.
* And [here](/2023-03-18-configuring-a-new-mac/#ssh-keys) you can find the step by step from a previous post.

# Step 2. Add the Github Account in Xcode

1. Open Xcode
2. Settings `⌘ + ,` _(Remember your [Xcode Shortcuts](/2023-03-14-my-xcode-setup-and-shortcuts#shortcuts))_
3. Accounts
4. Add
5. Github
6. Enter your email and a Personal Access Token (PAT)
7. Select Clone Using: `SSH`
8. And select the SSH Key you have created from the dropdown menu

At this point, the Package.swift should be able to fetch the private dependencies. _(Remember Reset Package Caches if it fails the first time)_

# Step 3. Configuring CI

Now, it's time to run our tests using Github Actions.

## Add the private SSH Key as a repository secret

1. Open your repository on Github
2. Settings _(You will need `admin` rights)_
3. Secrets and Variables
4. Actions
5. `New repository secret`
6. _(You will need `admin` rights)_
7. Give it a name _(I usually use `SSH_PRIVATE_KEY`)_
8. Paste the private key in the `Secret` box
   1. cat /Users/manu/.ssh/name-of-your-key | pbcopy
9.  Tap on `Add Secret`

## Create the yml file

* Create a new file under `.github/workflows`
* I usually name it `unit_tests.yml`

```yml
name: Run Unit Tests

# It will run:
# * On every PR,
# * Manually
on: [pull_request, workflow_dispatch]

jobs:
  run_unit_tests:
    name: Unit Tests
    runs-on: macos-13

    steps:
    - name: Select Xcode 15.2
      run: sudo xcode-select -switch /Applications/Xcode_15.2.app && /usr/bin/xcodebuild -version

    - name: Checkout repository + SSH Key Setup
      uses: actions/checkout@v4
    - uses: webfactory/ssh-agent@v0.9.0
      with:
        # Remember to use the same name as the one you used in the repository secret step.
        # Remember to use double curly braces for opening and closing the secrets.
        ssh-private-key: { secrets.SSH_PRIVATE_KEY }

    - name: Run package unit tests
      run: xcodebuild -project YourProjectName.xcodeproj -scheme "YourScheme" -sdk iphonesimulator -destination 'platform=iOS Simulator,name=iPhone 15 Pro,OS=17.2' test | xcpretty
```

That's it, the [webfactory/ssh-agent@v0.9.0](https://github.com/marketplace/actions/webfactory-ssh-agent) will take care of configuring the SSH key in the CI environment, and now you can access private repositories in your actions.

---

# Related Articles

* [Self-Hosted Github Actions Runners](/2023-09-03-self-hosted-gha-runners/)
* [How to keep up with the industry standards](/2023-04-04-industry-standards/)
* [Use FastLane to create PRs](/2023-08-12-use-fastlane-to-create-prs/)
* [New App - Checklist](/2022-12-24-new-app-checklist/)


<!-- Do not remove - SEO meta tags -->
{% seo %}