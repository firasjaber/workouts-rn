import { NavigationProp } from '@react-navigation/native';
import { List, ListItem, StyleService } from '@ui-kitten/components';
import React, { useCallback, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import YoutubePlayer from 'react-native-youtube-iframe';

interface ExerciceProps {
  navigation: NavigationProp<any, any>;
}

const ExerciceScreen: React.FC<ExerciceProps> = ({ navigation }) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const data: Array<{ title: string; description: string }> = new Array(5).fill(
    {
      title: 'Good chest workout',
      description: 'Chest, Triceps',
    }
  );

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
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <View style={styles.header}>
        <Ionicons name={'barbell-outline'} size={50} />
        <View style={styles.heading}>
          <Text style={styles.headingOne}>Bar Bench Press</Text>
          <Text style={styles.headingTwo}>Chest, Triceps</Text>
        </View>
      </View>

      <View>
        <Text style={styles.subtitle}>Demonstration Video :</Text>
        <View style={{ padding: 10 }}>
          <YoutubePlayer
            height={223}
            play={playing}
            videoId={'3DX7Fp3TmME'}
            onChangeState={onStateChange}
          />
        </View>
        <Text style={styles.subtitle}>Workouts : </Text>
        <List data={data} renderItem={renderItem} />
      </View>
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
