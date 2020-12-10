'use strict';

/* 
- Javascript: Add collapsible function to footer (dropdown on click) – done
- Javascript: Flyout menu on click, not hover / menu animation - done
- Javascript: Search bar functionality (hold until after mapty)
*/

// COLLAPSIBLE MOBILE FOOTER ON CLICK

// Show dropdown content on click
// - Add event listeners to each section tab by
// - Adding event listener to parent and using event propagation

const footerParent = document.querySelector('.footer-dropdown');
footerParent.addEventListener('click', function (e) {
  e.preventDefault();

  // Target closest parent for tabbed components
  const target = e.target.closest('.dropdown-tab');
  // Guard clause
  if (!target) return;

  // Show/hide dropdown content
  const dropdownContent = target.nextElementSibling;
  dropdownContent.style.display =
    dropdownContent.style.display === 'block' ? 'none' : 'block';

  // Make plus signs rotate
  // Transitions transform
  target.querySelector('.plus').classList.toggle('plus-rotate');
});

// FLYOUT MENU ON CLICK, NOT HOVER

const flyOut = function () {
  const nav = document.querySelector('nav');
  const menu = document.querySelector('.menu');
  const menuArea = document.querySelector('.menu-area');
  const dropdownContent = document.querySelector('.dropdown-content');
  const dropdownInner = document.querySelector('.dropdown-inner');
  const lines = document.querySelectorAll('.line');

  let menuClosed = true; // set a toggle state

  function changeBGColor(color) {
    nav.style.backgroundColor = color;
    dropdownContent.style.backgroundColor = color;
  }

  function open() {
    dropdownContent.style.height = '100vh';
    changeBGColor('black');
    dropdownInner.style.opacity = '100';
    menuClosed = false;
  }

  function close() {
    dropdownContent.style.height = '0';
    changeBGColor(' rgba(0, 0, 0, 0.8)');
    dropdownInner.style.opacity = '0';
    menuClosed = true;
  }

  // Menu area click
  menuArea.addEventListener('click', function (e) {
    e.preventDefault();

    // menu animation
    lines.forEach(line => line.classList.toggle('line-rotate'));

    // flyout
    if (menuClosed) open();
    else close();
  });

  // Escape key press
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
};
flyOut();
