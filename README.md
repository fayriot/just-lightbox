# Just Lightbox

[![Build Status](https://travis-ci.com/fayriot/just-lightbox.svg?branch=main)](https://travis-ci.com/fayriot/just-lightbox)
[![npm](https://img.shields.io/npm/v/just-lightbox.svg)](https://www.npmjs.com/package/just-lightbox)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://github.com/fayriot/just-lightbox/blob/main/LICENSE)

Simple, lightweight Angular image lightbox library with no dependencies

## Demo

[View Demo](https://fayriot.ru/j-lightbox/)

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

## Configuration

```ts
JustLightboxModule.forRoot({
    containerOffset: {
        // image paddings in px
        vertical: 20,
        horizontal: 30,
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

## Roadmap

-   Gestures
-   Events
-   Image clusters
