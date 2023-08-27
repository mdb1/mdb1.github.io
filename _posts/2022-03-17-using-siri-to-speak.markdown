---
layout: post
title:  "Using Siri's voice to speak in your app"
date:   2022-03-17 16:41:55 -0300
comments: true
tags: [iOS]
---

{% seo %}

It’s **really** easy to use Apple’s Speech mechanism to make your app read text out loud to the users:

```swift
import AVFoundation

final class TextSpeaker {
    func speak(_ text: String, language: String = "en-US") {
        // Create an instance of AVSpeechSynthesizer.
        let speechSynthesizer = AVSpeechSynthesizer()
        // Create an instance of AVSpeechUtterance and pass in a String to be spoken.
        let speechUtterance: AVSpeechUtterance = AVSpeechUtterance(string: text)
        // Specify the voice. It is explicitly set to English here.
        // But it will use the device default if not specified.
        speechUtterance.voice = AVSpeechSynthesisVoice(language: language)
        // Pass in the utterance to the synthesizer to actually speak.
        speechSynthesizer.speak(speechUtterance)
    }
}
```

Just adding that 4-lines of code method is enough 🚀.

Then for usage:

```swift
TextSpeaker().speak("This was really easy")
```

If you want to have that method as a separate library you can add [this lightweight SPM package](https://github.com/mdb1/Speech) to your apps.