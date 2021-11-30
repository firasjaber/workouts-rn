import React from 'react';
import { Button, Icon, List, ListItem, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const data: Array<{ title: string; description: string }> = new Array(20).fill({
  title: 'Title for Item',
  description: 'Description for Item',
});

const Workouts = () => {
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
      accessoryLeft={renderItemIcon}
      accessoryRight={renderItemAccessory}
    />
  );
  return <List data={data} renderItem={renderItem} />;
};

export default Workouts;
