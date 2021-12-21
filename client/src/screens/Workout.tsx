import { NavigationProp } from '@react-navigation/native';
import { List, ListItem, StyleService, Button } from '@ui-kitten/components';
import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteWorkout, getWorkout } from '../api';
import { getMusclesFromWorkout, muscles } from '../helpers';

interface WorkoutProps {
  navigation: NavigationProp<any, any>;
  route: any;
}

const Workout: React.FC<WorkoutProps> = ({ route, navigation }) => {
  console.log(route.params.id);
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => <Ionicons name={'barbell-outline'} size={30} />;

  interface renderItemProps {
    item: { id: string; name: string; muscleId: number };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={muscles[item.muscleId]}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('WorkoutExercice', { id: item.id })}
    />
  );
  const { data } = useQuery('workout', () => getWorkout(route.params.id));

  const queryClient = useQueryClient();
  const deleteWorkoutMutation = useMutation((id: number) => deleteWorkout(id), {
    onSuccess: () => {
      queryClient.invalidateQueries('workouts');
    },
  });

  const handleDelete = () => {
    Alert.alert(
      'Delete Workout',
      'Are you sure about deleting this workout',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteWorkoutMutation.mutate(route.params.id);
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    if (deleteWorkoutMutation.isSuccess) {
      Toast.show({ type: 'success', text1: 'Workout Deleted Succesfully' });
      navigation.goBack();
    }
  }, [deleteWorkoutMutation.isSuccess]);

  return (
    <View>
      <View style={styles.header}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Ionicons name={'clipboard-outline'} size={50} />
          <View style={styles.heading}>
            <Text style={styles.headingOne}>{data?.name}</Text>
            <Text style={styles.headingTwo}>
              {data?.muscles && getMusclesFromWorkout(data?.muscles)}
            </Text>
          </View>
        </View>
        <Button
          size='small'
          onPress={handleDelete}
          status='danger'
          appearance='outline'
        >
          Delete
        </Button>
      </View>
      <List
        style={{ paddingLeft: 20, paddingRight: 20, backgroundColor: 'white' }}
        data={data?.exercices}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleService.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    width: '100%',
    height: 100,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
  },
  heading: {
    marginLeft: 15,
  },
  headingOne: {
    fontSize: 22,
    fontWeight: '500',
  },
  headingTwo: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
  },
  title: {
    fontSize: 18,
    color: 'tomato',
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
});
export default Workout;
