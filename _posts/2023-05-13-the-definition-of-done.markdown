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
Let's say we are documenting the Detail screen of a Soccer game Bet:

```markdown
# Bet Detail
Some introduction about this screen.

We could insert a screenshot or demo video here as well.

## Navigation
Instructions on how a user can navigate to this screen.

## Structure/Lifetime
Here we can describe the elements on the screen, how the data is presented on the screen (think about conditional elements and explain when they are shown/hidden).
We can also describe if there are any network calls, and when they happen (onAppear, tapping on a button, etc).

## Caveats
If there is something custom done over the data models (mappings, filtering, sorting, etc) this is a good place to write about it. We could also add links to the existing files where the code lives.

## Testing
Here we can explain the testing strategy, and add links to the existing testing code.

---

Last updated on: $Date
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

# Conclusion:
By adhering to a shared `Definition of Done` you can elevate the quality of your code and deliver exceptional software solutions.

--- 

Do you (partially or fully) agree with this definition?
