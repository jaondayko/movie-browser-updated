import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { getAll } from '../../API/getMovies';
import { movieSelected } from './movieSelect';
import HomeScreen from '../searchLogic/findMovies';

//This screen shows all the movies returned in a FlatList

const Row = props => (
  <TouchableOpacity onPress={() => props.onSelect(props.id, props.Title)}>
    <Image source={{ uri: props.Poster }} />
    <View>
      <Text>{props.Title}</Text>
      <Text>
        {props.Year} ({props.Type})
      </Text>
    </View>
  </TouchableOpacity>
);

Row.propTypes = {
  id: PropTypes.string,
  Title: PropTypes.string,
  Year: PropTypes.string,
  Type: PropTypes.string,
  Poster: PropTypes.string,
};

const renderMovie = onSelect => ({ item }) => <Row onSelect={onSelect} {...item} />
const getKey = ({id}) => id
const maxResults = 10

export default class resultsScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }),
  };
  state = {
    movieName: this.props.navigation.state.params.movieName,
    results: null,
    totalResults: null,
    pages: 0,
    pagesLoaded: 0,
  };

  componentDidMount(){
    if (this.state.movieName.trim() && this.state.movieName.length > 1) {
      this.submitSearch(1)
    }
  }

  submitSearch(page) {
    console.log('submitSearch Movie:', this.state.movieName)
    getAll(this.state.movieName.trim(), page)
      .then(result => {
        if (this.state.movieName.trim() !== result.movieName.trim()) return

        if (page === 1) {
          this.setState(result);
        } else {
          this.setState(prevState =>
            prevState.movieName.trim() === result.movieName.trim()
              ? { results: [...prevState.results, ...result.results] }
              : null
          );
        }
      })
      .catch(() => this.setState({ results: null, totalResults: null }));
  }

  getMore = () => {
    if (this.state.totalResults <= maxResults * this.state.pagesLoaded) return
    
    this.submitSearch(this.state.pagesLoaded + 1)
    this.setState(prevState => ({pagesLoaded: prevState.pagesLoaded + 1}))
  }

  handleMovie = (id, title) => {
    this.props.navigation.navigate('MovieSelected', {id, title });
  };

  render() {
    return (
      <View style={{ flex: 1,}}>
        {this.state.results 
        ? (
          <FlatList
            data={this.state.results}
            renderItem={renderMovie(this.handleMovie)}
            keyExtractor={getKey}
            onEndReached={this.getMore}
          />
        ) : <Text>No Movies Returned</Text>
        }
      </View>
    );
  }
}
