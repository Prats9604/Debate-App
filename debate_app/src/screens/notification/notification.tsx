/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

export default function notification() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText1}>Hey Pratiksha!</Text>
          <Text style={styles.headerText2}>WEL-COME to XYZ</Text>
        </View>
        <View style={styles.profileImage}>
          <Image
            source={require('../../assets/images/profile.png')}
            style={{width: 50, height: 50}}
            alt="profile"
          />
        </View>
      </View>
      <View style={styles.rooms}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAB682',
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },

  headerText1: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 30,
    color: '#000',
  },

  headerText2: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 21,
    color: '#D36B6B',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },

  rooms: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});
