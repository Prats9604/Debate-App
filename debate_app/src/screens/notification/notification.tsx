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
];

export default function Rooms() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText1}>Notifications</Text>
          <Text style={styles.headerText2}>WEL-COME to XYZ</Text>
        </View>
        <Image
          source={require('../../assets/images/profile.png')}
          style={{width: 50, height: 50}}
          alt="profile"
        />
      </View>
      <View style={styles.rooms}>
        <View style={styles.notifications}>
          <View style={styles.top}>
            <View style={styles.toptop}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={{width: 26, height: 26}}
                alt="profile"
              />
              <View style={styles.about}>
                <Text style={styles.about1}>Gaurav997</Text>
                <Text style={styles.about2}>Requested to join you in </Text>
              </View>
            </View>

            <Text style={styles.notText}>
              Every citizen should be mandated to perform national public
              service.
            </Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.left}>
              <Text style={styles.id}>ID - 12345</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => console.log('Request to Debate')}>
                <Text style={styles.buttonText}>Accept the request</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.notifications}>
          <View style={styles.top}>
            <View style={styles.toptop}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={{width: 26, height: 26}}
                alt="profile"
              />
              <View style={styles.about}>
                <Text style={styles.about1}>Saransh97</Text>
                <Text style={styles.about2}>
                  Accepted your request to join in
                </Text>
              </View>
            </View>

            <Text style={styles.notText}>
              Every citizen should be mandated to perform national public
              service.
            </Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.left}>
              <Text style={styles.id}>ID - 12345</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => console.log('Request to Debate')}>
                <Text style={styles.buttonText}>Go to the Room</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.notifications}>
          <View style={styles.top}>
            <View style={styles.toptop}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={{width: 26, height: 26}}
                alt="profile"
              />
              <View style={styles.about}>
                <Text style={styles.about1}>
                  24 hrs are about to complete, revert back soon otherwise
                  you&apos;ll lose
                </Text>
                {/* <Text style={styles.about2}>
                  Accepted your request to join in
                </Text> */}
              </View>
            </View>

            <Text style={styles.notText}>
              Every citizen should be mandated to perform national public
              service.
            </Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.left}>
              <Text style={styles.id}>ID - 12345</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => console.log('Request to Debate')}>
                <Text style={styles.buttonText}>Go to the Room</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.notifications}>
          <View style={styles.top}>
            <View style={styles.toptop}>
              <Image
                source={require('../../assets/images/profile.png')}
                style={{width: 26, height: 26}}
                alt="profile"
              />
              <View style={styles.about}>
                <Text style={styles.about1}>Saransh97</Text>
                <Text style={styles.about2}>lost the debate</Text>
              </View>
              <Text style={styles.back}>Backed Off</Text>
            </View>

            <Text style={styles.notText}>
              Every citizen should be mandated to perform national public
              service.
            </Text>
          </View>
          <View style={styles.bottom}>
            <View style={styles.left}>
              <Text style={styles.id}>ID - 12345</Text>
            </View>
            <View style={styles.right}>
              <TouchableOpacity
                style={styles.customButton}
                onPress={() => console.log('Request to Debate')}>
                <Text style={styles.buttonText}>Go to the Room</Text>
              </TouchableOpacity>
            </View>
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
  rooms: {
    flexDirection: 'column',
    paddingVertical: 20,
    gap: 10,
    paddingHorizontal: 24,
    backgroundColor: '#fff',
    flex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    color: '#000',
    alignItems: 'center',
  },
  notifications: {
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
    gap: 3,
  },
  notText: {
    color: '#747474',
    fontSize: 16,
    fontWeight: '600',
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'red',
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  right: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  id: {
    color: '#242445',
    fontSize: 16,
    fontWeight: '700',
  },
  leftDiv: {
    // padding: 2,
  },
  customButton: {
    width: '70%',
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
  about: {
    flexDirection: 'row',
    gap: 6,
    alignItems: 'baseline',
  },
  about1: {
    fontSize: 16,
    fontWeight: '600',
    color: '#D36B6B',
  },
  about2: {
    fontSize: 16,
    fontWeight: '400',
    color: '#A1A1A1',
  },
  toptop: {
    flexDirection: 'row',
    gap: 4,
    alignItems: 'center',
  },
  back: {
    color: '#D36B6B',
    fontWeight:"600",
    justifyContent:"flex-end",
  },
});
