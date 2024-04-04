USERNAME =  process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  
exports.capabilities = {
    "platformName" : "android",
    "appium:deviceName" : "Samsung Galaxy S22 Ultra",
    "browserName" : "chrome",
    "appium:osVersion": "12.0",
    "appium:app" : "bs://<app-id>",
    'bstack:options' : {
        "projectName" : "Mocha Android Test Project",
        "buildName" : "browserstack-build-local",
        "sessionName" : "local_test",
        "userName" : USERNAME,
        "accessKey" : ACCESS_KEY,
        "debug" : true,
        "local" : true
    }
};