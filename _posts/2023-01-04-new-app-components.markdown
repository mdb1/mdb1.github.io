---
layout: post
title:  "New App - Components"
date:   2023-01-04 07:00:00 -0300
comments: true
tags: [swift, swiftui]
---

When starting a new app, I like to have some reusable components ready to use.

Some examples:

## LoadingButton
A button with a state binding that can represent: `initial`, `loading`, `success` and `error` states.

The code can be found [here](https://gist.github.com/mdb1/d178ae0a8ad453fa4f40c9a5f21fbd29).

### Video
<video width="287" height="621" controls>
    <source src="{{static.static_files}}/resources/new-app-components/loadingButton.mp4" type="video/mp4">
</video>

## LongPressButton
A button with a long tap gesture recognizer and a state binding that can represent: `initial`, `loading`, `success` and `error` states.

The code can be found [here](https://gist.github.com/mdb1/483b907d84aec08cde7edd53f013be82).

### Video
<video width="388" height="460" controls>
    <source src="{{static.static_files}}/resources/new-app-components/longPressButton.mp4" type="video/mp4">
</video>

## TextField
A TextField with an error state.

The code can be found [here](https://gist.github.com/mdb1/6dcb3f47b54038748bcce770d8bfbdd8).

### Video
<video width="249" height="160" controls>
    <source src="{{static.static_files}}/resources/new-app-components/textfield.mp4" type="video/mp4">
</video>

## Custom Progress View
A custom progress view using a trimmed circle that rotates.

The code can be found [here](https://gist.github.com/mdb1/13df4fb33b6d3df119b89645214ca916).

### Video
<video width="363" height="228" controls>
    <source src="{{static.static_files}}/resources/new-app-components/spinner.mp4" type="video/mp4">
</video>

## CancelCircularButton
A circular button with a long press action to cancel something.

The code can be found [here](https://gist.github.com/mdb1/8eb8279adbfb0764a65d03707b9d55ec).

### Video
<video width="192" height="370" controls>
    <source src="{{static.static_files}}/resources/new-app-components/cancelButton.mp4" type="video/mp4">
</video>

## CarouselView
A Carousel View (Paged TabBar) to display information.

The code can be found [here](https://github.com/mdb1/UIComponents/blob/main/Sources/UIComponents/Carousel/CarouselView.swift).

### Video
<video width="208" height="426" controls>
    <source src="{{static.static_files}}/resources/new-app-components/carousel.mp4" type="video/mp4">
</video>

---

All these components can be found in the [UIComponents](https://github.com/mdb1/UIComponents) package.