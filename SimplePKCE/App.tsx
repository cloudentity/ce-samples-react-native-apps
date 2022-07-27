import 'react-native-gesture-handler';
import React from 'react';
import SplashScreen from './src/SplashScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import HomeScreen from './src/HomeScreen';
import LoginScreen from './src/LoginScreen';
import {RootNavigationStack} from './src/navigation';
import ResourceDetailsScreen from './src/ResourceDetailsScreen';

const Stack = createStackNavigator<RootNavigationStack>();

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={({route}) => ({
            headerShown: route.name === 'ResourceDetails',
            headerBackTitle: 'Back',
            headerTitle: route.params?.resource?.title,
            animationEnabled: false,
          })}>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ResourceDetails"
            component={ResourceDetailsScreen}
            options={TransitionPresets.SlideFromRightIOS}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
