# Cloudentity React Native sample apps

Repository to showcase React Native mobile app samples

# Simple PKCE

## Overview

This sample React Native application obtains an access token from Cloudentity Authorization Platform using Authorization Code grant and PKCE.

### Prerequisites

- [Cloudentity Authorization Platform account](https://authz.cloudentity.io/register)
- [Workspace and Client application prepared for PKCE](https://developer.cloudentity.com/basics/oauth_grant_types/authorization_code_with_pkce/?)

### Environment setup

Follow [official documentation](https://reactnative.dev/docs/environment-setup) on how to setup React Native environment.

### Run for iOS

Please note that a Mac is required to build projects with native code for iOS.

#### Before run

1. Set bundle url name in `Info.plist`

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

2. Set credential data in `config.json`

```
{
  "clientId": "[FILL WITH YOUR CLIENT ID]",
  "workspaceTokenURL": "[FILL WITH YOUR TOKEN URL]",
  "workspaceAuthorizationURL": "[FILL WITH YOUR AUTHORIZATION URL]",
  "urlScheme": "oauth://com.example.simple-pkce"
}
```

![alt text](https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/SimplePKCE/assets/img/readme-screenshot.png?raw=true)

#### Commands to run

```
$ yarn install
$ yarn start
$ yarn ios
```

### Run for Android

#### Before run

Set bundle url name in AndroidManifest.xml

```
<data android:scheme="oauth" />
<data android:host="com.example.simple-pkce" />
```

#### Commands to run

TBA
