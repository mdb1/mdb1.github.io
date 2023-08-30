---
layout: post
title: "Swift Typo Detector"
subtitle: "A tool to get rid of all those typos"
date: 2023-08-30 07:00:00 -0300
tags: [tools]
thumbnail-img: "/resources/swift-typo-detector/thumbnail.jpeg"
readtime: true
---

By this point, we all know and love Xcode's [check spelling while typing](/2023-03-14-my-xcode-setup-and-shortcuts/#1-check-spelling-while-typing) feature.

![spelling]({{static.static_files}}/resources/xcode-setup/spelling.png)

However, that feature is missing something critical in my opinion: the ability to list in one place, all the typos in the codebase (all the files).

## SwiftTypoDetector

I created a tool that is easy to install, and easy to use, to achieve that functionality.

- [Github Repository](https://github.com/mdb1/SwiftTypoDetector)

### Installation
The installation is really simple, you just have to:

1. Clone the repository
2. Run the `./setup.sh` script

### Usage

Just run: `./find_typos.rb path/to/your-project`

That's it, the ruby script will iterate over all the files, and print to the console all the typos.

Aside from checking against the US dictionary, the script will also check against [these swift-generic-words](https://github.com/mdb1/SwiftTypoDetector/blob/main/swift_generic_words.txt).

### Learning words

Each of our projects contain several words that are not included in the US dictionary. My name, for example, is not in there.

You can add custom words to a [learned_words.txt](https://github.com/mdb1/SwiftTypoDetector/blob/main/learned_words.txt) file to make the tool aware of them.

## Demo

![diagram]({{static.static_files}}/resources/swift-typo-detector/demo.png)

_Tip: You can `Command + Click` on the files in the console to open them with Xcode._

## Next Steps

I think a natural next step for the tool would be to make it a Ruby Gem, so people can start using it via bundler.

Also, it should be pretty easy to provide support for other extensions.

## Related Articles

- [My Xcode Setup and Shortcuts](/2023-03-14-my-xcode-setup-and-shortcuts/)
- [Use Periphery to find unused code](/2023-08-21-use-periphery-to-find-unused-code/)
- [The Definition of Done](/2023-05-13-the-definition-of-done/)

<!-- Do not remove - SEO meta tags -->
{% seo %}