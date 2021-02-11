'use strict';

// Javascript
// On click dropdowns - done
// Arrow carousel - done
// Check why z-index is weird on tooltips – done

// ON CLICK DROPDOWNS
// reveal their respective content event propagation

function dropdowns() {
  const dropdownContents = document.querySelectorAll('.dropdown-content');
  const dropdowns = document.querySelectorAll('.dropdown');
  const body = document.querySelector('body');
  let target;
  let boolArray = new Array(4).fill(false);

  // better to use forEach here rather than event delegation on the parent (which is more efficient)
  // because three dots and the rest don't have an immediate common parent
  dropdowns.forEach(function (dropdown) {
    dropdown.addEventListener('click', function (e) {
      e.preventDefault();
      target = e.target.closest('.dropdown');
      if (!target) return; // guard clause

      const index = target.dataset.num;

      // if open is false, open and then toggle the state and make everything else false
      // if open is true, close everything nad make everything false
      boolArray[index] ? close() : open(target, index);
    });
  });

  // set dropdown content to display none when clicking outside the target
  body.addEventListener('click', function (e) {
    e.preventDefault();
    const isClickInside = target?.contains(e.target);
    if (!isClickInside) close();
  });

  // helper functions
  function open(target, index) {
    close();
    target.querySelector('.dropdown-content').style.display = 'block';
    boolArray[index] = !boolArray[index];
  }

  function close() {
    dropdownContents.forEach(content => (content.style.display = 'none'));
    boolArray = boolArray.map(e => false);
  }
}

dropdowns();

// ARROW CAROUSEL

function carousel() {
  const fadeContainer = document.querySelector('.fade-container');
  const tagContainer = document.querySelector('.tag-container');
  const tags = document.querySelectorAll('.item');

  // add event listener on arrows (event delegation on parent fade container)
  fadeContainer.addEventListener('click', function (e) {
    e.preventDefault();
    const target = e.target.closest('.tag-arrow');
    if (!target) return; // guard clause

    const dxn = target.dataset.dxn;
    const dxnOp = dxn === 'right' ? 'left' : 'right';

    const arrow = document.querySelector(`.bi-chevron-${dxn}`);
    const arrowOp = document.querySelector(`.bi-chevron-${dxnOp}`);
    const fade = document.querySelector(`.fade-${dxn}`);
    const fadeOp = document.querySelector(`.fade-${dxnOp}`);

    // scroll to the end
    const scrollDiff = tagContainer.scrollWidth - tagContainer.clientWidth;
    const scrollDist = dxn === 'right' ? -scrollDiff : scrollDiff;
    tags.forEach(tag => (tag.style.transform = `translateX(${scrollDist}px)`));

    // get rid of this arrow and fade / show other arrow and fade
    arrow.style.display = fade.style.display = 'none';
    arrowOp.style.display = fadeOp.style.display = 'block';
  });
}

carousel();
