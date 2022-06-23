import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from './src/SplashScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/LoginScreen';
import {RootNavigationStack} from './src/navigation';
import ResourceDetailsScreen from './src/ResourceDetailsScreen';
import {Button, StyleSheet, View} from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    marginLeft: 10,
  },
});

const Stack = createStackNavigator<RootNavigationStack>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={({route, navigation}) => ({
            headerShown: route.name === 'ResourceDetails',
            headerBackTitle: 'Back',
            headerTitle: route.params?.resource?.title,
            headerLeft: () => (
              <View style={styles.backButton}>
                <Button
                  title="Back"
                  onPress={() =>
                    navigation.navigate('Home', {screen: 'Resources'})
                  }
                />
              </View>
            ),
          })}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ResourceDetails"
            component={ResourceDetailsScreen}
          />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
