---
layout: post
title:  "How to create a Windows 11 bootable USB drive using Ubuntu"
date:   2023-07-23 07:00:00 -0300
tags: [coding]
---

I recently had to install Windows 11 on a FreeDOS machine, and I hit a lot a couple of walls in the process:

- My main problem was that I didn’t have access to another Windows machine to download the `.exe` files in the [Windows 11 downloads page](https://www.microsoft.com/software-download/windows11).
- The second issue was that the machine only accepted FAT32 devices to boot from, and the Windows 11 ISO  contains a file larger than 4gb (the maximum allowed size for a file in the FAT32 file system).

So I decided to document what worked for me to overcome these issues.

## 1. Install Ubuntu

I only had access to a `macos` machine, these are the steps I followed:

- Download the [Ubuntu ISO](https://ubuntu.com/download/desktop).
- Use the [Balena Etcher](https://etcher.balena.io/) software to burn the ISO into the USB drive.
    - *Note: I tried to use the same software for burning the Windows 11 ISO, but that didn’t work due to the 4gb file size restriction.*
- Boot Ubuntu on the FreeDOS machine using the USB drive, and install it.

## 2. Download the Windows 11 ISO

This is an easy step, just download the [Windows 11 multi-edition ISO](https://www.microsoft.com/software-download/windows11) in your desired language.

## 3. Format the USB drive

- Connect the USB drive to the machine running Ubuntu.
- Open the `Disks` application.
- Select the USB drive.
- Tap on Format → Partition using MBR / DOS → Format.
- Create a partition → Select FAT type.

_Note: This will delete all the files from the USB, so it’s ready for us to burn the Windows image._

## 4. Split the `install.wim` file

We need to split the `install.wim` file inside the Windows 11 ISO given it is larger than 4gb and exceeds the FAT32 file size limit.

- Mount the Windows 11 ISO in your Ubuntu machine.
    - Right click the ISO.
    - Open With → Disk Image Mounter.
- Open the mounted image in the file system.
    - Copy the `install.wim` file inside the `sources` folder to your Desktop.
- Install `wimtools` from the console.
    - `sudo apt-get install wimtools`.
- Split the `install.wim` file into smaller files.
    - `wimlib-imagex split install.wim install.swm 4000`.

## 5. Prepare the bootable USB

- Copy all the files from the mounted ISO image to the USB drive except for the `install.wim` file.
- Copy all the `install.swm` files generated before and paste them in the `sources` folder of your USB drive.

### **🎉 Now you have a bootable Windows 11 image in your USB drive. 🎉**

---

**Useful Links:**

- [Windows 11](https://www.microsoft.com/software-download/windows11)
- [wimtools](https://launchpad.net/ubuntu/xenial/+package/wimtools)
- [Split image documentation](https://learn.microsoft.com/en-us/windows-hardware/manufacture/desktop/winpe--use-a-single-usb-key-for-winpe-and-a-wim-file---wim?view=windows-11)
- [Format USB Drive](https://itsfoss.com/bootable-windows-usb-linux/)
- [Balena Etcher](https://etcher.balena.io/)
- [Ubuntu](https://ubuntu.com/download/desktop)

---