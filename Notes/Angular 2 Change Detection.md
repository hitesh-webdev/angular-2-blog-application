# Angular 2 Change Detection

Angular 2 at startup time will patch several low-level browser APIs, such as for example: `addEventListener`, which is 
the browser function used to register all browser events, including click handlers. Angular will replace 
addEventListener with a new version:

```javascript
// this is the new version of addEventListener
function addEventListener(eventName, callback) {
    // call the real addEventListener
    callRealAddEventListener(eventName, function() {
        // first call the original callback
        callback(...);     
        // and then run Angular-specific functionality
        var changed = angular2.runChangeDetection();
        if (changed) {
            angular2.reRenderUIPart();
        }
    });
}
```

The new version of addEventListener adds more functionality to any event handler—not only the registered callback is 
called, but Angular 2 is given a chance to **run change detection** and update the UI.

> This low-level patching of browser APIs is done by a library shipped with Angular called **Zone.js**.

<br>

## Zone

A zone is nothing more than an execution context that **survives multiple JavaScript VM execution turns**.
Angular uses zones internally to trigger change detection, but another possible use would be for application 
profiling, or keeping track of long stack traces that run across multiple VM turns.


The following frequently used browser mechanisms are patched by _Zone.js_ to support change detection:

- all browser events (click, mouseover, keyup, etc.)
- `setTimeout()` and `setInterval()`
- Ajax requests


> One limitation of this mechanism is that if by some reason an asynchronous browser API is not supported by Zone.js, 
then change detection will not be triggered. For example, this is the case of **IndexedDB callbacks**.

Each Angular 2 component has an associated change detector, which is created at application startup time.

> By default, Angular 2 Change Detection works by checking if the value of template expressions have changed. This is 
done for all components.

> By default, Angular 2 does not do deep object comparison to detect changes, it only takes into account properties 
used by the template.

<br>

## What About Comparison by Reference?
The fact of the matter is that JavaScript objects are **mutable**, and Angular wants to give full support out of the 
box for those.

Imagine what it would be if the Angular 2 default change detection mechanism would be based on _reference comparison_ 
of component inputs instead of the default mechanism? Even something as simple as the sample Todo application would 
be tricky to build: developers would have to be very careful to create a new Todo instead of simply updating properties.

But as we will see, it's still possible to customize Angular change detection if we really need to.

<br>

## The _OnPush_ Change Detection Mode

OnPush does not check only for changes in the component inputs: if a component emits an event that will also trigger 
change detection.

A good choice for going immutable is to use the **Immutable.js** library. This library provides immutable primitives for 
building applications, like for example _immutable objects (Maps)_ and _immutable lists_.


One of the important properties of Angular 2 change detection is that unlike Angular 1 it enforces a 
**uni-directional data flow**: when the data on our controller classes gets updated, change detection runs and 
updates the view.

But, that updating of the view does not itself trigger further changes which on their turn trigger further updates to 
the view, creating what in Angular 1 was called a **digest cycle**.

<br>

## Turning On/Off Change Detection, and Triggering it Manually
There could be special occasions where we do indeed want to **turn off change detection**. Imagine a situation where 
a lot of data arrives from the backend via a websocket. We might want to update a certain part of the UI only once every 5 seconds. To do so, we start by injecting the change detector into the component:

```javascript
constructor(private ref: ChangeDetectorRef) {
    ref.detach();
    setInterval(() => {
      this.ref.detectChanges();
    }, 5000);
}
```
> As we can see, we just detach the change detector, which effectively turns off change detection. Then we simply 
trigger it manually every 5 seconds by calling detectChanges().

<br>

## Conclusions
The Angular 2 default change detection mechanism is actually quite similar to Angular 1: it compares the values of 
templates expressions before and after a browser event to see if something changed. It does so for all components. 
But, there are also some important differences:

- For one there are no change detection loops, or a digest cycle as it was named in Angular 1. This allows us to 
reason about each component just by looking at its template and its controller.

- Another difference is that the mechanism of detecting changes in a component is much faster due to the way change 
detectors are built.

- Finally and unlike in Angular 1, the change detection mechanism is customizable.