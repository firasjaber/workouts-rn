import { NavigationProp } from '@react-navigation/native';
import { Button, List, ListItem, StyleService } from '@ui-kitten/components';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Toast from 'react-native-toast-message';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteExercice, getExerice } from '../api';

interface ExerciceProps {
  navigation: NavigationProp<any, any>;
  route: any;
}

const ExerciceScreen: React.FC<ExerciceProps> = ({ route, navigation }) => {
  const [playing, setPlaying] = useState(false);
  const exerciceId = route.params.id;

  const queryClient = useQueryClient();
  const deleteExerciceMutation = useMutation(
    (id: number) => deleteExercice(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exercices');
      },
    }
  );

  const { data: exerciceData } = useQuery('exercice', () =>
    getExerice(exerciceId)
  );
  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const handleDelete = () => {
    Alert.alert(
      'Delete Exercice',
      'Are you sure about deleting this exercice',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            deleteExerciceMutation.mutate(exerciceId);
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  useEffect(() => {
    if (deleteExerciceMutation.isSuccess) {
      Toast.show({ type: 'success', text1: 'Exercice Deleted Succesfully' });
      navigation.goBack();
    }
  }, [deleteExerciceMutation.isSuccess]);

  const renderItemIcon = () => (
    <Ionicons name={'clipboard-outline'} size={30} />
  );

  interface renderItemProps {
    item: { id: string; name: string };
    index: number;
  }

  const renderItem: React.FC<renderItemProps> = ({ item }) => (
    <ListItem
      title={`${item.name}`}
      style={{ paddingHorizontal: 20 }}
      accessoryLeft={renderItemIcon}
    />
  );
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={styles.header}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <Ionicons name={'barbell-outline'} size={45} />
          <View style={styles.heading}>
            <Text style={styles.headingOne}>{exerciceData?.name}</Text>
            <Text style={styles.headingTwo}>{exerciceData?.muscle?.name}</Text>
          </View>
        </View>
        <Button
          size='small'
          onPress={handleDelete}
          status='danger'
          appearance='outline'
        >
          Delete
        </Button>
      </View>

      <View>
        <Text style={styles.subtitle}>Demonstration Video :</Text>
        <View style={{ padding: 10 }}>
          <YoutubePlayer
            height={223}
            play={playing}
            videoId={exerciceData?.youtubeId}
            onChangeState={onStateChange}
          />
        </View>
        <Text style={styles.subtitle}>Workouts : </Text>
        <List data={exerciceData?.Workout} renderItem={renderItem} />
      </View>
    </View>
  );
};

const styles = StyleService.create({
  header: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    maxHeight: 120,
    heigth: 50,
    width: '100%',
    borderBottomColor: 'grey',
    backgroundColor: 'whitesmoke',
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
  subtitle: {
    fontSize: 18,
    marginTop: 10,
    paddingLeft: 10,
    fontWeight: '500',
  },
});

export default ExerciceScreen;
