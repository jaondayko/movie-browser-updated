import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  Image,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types'
import resultsScreen from './resultsScreen';

//This screen shows the selected movies details!

const Row = props => <View>{props.children}</View>
const MovieSelected = props => {
  return (
    <ScrollView>
      <Row>
        <Text>{props.Title}</Text>
        <Text>{props.Year}</Text>
        <Text>{props.Plot}</Text>
      </Row>
      <Image source={{uri: props.Poster}}/>
    </ScrollView>
  )
}

MovieSelected.propTypes = {
  Title: PropTypes.string,
  Year: PropTypes.string,
  Director: PropTypes.string,
  Plot: PropTypes.string,
}

export default MovieSelected 
