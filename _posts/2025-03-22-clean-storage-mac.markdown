---
layout: post
title: "Freeing up space on your Mac"
subtitle: "Manually cleaning up storage"
date: 2025-03-22 06:00:00 -0300
tags: [ios, tools]
thumbnail-img: "/resources/clean-storage-mac/thumbnail.png"
readtime: true
---

This is a quick guide on how to free up storage manually on your mac.

#### Table of Contents
- [Check Current Storage](#check-current-storage)
- [Remove unused apps](#remove-unused-apps)
- [Free up Developer space](#free-up-developer-space)
- [Remove unused documents](#remove-unused-documents)
- [Empty the Trash](#empty-the-trash)
- [Related Articles](#related-articles)
- [Featured in](#featured-in)

# Check Current Storage

First, go to System Settings -> General -> Storage:

![initial-storage]({{static.static_files}}/resources/clean-storage-mac/initial-storage.png)

# Remove unused apps

Tap on the `info` icon next to the Applications row, and delete the apps that you don't use anymore.

![apps]({{static.static_files}}/resources/clean-storage-mac/apps.png)

# Free up Developer space

Tap on the `info` icon next to the Developer row:

- Remove Xcode Caches
- Remove Project Archives
- Remove Project Build Data and Indexes
- Remove older iOS Device Support
- Remove Derived Data in the console: `rm -rf ~/Library/Developer/Xcode/DerivedData`
- Empty the Trash

![developer]({{static.static_files}}/resources/clean-storage-mac/developer-storage.png)

Additionally, you can navigate to `~/Library/Developer/` and manually delete simulators, os versions, or other stuff that may taking up too much space.

If you don't like removing stuff from that folder, you can go to Xcode -> Manage Run Destinations and delete the simulators that you don't use anymore:

![simulators]({{static.static_files}}/resources/clean-storage-mac/simulators.png)

# Remove unused documents

Tap on the `info` icon next to the Documents row, then navigate to the File Browser tab, and delete the documents that you don't use anymore. Remember to turn on the `Show Hidden Files` option in the top left corner (or press `Cmd + Shift + .`).

You can remove the Caches under `Library -> Caches` that usually take up a lot of space.

There is a lot of space used in the `.build` folders of Xcode Projects.

![documents]({{static.static_files}}/resources/clean-storage-mac/documents.png)

# Empty the Trash

Finally, empty the trash, and check again the final storage:

![final-storage]({{static.static_files}}/resources/clean-storage-mac/final-storage.png)

In just a few minutes, we managed to free up `~118GB` of space `without using any external tool`.

---

I hope you find this guide useful. If you have any questions or comments, please let me know via Twitter or email.

---

# Related Articles

- [Configuring a New MacBook](/2023-03-18-configuring-a-new-mac/)
- [H Mode](/2022-10-26-h-mode/)
- [Advice I Wish I Had Gotten Earlier](/2025-02-22-advice-i-wish-i-had-gotten-earlier/)

---

# Featured in

- [iOSCoffeeBreak #39](https://www.ioscoffeebreak.com/issue/issue39)

---

<!-- Do not remove - SEO meta tags -->
{% seo %}
