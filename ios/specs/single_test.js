const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

var buildDriver = function() {
  return new Builder()
    .usingServer('http://127.0.0.1:4723/wd/hub')
    .build();
};

// Mocha test case
describe("Test sample app UI Elements", function () {
  this.timeout(0);
  var driver;

  beforeEach(function (done) {
    driver = buildDriver();
    done();
  });

  it("should input a text", async function () {
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
