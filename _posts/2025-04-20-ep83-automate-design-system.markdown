---
layout: post
title: "Should you automate your Design System?"
subtitle: "To automate or not to automate"
date: 2025-04-20 07:00:00 -0300
tags: [ios]
thumbnail-img: "/resources/ep83-automate-design-system/thumbnail.png"
readtime: true
---

In this post, we'll go through the standard process for automating the tokens of a design system. Starting from the Figma export, then the codegen. Finally, we'll discuss wether it's worth it or not to automate the process.

This is not a guide on how to set up the process, it's a guide on wether you should or not do it.

#### Table of Contents
- [Starting point](#starting-point)
- [Transforming Tokens to code](#transforming-tokens-to-code)
- [The benefits of automating](#the-benefits-of-automating)
- [The drawbacks of automating](#the-drawbacks-of-automating)
- [Should you Automate the process?](#should-you-automate-the-process)
  - [You maintain only 1 app](#you-maintain-only-1-app)
  - [You maintain multiple apps / SDKs](#you-maintain-multiple-apps--sdks)
  - [The tokens change too often](#the-tokens-change-too-often)
- [Related Articles](#related-articles)
- [Related Reading](#related-reading)

# Starting point

The starting point for this post is the assumption that you are working with a Figma design system. 

The design system is set up following the standard Design Tokens pattern.

So, it should be possible to use the [Design Tokens](https://www.figma.com/community/plugin/888356646278934516/design-tokens) plugin to export the tokens from Figma to a json file.

[Here](https://www.figma.com/design/2MQ759R5kJtzQn4qSHuqR7/Design-Tokens-for-Figma--Testing-file-?node-id=231-2) is a Figma example of a design system.

_A side note here_: Regardless of automating the process, using semantic names for the tokens is a good practice. i.e.: `primary` instead of `primaryBlue`. `accent` instead of `accentRed`.

# Transforming Tokens to code

The idea of automating the Design System, is that we can transform the tokens from json file directly to iOS/Android/Web code using codegeneration scripts.

Given the json file should be compatible with the **Amazon Style Dictionary** style, we will be able to use [Amazon Repository](https://github.com/amzn/style-dictionary) which contains JavaScript code to generate all the tokens.

It's important to note that it's not plug and play, and there is some overhead to make it work for all the platforms.

Once we have valid json files, and the code generation scripts fully setup, we can talk about some benefits and drawbacks.

# The benefits of automating

- **Consistency**: The 3 platforms will have the same tokens, the same names for each token, and the same values.
- **Speed**: If the designers change the tokens, we can update the values running the codegen again.
- **Less Error Prone**: We can avoid human-errors when updating the tokens in the code.
- **Less Code**: We can avoid writing the same code in all the platforms. 

# The drawbacks of automating

- **Buy-In**: We need to pitch the idea to the team. Then we need everyone onboard, as this only works if all the parts are in place.
- **Cost**: We need to invest some time up-front in setting up the process.
- **Complexity**: We would have a more complex system. We might not need to write the same thing multiple times, but now we have new systems that could fail.
- **Maintenance**: We would need to maintain the code generation scripts. Who will be responsible for this code if it fails?
- **Risk**: Can different people maintain the process in the future? This question goes for Devs and Designers alike.

# Should you Automate the process?

So, going back to the title of the post, `Should you automate the process or not?`

For most cases, I lean towards not automating the process. The drawbacks are more strong than the benefits in my personal opinion. 

I have seen this process fail, basically, an initial team sets everything up, after some initial setup, the process works fine. Everything is smooth for a while, but then, errors start to pop up. The lead designer might change companies. Now we have a team that does not follow the same process, and the process fails. We end up with a broken process. Then, the devs change companies, the new devs do not know how the entire system work, so they start changing tokens manually. Now we are in the worst world of all, we have a triple discrepancy between: Figma Tokens, the json file, and the codegenerated files.

Let's go through some scenarios:

## You maintain only 1 app

If you/your team are working only on 1 application, the benefits of automating the process are not worth it. 

The design system tokens do not change that often, so the overall time spent on creating them at first and then maintaining them up to date is not that big.

## You maintain multiple apps / SDKs

If you/your team are working on multiple apps, and the base design system is shared for all of them, then the benefits of automating the process are worth it.

This is the scenario where I would vote for automating the process. Spend the time setting up the process, and the benefits will be huge. Pitch the idea to the team, educate everyone, write documentation on usage, and make sure everyone is on the same page.

Finally, keep an eye on how it evolves, if it becomes too complex, or if the process starts to fail, then it might be time to reevaluate the process.

## The tokens change too often

If the design team tends to change the token regularly (_strange, but could happen_), then you should consider the automation, as the benefits outweigh the drawbacks.

---

# Related Articles

- [Simple Modularization Setup](/2025-02-27-simple-modularization-setup/)
- [UI vs API Models](/2023-08-25-ui-vs-api-models-different-layers/)
- [New App Checklist](/2022-12-24-new-app-checklist/)

# Related Reading
- [Atomic Design Book by Brad Frost](https://atomicdesign.bradfrost.com)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
