import React from 'react';
import * as firebase from 'firebase';
// Initial State
const initialState = {
  favoriteAnimal: 'duck',
  personData: {},
};

//
// Context...
//
export const AppContext = React.createContext();
export const AppConsumer = AppContext.Consumer;

export class AppProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  setFavoriteAnimal = text => {
    this.setState({ favoriteAnimal: text });
  };
  setPersonData = personData => {
    this.setState({ personData: personData });
  };
  watchPersonData = () => {
    firebase
      .database()
      .ref('person')
      .on(
        'value',
        function(snapshot) {
          var personData = snapshot.val();
          this.setPersonData(personData);
        }.bind(this),
        function(error) {},
      );
  };
  render() {
    return (
      <AppContext.Provider
        value={{
          favoriteAnimal: this.state.favoriteAnimal,
          personData: this.state.personData,
          setFavoriteAnimal: this.setFavoriteAnimal,
          watchPersonData: this.watchPersonData,
        }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}
