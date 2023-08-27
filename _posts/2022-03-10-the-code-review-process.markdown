---
layout: post
title:  "The Code Review Process"
date:   2022-03-10 21:41:55 -0300
comments: true
tags: [iOS, productivity]
---

> No matter how experienced we are, we will make mistakes at work.

This simple fact is one of the reasons why Code Reviews are so important.

```
🥅 The goal is to have a quick feedback cycle on PRs 
and to merge them on short periods of time.
```

## Code Reviews

### The goals

- Maintain a high quality codebase and product.
- Share knowledge about the codebase.
- Since we expect long-lived code to be read more than it is written, we want to optimize for readability & understandability.
- Building a positive culture.
- Value learning over the process.

### Priority and timing

Code reviews should be prioritized over other types of work because it *unblocks* other developers. However, this does not mean to stop whatever you are doing every time a new PR arrives. Finish your focus block and review the PR afterwards.

If a PR needs urgent reviews, it can be escalated via Slack DMs.

The idea is to have fast feedback cycles and to merge PRs within a day (for regular size PRs, less than ~500 lines changed).

## Pull Requests

### Process

- Complete a detailed PR description describing *what and why* changes were made.
    - High-level goal and reason for the changes.
    - Add relevant links (ticket number, bug report page, slack discussions).
    - Describe the changes that were performed.
    - Add testing details (steps to reproduce, test user credentials, etc).
    - If the UI was changed, provide screenshots and/or videos.
```
📝 The more context you provide, the easier the PR will be to review, 
and therefore to merge.
```
- Assign at least 2 people as reviewers.
    - This should be done automatically by using [CodeOwners](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) and enforced by [Github settings](https://github.blog/2018-03-23-require-multiple-reviewers/).

### Tips

- Make smaller and more concise PRs.
    - Quick feedback loops: Smaller PRs gets reviewed and merged faster.
    - Fewer merge conflicts.
    - Easier to test.
- Self review before submitting.
    - This practice will allow you to spot obvious mistakes and tighten the feedback cycle.
- Optimize for readability.
    - This rule also apply to commit messages.
- Follow the scouts rule: **Always leave the code better than you found it.**

### Addressing Feedback

- All comments should be addressed before merging.
    - This could be as easy as reacting to a comment and mark it as `done` after making the proposed change; or engaging in a discussion about the comment.
- In the case that you find a non-trivial mistake in the code after it has been approved, you should request a new round of reviews.

### PR Checklist

- [ ] Am I duplicating existing code?
- [ ] Does all the new entities have the correct access level?
- [ ] Am I introducing warnings to the project? → If this is the case, it should fail on CI.
- [ ] Am I introducing tech debt? → If this is the case, Did I create a task for addressing it later?
- [ ] Am I introducing any retain cycle?
- [ ] Did I add/update documentation?
- [ ] Am I using magic numbers/strings/etc?
- [ ] Am I following the team's coding conventions throughout my changes?
- [ ] Am I handling and logging all errors correctly?
- [ ] Did I remove any [commented-out, `TODO` marks, print statements, etc] from the code?
- [ ] Did I add test coverage for the new additions?

### Merging the PR

In order to keep a linear history and to avoid nasty merge conflicts, you should be [rebasing](https://docs.github.com/en/get-started/using-git/about-git-rebase) your changes against the merging branch *before* merging.

After the rebased changes has been pushed, the CI passed and the PR got the approvals, the PR can be safely merged.

## Reviewers

Reviewing other people code is a learning opportunity, so take the time you need to read through the code and understand how your team mates think and solve problems.

### Process

- Read the PR body carefully before jumping to the code to get as much context as possible.
- Always add prefixes to your comments so the PR owner knows how important they are.
    - `nit:` Small change that won’t require a re-review.
    - `optional:` Can be ignored.
    - `blocker:` Something that needs to be changed before merging. These type of comments will require the review to be marked as `Request changes`.
- We should strive to have a typos-free codebase, it’s highly recommended that all engineers have set up some sort of [automatic typo detection](https://fbernutz.github.io/posts/2022-01-23-spelling-grammar-in-xcode/?utm_source=swiftlee&utm_medium=swiftlee_weekly&utm_campaign=issue_99) on their IDEs.
- Reviewers should not be looking at linting and/or formatting issues. All those rules should be enforced by the linters and CI should fail if there are warnings `⚠️`.

### Tips

- Assume competence and good intent.
- **Be kind and praise good code**.
- The code belongs to the team, use team language (we, our) instead of personal language (me, you).

### Reviewers Checklist

- [ ] Strive for readability and understandability. The code that will be merged will be read many times in the future.
- [ ] Check that the new code follows the team conventions/architecture.
- [ ] Does the new code fulfill the requirements?

<!-- Do not remove - SEO meta tags -->
{% seo %}