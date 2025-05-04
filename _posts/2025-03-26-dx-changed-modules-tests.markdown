---
layout: post
title: "DX: Only run unit tests for changed modules"
subtitle: "A quick-win Fastlane lane"
date: 2025-03-26 07:00:00 -0300
tags: [ios]
thumbnail-img: "/resources/ep082-dx-changed-modules-tests/thumbnail.webp"
readtime: true
---

Here is a quick developer experience win: `Only run the unit tests for the modules with changes against a base branch`.

We'll build upon the [Simple Modularization](/2025-02-27-simple-modularization-setup/) post. In that repo, we added a lane to run all the tests of all the modules. Now, we will add a lane to only run the tests for the modules with changes, to speed up the process and improve the developer experience.

This will also save up precious CI time, as developers will get test failures on their machines, without the need to wait for the CI to run all the tests.

#### Table of Contents
- [Gathering the changed packages](#gathering-the-changed-packages)
- [Running the tests](#running-the-tests)
- [Related Articles](#related-articles)
- [Featured in](#featured-in)

# Gathering the changed packages

The first thing we need to do, is to add a method to check the diff between the current branch and the base branch.

We can do this by executing a really simple shell command:

`git diff --name-only origin/main`

This will return a list of files that have changed between the current branch and the base branch.

Example:

- `Packages/CoreLayer/APIModels/Sources/APIModels/APIModel.swift`

Then we need to extract the Scheme for the changed package and store all the changes packages.

![diff]({{static.static_files}}/resources/ep082-dx-changed-modules-tests/diff.png)

# Running the tests

For this, we can leverage the `test_all_packages` lane that we already have, but modify it to receive an array of packages.

Check the complete diff in [this commit](https://github.com/mdb1/ModularTemplate/commit/b2fa5110e9b961bd387cca2aae21938ca5fdd660).

```
> bundle exec fastlane test_changed_packages
---------------------------
--- Step: shell command ---
---------------------------
🔍 Found 1 changed packages: CoreLayer/APIModels
--------------------------------------------------
--- Step: Switch to ios test_all_packages lane ---
--------------------------------------------------
Cruising over to lane 'ios test_all_packages' 🚖
🚀 Running tests for specified packages: CoreLayer/APIModels
▶️ Testing APIModels...
▸ Test Succeeded
✅ APIModels: 1/1 tests passed
   Coverage: ⚠️ No coverage data

📊 Test Results Summary
✅ Passed: 1 packages, 1 tests
  • APIModels - 1/1 tests
    Coverage: ⚠️ No coverage data

📈 Overall Statistics
Total tests: 1
Passed: 1
Failed: 0
🎉 All tests passed successfully!
Cruising back to lane 'ios test_changed_packages' 🚘
fastlane.tools finished successfully 🎉
```

---

With this new `test_changed_packages` lane, we can now speed up development, run the tests more often, and save valuable CI time.

---

# Related Articles

- [Simple Modularization Setup](/2025-02-27-simple-modularization-setup/)
- [My Xcode Setup and Shortcuts](/2023-03-14-my-xcode-setup-and-shortcuts)
- [New App Checklist](/2022-12-24-new-app-checklist/)

---

# Featured in
- [TestableApple #55](https://testableapple.com/newsletter/55/)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
