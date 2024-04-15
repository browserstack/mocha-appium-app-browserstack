const { Builder, By, until } = require("selenium-webdriver");
var assert = require('assert');

var buildDriver = function() {
  return new Builder()
    .usingServer('http://127.0.0.1:4723/wd/hub')
    .build();
};

describe('BrowserStack Local Testing', function() {
  this.timeout(0);

  it('check tunnel is working', async function () {
    let driver = buildDriver();
    try {
        await driver.wait(
          until.elementLocated(
            By.xpath(
              '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.Button'
            )
          ), 30000
        ).click();
        var textElement = await driver.wait(
          until.elementLocated(
            By.xpath(
              '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.view.ViewGroup/android.widget.FrameLayout[2]/android.view.ViewGroup/android.widget.TextView'
            ), 30000
          )
        ).getText();
    
        assert(textElement.includes('The active connection is wifi'));
        assert(textElement.includes('Up and running'));
    
        await driver.executeScript(
          'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "The connection is up and running"}}'
        );
      } catch (e) {
        console.log("error", e.message);
        await driver.executeScript(
          'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load"}}'
        );
      }
  });
});
