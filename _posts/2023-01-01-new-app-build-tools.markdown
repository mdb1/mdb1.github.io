---
layout: post
title:  "New App - Build Tools"
date:   2023-01-01 07:00:00 -0300
comments: true
tags: [iOS, productivity, tools]
---

When starting a new app, it's important to set up the right set of build tools. This will help you and your team follow the same set of rules, so the app will feel more consistent.

What I like to have at the very least is:

- Linter
- Formatter
- Automation (tests / build distribution)

## Linter

[SwiftLint](https://github.com/realm/SwiftLint) is my go-to tool to _enforce Swift style and conventions_.

I like the linter to run on every build of the app, and I usually enable the `strict` mode in CI, to ensure that the `main` branch never contain lint warnings.

If you want to enforce the SwiftLint version, read [this post](/2023-07-23-enforce-minimum-swiftlint-version/).

## Formatter

For automatic code formatting, I usually pick [SwiftFormat](https://github.com/nicklockwood/SwiftFormat).

I like the formatter to run every time we run the tests, so we avoid the annoying side effect of losing the undo-history on every normal build every time it modifies the files.

Here are the options and rules I like the most:

<script src="https://gist.github.com/mdb1/7412f16a62ef0e8cabb7fe0b77fb965f.js"></script>

I also have [another post](/2023-07-22-new-app-swiftformat-config/) explaining how to configure it.

## Automation

I like to use [Fastlane](https://fastlane.tools/) primarily for two purposes:

* Have lanes specific for running the tests suites (unit tests, ui tests, etc).
* Distribute apps to TestFlight / the AppStore

---

There are many guides out there on how to set up these tools.

I've found that having these tools set up correctly before starting coding a new app had provided great value over time.

<!-- Do not remove - SEO meta tags -->
{% seo %}