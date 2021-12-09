import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, ListItem } from '@ui-kitten/components/ui';

const data = [
  'Chest',
  'Back',
  'Triceps',
  'Biceps',
  'Shoulders',
  'Legs',
  'Forearms',
  'Core',
];
interface MusclesProps {
  navigation: NavigationProp<any, any>;
}

const MusclesScreen: React.FC<MusclesProps> = ({ navigation }) => {
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => <Ionicons name={'ribbon-outline'} size={30} />;

  interface renderItemProps {
    item: string;
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item }) => (
    <ListItem
      title={`${item}`}
      accessoryLeft={renderItemIcon}
      style={{ paddingHorizontal: 20 }}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('Exercices')}
    />
  );
  return <List data={data} renderItem={renderItem} />;
};

export default MusclesScreen;
