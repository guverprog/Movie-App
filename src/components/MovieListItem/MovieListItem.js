/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';

import './MovieListItem.css';
import { GenresConsumer } from '../Genres-context/Genres-context';
import RateMovie from '../RateMovie';

export default class MovieListItem extends Component {
  render() {
    const { image, title, date, description, voteAverage, genreIds, ratingStar, movieId } = this.props;
    const elementAverageRating = (rating) => {
      if (rating > 7) {
        return 'max';
      }
      if (rating > 5) {
        return 'norm';
      }

      if (rating > 3) {
        return 'poor';
      }
      return 'low';
    };

    const concatIds = (genres, genreIdsList) => {
      const element = genreIdsList.map((id) => {
        const itemId = genres.filter((item) => item.id === id);
        const genre = itemId.length > 0 ? itemId[0].name : null;
        return (
          <button className="item__genre" key={id} type="button">
            {genre}
          </button>
        );
      });
      return element;
    };

    return (
      <div className="movie-list__item item">
        <img src={image} alt="movie_image" />
        <div className="movie-list__item-right">
          <div className="item__header">
            <h1 className="item__title">{title}</h1>
            <div className={`item__average-vote ${elementAverageRating(voteAverage)}`}>{voteAverage}</div>
          </div>
          <p className="item__data">{date} </p>
          <div>
            <GenresConsumer>{(genres) => concatIds(genres, genreIds)}</GenresConsumer>
          </div>
          <p className="item__description">{description}</p>
          <RateMovie ratingStar={ratingStar} movieId={movieId} />
        </div>
      </div>
    );
  }
}
