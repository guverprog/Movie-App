import { Rate } from 'antd';
import { Component } from 'react';

import './RateMovie.css';
import MovieDbService from '../../services/MoviDbService';

export default class RateMovie extends Component {
  movieDbService = new MovieDbService();

  constructor(props) {
    super(props);
    this.movieDbService = new MovieDbService();

    this.state = {
      rateStar: props.ratingStar,
    };
    this.setRated = this.setRated.bind(this);
  }

  setRated(value) {
    const { movieId } = this.props;
    this.setState({ rateStar: value });
    const guestSessionId = localStorage.getItem('guestSessionId');
    this.movieDbService.setMovieRating(value, movieId, guestSessionId);
  }

  render() {
    const { rateStar } = this.state;
    return <Rate className="rate" count={10} onChange={this.setRated} value={rateStar} />;
  }
}
