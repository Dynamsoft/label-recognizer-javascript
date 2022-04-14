<!--The original doc is hosted here => https://github.com/dynamsoft-docs/label-recognition-docs/blob/master/programming/javascript/user-guide.md -->

# Dynamsoft Label Recognizer for Your Website

Add the capability of reading ID cards or other text of fixed formats in your web application with just a few lines of code.

![version](https://img.shields.io/npm/v/dynamsoft-label-recognizer.svg)
![downloads](https://img.shields.io/npm/dm/dynamsoft-label-recognizer.svg)
![jsdelivr](https://img.shields.io/jsdelivr/npm/hm/dynamsoft-label-recognizer.svg)
![vulnerabilities](https://img.shields.io/snyk/vulnerabilities/npm/dynamsoft-label-recognizer.svg)

Once integrated, your users can open your website in a browser, access their cameras, and read the intended text directly from the video input.

In this guide, you will learn step by step on how to integrate this library into your website.

<span style="font-size:20px">Table of Contents</span>

* [Hello World - Simplest Implementation](#hello-world---simplest-implementation)
* [Building your own page](#building-your-own-page)
  * [Include the library](#include-the-library)
  * [Configure the library](#configure-the-library)
  * [Interact with the library](#interact-with-the-library)
* [API Documentation](#api-documentation)
* [System Requirements](#system-requirements)
* [Hosting the Library](#hosting-the-library)
* [FAQ](#faq)

## Hello World - Simplest Implementation

Let's start by testing the "Hello World" example of the library which demonstrates how to use the minimum code to enable a web page to read text from a live video stream.  

* Basic Requirements
  * Internet connection  
  * [A supported browser](#system-requirements)
  * Camera access  

### Step One: Check the code of the example

The complete code of the "Hello World" example is shown below

```html
<!DOCTYPE html>
<html>

<body>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-label-recognizer@2.2.4/dist/dlr.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@2.3.2/dist/dce.js"></script>
    <script>
        // Specify a license, you can visit https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dlr&package=js to get your own trial license good for 30 days. 
        Dynamsoft.DLR.LabelRecognizer.license = 'DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9';
        // Initialize and use the library
        (async () => {
            Dynamsoft.DLR.LabelRecognizer.onResourcesLoadStarted = (resourcePath) => {
                console.log("Loading " + resourcePath);
                // Show a visual cue that a model file is being downloaded
            };
            Dynamsoft.DLR.LabelRecognizer.onResourcesLoaded = (resourcePath) => {
                console.log("Finished loading " + resourcePath);
                // Hide the visual cue
            };
            let recognizer = await Dynamsoft.DLR.LabelRecognizer.createInstance();
            Dynamsoft.DCE.CameraEnhancer.defaultUIElementURL = Dynamsoft.DLR.LabelRecognizer.defaultUIElementURL;
            let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
            recognizer.setImageSource(cameraEnhancer);
            await recognizer.updateRuntimeSettingsFromString("video-letter");
            recognizer.onImageRead = results => {
                for (let result of results) {
                    for (let lineResult of result.lineResults) {
                        console.log(lineResult.text);
                    }
                }
            };
            recognizer.onUniqueRead = (txt, results) => {
                alert(txt);
            };
            await recognizer.startScanning(true);
        })();
    </script>
</body>

</html>
```

<p align="center" style="text-align:center; white-space: normal;">
  <a target="_blank" href="https://jsfiddle.net/DynamsoftTeam/b1w8vm0t/21/" title="Run via JSFiddle">
    <img src="https://cdn.jsdelivr.net/npm/simple-icons@3.0.1/icons/jsfiddle.svg" alt="Run via JSFiddle" width="20" height="20" style="width:20px;height:20px;">
  </a>
</p>

-----

#### About the code

* `LabelRecognizer.createInstance()`: This method creates a `LabelRecognizer` object called `recognizer`.

* `CameraEnhancer.createInstance()`: this method creates a `CameraEnhancer` object called `cameraEnhancer` which is used to control the camera as well as the default user interface. To use `cameraEnhancer` with `recognizer`, we pass to it the customized UI provided by the Dynamsoft Label Recognizer SDK via `defaultUIElementURL` and then bind it to `recognizer` with `setImageSource()` to allow the latter to fetch frames from the camera for recognition as well as highlight the recognized text areas.

* `updateRuntimeSettingsFromString("video-letter")`: this sets up `recognizer` with a built-in template optimized for reading letters from continous video frames. Note that templates starting with "video-" are only valid after a `CameraEnhancer` instance has been bound to this `LabelRecognizer` instance.

* `onImageRead`: This event is triggered every time the library finishes scanning a video frame image. The `results` object contains all the text results that the library has found on this frame. In this example, we print the results to the browser console.

* `onUniqueRead`: This event is triggered when the library finds a new text, which is not a duplicate among multiple frames. `txt` holds the text value while `results` is an array of objects that hold details of the text. In this example, an alert will be displayed for this new text.

* `startScanning(true)`: Starts contious video frame scanning. The return value is a Promise which resovles when the camera is opened, the video shows up on the page and the scanning begins (which means `cameraEnhancer` has started feeding `recognizer` with frames to recognize).

### Step Two: Test the example

Create a text file with the name "helloworld.html", fill it with the code above and save. After that, open the example page in a browser, allow the page to access your camera and the video will show up on the page. After that, you can point the camera at something with a simple line of text to read it.

> You can also just test it at [https://jsfiddle.net/DynamsoftTeam/b1w8vm0t/21/](https://jsfiddle.net/DynamsoftTeam/b1w8vm0t/21/)

If the text is decoded, an alert will pop up with the result text. At the same time, the text location will be highlighted in the video feed.

*Note*:

* Although the page should work properly when opened directly as a file ("file:///"), it's recommended that you deploy it to a web server before accessing it. Also, some browsers require a secure connection (HTTPS) to access the cameras, so deploying the page to a HTTPS website is the best choice.
* For first use, you may need to wait a few seconds for the library to initialize.
* The license "DLS2eyJvcmdhbml6YXRpb25JRCI6IjIwMDAwMSJ9" used in this sample is an online license and requires network connection to work.

If the test doesn't go as expected, you can check out the [FAQ](#faq) or [contact us](https://www.dynamsoft.com/company/contact/?utm_source=github).

## Building your own page

Here we'll show all the steps required to build a web page for reading machine-readable zones (MRZ) on passports, visas, etc.

### Include the library

#### Use a CDN

The simplest way to include the library is to use either the [jsDelivr](https://jsdelivr.com/) or [UNPKG](https://unpkg.com/) CDN. The "hello world" example above uses **jsDelivr**. Since the recognition is mostly on a video input, we should also include the supporting library Dynamsoft Camera Enhancer.

* jsDelivr

  ```html
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-label-recognizer@2.2.4/dist/dlr.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@2.3.2/dist/dce.js"></script>
  ```

* UNPKG  

  ```html
  <script src="https://unpkg.com/dynamsoft-label-recognizer@2.2.4/dist/dlr.js"></script>
  <script src="https://unpkg.com/dynamsoft-camera-enhancer@2.3.2/dist/dce.js"></script>
  ```

#### Host the library yourself

Besides using the CDN, you can also download the library and host its files on your own website / server before including it in your application.

To download the library:

* yarn

  ```cmd
  yarn add dynamsoft-label-recognizer@2.2.4
  yarn add dynamsoft-camera-enhancer@2.3.2
  ```

* npm

  ```cmd
  npm install dynamsoft-label-recognizer@2.2.4
  npm install dynamsoft-camera-enhancer@2.3.2
  ```

Depending on how you downloaded the library and where you put it. You can typically include it like this:

  ```html
  <script src="/dlr-js-2.2.4/dist/dlr.js"></script>
  <script src="/dlr-js-2.2.4/dce/dist/dce.js"></script>
  ```

or

  ```html
  <script src="/node_modules/dynamsoft-label-recognizer/dist/dlr.js"></script>
  <script src="/node_modules/dynamsoft-camera-enhancer/dist/dce.js"></script>
  ```

Read more on [how to host the library](#hosting-the-library).

### Configure the library

Before using the library, you need to configure a few things.

#### Specify the license

The library requires a license to work, use the API `license` to specify a license key.

```javascript
Dynamsoft.DLR.LabelRecognizer.license = "YOUR-LICENSE-KEY";
```

To test the library, you can request a 30-day trial license via the [customer portal](https://www.dynamsoft.com/customer/license/trialLicense?utm_source=github&product=dlr&package=js).

> If you registered for a Dynamsoft account and downloaded the library from the official site, Dynamsoft will generate a 30-day trial license for you and put the license key in all the downloaded samples.

#### Specify the location of the "engine" files

If the engine files (\*.worker.js, \*.wasm.js and \*.wasm, etc.) are not in the same location with the main library file (dlr.js), you can use the API `engineResourcePath` to specify the engine path, for example:

```javascript
//The following code uses the jsDelivr CDN, feel free to change it to your own location of these files.
Dynamsoft.DLR.LabelRecognizer.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-label-recognizer@2.2.4/dist/";
Dynamsoft.DCE.CameraEnhancer.engineResourcePath = "https://cdn.jsdelivr.net/npm/dynamsoft-camera-enhancer@2.3.2/dist/";
```

This configuration is usually required with frameworks like Angular or React where dlr.js is compiled into another file.

#### Add a visual cue about the loading of a .data file

The .data files are crucial for the recognition of certain types of text. For example, to read the MRZ zone on passports, the file MRZ.data must be loaded first. These .data files are loaded from the server on demand at runtime. At present, these files are quite large, for example, MRZ.data is about 10MB. Although these files are cached locally as soon as they are downloaded, loading them for the first time can be quite time-consuming. To make the process user-friendly, it's recommended to show a visual cue about the loading process to the user with the help of the APIs `onResourcesLoadStarted`, `onResourcesLoadProgress` and `onResourcesLoaded` :

```js
Dynamsoft.DLR.LabelRecognizer.onResourcesLoadStarted = (resourcePath) => {
    console.log("Loading " + resourcePath);
    // Show a visual cue that a model file is being 
}
Dynamsoft.DLR.LabelRecognizer.onResourcesLoadProgress = (resourcePath, progress) => {
    console.log(resourcePath + "loading progress: " + progress.loaded + "/" + progress.total);
    // Show the progress
}
Dynamsoft.DLR.LabelRecognizer.onResourcesLoaded = (resourcePath) => {
    console.log("Finished loading " + resourcePath);
    // Hide the visual cue
}
```

### Interact with the library

#### Create a `LabelRecognizer` object

To use the library, we first create a `LabelRecognizer` object.

```javascript
let recognizer = null;
try {
    recognizer = await Dynamsoft.DLR.LabelRecognizer.createInstance();
} catch (ex) {
    console.error(ex);
}
```

#### Create a `CameraEnhancer` object and bind it to the `LabelRecognizer` object

A `CameraEnhancer` object is required for video recognition. Also, the object should make use of a customized UI from the Label Recognition SDK to streamline the recognition.

```javascript
Dynamsoft.DCE.CameraEnhancer.defaultUIElementURL = Dynamsoft.DLR.LabelRecognizer.defaultUIElementURL;
let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
recognizer.setImageSource(cameraEnhancer);
```

#### Change the camera settings if necessary

In some cases, a different camera might be required instead of the default one. Also, a different resolution might work better. To change the camera or the resolution, we use the `CameraEnhancer` object. Learn more [here](https://www.dynamsoft.com/camera-enhancer/docs/programming/javascript/api-reference/camera-control.html?ver=latest&utm_source=github&product=dlr&package=js).

```javascript
// set which camera and what resolution to use
let allCameras = await cameraEnhancer.getAllCameras();
await cameraEnhancer.selectCamera(allCameras[0]);
await cameraEnhancer.setResolution(1280, 720);
```

#### Set up the recognition process

Check out the following code:

```javascript
let scanSettings = await recognizer.getScanSettings();
// disregard duplicated results found in a specified time period (in milliseconds)
scanSettings.duplicateForgetTime = 6000;
// set a scan interval in milliseconds so the library may release the CPU from time to time
scanSettings.intervalTime = 100;
await recognizer.updateScanSettings(scanSettings);
```

```javascript
// use one of the built-in RuntimeSetting templates: 
// "number", "letter", "numberLetter", "numberUppercase", "VIN", "VIN_NA", "MRZ", "passportMRZ", "visaMRZ"
// "video-number", "video-letter", "video-numberLetter", "video-numberUppercase", "video-VIN", "video-VIN_NA", "video-MRZ", "video-passportMRZ", "video-visaMRZ"
// For convenience, these names are not case-sensitive.
// You can also pass in a JSON string as the template.
await recognizer.updateRuntimeSettingsFromString("video-MRZ");
```

As you can see from the above code snippets, there are two types of configurations:

* `get/updateScanSettings`: Configures the behavior of the recognizer which includes `duplicateForgetTime` and `intervalTime`.

* `updateRuntimeSettingsFromString`: Configures the recognizer engine with a built-in template or a template represented by a JSON string. If a template was configured at creation, it will be replaced.
  > Note that templates starting with "video-" are only valid after a `CameraEnhancer` instance has been bound to this `LabelRecognizer` instance.

#### Customize the UI

The built-in UI of the `LabelRecognizer` object is defined in the file `dist/dlr.ui.html` . There are a few ways to customize it:

* Modify the file `dist/dlr.ui.html` directly.

  This option is only possible when you host this file on your own web server instead of using a CDN. This file can then be passed to a `CameraEnhancer` object with `Dynamsoft.DLR.LabelRecognizer.defaultUIElementURL` .

* Copy the file `dist/dlr.ui.html` to your application, modify it and use the API `defaultUIElementURL` to set it as the default UI.

  ```javascript
  Dynamsoft.DLR.LabelRecognizer.defaultUIElementURL = "THE-URL-TO-THE-FILE";
  ```

* Append the default UI element to your page, customize it before showing it.

  ```html
  <div id="recognizerUI"></div>
  ```

  ```javascript
  await cameraEnhancer.setUIElement(Dynamsoft.DLR.LabelRecognizer.defaultUIElementURL);
  document.getElementById('recognizerUI').appendChild(cameraEnhancer.getUIElement());
  document.getElementsByClassName('dce-btn-close')[0].hidden = true; // Hide the close button
  ```

* Build the UI element into your own web page and specify it with the API `setUIElement(HTMLElement)`.

  * Embed the video

    ```html
    <div id="div-ui-container" style="width:100%;height:100%;">
        <div class="dce-video-container" style="position:relative;width:100%;height:500px;"></div>
    </div>
    <script>
        (async () => {
            let cameraEnhancer = await Dynamsoft.DCE.CameraEnhancer.createInstance();
            await cameraEnhancer.setUIElement(document.getElementById('div-ui-container'));
            let recognizer = await Dynamsoft.DLR.LabelRecognizer.createInstance();
            recognizer.setImageSource(cameraEnhancer);
            await recognizer.updateRuntimeSettingsFromString("video-MRZ");
            recognizer.onImageRead = results => {
                for (let result of results) {
                    for (let lineResult of result.lineResults) {
                        console.log(lineResult.text);
                    }
                }
            };
            recognizer.onMRZRead = (txt, results) => {
                alert(txt);
            };
            await recognizer.startScanning(true);
        })(); 
    </script>
    ```

    > The video element will be created and appended to the DIV element with the class `dce-video-container`, make sure the class name is the same. Besides, the CSS property `position` of the DIV element must be either `relative`, `absolute`, `fixed`, or `sticky`.

  * Add the camera list and resolution list

    If the class names for these lists match the default ones, `dce-sel-camera` and `dce-sel-resolution` , the library will automatically populate the lists and handle the camera/resolution switching.

    ```html
    <select class="dce-sel-camera"></select>
    ```

    ```html
    <select class="dce-sel-resolution"></select>
    ```

    > Generally, you need to provide a resolution that the camera supports. However, in case a camera does not support the specified resolution, it usually uses the nearest supported resolution. As a result, the selected resolution may not be the actual resolution used. In this case, add an option with the class name `dce-opt-gotResolution` (as shown below) and the library will then use it to show the actual resolution.

    ```html
    <select class="dce-sel-resolution">
        <option class="dce-opt-gotResolution" value="got"></option>
        <option data-width="1920" data-height="1080">1920x1080</option>
        <option data-width="1280" data-height="720">1280x720</option>
        <option data-width="640" data-height="480">640x480</option>
    </select>
    ```

## API Documentation

You can check out the detailed documentation about the APIs of the library at
[https://www.dynamsoft.com/label-recognition/programming/javascript/api-reference/?ver=latest&utm_source=github&product=dlr&package=js](https://www.dynamsoft.com/label-recognition/programming/javascript/api-reference/?ver=latest&utm_source=github&product=dlr&package=js).

## System Requirements

This library requires the following features which are supported by all modern mainstream browsers:

* `WebAssembly`,  `Blob`,  `URL`/`createObjectURL`,  `Web Workers`

  The above four features are required for the library to work.

* `MediaDevices`/`getUserMedia`

  This API is only required for in-browser video streaming.

* `getSettings`

  This API inspects the video input which is a `MediaStreamTrack` object about its constrainable properties.

The following table is a list of supported browsers based on the above requirements:

  Browser Name | Version
  :-: | :-:
  Chrome | v61+<sup>1</sup>
  Firefox | v52+ (v55+ on Android/iOS<sup>1</sup>)
  Edge<sup>2</sup> | v16+
  Safari<sup>3</sup> | v11+

  <sup>1</sup> iOS 14.3+ is required for camera video streaming in Chrome and Firefox or Apps using webviews.

  <sup>2</sup> On Edge, due to strict Same-origin policy, you must host the library files on the same domain as your web page.
  
  <sup>3</sup> Safari 11.2.2 ~ 11.2.6 are not supported.

Apart from the browsers, the operating systems may impose some limitations of their own that could restrict the use of the library. Browser compatibility ultimately depends on whether the browser on that particular operating system supports the features listed above.

## Hosting the Library

### Step 1: Deploy the dist folder

Once you have downloaded the library, you can locate the "dist" directory and copy it to your server (usually as part of your website / web application). The following shows some of the files in this directory:

* `dlr.js` // The main library file
* `dlr.ui.html` // Defines the default recognizer UI
* `dlr-<version>.worker.js` // Defines the worker thread for text reading
* `dlr-<version>.wasm.js` // The recognition engine (.js)
* `dlr-<version>.wasm` // The recognition engine (.wasm)

NOTE: the files for Dynamsoft Camera Enhancer are often required as well and can be copied to the same location as the above "dist" directory.

### Step 2: Configure the Server

* Set the MIME type for `.wasm` as `application/wasm` and `.data` as `application/octet-stream` on your webserver.
  
  The goal is to configure your server to send the correct Content-Type header for the wasm file so that it is processed correctly by the browser.

  Different types of webservers are configured differently, for example:

  * [Apache](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Apache_Configuration_htaccess#media_types_and_character_encodings)
  * [IIS](https://docs.microsoft.com/en-us/iis/configuration/system.webserver/staticcontent/mimemap)
  * [NGINX](https://www.nginx.com/resources/wiki/start/topics/examples/full/#mime-types)

* Enable HTTPS

  To use the library, you must access your website / web application via a secure HTTPS connection. This is due to browser security restrictions which only grant camera video streaming access to a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts).

  > For convenience, self-signed certificates can be used during development and testing.

### Step 3: Include the library from the server

Now that the library is hosted on your server, you can include it accordingly.

```html
<script src="https://www.yourwebsite.com/dynamsoft-label-recognizer/dist/dlr.js"></script>
<script src="https://www.yourwebsite.com/dynamsoft-camera-enhancer/dist/dce.js"></script>
```

Optionally, you may also need to [specify the location of the "engine" files](#specify-the-location-of-the-engine-files).

## FAQ

### Can I open the web page directly from the hard drive?

Yes, for simple testing purposes, it's perfectly fine to open the file directly from the hard drive. However, you might encounter some issues in doing so (like unable to access the camera, etc.). The recommendation is to deploy this page to your web server and run it over **HTTPS**. If you don't have a ready-to-use web server but have a package manager like *npm* or *yarn*, you can set up a simple HTTP server in minutes. Check out [http-server on npm](https://www.npmjs.com/package/http-server).

### Why can't I use my camera?

If you open the web page as `file:///` or `http://` , the camera may not work and you see the following error in the browser console:

> [Deprecation] getUserMedia() no longer works on insecure origins. To use this feature, you should consider switching your application to a secure origin, such as HTTPS. See `https://goo.gl/rStTGz` for more details.

* In Safari 12 the equivalent error is:

> Trying to call "getUserMedia" from an insecure document.

You get this error because the API [getUserMedia](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia) requires HTTPS to access the camera.

* If you use Chrome or Firefox, you might not get the error because these two browsers allow camera access via `file:///` and `http://localhost`.

To make sure your web application can access the camera, please configure your web server to support HTTPS. The following links may help.

1. NGINX: <a target="_blank" href="https://nginx.org/en/docs/http/configuring_https_servers.html" title="Configuring HTTPS servers">Configuring HTTPS servers</a>
2. IIS: <a target="_blank" href="https://aboutssl.org/how-to-create-a-self-signed-certificate-in-iis/" title="Create a Self Signed Certificate in IIS">Create a Self Signed Certificate in IIS</a>
3. Tomcat: <a target="_blank" href="https://dzone.com/articles/setting-ssl-tomcat-5-minutes" title="Setting Up SSL on Tomcat in 5 minutes">Setting Up SSL on Tomcat in 5 minutes</a>
4. Node.js: <a target="_blank" href="https://nodejs.org/docs/v0.4.1/api/tls.html" title="npm tls">npm tls</a>
