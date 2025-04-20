// ==UserScript==
// @name         Show threadwatcher on 8chan.moe
// @namespace    http://tampermonkey.net/
// @version      2025-04-16
// @description  Forces the threadwatcher to permanent visibility on 8chan.moe
// @author       You
// @match        https://8chan.se/*
// @match        https://8chan.moe/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goodreads.com
// @grant        none
// ==/UserScript==

var og_value_left = thread_watcher?.style.left;
var thread_watcher = null;

var og_style = thread_watcher?.style;

function checkStyleChanges() {
  thread_watcher = document.getElementById("watchedMenu");
  if (thread_watcher?.style.left != og_value_left) {
    og_value_left = thread_watcher?.style.left;
    console.log("changed to: " + og_value_left);
    localStorage.setItem("og_value_left", og_value_left);
  }
}

new MutationObserver(check).observe(document, {
  childList: true,
  subtree: true,
});
new MutationObserver(checkStyleChanges).observe(document, {
  childList: true,
  subtree: true,
});

function check(changes, observer) {
  if (document.getElementById("watchedMenu")) {
    observer.disconnect();
    thread_watcher = document.getElementById("watchedMenu");
    console.log(thread_watcher);
    og_value_left = localStorage.getItem("og_value_left");
    if (og_value_left) {
      thread_watcher.style.left = og_value_left;
    }

    thread_watcher.className = "floatingMenu focused";
    thread_watcher.style.display = "flex";
    og_style = thread_watcher.style;
    console.log(og_style);
  }
}
