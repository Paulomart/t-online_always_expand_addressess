// ==UserScript==
// @name     T-Online.de Email Center: Always Expand Addresses
// @version  1
// @grant    none
// @include  *://email.t-online.de/*
// ==/UserScript==

(function() {
  const expandEmailAddresses = function expandEmailAddresses() {
    const readMailContainer = document.querySelector('#messageContainer');

    if (readMailContainer.style.display == "none") {
    	return;
    }

    const buttonElements = document.querySelectorAll('button.xSmallBtn.messageHeaderRecipientButton.recipientItemMenuContainer.messageHeaderRecipientButtonCE.cmp_parsed_email');
    if (!buttonElements) {
      return;
    }

    for (const buttonElement of buttonElements) {

      const emailFound = buttonElement.getAttribute('title');
      const parentOfSpan = buttonElement.parentElement;

     	const oldSpans = parentOfSpan.querySelectorAll('span.fix-always-display-email');

      while (oldSpans.length > 1) {
       	oldSpans.pop().remove();
      }


      if (oldSpans.length == 0) {

        const emailInfoSpan = document.createElement('span');
        emailInfoSpan.className = 'fix-always-display-email';
        emailInfoSpan.style.color = 'red';

        const emailInfoSpanText = document.createTextNode(emailFound);
        emailInfoSpan.appendChild(emailInfoSpanText);
        buttonElement.parentElement.appendChild(emailInfoSpan);

      } else {

        const spanToUpdate = oldSpans[0];


        if (spanToUpdate.textContent != emailFound) {
          spanToUpdate.textContent = emailFound;
        }
      }

    }
  }

  const saveExpandEmailAddresses = function saveExpandEmailAddresses() {
    const timeouts = [0, 100, 500, 1000, 2000, 5000, 10000];
    for (const timeout of timeouts) {
      setTimeout(expandEmailAddresses, timeout);
    }
  }

  window.addEventListener("hashchange", saveExpandEmailAddresses, false);

  saveExpandEmailAddresses();

})();
