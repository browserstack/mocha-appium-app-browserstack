USERNAME =  process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  
exports.capabilities = {
    "platformName" : "ios",
    "appium:deviceName" : "iPhone 14 Pro",
    "browserName" : "safari",
    "appium:osVersion": "16",
    "appium:app" : "bs://<app-id>",
    'bstack:options' : {
        "projectName" : "BStack Demo",
        "buildName" : "browserstack-build-1",
        "sessionName" : "BStack single mocha-js",
        "userName" : USERNAME,
        "accessKey" : ACCESS_KEY,
        "debug" : true
    }
};
