import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExercicesScreen from '../screens/Exercices.screen';
import ExerciceScreen from '../screens/Exercice.screen';
import MusclesScreen from '../screens/Muscles.screen';
import AddExercice from '../screens/AddExercice.screen';

const Stack = createNativeStackNavigator();

const ExercicesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Muscles'
      screenOptions={() => ({
        headerBackTitle: 'Back',
      })}
    >
      <Stack.Screen name='Muscles' component={MusclesScreen} />
      <Stack.Screen name='Exercices' component={ExercicesScreen} />
      <Stack.Screen name='Exercice' component={ExerciceScreen} />
      <Stack.Screen name='Add Exercice' component={AddExercice} />
    </Stack.Navigator>
  );
};

export default ExercicesStack;
