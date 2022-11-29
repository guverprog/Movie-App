import './MovieList.css';
import { Alert } from 'antd';

import MovieListItem from '../MovieListItem/MovieListItem';
import { transformDate } from '../../Handlers/transformDate';

function MovieList({ movies }) {
  if (movies.length < 1) {
    return <Alert className="error" message="not found" showIcon />;
  }
  const elements = movies.map((el) => {
    const newEl = transformDate(el);
    const { movieId, ...itemProps } = newEl;
    return <MovieListItem key={movieId} {...itemProps} movieId={movieId} />;
  });
  return <section className="movie-list">{elements}</section>;
}
export default MovieList;
