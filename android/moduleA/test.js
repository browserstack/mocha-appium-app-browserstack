const { Builder, By, until } = require("selenium-webdriver");
const assert = require("assert");

var buildDriver = function() {
  return new Builder()
    .usingServer('http://127.0.0.1:4723/wd/hub')
    .build();
};

// Mocha test case
describe("BStackDemo Tests Module A", function () {
  this.timeout(0);
  var driver;

  before(async function () {
    driver = buildDriver();
    await driver
        .wait(
          until.elementLocated(
            By.xpath(
              "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.view.ViewGroup/android.support.v4.view.ViewPager/android.view.ViewGroup/android.widget.FrameLayout/android.support.v7.widget.RecyclerView/android.widget.FrameLayout[1]/android.widget.LinearLayout/android.widget.TextView"
            )
          ),
          30000
        )
        .click();
  });

  it('flaky test - valid v/s invalid search string', async function() {
    var insertTextSelector = await driver.wait(
        until.elementLocated(
          By.xpath(
            "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout[1]/android.widget.FrameLayout[1]/android.view.ViewGroup/android.widget.LinearLayout/android.support.v7.widget.LinearLayoutCompat/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.LinearLayout/android.widget.AutoCompleteTextView"
          ),
          30000
        )
      );

      let searchStr = Math.random() > 0.5 ? "BrowserStack" : "dslkfjkjlsdjkfkjfls";

      await insertTextSelector.sendKeys(searchStr);
      await driver.sleep(5000);

      var allProductsName = await driver.findElements(
        By.xpath(
          "/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.LinearLayout[1]/android.widget.FrameLayout[2]/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ListView/android.widget.LinearLayout"
        )
      );

      assert(allProductsName.length > 0, "No search results found");
  })

  it('always failing test - missing element 1', async function() {
    try {
      await driver.wait(
        until.elementLocated(
          By.xpath(
            "/hierarchy/non/existent/path"
          )
        ),
        5000
      );
      assert.fail("Test failed");
    } catch (error) {
      assert.fail(error);
    }
  });

  it('always passing test - example C', async function() {
    assert(true);
  });

  it("always failing test - same stacktrace 1", async () => {
    try {
      await driver.wait(
        until.elementLocated(
          By.xpath(
            "/hierarchy/common/incorrect/xpath/for/testing"
          )
        ),
        5000
      );
      assert.fail("Test failed");
    } catch (error) {
      assert.fail(error);
    }
  });

  it("always failing test - same stacktrace 2", async () => {
    try {
      await driver.wait(
        until.elementLocated(
          By.xpath(
            "/hierarchy/common/incorrect/xpath/for/testing"
          )
        ),
        5000
      );
      assert.fail("Test failed");
    } catch (error) {
      assert.fail(error);
    }
  });

  it("always passing test - example D", async () => {
    assert(true);
  });

  it("always passing test - example A", async () => {
    assert(1 + 1 === 2);
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
  });
});
