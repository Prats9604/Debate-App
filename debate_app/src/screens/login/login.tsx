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

function Login(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const textColor = isDarkMode ? Colors.white : Colors.black;

  const handleLogin = () => {
    // Handle login logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <View style={[backgroundStyle, styles.container]}>
      <Text style={[styles.sectionTitle, {color: textColor}]}>
        Welcome Back
      </Text>
      <Text style={[styles.sectionTitle, {color: textColor}]}>
        Enter Your Credentials
      </Text>

      <View>
        <Text style={{color: textColor}}>Email :</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Email"
          placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View>
        <Text style={{color: textColor}}>Password :</Text>
        <TextInput
          style={[styles.input]}
          placeholder="Password"
          placeholderTextColor={isDarkMode ? Colors.light : Colors.dark}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    display: 'flex',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: 320,
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: 70,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Login;
