const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");
const https = require("https");
const conf_file = process.argv[3] || 'conf/single.conf.js';

// Set up desired capabilities for BrowserStack
var capabilities = require('../' + conf_file).capabilities;
capabilities['bstack:options'].source = 'mocha:sample-appium-4:v1.0';

var buildDriver = function (capabilities) {
  return new Builder()
    .usingServer("https://hub.browserstack.com/wd/hub")
    .withCapabilities(capabilities)
    .usingHttpAgent(
      new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 1000000,
      })
    )
    .build();
};

// Mocha test case
describe("Search Wikipedia Functionality", function () {
  this.timeout(0);
  var driver;

  beforeEach(function (done) {
    driver = buildDriver(capabilities);
    done();
  });

  it("should search Wikipedia", async function () {
    try {
      await driver.wait(
        until.elementLocated(
          By.xpath(
            '/XCUIElementTypeApplication/XCUIElementTypeWindow/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeButton[1]'
          )
        ), 30000
      ).click();
  
      var textInput = await driver.wait(
        until.elementLocated(
          By.xpath(
            '/XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeTextField'
          ), 30000
        )
      );
      await textInput.sendKeys('hello@browserstack.com\n');
      await driver.sleep(5000);
  
      var textOutput = await driver.findElement(
        By.xpath(
          '/XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText'
        )
      ).getText();
  
      assert(textOutput === 'hello@browserstack.com');
      //marking the test as Passed if search results have listed items
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"passed","reason": "Input and output text matches"}}'
      );
    } catch (e) {
      //marking the test as Failed if search results have not listed items
      console.log("Error:", e.message);
      await driver.executeScript(
        'browserstack_executor: {"action": "setSessionStatus", "arguments": {"status":"failed","reason": "Some elements failed to load"}}'
      );
    } finally {
      await driver.quit();
    }
  });
});
