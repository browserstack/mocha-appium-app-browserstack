const { Builder, By, until } = require("selenium-webdriver");
const https = require("https");
var assert = require("assert"),
  conf_file = process.argv[3] || "conf/single.conf.js",
  parallel = require("mocha.parallel"),
  Promise = require("bluebird");

var capabilities = require("../" + conf_file).capabilities;

var buildDriver = function (caps) {
  caps["bstack:options"].source = "mocha:sample-appium-4:v1.0";
  return new Promise(function (resolve, reject) {
    var driver = new Builder()
      .usingServer("https://hub.browserstack.com/wd/hub")
      .withCapabilities(caps)
      .usingHttpAgent(
        new https.Agent({
          keepAlive: true,
          keepAliveMsecs: 1000000,
        })
      )
      .build();
    resolve(driver);
  });
};

parallel("Tests ", function () {
  capabilities.forEach(function (caps) {
    it("should input a text", async function () {
        var driver;
      try {
        driver = await buildDriver(caps);
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
});
