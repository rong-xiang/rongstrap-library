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
#2 use forEach to add an event listener to all elements with a particular class (less efficient)

*/

// IMPLEMENT DROPDOWNS

//////////* Using Method #2 *//////////
const dropdowns = document.querySelectorAll('.dropdown');
const dropdownContents = document.querySelectorAll('.dropdown-content');
let target;

dropdowns.forEach(function (dropdown) {
  // For each dropdown, find its child dropdown-content and toggle the show class
  dropdown.addEventListener('click', function (e) {
    e.preventDefault();
    const dropdownContent = dropdown.querySelector('.dropdown-content');

    // Toggle
    if (dropdownContent.classList.contains('show')) {
      close();
    } else {
      close();
      dropdownContent.classList.add('show'); // open
    }

    if (dropdownContent.classList.contains('show')) target = dropdown; // set target

    function close() {
      dropdownContents.forEach(content => content.classList.remove('show'));
    }
  });
});

// close dropdown menu if user clicks outside of it
window.addEventListener('click', function (e) {
  // check that you're clicking outside of the selected dropdown
  let selected = e.target.closest('.dropdown');
  if (!target?.contains(selected)) {
    console.log(`target doesn't match!`);
    // remove the show class from the target's dropdown class
    dropdownContents.forEach(content => content.classList.remove('show'));
    console.log(target.querySelector('.dropdown-content').classList);
  }
});
