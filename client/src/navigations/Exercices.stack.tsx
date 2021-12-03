import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ExercicesScreen from '../screens/Exercices.screen';
import ExerciceScreen from '../screens/Exercice.screen';

const Stack = createNativeStackNavigator();

const ExercicesStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Exercices'
      screenOptions={() => ({
        headerBackTitle: 'Back',
      })}
    >
      <Stack.Screen name='Exercices' component={ExercicesScreen} />
      <Stack.Screen name='Exercice' component={ExerciceScreen} />
    </Stack.Navigator>
  );
};

export default ExercicesStack;
