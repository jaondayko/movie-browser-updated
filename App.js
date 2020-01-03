import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import resultsScreen from './Screens/movieLogic/resultsScreen';
import findMovies from './Screens/searchLogic/findMovies';
import MovieSelected from './Screens/movieLogic/movieSelect';

const AppNavigator = createStackNavigator({
  Home: { screen: findMovies },
  Results: { screen: resultsScreen },
  MovieSelected: { screen: MovieSelected },
});
const AppContainer = createAppContainer(AppNavigator);

class App extends Component {
  render() {
    return (
      <View>
        <AppNavigator />
      </View>
    );
  }
}

export default AppContainer;
