/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react';
import './MovieListItem.css';

export default class MovieListItem extends Component {
  render() {
    const { image, title, date, description } = this.props;
    return (
      <div className="movie-list__item item">
        <img src={image} alt="movie_image" />
        <div className="movie-list__item-right">
          <h1 className="item__title">{title}</h1>
          <p className="item__data">{date} </p>
          <div>
            <button type="button" className="item__genre">
              Action
            </button>
            <button type="button" className="item__genre">
              Drama
            </button>
          </div>
          <p className="item__description">{description}</p>
        </div>
      </div>
    );
  }
}
