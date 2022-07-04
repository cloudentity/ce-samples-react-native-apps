# Simple PKCE

## Overview

This sample React Native application obtains an access token from Cloudentity Authorization Platform using Authorization Code grant and PKCE.

### Prerequisites

- [Cloudentity Authorization Platform account](https://authz.cloudentity.io/register)
- [Workspace and Client application prepared for PKCE](https://developer.cloudentity.com/basics/oauth_grant_types/authorization_code_with_pkce/?)

### Setup

1. Follow [official documentation](https://reactnative.dev/docs/environment-setup) on how to setup React Native environment.

2. Set credential data in `config.json`

```
{
  "clientId": "[FILL WITH YOUR CLIENT ID]",
  "workspaceTokenURL": "[FILL WITH YOUR TOKEN URL]",
  "workspaceAuthorizationURL": "[FILL WITH YOUR AUTHORIZATION URL]",
  "urlScheme": "oauth://com.example.simple-pkce"
}
```

![screenshot](https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/readme-screenshot.png?raw=true)

### Run for iOS

Please note that a Mac is required to build projects with native code for iOS.

Set bundle url name in `Info.plist`.

```
<key>CFBundleURLTypes</key>
<array>
    <dict>
        <key>CFBundleTypeRole</key>
        <string>Viewer</string>
        <key>CFBundleURLName</key>
        <string>com.example.simple-pkce</string>
        <key>CFBundleURLSchemes</key>
        <array>
            <string>oauth</string>
        </array>
    </dict>
</array>
```

#### Commands to run

```
$ yarn install
$ yarn start
$ yarn ios
```

#### Screenshots

<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/ios-1.png"> <img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/ios-2.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/ios-3.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/ios-4.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/ios-5.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/ios-6.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/ios-7.png">

### Run for Android

Set bundle url name in `AndroidManifest.xml`.

```
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="oauth" android:host="com.example.simple-pkce" />
</intent-filter>
```

#### Commands to run

```
$ yarn install
$ yarn start
$ yarn android
```

#### Screenshots

<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/android-1.png"> <img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/android-2.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/android-3.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/android-4.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/android-5.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme/android-6.png">
