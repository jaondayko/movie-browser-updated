import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import PropTypes from 'prop-types'
import MovieSelected from './movieSelect'
import movieQuery from '../../API/getMovies'

export default class MovieWrap extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.shape({
          id: PropTypes.string,
          title: PropTypes.string,
        })
      }),
    }),
  }

  static navigationOptions = ({ navigation }) => ({
    title: navigation.state.params.title,
  })

  state = {
    movie: null,
    id: this.props.navigation.getParam('id', null),
  }

  componentDidMount() {
    movieQuery(this.state.id).then(movie=> this.setState({movie}))
  }

  render() {
    if (!this.state.id) return <Text>There was an error</Text>
    return this.state.movie
      ? <MovieSelected {...this.state.movie} />
      : <Text>Grabbing info, please wait</Text>
  }
}