import {
  Button,
  Input,
  Radio,
  RadioGroup,
  StyleService,
} from '@ui-kitten/components';
import React, { useState } from 'react';
import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

const AddExercice = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [name, setName] = useState('');
  const [videoId, setVideoId] = useState('');

  const handleAddExercice = () => {
    console.log(name);
    console.log(videoId);
    console.log(selectedIndex);
  };
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
          <Radio status='warning'>Chest</Radio>
          <Radio status='warning'>Back</Radio>
          <Radio status='warning'>Shoulders</Radio>
          <Radio status='warning'>Biceps</Radio>
          <Radio status='warning'>Triceps</Radio>
          <Radio status='warning'>Legs</Radio>
          <Radio status='warning'>Core</Radio>
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
