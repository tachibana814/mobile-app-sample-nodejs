'use strict';

// npm package wrapper sample: https://github.com/macaca-sample/webdriver-client

module.exports = (wd, isIOS) => {
  wd.addPromiseChainMethod('customback', function() {
    if (isIOS) {
      return this
        .elementByNameIfExists('list')
        .click()
        .sleep(1000);
    }

    return this
      .back();
  });

  wd.addPromiseChainMethod('appLogin', function(username, password) {
    if (isIOS) {
      return this
        .waitForElementByXPath('//XCUIElementTypeTextField[1]')
        .clear()
        .sendKeys(username)
        .waitForElementByXPath('//XCUIElementTypeSecureTextField[1]')
        .clear()
        .sendKeys(password)
        .sleep(1000)
        .sendKeys('\n')
        .waitForElementByName('Login')
        .click()
        .sleep(5000);
    }

    return this
      .waitForElementsByClassName('android.widget.EditText', {}, 120000)
      .then(function(els) {
        return els[0];
      })
      .clear()
      .sendKeys(username)
      .sleep(1000)
      .elementsByClassName('android.widget.EditText')
      .then(function(els) {
        return els[1];
      })
      .clear()
      .sendKeys(password)
      .sleep(1000)
      .waitForElementByName('Login')
      .click()
      .sleep(5000);
  });

  wd.addPromiseChainMethod('changeToNativeContext', function() {
    return this
      .contexts()
      .then(arr => {
        return this
          .context(arr[0]);
      });
  });

  wd.addPromiseChainMethod('changeToWebviewContext', function() {
    if (isIOS) {
      return this
        .contexts()
        .then(arr => {
          return this
            .context(arr[arr.length - 1]);
        });
    }

    return this
      .contexts()
      .then(arr => {
        return this
          .context(arr[arr.length - 1]);
      })
      .windowHandles()
      .then(handles => {
        if (handles.length > 1) {
          return this
            .window(handles[handles.length - 1]);
        }
      })
      .sleep(1000);
  });
};
