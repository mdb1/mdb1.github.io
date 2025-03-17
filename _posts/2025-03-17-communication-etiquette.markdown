---
layout: post
title: "Communication Etiquette"
subtitle: "Guidelines for effective communication"
date: 2025-03-17 07:00:00 -0300
tags: [productivity, tools]
thumbnail-img: "/resources/communication/thumbnail.png"
readtime: true
---

This is a set of guidelines that I like to push on my team, and I think they are really useful for effective communication.

In a remote setup, communication might be the most important part of the job, so it's really important to nail down the etiquette. 

The goals we are aiming towards:

- `Productivity through focus`: By reducing constant context switching, we can have more productive individuals. Context switching is distraction, and distraction is a productivity killer.
- `Effective`: We want to make sure that the communication is effective and that we are not wasting time.
- `Informational`: We want to make sure that the communication is informational.

#### Table of Contents
- [1. No Hello](#1-no-hello)
- [2. Thread Police](#2-thread-police)
- [3. ACK Reactions](#3-ack-reactions)
- [4. How to ask/answer questions](#4-how-to-askanswer-questions)
  - [Bad Example ❌](#bad-example-)
  - [Good Example ✅](#good-example-)
- [5. Use the right channels](#5-use-the-right-channels)
- [Question Template](#question-template)
- [Related Articles](#related-articles)

# 1. No Hello

The first rule is really simple, no `hello-only` messages. There is even an [entire website](https://nohello.net/en/) dedicated to this point.

The idea is that instead of sending 5 consecutive messages, you can just send 1, with all the information inside: your greeting, all the context, and your question.

This is aligned with the `Productivity through focus` goal. You don't want the receiver to get 5 notifications, one for each message.

![no-hello]({{static.static_files}}/resources/communication/no-hello.png)

In the next few points, we'd cover what's wrong in the `✅ Instead try this` section of this image. 

# 2. Thread Police

Keeping with the `too-many` notifications theme, we have the multi people channels, where every person send a message directly to the chat. This is the biggest `anti-focus` pattern, as all the individuals would be bombarded with non-stopping notifications.

Instead, communication should be done in threads, where all the messages are grouped together, and the receiver can focus on the conversation.

Only the interested parties should be in the thread, and the messages should be focused on the topic at hand.

The best way that I found to push this practice, is by introducing a friendly `thread police` reaction, that would be added to every message in the channel that should have been part of a thread.

![thread-police]({{static.static_files}}/resources/communication/thread-police.gif)

Eventually, people in your organization will start to see the value of the threads, and they will start thread policing other people.

# 3. ACK Reactions

Going back to the image from the `No Hello` section, we have the `✅ Instead try this` section, where commnunication could have been more effective, by reacting with either an 👌, ✅, or `ACK` custom-emoji to the message.

I really like ACK reactions, as they don't produce extra notifications, but they effectively communicate the intention.

This is aligned with the `Effective` goal. There is no need for a message when a reaction can get the goal done.

# 4. How to ask/answer questions

Moving over to the `Informational` goal, I have seen that too many times, channels become overloaded with messages like:

## Bad Example ❌

```
- How do I do X?
- I can't login into the app, what happened?
- The VPN doesn't seem to be working
```

These are all wrong form of communication, they are not effective, and they are not informational. They require questions to be answered, and they don't provide any context.

Instead, the culture that I want to pursue is that of `self-service`, where the first step is to search for the answer, and only after some research ask for help, but provide all the details of:

- What are you trying to accomplish
- What have you tried so far
- What is the error message that you are seeing
- User accounts/emails/ids/etc that you are using

## Good Example ✅

```
👋 Hey backend team, I am having some issues trying to reset the password of my user on the iOS production app.

I am using version 1.2.3 (456) of the iOS app, downloaded from the AppStore.

These are the steps that I follow:
- Sign In
- Go to Settings
- Change password

This is the user email: manu@show.com
This is the user UUID: 12345678-1234-1234-1234-123456789012

This is the endpoint that the app is hitting:
- URL: https://api.manu.show.com/v1/users/{user_id}/password

This is the error message that I am seeing:
- ❌ Error Code=4099 description: "User does not have enough permission to perform this operation"

**Does anyone know how could I get permission to perform this operation?**
```

This is a way better way of asking for help, as it provides all the context needed to answer the question.

As an additional bonus point, once you get the answer, you could document it on a FAQ wiki page. This way, the next time you or someone else needs help with the same issue, they can find the answer without having to ask for help.

For `answering`, the same rules apply, the more context-rich your answer the better, as this will not only unblock the person, but also save time for the next person that needs help with the same issue.

# 5. Use the right channels

It goes without saying, but using the right channels is essential for effective communication.

It is more than welcome to speak about non-work related stuff, but, there are specific channels for that, for example `random`, `pets`, `sports`, etc.

# Question Template

If you want a quick way to ask for help, you can use the following template:

**Template** - Copy-paste ready:
```
👋 $GreetingAndContext

**Environment**:
- App/Service: $NameAndVersion
- User/Account: $UserID

**Steps to Reproduce**:
1. 
2. 
3. 

**Observed Behavior**:
❌ $ErrorMessageOrDetails

**Expected Behavior**:
✅ $DesiredOutcome

**Question**:
1. $Question1
2. $Question2
```

---

# Related Articles

- [User Guide to Working with Manu](/2022-10-29-user-guide-to-working-with-me/)
- [Your Problem Solving Ability](/2025-03-06-your-problem-solving-ability/)
- [H Mode](/2022-10-26-h-mode/)
- [Streamlining My Life](/2023-11-26-streamlining-life/)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
