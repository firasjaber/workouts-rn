import { NavigationProp } from '@react-navigation/native';
import { StyleService } from '@ui-kitten/components';
import { Button, Input } from '@ui-kitten/components/ui';
import React, { useState } from 'react';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import useAuthStore from '../store/auth';
import LiftOneSvg from './../../assets/liftOne.svg';

interface SigninProps {
  navigation: NavigationProp<any, any>;
}

const Signin: React.FC<SigninProps> = ({ navigation }) => {
  const error = useAuthStore((state) => state.error);
  const betaLogin = useAuthStore((state) => state.betaLogin);
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
          paddingBottom: 150,
        }}
      >
        <LiftOneSvg
          style={{ maxWidth: 300, maxHeight: 200, marginBottom: 50 }}
          width='100%'
          height='100%'
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
          secureTextEntry={hiddenPassword}
          accessoryRight={renderIcon}
          placeholder='Password'
          status={error ? 'danger' : 'basic'}
          style={styles.input}
        />
        {error ? (
          <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
        ) : null}
        <Button
          style={{ marginVertical: 15 }}
          onPress={() => {
            betaLogin({ email, password });
          }}
        >
          Log in
        </Button>
        <Text style={{ fontSize: 16 }}>
          Dont have an account ?{' '}
          <Text
            style={{ color: 'blue', fontSize: 16 }}
            onPress={() => navigation.navigate('Signup')}
          >
            Sign up now
          </Text>
        </Text>
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

export default Signin;
