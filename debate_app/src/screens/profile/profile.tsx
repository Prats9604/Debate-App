/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableOpacity,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// socket
import {io, Socket} from 'socket.io-client';
import {DefaultEventsMap} from '@socket.io/component-emitter';
const endpoint = 'https://69da-14-139-109-130.ngrok-free.app/';
var socket: Socket<DefaultEventsMap, DefaultEventsMap>, selectedchatcompare;

export default function profile() {
  const [modalVisible, setModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState('');

  // socket connection
  const [socketconnect, setSocketConnect] = useState(false);

  useEffect(() => {
    socket = io(endpoint);
    socket.emit('setup', currentuser);
    // socket.emit('joinroom', '66d609ac3998aa0b518fb513');
    socket.on('connection', () => {
      setSocketConnect(true);
    });
  }, []);

  const currentuser = '66c87f33a9cc31193559e2be';

  const recieveMessage = async () => {
    try {
      try {
        const value: any = await AsyncStorage.getItem('userId');
        if (value !== null) {
          // console.log('Retrieved data:', value);
        }

        setUserId(value);
      } catch (error) {
        // console.error('Error retrieving data', error);
      }
      const response = await axios.get(
        'https://69da-14-139-109-130.ngrok-free.app/api/chats/debate/66d609ac3998aa0b518fb513',
      );
      // console.log(response.data);
      setChats(response.data);

      socket.emit('joinroom', '66d609ac3998aa0b518fb513');
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    // const intervalId = setInterval(() => {
    //   recieveMessage();
    // }, 3000);
    recieveMessage();
    // return () => clearInterval(intervalId);
  }, []);

  // for socket

  const sendMessage = async () => {
    try {
      const response = await axios.post(
        'https://69da-14-139-109-130.ngrok-free.app/api/chats',
        {
          senderId: userId,
          message: message,
          debateId: '66d609ac3998aa0b518fb513',
        },
      );

      console.log(response.data);
      recieveMessage();
      setMessage('');
    } catch (error: any) {
      console.log(error.message);
    }
    try {
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require('../../assets/images/back.png')}
          style={{width: 12, height: 32}}
        />
        <View>
          <Text style={styles.headerText1}>
            Every citizen should be mandated to perform national public service.
          </Text>
        </View>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            source={require('../../assets/images/exit.png')}
            style={{width: 50, height: 50}}
            alt="profile"
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.rooms}>
        {chats.map((chat: any) => {
          return (
            <>
              {chat.senderId === userId ? (
                <View style={styles.message1}>
                  <Text style={styles.name1}>{chat.senderId}</Text>
                  <Text style={styles.text1}>{chat.message}</Text>
                </View>
              ) : (
                <View style={styles.message2}>
                  <Text style={styles.name2}>{chat.senderId}</Text>
                  <Text style={styles.text2}>{chat.message}</Text>
                </View>
              )}
            </>
          );
        })}
        {/* <View style={styles.message1}>
          <Text style={styles.name1}>Aarav S</Text>
          <Text style={styles.text1}>
            mandated to perform national public service andated to perform
            national public.
          </Text>
        </View>
        <View style={styles.message2}>
          <Text style={styles.name2}>Aarav S</Text>
          <Text style={styles.text2}>
            mandated to perform national public service. Conclusion: Every
            citizen should be mandated to perform national public service.
          </Text>
        </View>
        <View style={styles.message1}>
          <Text style={styles.name1}>Aarav S</Text>
          <Text style={styles.text1}>
            mandated to perform national public service andated to perform
            national public.
          </Text>
        </View>
        <View style={styles.message2}>
          <Text style={styles.name2}>Aarav S</Text>
          <Text style={styles.text2}>
            mandated to perform national public service. Conclusion: Every
            citizen should be mandated to perform national public service.
          </Text>
        </View>
        <View style={styles.message1}>
          <Text style={styles.name1}>Aarav S</Text>
          <Text style={styles.text1}>
            mandated to perform national public service andated to perform
            national public.
          </Text>
        </View>
        <View style={styles.message2}>
          <Text style={styles.name2}>Aarav S</Text>
          <Text style={styles.text2}>
            mandated to perform national public service. Conclusion: Every
            citizen should be mandated to perform national public service.
          </Text>
        </View> */}
      </ScrollView>
      {/* <Text style={styles.input}>Message</Text> */}
      <View style={styles.input2}>
        <TextInput
          style={styles.inputText}
          placeholder="Message"
          placeholderTextColor="#747474"
          value={message}
          onChangeText={text => setMessage(text)} // Corrected onChangeText handler
        />
        <Pressable onPress={sendMessage}>
          <Image
            source={require('../../assets/images/send.png')}
            style={{width: 34, height: 28}}
            alt="send"
          />
        </Pressable>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText1}>Exit the Debate</Text>
            <Text style={styles.modalText2}>
              By clicking here, You'll end this debate and Team Red will win.
            </Text>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => console.log('Request to Debate')}>
              <Text style={styles.buttonText}>Agree with team Red</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  header: {
    backgroundColor: '#FAB682',
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    gap: 18,
    margin: 8,
  },

  headerText1: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 21,
    color: '#D36B6B',
    paddingHorizontal: 20,
  },

  rooms: {
    backgroundColor: '#E3E3E3',
    flexDirection: 'column',
    marginHorizontal: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flex: 1,
    display: 'flex',
    // borderTopLeftRadius: 16,
    // borderTopRightRadius: 16,
    borderRadius: 16,
  },
  message1: {
    flexDirection: 'column',
    gap: 1,
    padding: 10,
    backgroundColor: '#fff',
    maxWidth: '80%',
    borderRadius: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#6BA0C7',
    alignSelf: 'flex-end',
    marginVertical: 6,
  },
  name1: {
    color: '#6BA0C7',
    fontSize: 14,
    fontWeight: '600',
  },
  text1: {
    color: '#747474',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  message2: {
    flexDirection: 'column',
    gap: 1,
    padding: 10,
    backgroundColor: '#CDCDCD',
    // backgroundColor:'#EFEFEF',
    maxWidth: '80%',
    borderRadius: 6,
    borderLeftWidth: 2,
    borderLeftColor: '#EA7575',
    marginVertical: 6,
  },
  name2: {
    color: '#EA7575',
    fontSize: 14,
    fontWeight: '600',
  },
  text2: {
    color: '#747474',
    fontSize: 15,
    fontWeight: '500',
    lineHeight: 20,
  },
  input: {
    position: 'absolute',
    padding: 16,
    borderRadius: 40,
    color: '#747474',
    backgroundColor: '#E3E3E3',
    bottom: 0,
    width: '98%',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fff',
  },
  input2: {
    flexDirection: 'row',
    position: 'absolute',
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#E3E3E3',
    bottom: 4,
    width: '92%',
    alignSelf: 'center',
    borderWidth: 3,
    borderColor: '#fff',
    borderRadius: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
  },
  inputText: {
    color: '#747474',
    fontSize: 14,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 260,
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  modalText1: {
    fontSize: 20,
    color: '#D36B6B',
    fontWeight: '600',
  },
  modalText2: {
    fontSize: 16,
    color: '#747474',
    // color:'#000',
    fontWeight: '500',
    textAlign: 'center',
  },
  customButton: {
    width: '90%',
    marginTop: 4,
    paddingVertical: 12,
    backgroundColor: '#11BB11',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
