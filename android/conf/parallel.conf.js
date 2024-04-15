var config = {
    'commonCapabilities': {
      'userName': process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
      'accessKey': process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACCESS_KEY',
      'buildName': 'browserstack-build-1',
      'debug': 'true',
      "projectName" : "Mocha Android Test Project",
      "debug" : true
    },
    'multiCapabilities': [{
        "appium:deviceName" : "Google Pixel 6 Pro",
        "appium:osVersion": "12.0",
        "browserName" : "chrome",
        "platformName" : "android",
        "appium:app" : "bs://<app-id>",
        'bstack:options' : {
            "sessionName" : "Bstack parallel mocha",
        }
      },
      {
        "appium:deviceName" : "Samsung Galaxy S22 Ultra",
        "appium:osVersion": "12.0",
        "browserName" : "chrome",
        "platformName" : "android",
        "appium:app" : "bs://<app-id>",
        'bstack:options' : {
            "sessionName" : "Bstack parallel mocha",
        }
      },
      {
        "appium:deviceName" : "Google Pixel 6 Pro",
        "appium:osVersion": "12.0",
        "browserName" : "chrome",
        "platformName" : "android",
        "appium:app" : "bs://<app-id>",
        'bstack:options' : {
            "sessionName" : "Bstack parallel mocha",
        }
      }
]
  };
  
  exports.capabilities = [];
  // Code to support common capabilities
  config.multiCapabilities.forEach(function(caps) {
    var temp_caps = JSON.parse(JSON.stringify(config.commonCapabilities));
    caps['bstack:options'] = {
      ...caps['bstack:options'],
      ...temp_caps
    };
    exports.capabilities.push(caps);
  });
