import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const screenWidth = Dimensions.get('window').width;
const topicsConfig = [
  {
    id: 1,
    topic: 'Bottled water should be banned.',
    status: 'done',
  },
  {
    id: 1,
    topic: 'Bottled water should be banned.',
    status: 'Not done',
  },
  {
    id: 1,
    topic: 'Bottled water should be banned.',
    status: 'Not done',
  },
  {
    id: 1,
    topic: 'Bottled water should be banned.',
    status: 'done',
  },
  {
    id: 1,
    topic: 'Bottled water should be banned.',
    status: 'done',
  },
];

export default function Profile() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.editImage}>
          <Image
            source={require('../../assets/images/edit.png')}
            style={{width: 25, height: 25}}
            alt="profile"
          />
        </View>
        <View style={styles.up}>
          <View style={styles.profileImage}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={{width: 72, height: 72}}
              alt="profile"
            />
          </View>
          <View style={styles.data}>
            <View style={styles.element}>
              <Text style={styles.headerText1}>10</Text>
              <Text style={styles.headerText2}>Participated</Text>
            </View>
            <View style={styles.element}>
              <Text style={styles.headerText1}>20</Text>
              <Text style={styles.headerText2}>Won</Text>
            </View>
            <View style={styles.element}>
              <Text style={styles.headerText1}>12</Text>
              <Text style={styles.headerText2}>Criteria</Text>
            </View>
          </View>
        </View>
        <View style={styles.info}>
          <Text style={styles.headerText1}>Pratiksha Gunjal</Text>
          <Text style={styles.headerText2}>Prats9604</Text>
          <Text style={styles.headerText3}>-BTech, 2025</Text>
        </View>
        <View style={styles.buts}>
          <Text style={styles.but}>Share Profile</Text>
          <Text style={styles.but}>Share Profile</Text>
        </View>
      </View>

      <View style={styles.rooms}>
        <Text style={styles.title}>Debates you added</Text>
        <View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.topicList}>
            {topicsConfig.map(topic => (
              <View key={topic.id} style={styles.topicItem}>
                <Text style={styles.topicText}>{topic.topic}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.features}>
          <View style={styles.feature}>
            <View style={styles.icon}>
              <Image
                source={require('../../assets/images/saveIcon.png')}
                style={{width: 20, height: 20}}
                alt="profile"
              />
            </View>
            <Text style={styles.name}>Debates you saved</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.icon}>
              <Image
                source={require('../../assets/images/likeIcon.png')}
                style={{width: 25.5, height: 20}}
                alt="profile"
              />
            </View>
            <Text style={styles.name}>Debates you liked</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAB682',
    gap: 10,
    width: '100%',
  },
  header: {
    flexDirection: 'column',
    gap: 10,
    marginBottom: 20,
  },
  up: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  headerText1: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 30,
    color: '#000',
  },
  headerText2: {
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 21,
    color: '#D36B6B',
  },
  headerText3: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 21,
    color: '#000',
  },
  element: {
    alignItems: 'center',
  },
  editImage: {
    width: 20,
    height: 20,
    alignSelf: 'flex-end',
    marginHorizontal: 20,
    marginTop: 16,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginTop: -20,
  },
  data: {
    flexDirection: 'row',
    gap: 40,
  },
  info: {
    paddingLeft: 26,
    gap: 4,
  },
  buts: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 26,
  },
  but: {
    paddingVertical: 10,
    width: '50%',
    backgroundColor: '#FDEECE',
    textAlign: 'center',
    borderRadius: 8,
    color: '#D36B6B',
    fontWeight:'700',
  },
  rooms: {
    flexDirection: 'column',
    paddingVertical: 20,
    gap: 16,
    // paddingHorizontal: 24,
    paddingLeft: 16,
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginTop: 10,
    marginLeft: 4,
  },
  topicList: {
    flexDirection: 'row',
    gap: 4,
  },
  topicItem: {
    backgroundColor: '#FDEECE',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topicText: {
    color: '#747474',
    fontSize: 16,
    fontWeight: '500',
  },
  features: {
    flexDirection: 'column',
    gap: 16,
  },
  feature: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  icon: {
    // padding: 12,
    borderRadius:4,
    backgroundColor: '#FDEECE',
    width:36,
    height:36,
    alignItems:'center',
    justifyContent:'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#747474',
  },
});
