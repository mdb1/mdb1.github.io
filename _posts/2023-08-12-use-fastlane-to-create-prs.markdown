---
layout: post
title: "Use FastLane to create PRs"
date: 2023-08-12 07:00:02 -0300
tags: [tools, productivity]
readtime: true
---

{% seo %}

This is a guide on how to set up a fastlane lane to create pull requests:

1. Set Up Fastlane:
    1. Add a Gemfile file in the root of the repo
    2. Add these to the Gemfile:

    ```rb
    source "https://rubygems.org"

    gem "fastlane"
    ```

    3. Run `bundle update`
    4. Run `bundle exec fastlane init`
2. Set Up the PR lane:
    1. Run `cd fastlane`
    2. Edit the `Fastfile` file to add the PR lane:
    <script src="https://gist.github.com/mdb1/ae7ba3ae6056449b317c873f5417b24f.js"></script>
3. Add your Github PAT to an environment file:
    1. Create a new file called `.env` inside the fastlane folder.
    2. Paste this inside:
    ```bash
    GITHUB_API_TOKEN="YOUR_GITHUB_PAT"
    ```
    3. Add the `.env` file to the `.gitignore`:
    ```bash
    fastlane/.env
    ```
4. Run the lane:
    1. `bundle exec fastlane pr`
5. Additionally, you could add an alias to the `.zshrc` file for easier usage:
    1. Run `vim ~/.zshrc`
    2. Add a new alias:
    ```bash
    alias pr='cd ~/your-project && bundle exec fastlane pr'
    ```
6. Also additionally, you could add some documentation to your Contributing guidelines:
    1. [Here](/2023-08-04-new-app-document-best-practices/) is another post describing how to do that.
    2. [Here](https://github.com/mdb1/best-practices-example/blob/main/.github/docs/PRConventions.md) you can find some inspiration.

Now you can run `pr` from anywhere in your console and send a PR from your console 😄.

You can find a repository where everything is set up [here](https://github.com/mdb1/fastlane-example).

*Remember that the lane won't work in your pc for that repository, given you don't have a valid PAT in the `.env` file.*

---
