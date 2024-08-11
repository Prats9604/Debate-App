/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigation} from '@react-navigation/native';

// C:\Users\HP\AppData\Local\Android\Sdk\ndk\26.1.10909125

function Signup(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textColor = isDarkMode ? Colors.white : Colors.black;

  // navigation

  const navigation = useNavigation();

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password :', confirmpassword);
    console.log('Phone :', phone);
  };

  const movesignup = () => {
    console.log('Moving to signup page');
    navigation.navigate('Login');
  };

  return (
    <ScrollView style={[backgroundStyle, styles.container]}>
      <Text style={styles.headertitle}>Sign Up</Text>
      <Text style={styles.headersubtitle}>Create your account</Text>

      <View style={styles.inputcont}>
        <Text style={styles.label}>phone no.</Text>
        <TextInput
          placeholder="enter your phone number here"
          placeholderTextColor="#979797"
          value={phone}
          onChangeText={setPhone}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, {color: textColor}]}
        />
      </View>
      <View style={styles.inputcont}>
        <Text>email</Text>
        <TextInput
          placeholder="Enter your email here"
          placeholderTextColor="#979797"
          value={email}
          onChangeText={setEmail}
          secureTextEntry
          style={[styles.input, {color: textColor}]}
        />
      </View>

      <View style={styles.inputcont}>
        <Text>password</Text>
        <TextInput
          placeholder="Enter your password here"
          placeholderTextColor="#979797"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, {color: textColor}]}
        />
      </View>

      <View style={styles.inputcont}>
        <Text>confirm password</Text>
        <TextInput
          placeholder="Enter your confirm password here"
          placeholderTextColor="#979797"
          value={confirmpassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          style={[styles.input, {color: textColor}]}
        />
      </View>

      <View style={styles.authtsubmitcont}>
        <TouchableOpacity style={styles.submitbutton} onPress={handleLogin}>
          <Text style={styles.buttontext}>Sign in</Text>
        </TouchableOpacity>
        <View style={styles.signuptext}>
          <Text style={styles.accounttexf}>Already have an account?</Text>
          <TouchableOpacity onPress={movesignup}>
            <Text style={{color: '#D36B6B', marginLeft: 10}}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    // justifyContent: 'center',
    paddingLeft: 30,
    paddingRight: 30,
  },
  headertitle: {
    fontSize: 28,
    lineHeight: 42,
    fontWeight: '600',
    textAlign: 'center',
    color: '#FAB682',
    marginTop: '35%',
  },
  headersubtitle: {
    marginTop: 15,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    color: '#747474',
  },
  inputcont: {
    marginTop: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D36B6B',
    borderRadius: 12,
    borderTopWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderStyle: 'solid',
    color: '#D36B6B',
    paddingLeft: 10,
  },
  label: {
    color: '#747474',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
  },
  authtsubmitcont: {
    marginTop: 20,
    gap: 10,
  },
  submitbutton: {
    backgroundColor: '#D36B6B',
    borderRadius: 12,
    height: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  buttontext: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  signuptext: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  accounttexf: {
    color: '#747474',
    fontSize: 14,
    lineHeight: 21,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default Signup;
