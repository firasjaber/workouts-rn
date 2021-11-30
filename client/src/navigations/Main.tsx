import React from 'react';
import Exercices from '../screens/Exercices';
import Workouts from '../screens/Workouts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkoutsStack from './WorkoutsStack';

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = '';

          if (route.name === 'Workouts') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Exercices') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name='Workouts' component={WorkoutsStack} />
      <Tab.Screen name='Exercices' component={Exercices} />
    </Tab.Navigator>
  );
};

export default Main;
