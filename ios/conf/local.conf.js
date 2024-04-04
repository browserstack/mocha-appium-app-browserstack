USERNAME =  process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
  
exports.capabilities = {
    "platformName" : "ios",
    "appium:deviceName" : "iPhone 14 Pro",
    "browserName" : "safari",
    "appium:osVersion": "16",
    "appium:app" : "bs://<app-id>",
    'bstack:options' : {
        "projectName" : "Mocha iOS Test Project",
        "buildName" : "browserstack-build-local",
        "sessionName" : "local_test",
        "userName" : USERNAME,
        "accessKey" : ACCESS_KEY,
        "debug" : true,
        "local" : true
    }
};