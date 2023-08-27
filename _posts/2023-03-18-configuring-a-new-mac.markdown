---
layout: post
title:  "Configuring a new MacBook"
date:   2023-03-18 07:00:00 -0300
tags: [productivity, tools]
---

{% seo %}

# Configuring a New MacBook: 5 Steps to Follow

When setting up a new MacBook, there are a few steps you should take to get it up and running smoothly. In this article, we'll explore a list of items you should consider toggling to optimize your MacBook experience.

# Step 1: Update OS
Before you start using your new MacBook, make sure to update the operating system to the latest version. This will ensure that your MacBook has the latest security updates and performance improvements.

# Step 2: Dock Customization
By default, the dock is populated with several applications that you may not use frequently. To declutter your dock, remove the apps that you don't use often. To do this, simply right-click on the app and select "Remove from Dock."

![dock]({{static.static_files}}/resources/configuring-new-macbook/dock.png)

# Step 3: Log in to Existing Apple ID Account
To access Apple's services and apps, you'll need to log in to your existing Apple ID account. If you don't have an Apple ID, you can create one during the setup process.

# Step 4: Download Apps
Here's a list of recommended Mac apps to download:

## From the AppStore
* Xcode
* Fantastical
* Slack
* Flycut

## From the internet
* Google Chrome
* 1Password
* Notion
* iTerm2
* SourceTree
* Visual Studio Code

### Google Chrome
- Make default browser
- Log in to profiles (personal/work)

### iTerm2
- Download OhMyZsh
- Download Homebrew
- Copy your `~/.zshrc` from a previous MacBook (aliases/configs/etc)

### SSH Keys
If you are using SSH keys for your personal/work repositories:
1. Create a new SSH key: `ssh-keygen -t ed25519 -C “your_mail”`
    - Use a password to encrypt it.
    - You need to provide a name for your key. (Example: `personal`)
2. Add the ssh key to your Github account.
    - Copy the contents of the `.pub` file.
    - Add the new SSH key in Github's configuration page.
3. Configure [SSH Keys](https://superuser.com/questions/232373/how-to-tell-git-which-private-key-to-use/1519694#1519694) in your `~/.ssh/config` file. 
    It should look like this:
    ```bash
    Host personal
        HostName github.com
        User git
        IdentityFile /Users/manu/.ssh/personal
    ```
4. Add the key to your keychain: `ssh-add --apple-use-keychain ~/.ssh/personal`
   - Enter the encryption password.
5. Now you can use `git clone git@personal:organization/repo.git` to clone private repositories.

Note: If you are using SourceTree, be careful with the auto-generated keys, they will probably not work. If you keep getting Access Denied with those keys, try following the steps described above instead.

# Step 5: Configure Settings
Here's a list of recommended settings to customize:

## System Settings

### Notifications

1. Turn off almost every notification

### Appearance

1. Change `Accent Color`

### Control Center

1. Turn on `Show Battery Percentage`

### Desktop and Dock

1. Turn Off `Show Recent Applications on Dock` 
2. Hot Corners → Top Right → `Show Desktop`
3. Make `Chrome` the default browser
4. Turn Off `Automatically rearrange Spaces based on most recent use`

### Keyboard

1. Increase `Key Repeat Rate` to the maximum value.
2. Decrease `Delay until repeat` to the shortest value.
3. Shortcuts -> Screenshots -> Change the shortcut for `Copy picture of selected area to the clipboard` to `⌘ + Shift + S`

### Trackpad

1. Increase `Tracking Speed` to 8/10
2. Turn on `Tap to click`

### Display

1. Turn off `Automatically adjust brightness`

## Finder Settings

1. Order Sidebar
2. Advanced → Check off all the `Show warning before…` boxes
3. View → Show View Options → Sort by name, Group by name → Set as Defaults

# Additional Tips

To stop workspaces from stealing focus:

```swift
defaults write com.apple.dock workspaces-auto-swoosh -bool false
osascript -e 'tell application "Dock" to quit'
```

# Conclusion
In conclusion, setting up a new MacBook can be an exciting but daunting experience, especially for those who are new to the Mac ecosystem. However, by following the five steps outlined in this article, you can ensure that your MacBook is up-to-date, decluttered, and customized to your needs. Updating the operating system, customizing the dock, logging in to your Apple ID account, downloading essential apps, and configuring settings will optimize your MacBook experience and make it more enjoyable to use.