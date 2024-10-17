/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
// /* eslint-disable prettier/prettier */
// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable prettier/prettier */
// /* eslint-disable @typescript-eslint/no-unused-vars */
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
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// C:\Users\HP\AppData\Local\Android\Sdk\ndk\26.1.10909125

function Login(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textColor = isDarkMode ? Colors.white : Colors.black;

  // navigation

  const navigation = useNavigation();

  const movesignup = () => {
    console.log('Moving to signup page');
    navigation.navigate('Signup');
  };

  const setdata = async (data: any) => {
    try {
      await AsyncStorage.setItem('userId', data);
      console.log('userId saved');
      navigation.navigate('myTab');
    } catch (error) {
      console.log('Failed to save email:', error);
    }
  };

  const loginHandler = async () => {
    console.log('Attempting to log in');
    if (email === '' || password === '') {
      console.log('Please enter all the fields');
      return;
    }
    console.log('Email:', email);
    console.log('Password', password);

    try {
      const response = await axios.post(
        'https://debate-backend-sara2829s-projects.vercel.app/api/login',
        {email, password},
      );
      console.log('Login successful =========== ', response.data);
      console.log('userId:', response.data.userId);
      setdata(response.data.userId);
    } catch (error: any) {
      console.log('Login failed: ', error.response.data.message);
    }
  };

  return (
    <View style={[backgroundStyle, styles.container]}>
      <Text style={styles.headertitle}>Welcome Back</Text>
      <Text style={styles.headersubtitle}>Enter Your Credentials</Text>

      <View style={styles.inputcont}>
        <Text style={styles.label}>email</Text>
        <TextInput
          placeholder="Enter your email here"
          placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={[styles.input, {color: textColor}]}
        />
      </View>
      <View style={styles.inputcont}>
        <Text>password</Text>
        <TextInput
          placeholder="Enter your password here"
          placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={[styles.input, {color: textColor}]}
        />
      </View>

      <View style={styles.authtsubmitcont}>
        <TouchableOpacity style={styles.submitbutton} onPress={loginHandler}>
          <Text style={styles.buttontext}>Login Here</Text>
        </TouchableOpacity>
        <View style={styles.signuptext}>
          <Text style={styles.accounttexf}>Don't have an account?</Text>
          <TouchableOpacity onPress={movesignup}>
            <Text style={{color: '#D36B6B', marginLeft: 10}}>Signup Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
    marginTop: '40%',
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

export default Login;
