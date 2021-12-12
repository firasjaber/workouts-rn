import { Button, Input, StyleService } from '@ui-kitten/components';
import React, { useState } from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LiftTwoSvg from './../../assets/liftTwo.svg';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hiddenPassword, setHiddenPassword] = React.useState(true);

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
          style={styles.input}
        />
        <Input
          onChangeText={(e) => setPassword(e)}
          size='large'
          accessoryRight={renderIcon}
          secureTextEntry={hiddenPassword}
          placeholder='Password'
          style={{ width: 300 }}
        />
        <Button
          style={{ marginVertical: 15 }}
          onPress={() => {
            console.log(firstName);
            console.log(lastName);
            console.log(email);
            console.log(password);
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
