# mp-infinite_scrolling

## Intersection Observer API

> The Intersection Observer API provides a way to asynchronously observe changes in the intersection of a target element with an ancestor element or with a top-level document's viewport.

Intersection information is needed for many reasons, such as:

- Lazy-loading of images or other content as a page is scrolled.
- Implementing "infinite scrolling" websites, where more and more content is loaded and rendered as you scroll, so that the user doesn't have to flip through pages.
- Reporting of visibility of advertisements in order to calculate ad revenues.
- Deciding whether or not to perform tasks or animation processes based on whether or not the user will see the result.

## 1. Creating an intersection observer

Create the intersection observer by calling its constructor and passing it a callback function to be run whenever a threshold is crossed in one direction or the other:

```js
let options = {
  root: document.querySelector('#scrollArea'),
  rootMargin: '0px',
  threshold: 1.0,
};

let observer = new IntersectionObserver(handleIntersect, options);
```

## 2a. Targeting an element to be observed

Once you have created the observer, you need to give it a target element to watch:

```js
const target = document.querySelector('#listItem');
observer.observe(target);

// the callback we setup for the observer will be executed now for the first time
// it waits until we assign a target to our observer (even if the target is currently not visible)
```

## 2b. Callback Setup

Whenever the target meets a threshold specified for the `IntersectionObserver`, the callback is invoked. The callback receives a list of [`IntersectionObserverEntry`](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) objects and the observer:

```js
const handleIntersect = (entries, observer) => {
  entries.forEach((entry) => {
    // Each entry describes an intersection change for one observed target element:
    //   entry.boundingClientRect
    //   entry.intersectionRatio
    //   entry.intersectionRect
    //   entry.isIntersecting
    //   entry.rootBounds
    //   entry.target
    //   entry.time
  });
};
```

### Callback Example

```js
const handleIntersect = (entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      let elem = entry.target;

      if (entry.intersectionRatio >= 0.75) {
        intersectionCounter++;
      }
    }
  });
};
```

## All together

```js
// observer callback
function handleIntersect(entries, observer) {
  entries.forEach((entry) => {
    // if (entry.intersectionRatio > prevRatio)
  });
}

// observer options
const options = {
  root: null,
  rootMargin: '0px',
  threshold: buildThresholdList(),
};

// create observer object
const observer = new IntersectionObserver(handleIntersect, options);

// target element to be observed
const target = document.querySelector('#box');

// observe target element
observer.observe(target);
```

#### References

[Intersection Observer API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)  
[IntersectionObserverEntry (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry)  
[Learn Intersection Observer In 15 Minutes](https://www.youtube.com/watch?v=2IbRtjez6ag)  
[Lazy-Loaded Images with IntersectionObserver - Code This, Not That](https://www.youtube.com/watch?v=aUjBvuUdkhg)
