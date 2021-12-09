import { NavigationProp } from '@react-navigation/native';
import { Button, Input } from '@ui-kitten/components/ui';
import React from 'react';
import { View, Text } from 'react-native';
import useAuthStore from '../store/auth';

interface SigninProps {
  navigation: NavigationProp<any, any>;
}

const Signin: React.FC<SigninProps> = ({ navigation }) => {
  const signIn = useAuthStore((state) => state.signIn);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>Sign in page</Text>
      <Input placeholder='email' />
      <Input placeholder='password' />
      <Button
        onPress={() => {
          signIn();
        }}
      >
        Log in
      </Button>
    </View>
  );
};

export default Signin;
