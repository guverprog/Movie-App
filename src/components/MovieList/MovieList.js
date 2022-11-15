import './MovieList.css';

import format from 'date-fns/format';
import { Alert } from 'antd';

import cutText from '../../Handlers/CutText';
import MovieListItem from '../MovieListItem/MovieListItem';
import transformDate from '../../Handlers/transformDate';

import poster from './poster.jpeg';

function MovieList({ movies }) {
  if (movies.length < 1) {
    return <Alert className="error" message="not found" showIcon />;
  }
  const elements = movies.map((el) => {
    const newEl = transformDate(el);
    const { id, posterPath, originalTitle, releaseDate, overview } = newEl;
    let posterMovie = `https://image.tmdb.org/t/p/w500/${posterPath}`;
    if (!posterPath) {
      posterMovie = poster;
    }
    let dateFns = 'unknown date';
    if (releaseDate) {
      dateFns = format(new Date(releaseDate), 'MMMM d, yyyy');
    }
    const cutDescription = cutText(overview, 80);
    return (
      <MovieListItem key={id} image={posterMovie} title={originalTitle} date={dateFns} description={cutDescription} />
    );
  });
  return <section className="movie-list">{elements}</section>;
}
export default MovieList;
