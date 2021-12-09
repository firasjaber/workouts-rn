import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button } from 'react-native';
import Workout from '../screens/Workout';
import Workouts from '../screens/Workouts';
import useAuthStore from '../store/auth';

const Stack = createNativeStackNavigator();

const WorkoutsStack = () => {
  const signOut = useAuthStore((state) => state.signOut);
  return (
    <Stack.Navigator
      initialRouteName='Workouts'
      screenOptions={() => ({
        headerBackTitle: 'Back',
        headerRight: () => <Button title='Logout' onPress={() => signOut()} />,
      })}
    >
      <Stack.Screen name='Workouts' component={Workouts} />
      <Stack.Screen name='Workout' component={Workout} />
    </Stack.Navigator>
  );
};

export default WorkoutsStack;
