import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
// import { createAppContainer } from 'react-navigation';
// import { createStackNavigator } from 'react-navigation-stack';
import movieQuery  from '../../API/getMovies';
import resultsScreen from '../movieLogic/resultsScreen';
import movieSelected from '../movieLogic/movieSelect';

const Input = props => <TextInput {...props}/>

//User types into the bar for a movie

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieName: '',
      totalPages: 0,
    };
    this.userType = this.userType.bind(this);
  }

  userType = movieName => {
    this.setState({movieName, totalPages: 1})
  }

  render() {
    const goToDetails = x => this.props.navigation.navigate('Results', {movieName: this.state.movieName});
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Movie Browsing Search{'\n'}{'\n'}</Text>
        <Input
          placeholder="Tap here to enter movie"
          style={{
            padding: 8,
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'black',
          }}
          onChangeText={this.userType}
          value={this.state.movieName}
        />
        <Text>{'\n'}</Text>
        <Button
          title="Get Movie"
          onPress={goToDetails}
        />
      </View>
    );
  }
}