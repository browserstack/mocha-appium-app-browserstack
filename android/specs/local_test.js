const https = require("https");
const { Builder, By, until } = require("selenium-webdriver");
var assert = require('assert'),
  browserstack = require('browserstack-local'),
  conf_file = process.argv[3] || 'conf/local.conf.js';
  
var caps = require('../' + conf_file).capabilities;
caps['bstack:options'].source = 'mocha:sample-appium-4:v1.0';

var buildDriver = function(caps) {
  return new Builder()
    .usingServer('https://hub.browserstack.com/wd/hub')
    .withCapabilities(caps)
    .usingHttpAgent(
      new https.Agent({
        keepAlive: true,
        keepAliveMsecs: 1000000,
      })
    )
    .build();
};

describe('BrowserStack Local Testing', function() {
  this.timeout(0);
  var driver, bsLocal;

  beforeEach(async function() {
    bsLocal = new browserstack.Local();
    await new Promise((resolve, reject) => {
        bsLocal.start({ 'key': caps['bstack:options'].accessKey }, function(error) {
          if (error) reject(error);
          driver = buildDriver(caps);
          resolve();
        });
    });
  });

  it('check tunnel is working', async function () {
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

  afterEach(async function() {
    await driver.quit();
    await new Promise((resolve, reject) => {
        bsLocal.stop(function(error) {
          if(error) reject("Error in stopping BrowserStack Local :" + error);
          console.log("Stopped BrowserStack Local");
          resolve();
        });
      });
  });
});
