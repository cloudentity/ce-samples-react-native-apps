# ce-samples-react-native-apps

## Overview

Repository to showcase React Native mobile app samples

### Expo init

node v16
get yarn
yarn global add expo-cli

### Run

yarn start
yarn ios

### iOS

Set bundle url name in Info.plist and in config.json

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

### Android

Set bundle url name in AndroidManifest.xml

```
<data android:scheme="oauth" />
<data android:host="com.example.simple-pkce" />
```
