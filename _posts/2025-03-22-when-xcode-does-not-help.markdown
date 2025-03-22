---
layout: post
title: "When Xcode doesn't help"
subtitle: "A guide for fixing esoteric errors"
date: 2025-03-22 07:00:00 -0300
tags: [productivity, tools, ios]
thumbnail-img: "/resources/xcode-does-not-help/thumbnail.png"
readtime: true
---

We'll talk about a few tips that I find useful when Xcode doesn't help. This is, when the error displayed by the compiler is not helpful, and/or related to the real issue.

Let's begin by identifying if the error is specific for you, or if it is a general issue.

The ability to fix these sort of issues by yourself is closely related to [Your Problem Solving Ability](/2025-03-06-your-problem-solving-ability/).

#### Table of Contents
- [Main compiles for everyone but not for you](#main-compiles-for-everyone-but-not-for-you)
  - [Nuclear Option Steps](#nuclear-option-steps)
- [Your branch does not compile for anyone](#your-branch-does-not-compile-for-anyone)
- [Related Articles](#related-articles)

# Main compiles for everyone but not for you

This is a common scenario, where the `main` branch compiles fine for everyone, but for some reason, you get a esoteric build error, an error not related to anything in particular, and that when you look online for it, there are no specific instructions and what could be causing it.

These sort of issues are usually related to the environment, index corruption, cache issues. These could also be caused when you are working on a really big project, with tons of dependencies. I've seen it happening a lot on projects that use the TCA packages, where the compiler has a hard time understanding the types.

![error]({{static.static_files}}/resources/xcode-does-not-help/error.png)

Before jumping quickly to the "nuclear option" steps, I check the Build Log in Xcode (⌘9) to try to find the root cause of the error. If I can't find it, I jump to the "nuclear option" steps.

_Note: In my day-to-day, I hardly need to perform all the steps, sometimes I just need to restart Xcode + remove Derived Data, and that's it._

## Nuclear Option Steps

1. Close Xcode
2. Remove Derived Dta
  - Remember the aliases: `alias rmdd='rm -rf ~/Library/Developer/Xcode/DerivedData'` from [My Xcode Setup and Shortcuts](/2023-03-14-my-xcode-setup-and-shortcuts).
3. Remove SwiftUI previews
  - `xcrun simctl --set previews delete all` in your directory
4. Empty Trash
5. _Optionally_ at this point you can restart your macbook.
6. Open Xcode
7. Reset Packages Caches
8. Product -> Clear All Issues
9.  Product -> Clean Build Folder
10. Product -> Build
11. _Optionally_, you could comment out each custom build phase (SwiftLint, SwiftFormat, etc).

At this point, you should either get a new error, or a successful build.

_Sometimes, it's quicker to do the nuclear option steps, than to spend hours trying to find the root cause of the error. However, if the nuclear option does not work, then you will need to put in the work to find and fix the real issue._

If the problem persists, and you don't seem to find a solution, then it might be a good time to ask for help. Maybe someone else on your team had faced the same issue, and has already come up with a solution.

# Your branch does not compile for anyone

For this example, let's assume a scenario:

- `main` compiles well for you.
- Your branch is 20 commits ahead of `main`.
- Your branch does not compile for you (and for anyone else for that matter).
- The error that you see is not helpful.

It's time to divide and conquer, at this point, you should start a binary search in your 20 commits to find the exact commit where your branch stopped working:

- Go to the 10th commit, try to Build.
  - If it doesn't build, the error is between the 1st commit and the 10th. Repeat the binary search in that subset.
  - If it builds, the error is between the 11th commit and the 20th. Repeat the binary search in that subset.
- Once you find the commit that is not building, you can check the diff (_hopefully your commits were small_).
  - If you can't find the error by looking at the diff, start rolling back each new addition, or rolling back each new change, until you find the exact line that is causing the error.
  - Then you can fix that error and continue with your day.

I don't want to sound repetitive, but [Your Problem Solving Ability](/2025-03-06-your-problem-solving-ability/) is essential for your success. You need to spend time finding the solution to your own problems. It's ok to ask for help, but before you do, exhaust most options.

---

# Related Articles

- [Your Problem Solving Ability](/2025-03-06-your-problem-solving-ability/)
- [My Xcode Setup and Shortcuts](/2023-03-14-my-xcode-setup-and-shortcuts)
- [H Mode](/2022-10-26-h-mode/)
- [Configuring a New MacBook](/2023-03-18-configuring-a-new-mac/)
- [Advice I Wish I Had Gotten Earlier](/2025-02-22-advice-i-wish-i-had-gotten-earlier/)
- [New App Checklist](/2022-12-24-new-app-checklist/)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
