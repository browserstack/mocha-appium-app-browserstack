# mocha-appium-app-browserstack

This repository demonstrates how to run Appium NodeJS mocha tests on BrowserStack App Automate.

## Setup

### Requirements

1. Node.js

    - If not installed, install Node.js from [here](https://nodejs.org/en/download/)

    - Ensure you have node & npm installed by running `node -v` & `npm -v`

### Install the dependencies

For Android tests, run the following command in project's base directory :

```
cd android
npm install
```
Or,

For dependencies for iOS tests, run following command in project's base directory :
```
cd ios
npm i
```
## Getting Started

Getting Started with Appium tests in NodeJS mocha   on BrowserStack couldn't be easier!

### Run your first test :

**1. Upoad your Android or iOS App**

Upload your Android app (.apk or .aab file) or iOS app (.ipa file) to BrowserStack servers using our REST API. Here is an example cURL request :

```
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
-X POST "https://api-cloud.browserstack.com/app-automate/upload" \
-F "file=@/path/to/apk/file"
```

Ensure that @ symbol is prepended to the file path in the above request. Please note the `app_url` value returned in the API response. We will use this to set the application under test while configuring the test later on.

**Note**: If you do not have an .apk or .ipa file and are looking to simply try App Automate, you can download and test using our [sample Android app](https://www.browserstack.com/app-automate/sample-apps/android/WikipediaSample.apk) or [sample iOS app](https://www.browserstack.com/app-automate/sample-apps/ios/BStackSampleApp.ipa).

**2. Configure and run your first test**

Open `single.conf.js` file in `Android` or in `ios` folder

- Replace `YOUR_USERNAME` & `YOUR_ACCESS_KEY` with your BrowserStack access credentials. Get your BrowserStack access credentials from [here](https://www.browserstack.com/accounts/settings)

- Replace `bs://<app-id>` wkth the URL obtained from app upload step

- Set the device and OS version

- If you have uploaded your own app update the test case

- Run `npm run single`

- You can access the test execution results, and debugging information such as video recording, network logs on [App Automate dashboard](https://app-automate.browserstack.com/dashboard)

---

### **Use Local testing for apps that access resources hosted in development or testing environments :**

**1. Upload your Android or iOS App**

Upload your Android app (.apk or .aab file) or iOS app (.ipa file) that access resources hosted on your internal or test environments to BrowserStack servers using our REST API. Here is an example cURL request :

```
curl -u "YOUR_USERNAME:YOUR_ACCESS_KEY" \
-X POST "https://api-cloud.browserstack.com/app-automate/upload" \
-F "file=@/path/to/apk/file"
```

Ensure that @ symbol is prepended to the file path in the above request. Please note the `app_url` value returned in the API response. We will use this to set the application under test while configuring the test later on.

**Note**: If you do not have an .apk or .ipa file and are looking to simply try App Automate, you can download and test using our [sample Android Local app](https://www.browserstack.com/app-automate/sample-apps/android/LocalSample.apk) or [sample iOS Local app](https://www.browserstack.com/app-automate/sample-apps/ios/LocalSample.ipa).

**2. Configure and run your local tes**

Open `local.conf.js` file in `Android` or in `ios` folder

- Replace `YOUR_USERNAME` & `YOUR_ACCESS_KEY` with your BrowserStack access credentials. Get your BrowserStack access credentials from [here](https://www.browserstack.com/accounts/settings)

- Replace `bs://<app-id>` wkth the URL obtained from app upload step

- Set the device and OS version

- Ensure that `local` capability is set to `true`. Within the test script, there is code snippet that automatically establishes Local Testing connection to BrowserStack servers using Javascript binding for BrowserStack Local.

- If you have uploaded your own app update the test case

- Run `npm run local`

- You can access the test execution results, and debugging information such as video recording, network logs on [App Automate dashboard](https://app-automate.browserstack.com/dashboard)

**3. Speed up test execution with parallel testing :**

Open `parallel.conf.js` file in `Android` or in `ios` folder

- Replace `YOUR_USERNAME` & `YOUR_ACCESS_KEY` with your BrowserStack access credentials. Get your BrowserStack access credentials from [here](https://www.browserstack.com/accounts/settings)
- Add multiple configurations under multiCapabilities

- Replace `bs://<app-id>` with the URL obtained from app upload step to all configurations

- Set the device and OS version to all the configuration

- If you have uploaded your own app update the test case

- Run `npm run parallel`

- You can access the test execution results, and debugging information such as video recording, network logs on [App Automate dashboard](https://app-automate.browserstack.com/dashboard)

## Integration with other NodeJS frameworks

For other NodeJS frameworks samples, refer to following repositories :

- [WebdriverIO](https://github.com/browserstack/webdriverio-appium-app-browserstack)

Note: For other test frameworks supported by App-Automate refer our [Developer documentation](https://www.browserstack.com/docs/)

## Getting Help

If you are running into any issues or have any queries, please check [Browserstack Support page](https://www.browserstack.com/support/app-automate) or [get in touch with us](https://www.browserstack.com/contact?ref=help).

