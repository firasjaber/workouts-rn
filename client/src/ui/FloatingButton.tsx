import React from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface FloatingButtonProps {
  navigation: any;
  navigateTo: string;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({
  navigation,
  navigateTo,
}) => {
  return (
    <TouchableOpacity
      style={{
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 60,
        position: 'absolute',
        bottom: 15,
        right: 15,
        borderColor: 'tomato',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
        backgroundColor: 'tomato',
        borderRadius: 100,
      }}
      onPress={() => navigation.navigate(navigateTo)}
    >
      <Ionicons
        name='add-outline'
        size={40}
        style={{ color: 'white', marginLeft: 5 }}
      />
    </TouchableOpacity>
  );
};

export default FloatingButton;
