/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const navBar = document.querySelector(".page__header");
const sections = document.querySelectorAll("section");
const navList = document.querySelector("#navbar__list");
const collapsibles = document.querySelectorAll(".collapsible");

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

// Intersection Observer API
const setObserverForSections = (sections) => {
  /* The Intersection Observer provides a way to asynchronously observe changes 
    in the intersection of a target element with an ancestor element or with a top-level document's viewport. */

  const observer = new IntersectionObserver(addActiveClass_callback, {
    root: null, // The element that is used as the viewport for checking visibility of the target - browser viewport in this case
    rootMargin: "0px", // this value serves to grow or shrink each side of the root element's bounding box before computing intersections.
    threshold: 0.6, // indicates at what percentage of the target's visibility the observer's callback should be executed - when visibility passes the 60% in this case
  });

  // Setting an Observer for each section on the page
  sections.forEach((section) => {
    observer.observe(document.getElementById(section.id));
  });
  return observer;
};

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
const buildNav = (sections) => {
  // Creating navigation Element for each section on the page
  sections.forEach((section) => {
    const navListItem = `
    <li 
        class='${section.className}' 
        data-link=${section.id}
    >
        <a class='menu__link'  href="#${section.id}">
            ${section.dataset.nav}
        </a>
    </li>`;
    // Adding created navigation elements to the navigation list
    navList.insertAdjacentHTML("beforeend", navListItem);
  });
};

// Add class 'active' to section when near top of viewport

// Intersection Observer API callback function
const addActiveClass_callback = (observerEntries) => {
  // checking the intersection with viewport state for each section on the page
  observerEntries.forEach((observerEntry) => {
    const navListItem = document.querySelector(
      `li[data-link='${observerEntry.target.id}']`
    );
    const section = document.getElementById(observerEntry.target.id);
    const sectionClassList = section.classList;
    const navItemClassList = navListItem.classList;

    // adding the active class to the section and navigation element classlists if the section is intersecting with the viewport
    if (observerEntry?.isIntersecting) {
      navItemClassList.add("active");
      sectionClassList.add("active");
    } else {
      // removing the active class from other sections
      if (navListItem.classList.contains("active"))
        navItemClassList.remove("active");
      if (section.classList.contains("active"))
        sectionClassList.remove("active");
    }
  });
};

// Scroll to anchor ID using scrollTO event

const ScrollToAnchor = () => {
  const navLinks = document.querySelectorAll(".menu__link");
  // Adding a click event listener for each navigation item
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // Getting the navigation list item that was clicked
      const linkParentElement = e.target.parentElement;
      // Smoothly scrolling to the section associated with the clicked navigation item
      document
        .getElementById(linkParentElement.dataset.link)
        .scrollIntoView({ block: "end", behavior: "smooth" });
    });
  });
};

// Hide the navigation bar when user stops scrolling
const hideNavBar = (navBar) => {
  let isScrolling = false;
  // checking if the user is scrolling
  window.addEventListener("scroll", () => (isScrolling = true));

  setInterval(() => {
    // make the navbar visible if ths user is scrolling or if the user is at the top of the page
    if (isScrolling || window.scrollY === 0) {
      isScrolling = false;
      navBar.style.top = "0";
    } else {
      navBar.style.top = "-52px";
    }
  }, 250);
};

// Collapsible sections - collapse when clicking the section heading tag
const collapseSection = (collapsibles) => {
  collapsibles.forEach((collapsible) => {
    collapsible.addEventListener("click", (e) => {
      let collapsibleHeading = e.target;
      let content = e.target.nextElementSibling;
      if (getComputedStyle(content).opacity === "1") {
        collapsibleHeading.style.backgroundColor = "#cccc114d";
        content.style.opacity = 0;
      } else {
        content.style.opacity = 1;
        collapsibleHeading.style.backgroundColor = "transparent";
      }
    });
  });
};

/**
 * End Main Functions
 * Begin Events
 *
 */

// Build menu
buildNav(sections);

// Scroll to section on link click
ScrollToAnchor();

// Set sections and corresponding nav item as active
setObserverForSections(sections);

// Hide navBar when the user stops scrolling
hideNavBar(navBar);

// collapse sections on clicking their headings
collapseSection(collapsibles);
