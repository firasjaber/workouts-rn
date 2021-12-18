import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, ListItem } from '@ui-kitten/components/ui';
import FloatingButton from '../ui/FloatingButton';
import { useQuery } from 'react-query';
import { getExercices } from '../api';

interface WorkoutsProps {
  navigation: NavigationProp<any, any>;
  route: any;
}

const ExercicesScreen: React.FC<WorkoutsProps> = ({ route, navigation }) => {
  const { data } = useQuery('exercices', getExercices);
  const exercices = data.filter(
    (exercice: { muscleId: number }) =>
      exercice.muscleId === route.params.muscleId
  );
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => <Ionicons name={'barbell-outline'} size={30} />;

  interface renderItemProps {
    item: { id: number; name: string; youtubeId: string; musclesId: number };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item, index }) => (
    <ListItem
      title={`${item.name}`}
      accessoryLeft={renderItemIcon}
      style={{ paddingHorizontal: 20 }}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('Exercice', { id: item.id })}
    />
  );
  return (
    <>
      <List data={exercices} renderItem={renderItem} />
      <FloatingButton navigation={navigation} navigateTo={'Add Exercice'} />
    </>
  );
};

export default ExercicesScreen;
