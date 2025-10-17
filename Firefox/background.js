browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'setCookie') {
    browser.cookies.set({
      url: 'https://login.live.com',
      name: request.name || 'MSPRequestCookie',
      value: request.value,
      secure: true,
      path: '/',
      httpOnly: false,
      sameSite: 'lax'
    }).then(
      (cookie) => sendResponse({ success: true }),
      (error) => sendResponse({ success: false, error: error.message })
    );
    return true;
  }
});
