import { NavigationProp } from '@react-navigation/native';
import { List, ListItem } from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useQuery } from 'react-query';
import { getExercices } from '../api';

interface Props {
  navigation: NavigationProp<any, any>;
}

const AddWorkout: React.FC<Props> = () => {
  const { data } = useQuery('exercices', getExercices);
  const [selectedExercices, setSelectedExecices] = useState({});
  //TODO : Clean up
  useEffect(() => {
    const alt: any = {};
    if (data) {
      data.map((exercice: any) => {
        const id = exercice.id;
        alt[id] = false;
      });
      setSelectedExecices(alt);
    }
  }, [data]);

  interface renderItemProps {
    item: { id: number; name: string; youtubeId: string; musclesId: number };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item }) => {
    const renderItemIcon = () => (
      <Ionicons name={'barbell-outline'} size={30} />
    );
    const alt: any = selectedExercices;

    const renderItemAccessory = () => (
      <Ionicons
        name={alt[item.id] ? 'checkmark-circle' : 'checkmark-circle-outline'}
        size={30}
        color='tomato'
      />
    );
    return (
      <ListItem
        title={`${item.name}`}
        accessoryLeft={renderItemIcon}
        style={{ paddingHorizontal: 20 }}
        accessoryRight={renderItemAccessory}
        onPress={() => {
          alt[item.id] = !alt[item.id];
          setSelectedExecices(alt);
        }}
      />
    );
  };
  return (
    <>
      <List data={data} renderItem={renderItem} />
    </>
  );
};

export default AddWorkout;
