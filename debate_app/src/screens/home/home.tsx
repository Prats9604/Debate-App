/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
  FlatList,
  ActivityIndicator,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const screenWidth = Dimensions.get('window').width;

const topicsConfig = [
  {
    id: 1,
    topic: 'All people should have Universal Basic Income.',
    owner: 'Mr. Fransisco',
    profile: [require('../../assets/images/red.png')],
  },
  {
    id: 2,
    topic: 'Abortion should be banned.',
    owner: 'Mr. Fransisco',
    profile: [require('../../assets/images/blue.png')],
  },
  {
    id: 3,
    topic: 'Countries should be isolationist.',
    owner: 'Mr. Fransisco',
    profile: [require('../../assets/images/red.png')],
  },
  {
    id: 4,
    topic: 'Bottled water should be banned.',
    owner: 'Mr. Fransisco',
    profile: [require('../../assets/images/blue.png')],
  },
  {
    id: 5,
    topic: 'All people should have Universal Basic Income.',
    owner: 'Mr. Fransisco',
    profile: [require('../../assets/images/red.png')],
  },
  {
    id: 6,
    topic: 'All people should have Universal Basic Income.',
    owner: 'Mr. Fransisco',
    profile: [require('../../assets/images/blue.png')],
  },
  {
    id: 7,
    topic: 'Bottled water should be banned.',
    owner: 'Mr. Fransisco',
    profile: [require('../../assets/images/red.png')],
  },
];

