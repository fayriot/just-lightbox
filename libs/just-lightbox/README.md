# Just Lightbox

[![demo](https://img.shields.io/badge/-demo-blue)](https://fayriot.github.io/j-lightbox/)
[![Build Status](https://travis-ci.com/fayriot/just-lightbox.svg?branch=main)](https://travis-ci.com/fayriot/just-lightbox)
[![npm](https://img.shields.io/npm/v/just-lightbox.svg)](https://www.npmjs.com/package/just-lightbox)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/fayriot/just-lightbox/blob/main/LICENSE)

Simple, lightweight Angular image lightbox library with gestures support & no dependencies

## Demo

[View Demo](https://fayriot.github.io/j-lightbox/)

## Installation

Import module:

```ts
import {JustLightboxModule} from 'just-lightbox';

@NgModule({
    imports: [JustLightboxModule.forRoot()]
})
```

## Usage

Basic usage. Lightbox opens src image

```html
<img src="path-to-full-image" jLightbox />
```

Different thumb and full images

```html
<img src="path-to-thumbnail" jLightbox="path-to-full-image" />
```

It works with a hyperlinks

```html
<a href="path-to-full-image" jLightbox>
    <img src="path-to-thumbnail" />
</a>
```

Call from code

```ts
import { JustLightboxService } from 'just-lightbox';

constructor(private lightbox: JustLightboxService) {}

open() {
    this.lightbox.open({
        describedby: 'aria-describedby',
        labelledby: 'araia-labelledby',
        imageSrc: 'path-to-full-image',
    });
}
```

## Configuration

```ts
JustLightboxModule.forRoot({
    // Image paddings in px
    containerOffset: {
        vertical: 20, // Default: 0
        horizontal: 30, // Default: 0
    },
    gesturesEnabled: true, // Pinch zoom & pan gestures. Default: true
    wheelEnabled: true, // Wheel/trackpad zoom & pan. Default: false
    wheelSensitivity: {
        zoom: 10, // Default: 10
        pan: 5, // Default: 5
    },
});
```

## Customization

Lightbox uses css variables

```css
--j-lightbox__z-index: 10000000;
--j-lightbox__overlay__background-color: rgba(0, 0, 0, 0.9);
--j-lightbox__loader__color--primary: rgba(255, 255, 255, 1);
--j-lightbox__loader__color--secondary: rgba(255, 255, 255, 0.2);
--j-lightbox__loader__animation-duration: 1.1s;
--j-lightbox__overlay__cursor: zoom-out;
```
