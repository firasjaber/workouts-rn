import React from 'react';
import { List, ListItem } from '@ui-kitten/components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NavigationProp } from '@react-navigation/native';

const data: Array<{ title: string; description: string }> = new Array(20).fill({
  title: 'Super good workout',
  description: 'Very good workout',
});

interface WorkoutsProps {
  navigation: NavigationProp<any, any>;
}

const Workouts: React.FC<WorkoutsProps> = ({ navigation }) => {
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => (
    <Ionicons name={'clipboard-outline'} size={30} />
  );

  interface renderItemProps {
    item: { title: string; description: string };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      style={{ paddingHorizontal: 20 }}
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('Workout')}
    />
  );
  return <List data={data} renderItem={renderItem} />;
};

export default Workouts;
