import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signup from '../screens/Signup.screen';
import Signin from '../screens/Signin.screen';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Signin'
      screenOptions={() => ({
        headerBackTitle: 'Back',
      })}
    >
      <Stack.Screen name='Signup' component={Signup} />
      <Stack.Screen name='Signin' component={Signin} />
    </Stack.Navigator>
  );
};

export default AuthStack;
