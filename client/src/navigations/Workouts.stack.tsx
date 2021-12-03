import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Workout from '../screens/Workout';
import Workouts from '../screens/Workouts';

const Stack = createNativeStackNavigator();

const WorkoutsStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Workouts'
      screenOptions={() => ({
        headerBackTitle: 'Back',
      })}
    >
      <Stack.Screen name='Workouts' component={Workouts} />
      <Stack.Screen name='Workout' component={Workout} />
    </Stack.Navigator>
  );
};

export default WorkoutsStack;
