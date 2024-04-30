USERNAME =  process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  
exports.capabilities = {
    "platformName" : "android",
    "appium:deviceName" : "Samsung Galaxy S22 Ultra",
    "browserName" : "chrome",
    "appium:osVersion": "12.0",
    "appium:app" : "bs://<app-id>",
    'bstack:options' : {
        "projectName" : "BStack Demo",
        "buildName" : "browserstack-build-1",
        "sessionName" : "BStack local mocha-js",
        "userName" : USERNAME,
        "accessKey" : ACCESS_KEY,
        "debug" : true,
        "local" : true
    }
};
