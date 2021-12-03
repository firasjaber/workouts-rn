import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import WorkoutsStack from './Workouts.stack';
import ExercicesStack from './Exercices.stack';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
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
      <Tab.Screen name='Exercices' component={ExercicesStack} />
    </Tab.Navigator>
  );
};

export default MainNavigation;
