import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';

const screenWidth = Dimensions.get('window').width;
const debatesConfig = [
  {
    id: 1,
    status: 'Ongoing',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion: '',
    notification: 'green',
    days: 8,
    result: '',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 2,
    status: 'Completed',
    topic: 'All people should have Universal Basic Income.',
    conclusion:
      'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
    notification: '',
    days: 9,
    result: 'Won',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
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
    notification: 'green',
    days: 8,
    result: '',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 4,
    status: 'Completed',
    topic: 'All people should have Universal Basic Income.',
    conclusion:
      'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
    notification: '',
    days: 9,
    result: 'Lost',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
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
    notification: '',
    days: 4,
    result: '',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 6,
    status: 'Completed',
    topic: 'All people should have Universal Basic Income.',
    conclusion:
      'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
    notification: '',
    days: 6,
    result: 'Lost',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 7,
    status: 'Ongoing',
    topic:
      'Every citizen should be mandated to perform national public service.',
    conclusion: '',
    notification: '',
    days: 5,
    result: '',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  {
    id: 8,
    status: 'Completed',
    topic: 'All people should have Universal Basic Income.',
    conclusion:
      'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
    notification: '',
    days: 10,
    result: 'Won',
    companionsLeft: [
      require('../../assets/images/red.png'),
      require('../../assets/images/red.png'),
    ],
    companionsRight: [
      require('../../assets/images/blue.png'),
      require('../../assets/images/blue.png'),
    ],
    countLeft: '+1',
    countRight: '+3',
  },
  // {
  //   id: 9,
  //   status: 'Ongoing',
  //   topic:
  //     'Every citizen should be mandated to perform national public service.',
  //   conclusion: '',
  //   notification: '',
  //   days: 8,
  //   result: '',
  //   companionsLeft: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   companionsRight: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   countLeft: '+1',
  //   countRight: '+3',
  // },
  // {
  //   id: 10,
  //   status: 'Completed',
  //   topic: 'All people should have Universal Basic Income.',
  //   conclusion:
  //     'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
  //   notification: '',
  //   days: 9,
  //   result: 'Won',
  //   companionsLeft: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   companionsRight: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   countLeft: '+1',
  //   countRight: '+3',
  // },
  // {
  //   id: 11,
  //   status: 'Ongoing',
  //   topic:
  //     'Every citizen should be mandated to perform national public service.',
  //   conclusion: '',
  //   notification: '',
  //   days: 6,
  //   result: '',
  //   companionsLeft: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   companionsRight: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   countLeft: '+1',
  //   countRight: '+3',
  // },
  // {
  //   id: 12,
  //   status: 'Completed',
  //   topic: 'All people should have Universal Basic Income.',
  //   conclusion:
  //     'Frederick Douglass was, as we have seen, a pioneer in American education, proving that education was a major force for social change with regard to slavery.',
  //   notification: '',
  //   days: 12,
  //   result: 'Won',
  //   companionsLeft: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   companionsRight: [
  //     require('../../assets/images/profile.png'),
  //     require('../../assets/images/profile.png'),
  //   ],
  //   countLeft: '+1',
  //   countRight: '+3',
  // },
];

export default function Rooms() {
  const [filter, setFilter] = useState('Ongoing'); // State to manage filter
  const [expandedDebates, setExpandedDebates] = useState<Set<number>>(
    new Set(),
  );

  const toggleTextExpansion = (debateId: number) => {
    setExpandedDebates(prev => {
      const newExpandedDebates = new Set(prev);
      if (newExpandedDebates.has(debateId)) {
        newExpandedDebates.delete(debateId);
      } else {
        newExpandedDebates.add(debateId);
      }
      return newExpandedDebates;
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText1}>Your Debates</Text>
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
      <View style={styles.rooms}>
        <View style={styles.switches}>
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
            .filter(debate => debate.status === filter)
            .map(debate => (
              <View key={debate.id} style={styles.debates}>
                <View style={styles.top}>
                  <Text style={styles.debateTopic}>{debate.topic}</Text>
                  <View
                    style={[
                      styles.notification,
                      {backgroundColor: debate.notification},
                    ]}></View>
                </View>

                {debate.status === 'Completed' && (
                  <TouchableOpacity
                    onPress={() => toggleTextExpansion(debate.id)}>
                    <Text
                      style={styles.conclusion}
                      numberOfLines={
                        expandedDebates.has(debate.id) ? undefined : 1
                      }
                      ellipsizeMode="tail">
                      {debate.conclusion}
                    </Text>
                  </TouchableOpacity>
                )}

                <View style={styles.bottom}>
                  <View style={styles.left}>
                    {debate.companionsLeft.map((img, index) => (
                      <Image
                        key={index}
                        source={img}
                        style={{width: 26, height: 26}}
                        alt="profile"
                      />
                    ))}
                    <Text style={styles.Count}>{debate.countLeft}</Text>
                  </View>
                  <View style={styles.duration}>
                    <Text style={styles.number}>{debate.days}</Text>
                    <Text style={styles.days}>Days</Text>

                    {debate.status === 'Completed' && (
                      <Text style={styles.slash}>/</Text>
                    )}
                    {debate.status === 'Completed' && (
                      <Text style={styles.result}>{debate.result}</Text>
                    )}
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
    width: 250,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    // paddingVertical: 4,
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
    borderRadius: 8,
    backgroundColor: 'green',
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
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
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
    fontSize: 28,
    color: '#242445',
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
});