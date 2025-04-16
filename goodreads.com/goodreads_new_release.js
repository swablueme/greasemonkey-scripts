// ==UserScript==
// @name         Modify goodreads links
// @namespace    http://tampermonkey.net/
// @version      2025-04-16
// @description  Force 'my authors' tab in the new releases tab
// @author       You
// @match        https://www.goodreads.com/new_releases/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=goodreads.com
// @grant        none
// ==/UserScript==

window.onload = (function() {
    const navigation_hyperlinks = [".left > a:nth-child(1)", ".right > a:nth-child(1)"]; // these are the two arrow links on the bottom of the https://www.goodreads.com/new_releases/ page
    navigation_hyperlinks.forEach( selector => {
        var navigation_element = document.querySelector(selector)
        navigation_element.href += "?tab=my_authors"
    }
);
})();