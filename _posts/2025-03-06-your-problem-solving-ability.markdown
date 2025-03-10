---
layout: post
title: "Your Problem Solving Ability"
subtitle: "The foundation of software development"
date: 2025-03-06 07:00:00 -0300
tags: [productivity, tools]
thumbnail-img: "/resources/problem-solving-ability/thumbnail.png"
readtime: true
---

Problem solving is the foundation of software development. It's the skill that separates great developers from average ones, and it's what will keep you relevant over time.

#### Table of Contents
- [Why Problem Solving Matters](#why-problem-solving-matters)
- [The AI (Agents) Haunt](#the-ai-agents-haunt)
- [Examples of Good Problem Solving](#examples-of-good-problem-solving)
  - [CI Failures](#ci-failures)
  - [Unrelated Bugs](#unrelated-bugs)
  - [Recurring Questions](#recurring-questions)
  - [Knowledge Sharing](#knowledge-sharing)
  - [Error Messages](#error-messages)
- [Take Ownership](#take-ownership)
- [Related Articles](#related-articles)
- [Featured in](#featured-in)

## Why Problem Solving Matters

People hire you for your problem solving ability, not for your syntax knowledge of a particular language. Programming languages come and go, new frameworks arise every week, but the ability to break down complex problems into solvable pieces remains as the number 1 item in the most valuable skills ranking.

If you're hiring people, you want to get a grasp on how well the candidates solve problems, how well they communicate, and the most important metric: `Would I (and my team) enjoy working with this individual?` Technical skills can be taught, but problem-solving aptitude, pro-activity, and interpersonal skills are harder to develop.

## The AI (Agents) Haunt

In this age of the so-called `vibe-coding`, and with non-technical people shipping 100x more than people with 10 years of experience (still TBD where all this will lead), certain developer behaviors put you at risk of becoming obsolete:

- If your first thought when running into a problem is asking a coworker → you could be replaced by AI.
  - Instead, try `debugging/finding the error/fixing` it and only after exhausting your options, ask for help, but provide all the details of your findings.
- If you're a machine that takes tickets as inputs, and only code the minimum necessary to satisfy the ticket → you could be replaced by AI.
  - Instead, try `getting a better understanding` of what is needed, what value you could add, and how to improve the codebase in the process. Also, break down the ticket into smaller, more manageable tasks if needed. [Document your work](/2023-05-13-the-definition-of-done/). 
- If you don't think about the business → you could be replaced by AI.
  - Instead, try `contextualizing the problem` within the business goals and deliver solutions that create real value. Propose new things that might benefit the business. Talk to real users.

You should be `independent`. Don't be scared to dive into unfamiliar code, experiment with solutions, and `learn from failures`.

```
Focusing on avoiding mistakes takes our focus away from becoming truly exceptional.
Part of achieving excellence would be acquiring an intimate understanding of errors, that is, what caused them and what we needed to do to eliminate them.
~ Turn the Ship Around by L. David Marquet
```

## Examples of Good Problem Solving

Here are some real-world scenarios that demonstrate good problem-solving behaviors:

### CI Failures
If a test fails on CI, but not on your computer → you `have to` find a way to reproduce it locally, so you can fix it. Don't just restart the build and hope it passes. `Read the error message`. Investigate environment differences, race conditions, or timing issues that might be causing the inconsistency.

### Unrelated Bugs
If you find a bug unrelated to what you're working on → you `have to` report it, create a ticket, and explain how to reproduce it. If you want to go the extra mile and propose solutions or fix it, great, but `do not` ignore it! Small issues compound over time and create technical debt.

### Recurring Questions
If you see that every time a new developer joins, they ask the same questions → create documentation to address this, and share that link from now on. `Be proactive` about improving the onboarding experience for future team members.

### Knowledge Sharing
When somebody asks a question on Slack, for example, about user/password combinations for test users with particular configurations → you `should be` the first one to answer. Maintain a list of test users and configurations in your documentation.

### Error Messages
When you see an error message, `take the time to carefully read it`. Most of the times, the answer is already there, and you'll save yourself (and others) a lot of time by understanding the error message `before` asking for help.

## Take Ownership

You are responsible for your PRs. Always assign yourself as the Assignee. It's your responsibility to follow it through, answer questions, address suggestions, and eventually (sooner rather than later) merge it. 

But it doesn't end there 😄. You need to monitor your changes, check Crashlytics in Dev mode, and in Prod mode once it's released. True ownership means caring about the impact of your code long after it's been merged.

---

In the end, `your problem solving ability` is what matters the most. It's what makes you valuable as a developer and what will keep you relevant as technology evolves. You will see that it's a contagious trait that will help you (and your team) achieve the business goals, grow, and keep improving your skills.

---

## Related Articles

- [The Definition of Done](/2023-05-13-the-definition-of-done/)
- [New App Contributing Guidelines](/2023-01-02-new-app-contributing-guidelines/)
- [H Mode](/2022-10-26-h-mode/)
- [Streamlining My Life](/2023-11-26-streamlining-life/)
- [Advice I Wish I Had Gotten Earlier](/2025-02-22-advice-i-wish-i-had-gotten-earlier/)
- [How to keep up with the industry standards](/2023-04-04-industry-standards/)
- [Rules and Habits for a better life](/2022-01-15-rules-and-habits/)

---

## Featured in
- [iOSCoffeeBreak #36](https://www.ioscoffeebreak.com/issue/issue36)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
