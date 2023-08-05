---
layout: post
title:  "New App - Document Best Practices"
date:   2023-08-04 07:00:01 -0300
tags: [coding, swift, swiftui]
---

Recently, I stumbled upon Lickability's [repository](https://github.com/Lickability/swift-best-practices) on swift-best-practices, and it got me thinking about my own [Contributing guidelines](https://mdb1.github.io/2023-01-02-new-app-contributing-guidelines/) that I wrote a while back. I realized they might not be as scalable as I'd like them to be over time.

So, I decided to write my own set of guidelines that are a mix of Lickability's best practices, my personal experiences, and my own coding style. 

[Here](https://github.com/mdb1/best-practices-example/) is the repository in case you want to check it out.

The idea is to use the [Contributing](https://github.com/mdb1/best-practices-example/blob/main/.github/CONTRIBUTING.md) document as a kind of table-of-contents and link all the smaller documents from there:

![email-filter](/resources/best-practices/contributing.png)

From there, you can be as atomic as you want, and you can document every decision that you or your team make in terms of the codebase over time.

There are some additional benefits to centralizing the team's best practices through its documentation:

1. Reduce the need for communication, which might be error-prone when the team gets bigger.
2. Coordinate understanding through documentation. If every programmer on the team can consult a manual with precise, agreed-upon definitions and protocols, you reduce the risk of programmers diverging.

---

I'm curious to see how we can use AI in combination with these documents in the near future. 

Wouldn't it be awesome if we could have a CI step with ChatGPT or Github Copilit that makes the first review of a PR and adds a comment for each chunk of code that doesn't follow the provided best-practices?

---