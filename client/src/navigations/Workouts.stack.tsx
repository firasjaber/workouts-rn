import { NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { Alert, Button } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addWorkout, createWorkoutBody, getExercices } from '../api';
import AddWorkout from '../screens/AddWorkout.screen';
import ExerciceScreen from '../screens/Exercice.screen';
import Workout from '../screens/Workout';
import Workouts from '../screens/Workouts';
import useAuthStore from '../store/auth';
import useWorkoutStore from '../store/workout';

const Stack = createNativeStackNavigator();
interface WorkoutsStackProps {
  navigation: NavigationProp<any, any>;
}
const WorkoutsStack: React.FC<WorkoutsStackProps> = ({ navigation }) => {
  const signOut = useAuthStore((state) => state.signOut);
  const authToken = useAuthStore((state) => state.authToken);
  const exercices = useWorkoutStore((state) => state.exercices);

  const queryClient = useQueryClient();

  const addWorkoutMutation = useMutation(
    (t: { body: createWorkoutBody; token: string }) =>
      addWorkout(t.body, t.token),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('workouts');
      },
    }
  );

  useEffect(() => {
    if (addWorkoutMutation.isSuccess) navigation.goBack();
  }, [addWorkoutMutation.isSuccess]);
  const { data } = useQuery('exercices', getExercices);
  // formatting the data to match the api.
  // this logic is here because i couldnt find a way
  // to interact with the headerRightButton from
  // the addWorkout screen directly
  const handleAddWorkout = async (value: string | undefined) => {
    const objectOfSelectedExercices: Record<string, boolean> = {};
    exercices.map((exercice) => (objectOfSelectedExercices[exercice] = true));
    const muscles: Record<string, boolean> = {};

    data.map((exercice: any) => {
      if (objectOfSelectedExercices[exercice.id] == true) {
        muscles[exercice.muscleId] = true;
      }
    });
    const musclesInt: number[] = [];
    const exercicesInt: number[] = [];
    exercices.map((exercice) => exercicesInt.push(parseInt(exercice)));
    Object.keys(muscles).map((muscle) => musclesInt.push(parseInt(muscle)));
    const body = {
      name: value ?? 'Unnamed workout',
      muscles: musclesInt,
      exercices: exercicesInt,
    };
    const token = authToken ?? '';
    try {
      addWorkoutMutation.mutate({ body, token });
    } catch (error) {
      console.log(error);
    }
  };
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
                Alert.prompt('New workout', 'Enter workout name', [
                  {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                  },
                  { text: 'OK', onPress: (value) => handleAddWorkout(value) },
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
