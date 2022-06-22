import React, {useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {HomeNavigationStack} from './navigation';
import PayloadScreen from './PayloadScreen';
import HeaderScreen from './HeaderScreen';
import ResourcesScreen from './ResourcesScreen';
import Keychain from 'react-native-keychain';

import jwt_decode from 'jwt-decode';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import api from '../assets/img/api.png';
import apiActive from '../assets/img/api-blue.png';
import code from '../assets/img/header.png';
import codeActive from '../assets/img/header-blue.png';
import script from '../assets/img/payload.png';
import scriptActive from '../assets/img/payload-blue.png';
import signOut from '../assets/img/sign-out.png';
import TabBarIcon from './components/TabBarIcon';

const styles = StyleSheet.create({
  icon: {
    height: 22,
  },
});

function SignOutButton() {
  return (
    <TouchableOpacity onPress={() => {}}>
      <Image source={signOut} resizeMode="contain" style={styles.icon} />
    </TouchableOpacity>
  );
}

const Tab = createBottomTabNavigator<HomeNavigationStack>();

function HomeScreen() {
  const [payload, setPayload] = useState('');
  const [header, setHeader] = useState('');
  const [scopes, setScopes] = useState<string[]>([]);

  async function load() {
    try {
      const credentials = await Keychain.getGenericPassword();
      if (credentials && credentials.password) {
        const _header = jwt_decode(credentials.password, {header: true});
        const _payload = jwt_decode(credentials.password);

        setHeader(JSON.stringify(_header, null, 2));
        setPayload(JSON.stringify(_payload, null, 2));
        setScopes((_payload as any)?.scp ?? []);
      }
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Payload"
        children={() => <PayloadScreen payload={payload} />}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon
              focused={focused}
              icon={script}
              iconActive={scriptActive}
            />
          ),
          headerRight: () => <SignOutButton />,
        }}
      />
      <Tab.Screen
        name="Header"
        children={() => <HeaderScreen header={header} />}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon={code} iconActive={codeActive} />
          ),
          headerRight: () => <SignOutButton />,
        }}
      />
      <Tab.Screen
        name="Resources"
        children={() => <ResourcesScreen scopes={scopes} />}
        options={{
          tabBarIcon: ({focused}) => (
            <TabBarIcon focused={focused} icon={api} iconActive={apiActive} />
          ),
          headerRight: () => <SignOutButton />,
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeScreen;
