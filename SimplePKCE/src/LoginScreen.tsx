import React from 'react';
import axios from 'axios';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Keychain from 'react-native-keychain';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  workspaceAuthorizationURL,
  workspaceTokenURL,
  clientId,
  urlScheme,
} from '../config.json';
import CodeVerifier from './CodeVerifier';
import {RootNavigationStack} from './navigation';
import Button from './components/Button';
import logo from '../assets/img/logo.png';
import Snackbar from 'react-native-snackbar';

async function getAuthUrl() {
  const codeChallenge = await CodeVerifier.getCodeChallenge();
  return (
    workspaceAuthorizationURL +
    `?client_id=${encodeURI(clientId)}` +
    `&redirect_uri=${encodeURI(urlScheme)}` +
    '&response_type=code' +
    `&scope=${encodeURI('email openid profile')}` +
    `&code_challenge=${encodeURI(codeChallenge)}` +
    '&code_challenge_method=S256'
  );
}

async function getTokenBody(code: string) {
  const verifier = await CodeVerifier.getVerifier();
  return (
    `client_id=${encodeURI(clientId)}` +
    `&redirect_uri=${encodeURI(urlScheme)}` +
    '&grant_type=authorization_code' +
    `&code_verifier=${encodeURI(verifier)}` +
    `&code=${encodeURI(code)}`
  );
}

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    height: '100%',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 16,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 64,
  },
  highlight: {
    fontWeight: '700',
  },
  logo: {
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 64,
  },
});

function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootNavigationStack>>();

  async function saveToken(token: string) {
    await Keychain.setGenericPassword('token', token);
  }

  async function onPress() {
    try {
      if (await InAppBrowser.isAvailable()) {
        InAppBrowser.close();
        InAppBrowser.closeAuth();

        const authUrl = await getAuthUrl();
        const result = await InAppBrowser.openAuth(authUrl, urlScheme, {
          // iOS Properties
          ephemeralWebSession: false,
          // Android Properties
          showTitle: false,
          enableUrlBarHiding: true,
          enableDefaultShare: false,
        });

        if (result.type !== 'success') {
          throw new Error('Auth was unsuccessful');
        }

        const match = result.url.match(/code=(?<code>[^&]+)/);
        if (!match?.groups?.code) {
          throw new Error('Invalid return url');
        }

        const {code} = match.groups;
        const tokenBody = await getTokenBody(code);
        const response = await axios.post(workspaceTokenURL, tokenBody, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        saveToken(response.data.access_token);
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      }
    } catch (e) {
      navigation.reset({index: 0, routes: [{name: 'Login'}]});
      Snackbar.show({
        text: axios.isAxiosError(e) ? e.message : 'Sign in unsuccessful',
        duration: Snackbar.LENGTH_SHORT,
        backgroundColor: '#8E3A59',
        textColor: 'white',
      });
    }
  }

  return (
    <SafeAreaView>
      <View style={styles.content}>
        <Image style={styles.logo} source={logo} />
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Sample React Native App</Text>
          <Text style={styles.sectionDescription}>
            This sample application obtains an access token from{' '}
            <Text style={styles.highlight}>
              Cloudentity Authorization Platform
            </Text>{' '}
            using Authorization Code grant and PKCE
          </Text>
        </View>
        <Button onPress={onPress} label="Sign in" />
      </View>
    </SafeAreaView>
  );
}

export default LoginScreen;
