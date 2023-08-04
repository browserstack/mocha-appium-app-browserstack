const wd = require('wd');
const assert = require('assert');

// Set up desired capabilities for BrowserStack
const desiredCaps = {
  'browserstack.user': 'YOUR_USERNAME',
  'browserstack.key': 'YOUR_ACCESS_KEY',
  'device': 'Google Pixel 4',
  'os_version': '10.0',
  'app': 'bs://95e762a45b304a59ef4fe9722fe3870541d1764a',
  'project': 'Mocha Test Project',
  'build': 'browserstack-build-1',
};

// Create a new Appium driver
const driver = wd.promiseRemote('http://hub-cloud.browserstack.com/wd/hub');

// Define asserters for element waiting
const asserters = wd.asserters;

// Mocha test case
describe('Android Appium Session on BrowserStack', function () {
  this.timeout(60000);

  before(async function () {
    try {
      await driver.init(desiredCaps);
    } catch (err) {
      console.error('Error initializing driver:', err);
    }
  });

  it('should search Wikipedia', async function () {
    try {
      const searchElement = await driver.waitForElementByAccessibilityId(
        'Search Wikipedia',
        asserters.isDisplayed && asserters.isEnabled,
        30000
      );

      await searchElement.click();

      const searchInput = await driver.waitForElementById(
        'org.wikipedia.alpha:id/search_src_text',
        asserters.isDisplayed && asserters.isEnabled,
        30000
      );

      await searchInput.sendKeys("BrowserStack");

      const search_results = await driver.elementsByClassName('android.widget.TextView');
      assert(search_results.length > 0);
    } catch (err) {
      console.error('Test error:', err);
      throw err;
    }
  });

  after(async function () {
    try {
      await driver.quit();
    } catch (err) {
      console.error('Error quitting driver:', err);
    }
  });
});
