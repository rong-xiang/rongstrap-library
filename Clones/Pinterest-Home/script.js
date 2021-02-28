'use strict';

/*

To implement:

- Nav dropdowns
- Pin dropdowns
    - Cursor so that it's only zoom-in when on hover overlay but not on the dropdown content - done (fixed in CSs)
    - when you click, the search bar is already focused (ehh, optional)
- Plus and question dropdowns
- On scroll, nav gets a shadow
- 

You can either:
#1 add an event listener on the parent and use event delegation, OR
#2 use forEach to add an event listener to all elements with a particular class (less efficient0)

*/

// IMPLEMENT DROPDOWNS

//////////* Using Method #2 *//////////
const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach(function (dropdown) {
  // For each dropdown, find its child dropdown-content and toggle the show class
  dropdown.addEventListener('click', function (e) {
    e.preventDefault();
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    dropdownContent.classList.toggle('show');
  });
});

// close dropdown menu if user clicks outisde of it
