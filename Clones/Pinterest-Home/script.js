'use strict';

/*

To implement:

- Nav dropdowns - done
- Pin dropdowns - done
    - Cursor so that it's only zoom-in when on hover overlay but not on the dropdown content - done (fixed in CSs)
    - when you click, the search bar is already focused (ehh, optional)
    - Hover only triggers black background / opacity overlay, and elements – done
    - If you click on one of overlay elements, the overlay stays on until you click off (like with dropdowns) – done
    - Save button toggles display when you click save-to dropdown
- Plus and question dropdowns - done
- On scroll, nav gets a shadow

You can either:
#1 add an event listener on the parent and use event delegation, OR
#2 use forEach to add an event listener to all elements with a particular class (less efficient)

*/

//////////* IMPLEMENT DROPDOWNS *//////////

//////////* Using Method #2 *//////////

function dropdown() {
  const dropdowns = document.querySelectorAll('.dropdown');
  const dropdownContents = document.querySelectorAll('.dropdown-content');
  let target;

  function close() {
    dropdownContents.forEach(content => content.classList.remove('show'));
  }

  function open(dropdownContent) {
    close();
    dropdownContent.classList.add('show'); // open
  }

  dropdowns.forEach(function (dropdown) {
    // For each dropdown, find its child dropdown-content and toggle the show class
    dropdown.addEventListener('click', function (e) {
      e.preventDefault();
      const dropdownContent = dropdown.querySelector('.dropdown-content');
      dropdownContent.classList.contains('show')
        ? close()
        : open(dropdownContent); // toggle
      if (dropdownContent.classList.contains('show')) target = dropdown; // set target
    });
  });

  // close dropdown menu if user clicks outside of it
  window.addEventListener('click', function (e) {
    // check that you're clicking outside of the selected dropdown
    let selected = e.target.closest('.dropdown');
    if (!target?.contains(selected)) {
      // remove the show class from the target's dropdown class
      close();
    }
  });
}

dropdown();

//////////* IMPLEMENT HOVERS *//////////

// LOGIC
// 1. If hover element isn't selected, hover will toggle display overlay bg and overlay elements (HTML, CSS)
// 2. If hover element is selected, hover will toggle overlay bg, but overlay elements will show unless clicked outside

// STEPS
// 1. In HTML/CSS, make sure overlay bg and overlay elements are separate
// 2. Attach event listeners to all pin overlays, pin overlay elements, and pin overlay parent (gallery)
// 3. If you click on overlay elements, show elements
// 4. If you click outside the selected overlay elements

const overlays = document.querySelectorAll('.pin-overlay'); // need this for forEach method
const overlayElements = document.querySelectorAll('.pin-overlay-elements');
const overlayParent = document.querySelector('.gallery'); // need this for parent event del
let target;

function hideAll() {
  overlayElements.forEach(elements => elements.classList.remove('show'));
}
function show(elements) {
  hideAll();
  elements.classList.add('show');
}

// If you click on overlay elements show elements
overlayParent.addEventListener('click', function (e) {
  e.preventDefault();
  const selectedOverlay = e.target.closest('.pin-overlay');
  if (!selectedOverlay) return; // guard clause
  const selectedOverlayElements = selectedOverlay.querySelector(
    '.pin-overlay-elements'
  );
  show(selectedOverlayElements);
  target = selectedOverlay;
});

// If you click outside the dropdown, take show off elements
window.addEventListener('click', function (e) {
  e.preventDefault();
  if (!target?.contains(e.target)) {
    hideAll();
  }
});
