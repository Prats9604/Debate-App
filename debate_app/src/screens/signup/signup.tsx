/* eslint-disable prettier/prettier */
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
import axios from 'axios';

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

  const handleRegister = async () => {
    // Input validation
    if (!email || !password || !confirmpassword || !phone) {
      console.log('Please fill all fields.');
      return;
    }
    if (password !== confirmpassword) {
      console.log('Passwords do not match.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Invalid email format.');
      return;
    }

    try {
      const response = await axios.post(
        'https://69da-14-139-109-130.ngrok-free.app/api/register',
        {
          name: 'meee',
          email: email,
          phone: phone,
          password: password,
          confirmPassword: confirmpassword,
        },
      );

      console.log('Registration successful:', response.data);
      // Navigate to the login page or home page after successful registration
      navigation.navigate('Login');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Error response from server
        if (error.response) {
          console.error('Error response data:', error.response.data);
          console.error('Error response status:', error.response.status);
          console.error('Error response headers:', error.response.headers);
        }
        // No response from server
        else if (error.request) {
          console.error('Error request data:', error.request);
        }
        // Error in setting up the request
        else {
          console.error('Error message:', error.message);
        }
      } else {
        console.error('Unexpected error:', error);
      }
    }
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
          style={[styles.input, {color: textColor}]}
        />
      </View>

      <View style={styles.authtsubmitcont}>
        <TouchableOpacity style={styles.submitbutton} onPress={handleRegister}>
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
