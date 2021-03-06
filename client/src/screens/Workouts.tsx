import React from 'react';
import { List, ListItem } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';
import { getWorkouts } from '../api';
import { useQuery } from 'react-query';
import { getMusclesFromWorkout } from '../helpers';
import FloatingButton from '../ui/FloatingButton';

interface WorkoutsProps {
  navigation: NavigationProp<any, any>;
}

const Workouts: React.FC<WorkoutsProps> = ({ navigation }) => {
  const { data } = useQuery('workouts', getWorkouts);
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => (
    <Ionicons name={'clipboard-outline'} size={30} />
  );

  interface renderItemProps {
    item: {
      id: number;
      name: string;
      description: string;
      muscles: [{ id: string; name: string }];
    };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      description={item.muscles && getMusclesFromWorkout(item.muscles)}
      style={{ paddingHorizontal: 20 }}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('Workout', { id: item.id })}
    />
  );
  return (
    <>
      <List data={data} renderItem={renderItem} />
      <FloatingButton navigation={navigation} navigateTo={'AddWorkout'} />
    </>
  );
};

export default Workouts;
