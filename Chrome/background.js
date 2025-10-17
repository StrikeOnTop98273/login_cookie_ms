chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setCookie') {
    chrome.cookies.set({
      url: 'https://login.live.com',
      name: request.name || 'MSPRequestCookie',
      value: request.value,
      secure: true,
      path: '/',
      httpOnly: false,
      sameSite: 'lax'
    }, (cookie) => {
      if (chrome.runtime.lastError) {
        sendResponse({ success: false, error: chrome.runtime.lastError.message });
      } else {
        sendResponse({ success: true });
      }
    });
    return true;
  }
});
