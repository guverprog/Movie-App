import { Component } from 'react';
import { debounce } from 'lodash';
import './MovieSearch.css';

export default class MovieSearch extends Component {
  onSearchMovies = ({ target }) => {
    let term = target.value;
    if (term.length < 1) term = 'return';
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onSearchMovies(term);
  };

  render() {
    return (
      <input
        type="text"
        className="movie-search"
        placeholder="Type to search..."
        onChange={debounce(this.onSearchMovies, 700)}
      />
    );
  }
}
