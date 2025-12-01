const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

var buildDriver = function() {
  return new Builder()
    .usingServer('http://127.0.0.1:4723/wd/hub')
    .build();
};

// Mocha test case
describe("BStackDemo Tests Module C", function () {
  this.timeout(0);
  var driver;

  before(async function () {
    driver = buildDriver();

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
  });

  it('flaky test - random result selection', async function() {
    var textOutput = await driver.findElement(
      By.xpath(
        '/XCUIElementTypeApplication/XCUIElementTypeWindow[1]/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeOther/XCUIElementTypeStaticText'
      )
    ).getText();

    let resultStr = Math.random() > 0.7 ? "hello@browserstack.com" : "ldksjflsd";

    assert(textOutput === resultStr, `Expected text "${resultStr}" but found "${textOutput}"`);
  });

  it('always failing test - missing element 1', async function() {
    try {
      var textOutput = await driver.findElement(
        By.xpath(
          '/non/existent/xpath'
        )
      ).getText();
    } catch (error) {
      assert.fail(error);
    }
  });

  it('always passing test - example C', async function() {
    assert(true);
  });

  it('always failing test - same stacktrace 1', async function() {
    try {
      var textOutput = await driver.findElement(
        By.xpath(
          '/common/incorrect/xpath'
        )
      ).getText();
    } catch (error) {
      assert.fail("SpecificError: This is the failure stacktrace for the failed test.");
    }
  });

  it('always failing test - same stacktrace 2', async function() {
    try {
      var textOutput = await driver.findElement(
        By.xpath(
          '/common/incorrect/xpath'
        )
      ).getText();
    } catch (error) {
      assert.fail("SpecificError: This is the failure stacktrace for the failed test.");
    }
  });

  it('always passing test - example D', async function() {
    assert(true);
  });

  it('always passing test - example A', async function() {
    assert(true);
  });

  it("Test with framework-level retry - 2 retries configured", function () {
    this.retries(2); // Framework-level retry
    const randomOutcome = Math.random() > 0.7;
    if (!randomOutcome) {
      throw new Error("Test failed, retrying...");
    }
  });

  it("Another Test with framework-level retry - 3 retries configured", function () {
    this.retries(3); // Framework-level retry
    const randomOutcome = Math.random() > 0.7;
    if (!randomOutcome) {
      throw new Error("Test failed, retrying...");
    }
  });

  it("always passing test - example B", async () => {
    assert("Browser" + "Stack" === "BrowserStack");
  });
  
  after(async function() {
    await driver.quit();
  })
});
