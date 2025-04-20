// ==UserScript==
// @name         Show threadwatcher on 8chan.moe
// @namespace    http://tampermonkey.net/
// @version      2025-04-20
// @description  Forces the threadwatcher to be visible on page load for 8chan.moe and save the position of it
// @author       You
// @match        https://8chan.se/*
// @match        https://8chan.moe/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=8chan.se
// @grant        none
// ==/UserScript==

var og_value_left = null;
var og_value_top = null;
var OG_VALUE_LEFT_KEY = "og_value_left";
var OG_VALUE_TOP_KEY = "og_value_top";
var thread_watcher = null;

function observeStyleChanges() {
  // if values change them save 'em to the local storage
  if (
    thread_watcher?.style.left != og_value_left ||
    thread_watcher?.style.right != og_value_top
  ) {
    og_value_left = thread_watcher?.style.left;
    og_value_top = thread_watcher?.style.top;
    localStorage.setItem(OG_VALUE_LEFT_KEY, og_value_left);
    localStorage.setItem(OG_VALUE_TOP_KEY, og_value_top);
  }
}

new MutationObserver(observeUntilPageHasLoaded).observe(document, {
  childList: true,
  subtree: true,
});
new MutationObserver(observeStyleChanges).observe(document, {
  childList: true,
  subtree: true,
});

function observeUntilPageHasLoaded(changes, observer) {
  thread_watcher = document.getElementById("watchedMenu");
  if (thread_watcher) {
    observer.disconnect();

    // retrieve saved values if they exist
    og_value_left = localStorage.getItem(OG_VALUE_LEFT_KEY);
    og_value_top = localStorage.getItem(OG_VALUE_TOP_KEY);
    if (
      og_value_left != null &&
      og_value_top != null &&
      og_value_left != "" &&
      og_value_top != ""
    ) {
      thread_watcher.style.left = og_value_left;
      thread_watcher.style.top = og_value_top;
    }

    // display the thread watcher
    thread_watcher.className = "floatingMenu focused";
    thread_watcher.style.display = "flex";
  }
}
