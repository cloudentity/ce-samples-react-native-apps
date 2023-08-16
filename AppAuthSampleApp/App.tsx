/**
 * Sample React Native App using AppAuth lib with Cloudentity
 */

import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';

import {authorize} from 'react-native-app-auth';
import EncryptedStorage from 'react-native-encrypted-storage';
import {decode} from 'base-64';
import Section from './Section';
import Header from './Header';

const authConfig = require('./config.json');

const decodeJWTPayload = (token: string) =>
  token ? JSON.parse(decode(token.split('.')[1])) : {};

const decodeJWTHeader = (token: string) =>
  token ? JSON.parse(decode(token.split('.')[0])) : {};

export interface Session {
  accessToken: string;
  payload: string;
  header: string;
}

export default function App() {
  const [progress, setProgress] = useState(false);
  const [session, setSession] = useState<Session | undefined>();
  const [userinfo, setUserinfo] = useState(undefined);

  const handleLoginPress = () => {
    setProgress(true);
    authorize(authConfig)
      .then(res => {
        const s: Session = {
          accessToken: res.accessToken,
          payload: decodeJWTPayload(res.accessToken),
          header: decodeJWTHeader(res.accessToken),
        };
        setSession(s);
        setProgress(false);

        return EncryptedStorage.setItem('user_session', JSON.stringify(s));
      })
      .catch(err => {
        console.log(err);
        setProgress(false);
      });
  };

  useEffect(() => {
    EncryptedStorage.getItem('user_session')
      .then(s => {
        setSession(s ? JSON.parse(s) : null);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    if (session) {
      setProgress(true);
      fetch(authConfig.issuer + '/userinfo', {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + session.accessToken,
        },
      })
        .then(res => res.json())
        .then(data => setUserinfo(data))
        .then(() => setProgress(false))
        .catch(err => {
          console.log(err);
          setProgress(false);
        });
    }
  }, [session]);

  return (
    <SafeAreaView style={{marginBottom: 42}}>
      <StatusBar />

      <Header
        session={session}
        onLogout={() => {
          setSession(undefined);
          setUserinfo(undefined);
        }}
      />

      <ScrollView style={{padding: 16}}>
        {progress && <Text>Loading...</Text>}

        {!progress && !session && (
          <View>
            <Text
              style={{textAlign: 'center', marginBottom: 32, marginTop: 32}}>
              This sample application obtains an access token from Cloudentity
              Authorization Platform using AppAuth library
            </Text>
            <Button title={'Login'} onPress={() => handleLoginPress()} />
          </View>
        )}

        {!progress && session && (
          <>
            {userinfo && (
              <Section
                title={'/userinfo'}
                content={JSON.stringify(userinfo, null, 2)}
              />
            )}

            <Section
              title={'Access Token Header'}
              content={JSON.stringify(session.header, null, 2)}
            />
            <Section
              title={'Access Token Payload'}
              content={JSON.stringify(session.payload, null, 2)}
            />
            <Section
              title={'Raw Access Token'}
              content={session?.accessToken}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
