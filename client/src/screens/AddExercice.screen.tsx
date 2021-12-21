import { NavigationProp } from '@react-navigation/native';
import {
  Button,
  Input,
  Radio,
  RadioGroup,
  StyleService,
} from '@ui-kitten/components';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Toast from 'react-native-toast-message';
import { addExercice, getMuscles } from '../api';

interface AddExerciceBody {
  name: string;
  youtubeId: string;
  muscleId: number;
}

interface AddExerciceProps {
  navigation: NavigationProp<any, any>;
}

const AddExercice: React.FC<AddExerciceProps> = ({ navigation }) => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [name, setName] = useState('');
  const [videoId, setVideoId] = useState('');
  const queryClient = useQueryClient();

  const addExerciceMutation = useMutation(
    (exercice: AddExerciceBody) => addExercice(exercice),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('exercices');
      },
    }
  );

  const handleAddExercice = () => {
    const body = {
      name,
      youtubeId: videoId,
      muscleId: selectedIndex,
    };
    addExerciceMutation.mutate(body);
  };
  useEffect(() => {
    if (addExerciceMutation.isSuccess) {
      Toast.show({ type: 'success', text1: 'Exercice Added Succesfully' });
      navigation.goBack();
    }
  }, [addExerciceMutation.isSuccess]);
  const { data } = useQuery('muscles', getMuscles);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ padding: 20 }}>
        <Text style={styles.label}>Exercice name</Text>
        <Input
          placeholder='My Exercice'
          size='large'
          onChangeText={(e) => setName(e)}
        />
        <Text style={styles.label}>Reference video id</Text>
        <Input
          placeholder='Youtube video id'
          size='large'
          onChangeText={(e) => setVideoId(e)}
        />
        <Text style={styles.label}>Muscle group</Text>
        <RadioGroup
          selectedIndex={selectedIndex}
          onChange={(index: number) => setSelectedIndex(index)}
        >
          {data &&
            data.map((muscle: any) => (
              <Radio key={muscle.id} status='warning'>
                {muscle.name}
              </Radio>
            ))}
        </RadioGroup>
        <Button
          style={{ marginTop: 20 }}
          status='warning'
          onPress={() => handleAddExercice()}
          disabled={!name || !videoId}
        >
          Add Exercice
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleService.create({
  label: {
    opacity: 0.5,
    fontWeight: '500',
    fontSize: 15,
    marginBottom: 5,
    marginTop: 15,
  },
});

export default AddExercice;
