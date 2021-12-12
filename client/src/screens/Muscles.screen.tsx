import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, ListItem } from '@ui-kitten/components/ui';
import { useQuery } from 'react-query';
import { getMuscles } from '../api';

interface MusclesProps {
  navigation: NavigationProp<any, any>;
}

const MusclesScreen: React.FC<MusclesProps> = ({ navigation }) => {
  const { data } = useQuery('muscles', getMuscles);
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => <Ionicons name={'ribbon-outline'} size={30} />;

  interface renderItemProps {
    item: { name: string; id: number };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      accessoryLeft={renderItemIcon}
      style={{ paddingHorizontal: 20 }}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('Exercices')}
    />
  );
  return <List data={data} renderItem={renderItem} />;
};

export default MusclesScreen;
