---
layout: post
title:  "The Definition of Done"
date:   2023-05-13 07:00:00 -0300
categories: productivity
---

# Introduction:
I want to talk a little bit about the Definition of Done, or, in other words, when can we consider that a task is completed.

If our team can agree on this definition, we can ensure the quality and reliability of our codebases, and facilitate future project growth,

## 1. Code the Feature or Fix:
The first step is to code the new feature or the fix that the task is describing. This could be adding a new screen to our app, refactoring existing code, fixing a specific bug, etc. It is essential to follow any specific guidelines that the project already follows, and to try to be as consistent as possible with the rest of the code. 

This is also a good opportunity to follow the Boy Scouts Rule: `Always leave the code you are working on a little bit better than you found it.`, this could be adding documentation to existing methods/properties, deleting unused code, refactoring code to make it more testable, etc.

> Note: If you are using TDD, you can swap steps 1 and 2.

## 2. Add Unit Tests:
To ensure the stability and correctness of the code, the next step is to add unit tests. Using tools like the code coverage feature on Xcode can provide insights into the effectiveness of the unit tests, helping developers identify any areas of code that require additional testing.

For example, if the view model uses a service to fetch data from the server, we could add unit tests mocking the service layer to check what happens in the view model when the service succeeds, and when it fails.

If the service makes a network request, we could mock the HTTPClient to return a static json and test that the JSONDecoder correctly decodes the model, or throw an error otherwise.

Overtime, adding these small tests would compound on a pretty large testsuite that will make refactoring easier, and make the team more confident about the code.

Here are some previous articles regarding testing:
* [Enhancing testability without protocols](https://mdb1.github.io/2023-02-03-enhancing-testability-without-protocols/).
* [Enhancing testability with protocols](https://mdb1.github.io/2023-02-13-enhancing-testability-with-protocols/).
* [Testing helpers](https://mdb1.github.io/2023-02-02-new-app-testing-helpers/).

### 2.1 Add UI/Integration Tests (Only for Core Functionality):
For core functionalities, it is essential to go beyond unit testing and include UI/Integration tests. This will increase further the confidence on the code.

## 3. Write Documentation:
Documentation plays a vital role in promoting collaboration, maintaining project growth, and preserving knowledge. When completing a feature or fixing a bug, it is crucial to document the process and decisions made along the way. There are several popular options for documentation, including Notion, GitHub Wiki, and Google Docs. Choose the platform that best suits your team's needs and ensure that the documentation is easily accessible.

In the documentation, provide a clear and concise explanation of the feature or bug fix. Describe its purpose, functionality, and any relevant design decisions. If the code includes sorting/filtering capabilities or complex algorithms, explain the reasons behind these choices and provide references to the corresponding code. This documentation serves as a valuable resource for future reference and facilitates discussions with other teams, such as Android, Product, and Backend.

### Documentation Template
Let's say we are documenting the Detail screen of the [open sourced Muun Wallet App](https://github.com/muun/falcon) for iOS. The code can be found [here](https://github.com/muun/falcon/blob/5ba9254918fc85de917f7dc9101101be4317e590/falcon/app/falcon/Presentation/Screen/Detail/DetailViewController.swift):

![detail-screen](/resources/definition-of-done/muun_detail.jpeg)

```markdown
# Detail Screen
Here is where the app will display the information about a particular transaction.

The code is divided into:
* DetailsViewController.swift
* DetailsViewController.xib
* DetailsPresenter.swift

_We could insert a screenshot or demo video here as well._

## Navigation
For logged in users with transactions:
1. Tap (or swipe up) the chevron at the bottom of the home screen. This will open the transactions list.
2. Tap any of the transactions from the list.

## Structure/Lifetime
* The Detail screen is initialized with a [core.Operation](https://github.com/muun/falcon/blob/5ba9254918fc85de917f7dc9101101be4317e590/falcon/core/Classes/Domain/Model/Operations/Operation.swift) model.
* The screen uses the stack view from the `.xib` file to add information about the operation.
* There is also an `OperationFormatter` object that will be used for formatting purposes.
* Lastly, there is a `DetailsPresenter` which will be used to display failure information (if any) for submarine swaps with version 1.

When the view gets laoded, the ViewController class will decide what to draw in the screen based on the type of operation (submarineSwap, incomingSwap, or onChain transaction).

Then it starts populating the stack view with the according information (examples: summary, status, description, date/time, amount, etc).

### Anlytics
The screen analytics name is: "operation_detail"

And these are the extra parameters:
* "operation_id"
* "direction"

### Networking
This screen doesn't perform any network calls, so there is no need for error handling / loading states of any type.

## Caveats
Every piece of data that needs to be displayed about the Operation model, is displayed through the OperationFormatter object.

This screen is static, it doesn't obserb the operation model, so if there is any change to the model, the screen won't be redrawn automatically, and instead, the users would need to go back in the navigation stack and re-enter the screen to see the change.

## Testing
The screen is covered with UI tests, using the PageObject pattern, making its elements accessible for testing purposes.

A quick win would be to add basic unit tests to the `OperationFormatter` methods.

---

Last updated on: 2023/05/20
```

Writing this sort of documents is important for a few reasons:
1. You will practice your writing skills.
2. The project will benefit from additional documentation.
3. You can share the documentation in your PRs, which will make reviewing the changes easier.
4. You can share the documentation with other teams (backend, android, product, etc). This will benefit the whole team, given it will be easier to find inconsistencies, or to know if your assumptions were correct or not.
5. Overtime, your team will have a lot of documentation on the features of the app.

There are some downsides to writing documentation though:
1. It takes time. (Altought one could argue that the ROI is higher than the time spent writing).
2. If it's not maintained, it will age incorrectly. If there are changes (and there will be) to the existing code, and nobody takes the time to update the existing docs, they will become useless, given they will not represent the current state of the art.

## 4. PR + Review + Deploy
Finally, you need to upload your changes, send a Pull Request for your team, let them review it, apply the neccessary changes, merge it, and deploy it.

Here are some notes about the [Code Review Process](https://mdb1.github.io/2022-03-10-the-code-review-process/).

The Documentation from `Step 3` will be a great addition to the PR body 😬.

Finally, once it's merged, your CD pipelines should be in charge of deploying a new build for QA.

# Conclusion:
By adhering to a shared `Definition of Done` you can elevate the quality of your code and deliver exceptional software solutions.

--- 

Do you (partially or fully) agree with this definition?
