import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Alert, Button } from 'react-native';
import AddWorkout from '../screens/AddWorkout.screen';
import ExerciceScreen from '../screens/Exercice.screen';
import Workout from '../screens/Workout';
import Workouts from '../screens/Workouts';
import useAuthStore from '../store/auth';
import useWorkoutStore from '../store/workout';

const Stack = createNativeStackNavigator();

const WorkoutsStack = () => {
  const signOut = useAuthStore((state) => state.signOut);
  const exercices = useWorkoutStore((state) => state.exercices);
  return (
    <Stack.Navigator
      initialRouteName='AllWorkouts'
      screenOptions={() => ({
        headerBackTitle: 'Back',
        headerRight: () => <Button title='Logout' onPress={() => signOut()} />,
      })}
    >
      <Stack.Screen name='AllWorkouts' component={Workouts} />
      <Stack.Screen name='Workout' component={Workout} />
      <Stack.Screen name='WorkoutExercice' component={ExerciceScreen} />
      <Stack.Screen
        name='AddWorkout'
        component={AddWorkout}
        options={{
          title: 'New Workout',
          headerRight: () => (
            <Button
              title='Create'
              disabled={exercices.length === 0 ? true : false}
              onPress={() => {
                console.log(exercices);
                Alert.prompt('New workout', 'Enter workout name', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: (value) => console.log(value) },
                ]);
              }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default WorkoutsStack;
