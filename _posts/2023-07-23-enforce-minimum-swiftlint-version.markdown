---
layout: post
title:  "Build Phase to enforce minimum SwiftLint version"
date:   2023-07-23 07:00:00 -0300
tags: [iOS, tools]
---

{% seo %}

If your team is using `brew` to install SwiftLint, you might run into scenarios where different developers run different versions of the linter.

One way to avoid this issue is to enforce a `minimum` version.

Here is a snippet of a Build Phase that accomplishes that:

<script src="https://gist.github.com/mdb1/d5b7c005af9989815281dc016cc5d138.js"></script>

When trying to build an app with an older version installed, an error would be thrown:

<img src="{{static.static_files}}/resources/swiftlint-version/swiftlint-error.png" width="100%">

If you want everyone to run the exact same version, just modify the condition in the snippet above:

```bash
if [[ "$SWIFTLINT_VERSION" == "$MIN_VERSION" ]]; then
```

---