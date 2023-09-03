---
layout: post
title: "Self-Hosted Github Actions Runners"
subtitle: "How Going In-House Can Slash Your Build Times"
date: 2023-09-03 07:00:00 -0300
tags: [tools, testing]
thumbnail-img: "/resources/self-hosted-ci/thumbnail.jpeg"
readtime: true
---

## The Drawback of GitHub-Hosted Runners

Ever wondered why your iOS builds take an eternity on GitHub Actions runners? You're not alone. Here are some possible culprits:

1. [GitHub Action (GHA) runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) primarily use [Intel-based chips](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners#supported-runners-and-hardware-resources), which may not be as efficient as newer architectures.
2. If you are not using caches, every new action has to go through multiple steps:
  * Container creation
  * Setup
  * Dependency download and installation
  * iOS simulator setup
  * Tests execution


## Case Study: A Minimal Xcode Project

As an example, I've created a new Xcode project, with just 2 files inside, and only 1 unit test:

```swift
import XCTest
@testable import TestCI

final class TestCITests: XCTestCase {
    func testExample() throws {
        XCTAssertEqual(MyVC().hey, "Hey")
        XCTAssertEqual(ContentView().myInt, 0)
    }
}
```

Then, I created this `fastlane` lane to run the tests:

```ruby
platform :ios do
  lane :tests do
    run_tests(
      scheme: "TestCI"
    )
  end
end
```

Finally, I configured a simple GitHub Actions workflow as follows:

```yml
name: iOS starter workflow

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    name: Build and Test
    runs-on: macos-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v3
      - name: Bundle install
        run: |
          bundle install
      - name: Test
        run: |
          bundle exec fastlane tests
```

**Results:**

![github-hosted]({{static.static_files}}/resources/self-hosted-ci/gha-runner.png)

The GitHub-hosted runner took a staggering **5 minutes and 9 seconds** (or 309 seconds) to complete this simple test.

## A Faster Alternative: Self-Hosted Runners

Enter self-hosted runners. If you have an M1/M2 machine, here's how you can set it up with minimal changes:

**Fastlane Lane Configuration:**

```ruby
lane :tests do
  run_tests(
    scheme: "TestCI",
    device: "iPhone 8", # Use always the same device 
    reset_simulator: false, # Avoid resetting it after the tests
    skip_detect_devices: true # Skip the devices detection
  )
end
```

**GitHub Actions Workflow:**

* Change: `runs-on: macos-latest`
* To: `runs-on: self-hosted`

### Quick Self-Hosted Setup Guide

This step was actually easier than I thought.

1. Navigate to the Repository's Settings on Github (you'd need admin rights)
2. Go to `Actions` -> `Runners`
3. Tap on `Add Runner` or `New self-hosted runner`
4. Choose your OS and architecture (ARM64 for M-chips)
5. Follow the steps on that screen to download and configure the self-hosted runner on your machine
6. Finally, run your runner with `./run.sh`

That's it, now your runner will start listening for new jobs.

**Results:**

![self-hosted]({{static.static_files}}/resources/self-hosted-ci/self-hosted.png)

After this setup, my self-hosted runner executed the same test in a blazing **14 seconds**, an almost 95% improvement!

_Note: My machine had pre-downloaded dependencies (fastlane) and an open iPhone 8 simulator, which contributed to the speed._

## Pros / Cons of going self-hosted

While the benefits are tempting, self-hosting is not a one-size-fits-all solution.

### Pros
* Faster Builds: A self-hosted runner is generally persistent, allowing you to retain build caches, derived data, and dependencies between runs. This can dramatically reduce build times.
* Customization: You can tailor the environment to your exact needs, including installing specific software or tools that are critical to your iOS development workflow.
* Performance: Tailoring hardware to your requirements could lead to faster build and test times, boosting productivity.
* Resource Control: Being on-premise means you control the resources, ensuring they are used optimally, without other tasks affecting them.
* Cost: It could be more cost-effective in the long run if you already own powerful hardware.
* Security: All code and data remain within your local network, which may be a security requirement for some of your US-based clients.
* Debugging: Easier to debug any issues when you have direct access to the environment where your code is being built and tested.

### Cons
* Maintenance: You're responsible for updates, security patches, and generally keeping the machine running smoothly
* Upfront Costs: There could be significant initial costs for powerful hardware, software licenses, and perhaps even cooling solutions.
* Electricity Costs: Running a machine 24/7 can add to your utility bills.
* Dependency: Your CI/CD pipeline would depend on the availability of your local machine. Power outages, hardware failures, or network issues could disrupt your workflow.
* Scalability: As your projects grow, you might need to invest in more hardware or distribute tasks across multiple machines manually.
* Remote Access: If you travel more (one of your goals), you'd need a reliable way to remotely access and manage your self-hosted runner.
* Cache Pollution: If not carefully managed, caches can become polluted with outdated or unused data, leading to potential inconsistencies and bugs.

---

## Final Thoughts: Is Self-Hosting for You?

With these considerations in mind, is it time for you to switch to a self-hosted runner for your iOS builds? The decision, as always, depends on your specific needs and constraints.

## Related Articles

- [Use FastLane to create PRs](/2023-08-12-use-fastlane-to-create-prs/)
- [About GitHub-hosted runners](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners)
- [About self-hosted runners](https://docs.github.com/en/actions/hosting-your-own-runners/managing-self-hosted-runners/about-self-hosted-runners)

<!-- Do not remove - SEO meta tags -->
{% seo %}