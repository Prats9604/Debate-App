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
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';

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
            style={styles.profileImageStyle}
            alt="profile"
          />
        </View>
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
        <View style={styles.debatewrap}>
          {debatesConfig
            .filter(debate => filter === '' || debate.status === filter)
            .map(debate => (
              <View key={debate.id} style={styles.debates}>
                <View style={styles.top}>
                  <Text style={styles.debateTopic}>{debate.topic}</Text>
                  <View style={styles.notification}></View>
                </View>

                {debate.status === 'Completed' && (
                  <TouchableOpacity
                    onPress={() => toggleTextExpansion(debate.id)}>
                    <Text
                      style={styles.conclusion}
                      numberOfLines={expandedDebates[debate.id] ? undefined : 1}
                      ellipsizeMode="tail">
                      {debate.conclusion}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.bottom}>
                  <View style={styles.duration}>
                    <Text style={styles.number}>{debate.days}</Text>
                    <Text style={styles.days}>Days</Text>
                    <Text style={styles.slash}>/</Text>
                    <Text style={styles.result}>{debate.status}</Text>
                  </View>
                  <View style={styles.right}>
                    {debate.companionsRight.map((img, index) => (
                      <Image
                        key={index}
                        source={img}
                        style={{width: 26, height: 26}}
                        alt="profile"
                      />
                    ))}
                    <Text style={styles.Count}>{debate.countRight}</Text>
                  </View>
                </View>
              </View>
            ))}
        </View>
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
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Modal transparent visible={modal2Visible} animationType="none">
        <View style={styles.modalOverlay}>
          <View style={styles.modal}>
            <TouchableOpacity
              style={styles.crossButton}
              onPress={() => setModal2Visible(false)}
            >
              <Text style={styles.crossText}>X</Text>
            </TouchableOpacity>

            <View style={styles.debateBox}></View>
            <TouchableOpacity
              style={styles.customButton}
              onPress={() => console.log('Request to Debate')}>
              <Text style={styles.buttonText}>Add this Debate topic</Text>
            </TouchableOpacity>
          </View>
        </View>
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
    gap: 10,
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
  },
  rooms: {
    flexDirection: 'column',
    paddingVertical: 20,
    gap: 20,
    paddingHorizontal: 24,
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
    flexDirection: 'column',
    gap: 10,
  },
  debates: {
    width: screenWidth * 0.9,
    flexDirection: 'column',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 16,
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
    width: 280,
    height: 200,
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
    marginTop:10,
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
});
