import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { View, Text } from 'react-native';

interface WorkoutsProps {
  navigation: NavigationProp<any, any>;
}

const ExercicesScreen: React.FC<WorkoutsProps> = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Exercices</Text>
      <Text onPress={() => navigation.navigate('Exercice')}>
        Go to Exercice
      </Text>
    </View>
  );
};

export default ExercicesScreen;
