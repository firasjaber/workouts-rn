import {
  Button,
  Input,
  Radio,
  RadioGroup,
  StyleService,
} from '@ui-kitten/components';
import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useMutation, useQuery } from 'react-query';
import { getMuscles } from '../api';

const AddExercice = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [name, setName] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleAddExercice = () => {
    console.log(name);
    console.log(videoId);
    console.log(selectedIndex);
  };
  const { isLoading, isError, data, error } = useQuery('todos', getMuscles);
  console.log(data);
  //const {isLoading,mutate} = useMutation(exercie => axios.post(''))

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
