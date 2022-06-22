import React, {useEffect} from 'react';
import {ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RootNavigationStack} from './navigation';
import {StackNavigationProp} from '@react-navigation/stack';
import Keychain from 'react-native-keychain';
import Container from './components/Container';

function SplashScreen() {
  const navigation = useNavigation<StackNavigationProp<RootNavigationStack>>();

  async function load() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials) {
        navigation.reset({index: 0, routes: [{name: 'Home'}]});
      } else {
        navigation.reset({index: 0, routes: [{name: 'Login'}]});
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ActivityIndicator size="large" />
    </Container>
  );
}

export default SplashScreen;
