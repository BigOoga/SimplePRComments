// ==UserScript==
// @name        SimplePRComments
// @namespace   Violentmonkey Scripts
// @match       https://bitbucket.org/*
// @grant       none
// @version     1.0
// @author      -
// @description 12/12/2023, 11:24:05 AM
// ==/UserScript==


function isStartReviewButton(button) {
  const span = button.querySelector('span');
  return span && span.textContent.trim().toLowerCase() === 'start review';
}

function handleDomChanges(mutations) {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {

      if (node.nodeType === 1 && node.tagName === 'DIV') {
        const buttons = node.querySelectorAll('button');

        buttons.forEach((button) => {
          if (isStartReviewButton(button)) {
            button.remove();
          }
        });
      }
    });
  });
}

// Observer setup and start
const observer = new MutationObserver(handleDomChanges);
const observerConfig = {
  childList: true,
  subtree: true,
};
observer.observe(document.body, observerConfig);

