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

const sections = document.querySelectorAll("section");
const navList  = document.querySelector("#navbar__list");




/**
 * End Global Variables
 * Start Helper Functions
 * 
*/



/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
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

  navList.insertAdjacentHTML("beforeend", navListItem);
});


// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
const navLinks = document.querySelectorAll(".menu__link");

navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
        e.preventDefault();
        const linkParentElement = e.target.parentElement;
        document
          .getElementById(linkParentElement.dataset.link)
          .scrollIntoView({ block: "end", behavior: "smooth" });
    });
});


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 

// Scroll to section on link click
// scrollToAnchor(navLinks);

// Set sections as active






