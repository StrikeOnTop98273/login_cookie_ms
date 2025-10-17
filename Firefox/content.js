if (window.location.hostname === 'login.live.com' && document.body) {
  const checkAndReplaceButton = () => {
    const usernameInput = document.querySelector('input#usernameEntry');
    const submitButton = document.querySelector('button[data-testid="primaryButton"]');
    if (usernameInput && submitButton) {
      const inputValue = usernameInput.value;
      if (inputValue.startsWith('11-M')) {
        const customButton = document.createElement('button');
        customButton.textContent = 'Login with cookie';
        customButton.style.cssText = `
          background: #0078d4; color: white; padding: 10px 20px; border: none;
          border-radius: 4px; cursor: pointer; font-size: 16px;
          width: ${submitButton.offsetWidth}px; height: ${submitButton.offsetHeight}px;
        `;
        customButton.addEventListener('click', () => {
          const cookieValue = inputValue;
          if (cookieValue) {
            browser.runtime.sendMessage({
              action: 'setCookie',
              value: cookieValue,
              name: '__Host-MSAAUTH'
            }).then((response) => {
              if (response.success) {
                window.location.reload();
              } else {
                alert('Failed: ' + response.error);
              }
            });
          }
        });
        submitButton.parentNode.replaceChild(customButton, submitButton);
      }
    }
  };

  const usernameInput = document.querySelector('input#usernameEntry');
  if (usernameInput) {
    usernameInput.addEventListener('input', checkAndReplaceButton);
  }
  checkAndReplaceButton();

  let currentUrl = window.location.href;
  new MutationObserver(() => {
    if (window.location.href !== currentUrl) {
      currentUrl = window.location.href;
      if (window.location.hostname === 'login.live.com') {
        checkAndReplaceButton();
      }
    }
  }).observe(document, { subtree: true, childList: true });

  window.addEventListener('popstate', () => {
    if (window.location.hostname === 'login.live.com') {
      checkAndReplaceButton();
    }
  });
}
