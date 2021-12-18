import { NavigationProp } from '@react-navigation/native';
import { List, ListItem, StyleService } from '@ui-kitten/components';
import React from 'react';
import { View, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery } from 'react-query';
import { getWorkout } from '../api';
import { getMusclesFromWorkout, muscles } from '../helpers';

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
  />
);

interface WorkoutProps {
  navigation: NavigationProp<any, any>;
  route: any;
}

const Workout: React.FC<WorkoutProps> = ({ route }) => {
  console.log(route.params.id);
  const { data } = useQuery('exercice', () => getWorkout(route.params.id));
  return (
    <View>
      <View style={styles.header}>
        <Ionicons name={'clipboard-outline'} size={50} />
        <View style={styles.heading}>
          <Text style={styles.headingOne}>{data?.name}</Text>
          <Text style={styles.headingTwo}>
            {data && getMusclesFromWorkout(data?.muscles)}
          </Text>
        </View>
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
