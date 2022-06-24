import {Button, Image, View} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import React from 'react';
import {Session} from './App';

interface Header {
  session?: Session;
  onLogout: () => void;
}

export default function Header({session, onLogout}: Header) {
  return (
    <View
      style={{
        backgroundColor: '#434656',
        paddingLeft: 16,
        paddingRight: 16,
        height: 48,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
      }}>
      <View style={{flex: 1}}>
        <Image
          source={require('./cloudentity_logo.png')}
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            resizeMode: 'contain',
          }}
        />
      </View>
      {session && (
        <View>
          <Button
            title={'Logout'}
            onPress={() => {
              EncryptedStorage.removeItem('user_session').then(() =>
                onLogout(),
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
