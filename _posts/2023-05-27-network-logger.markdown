---
layout: post
title:  "NetworkLogger: Adding debug information to your network calls"
date:   2023-05-27 07:00:00 -0300
tags: [iOS, tools]
thumbnail-img: "/resources/network-logger/network-success.png"
---

When developing Swift applications that involve network communication, it's often essential to have visibility into the details of the network requests and responses. This includes information such as HTTP headers, URLs, request bodies, and response data. In order to facilitate this logging process, I have created a simple and lightweight struct called NetworkLogger as part of the [CoreNetworking](https://github.com/mdb1/CoreNetworking) library.

The code can be found [here](https://github.com/mdb1/CoreNetworking/blob/main/Sources/CoreNetworking/NetworkLogger.swift). It should be easy to understand and integrate into your existing project.

## Example:
The NetworkLogger struct generates informative logs that help you track the progress of your network requests. Here's an example of what the log output would look like:

![network]({{static.static_files}}/resources/network-logger/network-success.png)

![network]({{static.static_files}}/resources/network-logger/network-error.png)

By incorporating the NetworkLogger struct into your Swift projects, you can easily track and inspect network requests, responses, and JSON decoding results.

---

Are you using anything similar in your projects?

# Related Articles

- [OSLog](/2024-03-19-new-app-os-log/)

<!-- Do not remove - SEO meta tags -->
{% seo %}