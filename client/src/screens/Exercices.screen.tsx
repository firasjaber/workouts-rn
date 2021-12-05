import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { List, ListItem } from '@ui-kitten/components/ui';

const data: Array<{ title: string; description: string }> = new Array(20).fill({
  title: 'Super good exercice',
  description: 'Very good exercice',
});
interface WorkoutsProps {
  navigation: NavigationProp<any, any>;
}

const ExercicesScreen: React.FC<WorkoutsProps> = ({ navigation }) => {
  const renderItemAccessory = () => (
    <Ionicons name='chevron-forward-outline' size={25} />
  );

  const renderItemIcon = () => <Ionicons name={'barbell-outline'} size={30} />;

  interface renderItemProps {
    item: { title: string; description: string };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item, index }) => (
    <ListItem
      title={`${item.title} ${index + 1}`}
      description={`${item.description} ${index + 1}`}
      accessoryLeft={renderItemIcon}
      style={{ paddingHorizontal: 20 }}
      accessoryRight={renderItemAccessory}
      onPress={() => navigation.navigate('Exercice')}
    />
  );
  return <List data={data} renderItem={renderItem} />;
};

export default ExercicesScreen;
