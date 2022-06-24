# Cloudentity React Native sample apps

This sample React Native application obtains an access token from Cloudentity Authorization Platform using AppAuth lib

### Prerequisites

- [Cloudentity Authorization Platform account](https://authz.cloudentity.io/register)
- [App Auth usage](https://github.com/FormidableLabs/react-native-app-auth#usage)
- [Security](https://reactnative.dev/docs/security)
- [Workspace and Client application prepared for PKCE](https://developer.cloudentity.com/basics/oauth_grant_types/authorization_code_with_pkce/?)

### Setup

1. Follow [official documentation](https://reactnative.dev/docs/environment-setup) on how to setup React Native environment.

2. Create a mobile client in your Cloudentity account and provide required credentials:`ISSUER_URL` and `CLIENT_ID`. Add `io.ceauthenticate://auth` value as a redirect url in your client.

3. Set credential data in `config.json`

```
{
  "issuer": [ISSUER_URL]],
  "clientId": [CLIENT_ID],
  "redirectUrl": "io.ceauthenticate://auth",
  "scopes": [
    "email",
    "introspect_tokens",
    "openid",
    "profile",
    "revoke_tokens"
  ]
}
```

![screenshot](https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/AppAuthSampleApp/assets/acp-1?raw=true)
![screenshot](https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/AppAuthSampleApp/assets/acp-2?raw=true)

### Run for iOS

Please note that a Mac is required to build projects with native code for iOS.

[AppAuth instructions for iOS Setup](https://github.com/FormidableLabs/react-native-app-auth#ios-setup)

#### Commands to run

```
$ yarn install
$ yarn start
$ yarn ios
```

### Run for Android

[AppAuth instructions for Android Setup](https://github.com/FormidableLabs/react-native-app-auth#android-setup)

Make sure that appAuthRedirectScheme value in `android/app/build.gradle` is set to your redirectUrl from `config.json`.

```
android {
  defaultConfig {
    manifestPlaceholders = [
      appAuthRedirectScheme: 'io.ceauthenticate://auth'
    ]
  }
}
```

#### Commands to run

```
$ yarn install
$ yarn start
$ yarn android
```

### Screenshots

<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/AppAuthSampleApp/assets/img/readme/android-1.png"> 
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/AppAuthSampleApp/assets/img/readme/android-2.png">
<img width="250" alt="Screenshot" src="https://github.com/cloudentity/ce-samples-react-native-apps/blob/master/AppAuthSampleApp/assets/img/readme/android-3.png">
