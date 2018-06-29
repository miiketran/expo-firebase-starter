import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { TestComponent } from './../components/AppComponents';
import * as firebase from 'firebase';
import { Permissions, Notifications } from 'expo';
import ApiKeys from '../constants/ApiKeys';

// console.log(personRef);
export default class TestScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    // this.state = {
    //   animals: [],
    //   newAnimalName: '',
    //   loading: false,
    // };
  }
  componentDidMount() {
    // animalRef.on('value', childSnapshot => {
    //   const animals = [];
    //   childSnapshot.forEach(doc => {
    //     animals.push({
    //       key: doc.key,
    //       animalName: doc.toJSON().animalName,
    //     });
    //   });
    // });
    this.registerForPushNotifications();
  }
  // onPressAdd = () => {
  //   if (this.state.newAnimalName.trim() === '') {
  //     alert('animal name is blank');
  //     return;
  //   }
  //   animalRef.push({ animalName: this.state.newAnimalName });
  // };
  registerForPushNotifications = async () => {
    // CHeck for existing permissions...
    const { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = status;

    // If no existing permission, ask user for permission...
    if (status !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // If no permission, exit the function...
    if (finalStatus !== 'granted') {
      return;
    }
    // Get push notification token...
    let token = await Notification.getExpoPushTokenAsync();
    console.log(token);
    console.log('hi');
  };
  render() {
    return (
      <View style={{ paddingTop: 30 }}>
        <Text>Hello</Text>
        <TestComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  testScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
