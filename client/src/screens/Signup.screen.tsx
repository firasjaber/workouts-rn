import { Button, Input, StyleService, Text } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuthStore from '../store/auth';
import LiftTwoSvg from './../../assets/liftTwo.svg';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = React.useState(true);
  const error = useAuthStore((state) => state.error);
  const register = useAuthStore((state) => state.register);

  const togglePassword = () => {
    setHiddenPassword(!hiddenPassword);
  };
  const renderIcon = () => (
    <TouchableWithoutFeedback onPress={togglePassword}>
      <Ionicons name={hiddenPassword ? 'eye-off' : 'eye'} size={20} />
    </TouchableWithoutFeedback>
  );
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 100,
        }}
      >
        <LiftTwoSvg
          style={{ maxWidth: 300, maxHeight: 200, marginBottom: 50 }}
          width='100%'
          height='100%'
        />
        <Input
          onChangeText={(e) => setFirstName(e)}
          placeholder='First name'
          size='large'
          style={styles.input}
        />
        <Input
          onChangeText={(e) => setLastName(e)}
          size='large'
          placeholder='Last name'
          style={styles.input}
        />
        <Input
          onChangeText={(e) => setEmail(e)}
          size='large'
          placeholder='Email address'
          status={error ? 'danger' : 'basic'}
          style={styles.input}
        />
        <Input
          onChangeText={(e) => setPassword(e)}
          size='large'
          accessoryRight={renderIcon}
          secureTextEntry={hiddenPassword}
          placeholder='Password'
          style={styles.input}
        />
        {error ? (
          <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
        ) : null}
        <Button
          style={{ marginVertical: 15 }}
          onPress={() => {
            register({ firstName, lastName, email, password });
          }}
        >
          Sign up
        </Button>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleService.create({
  input: {
    width: 300,
    marginBottom: 10,
  },
});

export default Signup;
