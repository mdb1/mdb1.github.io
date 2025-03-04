---
layout: post
title: "Day to Day Starting 11"
subtitle: "The ToolSet Team to win championships"
date: 2024-09-15 07:00:00 -0300
tags: [iOS]
thumbnail-img: "/resources/toolset-team/preview.png"
readtime: true
---

As a developer, I use (and have used) many tools to improve my productivity, outcomes, and to basically make my life a little easier on a day to day basis.

In this post, I will briefly mention the ones that I think have brought more value to my career and why.

#### Table Of Contents:
- [The Team](#the-team)
  - [Github Actions](#github-actions)
  - [SwiftLint](#swiftlint)
  - [SwiftFormat](#swiftformat)
  - [DangerSwift](#dangerswift)
  - [Monitoring Build Times](#monitoring-build-times)
  - [FastLane](#fastlane)
  - [Linear](#linear)
  - [Figma](#figma)
  - [Slack](#slack)
  - [RocketSim](#rocketsim)
  - [Notion](#notion)
  - [Manager (DT)](#manager-dt)
  - [ChatGPT](#chatgpt)
  - [Substitutes](#substitutes)
- [Related Articles](#related-articles)
  - [Featured in](#featured-in)

# The Team

![team]({{static.static_files}}/resources/toolset-team/team.jpg)

## Github Actions

The goalkeeper, `#1`, a [CI/CD system](https://docs.github.com/en/actions) that is able to catch problems before reaching the users. Easy to setup, easy to scale, easy to understand. The ability to cost $0 for public repositories, or for [self-hosted runners]((/2023-09-03-self-hosted-gha-runners/)).

Main usages includes:

- Running tests/checks on PRs
- Ability to distribute builds

Some substitutes could be: [Jenkins](https://www.jenkins.io/), or [Bitrise](https://bitrise.io/).

## SwiftLint

With `#4` on the t-shirt, [SwiftLint](https://github.com/realm/SwiftLint), a tool to enforce the team's conventions for styling. The easiest way to avoid extra comments on PRs just talking about indentation.

## SwiftFormat

On the other side of the defensive line, with number `3`, [SwiftFormat](https://github.com/nicklockwood/SwiftFormat). With minimal set-up effort, a great way to automatically format the code to ensure it's consistent across the codebase.

## DangerSwift

`#2` on the back for [DangerSwift](https://github.com/danger/swift). Another great defensive tool, it can perform some basic checks on the PRs before, it can comment on PRs, or even block the merge if the rules are not met.

A substitute for this tool could be a good pre-commit hook, but we know that developers can by-pass those.

## Monitoring Build Times

Wearing number `6`, not a tool in itself, but the BuildTime is the player. A great way to be a little bit more defensive, is to constantly monitor the build time of your app, your modules, or even a particular method.

You can find information about this on [this article](/2023-08-18-improve-build-times-in-spm-packages-and-in-your-apps/).

## FastLane

`#5` has to go to [FastLane](https://fastlane.tools/), the tool that makes everything else easier, most of my automation is made (or is facilitated) by this tool.

## Linear

With `#8`, the fastest member of the team, [Linear](https://linear.app/). From all the project management tools I've used, this one is by far the one that feels faster. It doesn't over-complicate things and is as easy to understand as it gets.

Some substitutes could be: [Asana](https://asana.com/), [Github Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects), or [Jira](https://www.atlassian.com/software/jira). But those would need to try harder during practices to make it to my starter-11.

## Figma

The go-to [tool](https://www.figma.com/) for designs, it gets the t-shirt `#7`. Not much to say about this one, no real substitutes right now.

## Slack

![slack]({{static.static_files}}/resources/toolset-team/10-slack.jpg)

Number `10` for [Slack](https://slack.com/), the collaboration tool. Without this team member, everything else would fall off. Can make you win games if used right.

## RocketSim

A great scorer with the `#9`, [RocketSim](https://www.rocketsim.app/), a tool that gives your simulator super-powers. Great to enhance PRs by providing videos, and before/after screenshots.

A great scorer substitute is [ProxyMan](https://proxyman.io/). Helping to capture, debug, and mock HTTP network request. Really useful to make sure all the scenarios are handled.

## Notion

Finally, with `#11`, [Notion](https://www.notion.so/), this is where all the documentation should live. Really helpful for design docs, team collaboration, feature documentation, edge cases. If used correctly, Slack communication becomes far easier, as you could point people to Notion docs when they ask for specific questions.

## Manager (DT)

Me (or you, in your case). You are the manager of the team. You give the directions and specify to each player what to do. You are the responsible on the wins, and the person to blame on the loses.

## ChatGPT

Finally, the `assistant manager`, [ChatGPT](https://chat.openai.com/). Whenever you need some assistance, it will always be there to ping-pong with you.

## Substitutes

Some subs for the team, that were not mentioned so far:

- [Sourcery](https://github.com/krzysztofzablocki/Sourcery): Code-gen for protocols' mocks.
- [Bors](https://github.com/bors-ng/bors-ng): Merge bot queue for PRs.
- [OpenAPI](https://www.openapis.org/): Standard Interfaces for APIs. Useful in combination with code-generation tools.
- [Postman](https://www.postman.com/): Useful for quickly testing APIs.
- [Tuist](https://tuist.io/): A tool to generate Xcode projects in a consistent way.
- [Periphery](https://github.com/peripheryapp/periphery): A tool to identify unused code in Swift projects.
- [Learning your shortcuts](https://www.manu.show/2023-03-14-my-xcode-setup-and-shortcuts/)

---

Let me know what is *your* `starting 11`! What am I missing?

---

# Related Articles

- [SwiftFormat](/2023-07-22-new-app-swiftformat-config/)
- [SwiftLint](/2023-07-23-enforce-minimum-swiftlint-version/)
- [GHA: Cloning Private Dependencies](/2024-03-12-unit-tests-gha-with-private-dependencies)
- [GHA: Self-hosted runners]((/2023-09-03-self-hosted-gha-runners/))
- [GHA: Run unit tests in PRs](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane.md)
- [GHA: Deploy builds](https://github.com/mdb1/SwiftyPick/blob/main/Documentation/Fastlane+Distribution.md)
- [Improve your build times](/2023-08-18-improve-build-times-in-spm-packages-and-in-your-apps/).
- [The Definition of Done](/2023-05-13-the-definition-of-done/)
- [Use Periphery to find unused code](/2023-08-21-use-periphery-to-find-unused-code/)


---

## Featured in

- [iOS Coffee Break #15](https://www.ioscoffeebreak.com/issue/issue15)

<!-- Do not remove - SEO meta tags -->
{% seo %}