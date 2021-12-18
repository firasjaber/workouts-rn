import React from 'react';
import { List, ListItem } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { getWorkouts } from '../api';
import { useQuery } from 'react-query';
import { getMusclesFromWorkout } from '../helpers';

interface WorkoutsProps {
  navigation: NavigationProp<any, any>;
}

const Workouts: React.FC<WorkoutsProps> = ({ navigation }) => {
  const { data } = useQuery('exercices', getWorkouts);
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => (
    <Ionicons name={'clipboard-outline'} size={30} />
  );

  interface renderItemProps {
    item: {
      name: string;
      description: string;
      muscles: [{ id: string; name: string }];
    };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={getMusclesFromWorkout(item.muscles)}
      style={{ paddingHorizontal: 20 }}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('Workout')}
    />
  );
  return <List data={data} renderItem={renderItem} />;
};

export default Workouts;