const debatesConfig = [
  {
    id: 1,
    status: 'Ongoing',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion: '',
    days: 8,
    companionsRight: [
      require('../../assets/images/red.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 2,
    status: 'Completed',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion:
      'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
    days: 8,
    companionsRight: [
      require('../../assets/images/red.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 3,
    status: 'Ongoing',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion: '',
    days: 8,
    companionsRight: [
      require('../../assets/images/red.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 4,
    status: 'Completed',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion:
      'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
    days: 8,
    companionsRight: [
      require('../../assets/images/red.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 5,
    status: 'Ongoing',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion: '',
    days: 8,
    companionsRight: [
      require('../../assets/images/red.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 6,
    status: 'Completed',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion:
      'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
    days: 8,
    companionsRight: [
      require('../../assets/images/red.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
];

export default function Rooms() {
  const [filter, setFilter] = useState<string>('');
  const [expandedDebates, setExpandedDebates] = useState<{
    [key: number]: boolean;
  }>({});

  const [selectedDebate, setSelectedDebate] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modal2Visible, setModal2Visible] = useState<boolean>(false);
  const [modal3Visible, setModal3Visible] = useState<boolean>(false);
  const [touchedDebate, setTouchedDebate] = useState<number | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userData, setuserData] = useState<any>(null);
  const [userDebates, setUserDebates] = useState<any>(null);
  const [debatetopic, setDebateTopic] = useState<string>('');

  const handleTopicPress = (event: any, debateId: number) => {
    setModalVisible(true);
  };
  const handleOutsidePress = () => {
    setModalVisible(false);
    setSelectedDebate(null);
  };

  const toggleTextExpansion = (id: number) => {
    setExpandedDebates(prevState => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };
  const handleAddPress = () => {
    setModal2Visible(true);
  };
  const handleDebateTouch = (id: number) => {
    setTouchedDebate(prev => (prev === id ? null : id));
  };
  const handleJoinDebate = () => {
    setModal3Visible(true);
  };

  const navigation = useNavigation();

  const retriveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userId');
      setUserId(value);
      console.log('Value:', value);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const renderUserdata = async () => {
    try {
      const response = await axios.get(
        'https://debate-backend-sara2829s-projects.vercel.app/api/users/' +
          userId,
      );
      console.log('renderDebatedata ==', response.data);
      setuserData(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  const renderDebatedata = async () => {
    try {
      const response = await axios.get(
        'https://debate-backend-sara2829s-projects.vercel.app/api/getalldebate',
      );
      console.log('renderDebatedata === ', response.data);
      setUserDebates(response.data);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  useEffect(() => {
    retriveData();
  }, []);

  useEffect(() => {
    if (userId || userDebates || userData) {
      renderUserdata();
      renderDebatedata();
    }
  }, [userId || userDebates || userData]);

  const addDebate = async () => {
    console.log('Debate Topic:', debatetopic);
    console.log('User Id:', userId);

    if (debatetopic === '') {
      console.log('Please enter a debate topic');
      return;
    }

    try {
      const response = await axios.post(
        'https://debate-backend-sara2829s-projects.vercel.app/api/debate',
        {
          debateName: debatetopic,
          status: 'Upcoming',
          description: 'new idea Upcoming Upcoming Upcoming',
          userId: userId,
        },
      );
      console.log('Add Debate:', response.data);
      setDebateTopic('');
      setModal2Visible(false);
      renderDebatedata();
    } catch (error) {
      console.log('Axios error in debate adding:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText1}>Hey {userData?.name} !</Text>
          <Text style={styles.headerText2}>WEL-COME to XYZ</Text>
        </View>
        <Pressable
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <View style={styles.profileImage}>
            <Image
              source={require('../../assets/images/profile.png')}
              style={styles.profileImageStyle}
              alt="profile"
            />
          </View>
        </Pressable>
      </View>
      <View style={styles.up}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicList}>
          {topicsConfig.map(topic => (
            <View
              key={topic.id}
              style={styles.topicItem}
              onTouchEnd={event => handleTopicPress(event, topic.id)}>
              <Text style={styles.topicText}>{topic.topic}</Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicList}>
          {topicsConfig.map(topic => (
            <View
              key={topic.id}
              style={styles.topicItem}
              onTouchEnd={event => handleTopicPress(event, topic.id)}>
              <Text style={styles.topicText}>{topic.topic}</Text>
            </View>
          ))}
        </ScrollView>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.topicList}>
          {topicsConfig.map(topic => (
            <View
              key={topic.id}
              style={styles.topicItem}
              onTouchEnd={event => handleTopicPress(event, topic.id)}>
              <Text style={styles.topicText}>{topic.topic}</Text>
            </View>
          ))}
        </ScrollView>
        <Text style={styles.add} onPress={event => handleAddPress()}>
          +
        </Text>
      </View>

      <View style={styles.rooms}>
        <View style={styles.switches}>
          <TouchableOpacity onPress={() => setFilter('')}>
            <Text style={[styles.button, filter === '' && styles.activeButton]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('Ongoing')}>
            <Text
              style={[
                styles.button,
                filter === 'Ongoing' && styles.activeButton,
              ]}>
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setFilter('Completed')}>
            <Text
              style={[
                styles.button,
                filter === 'Completed' && styles.activeButton,
              ]}>
              Completed
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={{
            width: '100%',
            height: '100%',
          }}>
          <View style={styles.debatewrap}>
            {userDebates ? (
              userDebates
                .filter((debate: any) => {
                  return filter === '' || debate.status === filter;
                })
                .map((debate: any) => (
                  <TouchableOpacity
                    key={debate?._id}
                    style={styles.debates}
                    onPress={() => handleDebateTouch(debate?._id)}>
                    <View style={styles.top}>
                      <Text style={styles.debateTopic}>
                        {debate.debateName}
                      </Text>
                      <View style={styles.notification}></View>
                    </View>

                    {debate.status === 'Completed' && (
                      <TouchableOpacity
                        onPress={() => toggleTextExpansion(debate?._id)}>
                        <Text
                          style={styles.conclusion}
                          numberOfLines={
                            expandedDebates[debate?._id] ? undefined : 1
                          }
                          ellipsizeMode="tail">
                          {debate.conclusion}
                        </Text>
                      </TouchableOpacity>
                    )}

                    <View style={styles.bottom}>
                      <View style={styles.duration}>
                        <Text style={styles.number}>8</Text>
                        <Text style={styles.days}>Days</Text>
                        <Text style={styles.slash}>/</Text>
                        <Text style={styles.result}>{debate.status}</Text>
                      </View>
                      <View style={styles.right}>
                        {/* {debate.companionsRight.map((img, index) => (
                        <Image
                          key={index}
                          source={img}
                          style={{width: 26, height: 26}}
                          alt="profile"
                        />
                      ))} */}
                        <Image
                          key={1}
                          source={require('../../assets/images/red.png')}
                          style={{width: 26, height: 26}}
                          alt="profile"
                        />
                        <Image
                          key={1}
                          source={require('../../assets/images/blue.png')}
                          style={{width: 26, height: 26}}
                          alt="profile"
                        />
                        {/* <Text style={styles.Count}>1</Text> */}
                      </View>
                    </View>
                    {touchedDebate === debate._id && (
                      <View style={styles.chatbox}>
                        <ScrollView style={styles.chats}>
                          <Text>
                            Chats to be rendered from this particular debate
                          </Text>
                        </ScrollView>

                        <View style={styles.details}>
                          <View style={styles.likes}>
                            <Text style={styles.likesValue}>Likes: </Text>
                            <Text style={styles.likesValue}>1.3k</Text>
                          </View>
                          {debate.status === 'Ongoing' && (
                            <TouchableOpacity
                              style={styles.customButton2}
                              onPress={event => handleJoinDebate()}>
                              <Text style={styles.buttonText}>
                                Join this Debate
                              </Text>
                            </TouchableOpacity>
                          )}
                        </View>
                      </View>
                    )}
                  </TouchableOpacity>
                ))
            ) : (
              <ActivityIndicator size="large" color="#D36B6B" />
            )}
          </View>
        </ScrollView>
      </View>

      <Modal
        transparent
        visible={modalVisible}
        animationType="none"
        onRequestClose={handleOutsidePress}>
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
          <View style={styles.modalOverlay}>
            <View
              style={[
                styles.modal,
                // {top: -140},
              ]}>
              <Text style={styles.Id}>
                <Text style={styles.modalIdText}>Debate ID:</Text>
                <Text style={styles.modalId}>24150{selectedDebate}</Text>
                <Text style={styles.slash}> / </Text>
                <Text style={styles.modalIdText}>Posted On:</Text>
                <Text style={styles.modalId}>August 21</Text>
              </Text>
              <View style={styles.info}>
                <Image
                  source={require('../../assets/images/profile.png')}
                  style={styles.profileImageStyle}
                  alt="profile"
                />
                <Text style={styles.infoText}>
                  Mr. Fransisco{selectedDebate}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => console.log('Request to Debate')}>
                <Text style={styles.buttonText}>Request to Debate</Text>
              </TouchableOpacity>
              <Text style={styles.disclaimer}>
                You would be the the opposition team lead{' '}
                <Text style={styles.Team}>-Team Red</Text>
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal transparent visible={modal2Visible} animationType="none">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => setModal2Visible(false)}>
              <Text style={styles.crossText}>X</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.debateBox}
              value={debatetopic}
              onChangeText={setDebateTopic}
              placeholder="Enter Debate Topic"
            />
            <TouchableOpacity style={styles.customButton} onPress={addDebate}>
              <Text style={styles.buttonText}>Add this Debate topic</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal
        transparent
        visible={modal3Visible}
        animationType="none"
        onRequestClose={() => setModal3Visible(false)} // Handle Android back button
      >
        <TouchableWithoutFeedback onPress={() => setModal3Visible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.modal3}>
                <Text style={styles.Id}>
                  <Text style={styles.modalIdText}>Debate ID:</Text>
                  <Text style={styles.modalId}>24150{selectedDebate}</Text>
                  <Text style={styles.slash}> / </Text>
                  <Text style={styles.modalIdText}>Posted On:</Text>
                  <Text style={styles.modalId}>August 21</Text>
                </Text>
                <Text style={styles.topic}>
                  All people should have Universal Basic Income.
                </Text>
                <View style={styles.players}>
                  <View style={styles.teams}>
                    <Image
                      source={require('../../assets/images/blue.png')}
                      style={{width: 24, height: 24}}
                      alt="profiles"
                    />
                    <Image
                      source={require('../../assets/images/blue.png')}
                      style={{width: 24, height: 24}}
                      alt="profiles"
                    />
                    <Text style={styles.Count}>+1</Text>
                  </View>
                  <View style={styles.vs}>
                    <Text style={styles.vsL}>V</Text>
                    <Text style={styles.slash}>/</Text>
                    <Text style={styles.vsL}>S</Text>
                  </View>
                  <View style={styles.teams}>
                    <Image
                      source={require('../../assets/images/red.png')}
                      style={{width: 24, height: 24}}
                      alt="profiles"
                    />
                    <Image
                      source={require('../../assets/images/red.png')}
                      style={{width: 24, height: 24}}
                      alt="profiles"
                    />
                    <Text style={styles.Count}>+0</Text>
                  </View>
                </View>
                <View style={styles.Buts}>
                  <TouchableOpacity
                    style={styles.customButton3}
                    onPress={() => console.log('Join Blue')}>
                    <Text style={styles.buttonText}>Req to join Blue</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.customButton3}
                    onPress={() => console.log('Join Red')}>
                    <Text style={styles.buttonText}>Req to join Red</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.fa}>
                  <Text style={styles.favour}>In Favour</Text>
                  <Text style={styles.against}>Against</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  profileImageStyle: {
    width: 50,
    height: 50,
  },
  up: {
    marginVertical: 12,
    gap: 5,
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
  add: {
    width: 50,
    height: 50,
    backgroundColor: '#242445',
    borderRadius: 30,
    textAlign: 'center',
    paddingTop: 6,
    fontSize: 30,
    color: '#fff',
    alignSelf: 'flex-end',
    marginRight: 6,
    marginTop: 4,
  },
  rooms: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 20,
    gap: 20,
    width: '100%',
    // paddingHorizontal: 24
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    color: '#000',
    alignItems: 'center',
  },
  switches: {
    flexDirection: 'row',
    width: screenWidth * 0.8,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    height: 50,
    alignItems: 'center',
  },
  button: {
    color: '#747474',
    padding: 10,
    borderRadius: 5,
    fontSize: 14,
    fontWeight: '600',
  },
  activeButton: {
    color: '#D36B6B',
  },
  debatewrap: {
    // flexDirection: 'column',
    gap: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  debates: {
    width: screenWidth * 0.9,
    flexDirection: 'column',
    // gap: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
    // marginTop: 30,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    alignItems: 'flex-start',
  },
  debateTopic: {
    color: '#747474',
    fontSize: 16,
    fontWeight: '600',
    width: '92%',
  },
  notification: {
    width: 14,
    height: 14,
    backgroundColor: '#BFBFBF',
  },
  conclusion: {
    color: '#C4C4C4',
    fontSize: 16,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    flexDirection: 'row',
    gap: 3,
    alignItems: 'flex-end',
  },
  number: {
    fontSize: 32,
    fontWeight: '600',
    color: '#5785A0',
    lineHeight: 32,
  },
  days: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5785A0',
    marginBottom: 4,
  },
  result: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D36B6B',
    marginBottom: 4,
  },
  slash: {
    fontSize: 20,
    fontWeight: '600',
    color: '#D36B6B',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  Count: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#242445',
    color: '#fff',
    alignSelf: 'center',
    textAlign: 'center',
    paddingTop: 3,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    height: 240,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 12,
  },
  Id: {
    flexDirection: 'row',
    fontWeight: '600',
  },
  modalIdText: {fontSize: 14, color: '#242445', paddingRight: 2},
  modalId: {fontSize: 16, color: '#D36B6B'},
  mid: {
    color: '#747474',
    fontSize: 14,
    fontWeight: '600',
  },
  info: {
    flexDirection: 'column',
    gap: 4,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#242445',
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
  debateBox: {
    width: 180,
    height: 80,
    borderColor: '#D36B6B',
    borderWidth: 1,
    borderRadius: 10,
    fontSize: 14,
    fontWeight: '500',
    color: '#747474',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  crossButton: {
    position: 'absolute',
    top: 10,
    right: 20,
  },
  crossText: {
    fontSize: 24,
    color: 'gray',
    fontWeight: 'semibold',
  },
  disclaimer: {
    fontSize: 14,
    color: 'gray',
    fontWeight: 'semibold',
    marginTop: -10,
  },
  Team: {fontSize: 14, color: '#D36B6B', fontWeight: 'bold'},
  touchedText: {
    color: '#D36B6B',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 10,
  },
  chatbox: {
    flexDirection: 'column',
    height: 200,
  },
  chats: {
    backgroundColor: '#E3E3E3',
    borderRadius: 10,
    padding: 8,
    flexDirection: 'column',
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  likes: {
    flexDirection: 'row',
    gap: 2,
    color: '#707070',
    paddingHorizontal: 4,
    paddingTop: 10,
  },
  likesValue: {
    color: '#707070',
    fontSize: 14,
    fontWeight: '600',
  },
  customButton2: {
    width: '50%',
    marginTop: 4,
    paddingVertical: 12,
    backgroundColor: '#11BB11',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  customButton3: {
    width: '45%',
    marginTop: 4,
    paddingVertical: 12,
    backgroundColor: '#11BB11',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  Buts: {
    flexDirection: 'row',
    gap: 8,
  },
  topic: {
    color: '#5785A0',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: -10,
  },
  players: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    paddingHorizontal: 4,
    gap: 20,
    marginVertical: 6,
  },
  teams: {
    flexDirection: 'row',
    gap: 2,
  },
  vs: {
    flexDirection: 'row',
    gap: 0,
  },
  vsL: {
    fontSize: 14,
    fontWeight: '600',
    color: '#5785A0',
    lineHeight: 30,
  },
  fa: {
    flexDirection: 'row',
    gap: 40,
    marginTop: -10,
  },
  favour: {
    color: '#242445',
    fontSize: 14,
    fontWeight: '500',
    width: '50%',
    textAlign: 'right',
  },
  against: {
    color: '#242445',
    fontSize: 14,
    fontWeight: '500',
    width: '50%',
    textAlign: 'left',
  },
  modal3: {
    width: '80%',
    // height: 240,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 24,
    gap: 12,
  },
});
