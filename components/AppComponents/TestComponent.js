import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { AppConsumer } from '../../context/app-context';
import * as firebase from 'firebase';
import ApiKeys from '../../constants/ApiKeys';

firebase.initializeApp(ApiKeys.FirebaseConfig);

const rootRef = firebase.database().ref();
// const personRef = firebase.database().ref('person');
const animalRef = rootRef.child('animals');

export default class TestComponent extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { favoriteAnimal: '' };
    this.state = {
      favoriteAnimal: '',
      animals: [],
      newAnimalName: '',
      loading: false,
    };
  }
  componentDidMount() {
    this.context.watchPersonData();
    animalRef.on('value', childSnapshot => {
      console.log('animal changed');
      console.log(childSnapshot);
      const animals = [];
      childSnapshot.forEach(doc => {
        animals.push({
          key: doc.key,
          animalName: doc.toJSON().animalName,
        });
        this.setState({
          animals: animals.sort((a, b) => {
            return a.animalName > b.animalName;
          }),
        });
      });
      console.log(this.state.animals);
    });
  }
  onPressAdd = () => {
    if (this.state.newAnimalName.trim() === '') {
      alert('animal name is blank');
      return;
    }
    console.log('got ehre');
    animalRef.push({ animalName: this.state.newAnimalName });
  };
  render() {
    return (
      <AppConsumer>
        {context => (
          <View
            style={{ paddingTop: 50 }}
            ref={ref => {
              this.context = context;
            }}
          >
            <Text>Test Component</Text>;
            <Text>Favorite Animal: {context.favoriteAnimal}</Text>
            <TextInput
              style={{ borderWidth: 1, height: 40, width: 200 }}
              value={this.state.favoriteAnimal}
              placeholder="Enter favorite animal"
              onChangeText={text => {
                this.setState({ favoriteAnimal: text });
              }}
            />
            <Button
              title="Set Favorite Animal"
              onPress={() => {
                context.setFavoriteAnimal(this.state.favoriteAnimal);
              }}
            />
            <Text>First Name: {context.personData.firstName}</Text>
            <Text>Last Name: {context.personData.lastName}</Text>
            <Text>Database Data</Text>
            <FlatList
              data={this.state.animals}
              renderItem={({ item, index }) => {
                return (
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      margin: 10,
                      color: '#ff0000',
                    }}
                  >
                    {item.animalName}
                  </Text>
                );
              }}
            />
            <TextInput
              style={{ borderWidth: 1, height: 40, width: 200 }}
              value={this.state.newAnimalName}
              placeholder="Enter animal Name"
              onChangeText={text => {
                this.setState({ newAnimalName: text });
              }}
            />
            <TouchableHighlight
              style={{ marginRight: 10 }}
              underlayColor="tomato"
              onPress={this.onPressAdd}
            >
              <Text>Add!</Text>
            </TouchableHighlight>
          </View>
        )}
      </AppConsumer>
    );
  }
}
