import './MovieList.css';

import format from 'date-fns/format';
import { Alert } from 'antd';

import cutText from '../../Handlers/CutText';
import MovieListItem from '../MovieListItem/MovieListItem';
import { transformDate } from '../../Handlers/transformDate';

import poster from './poster.jpeg';

function MovieList({ movies }) {
  if (movies.length < 1) {
    return <Alert className="error" message="not found" showIcon />;
  }
  const elements = movies.map((el) => {
    const newEl = transformDate(el);
    const { movieId, posterPath, originalTitle, releaseDate, overview, voteAverage, genreIds, ratingStar } = newEl;

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
      <MovieListItem
        key={movieId}
        image={posterMovie}
        title={originalTitle}
        date={dateFns}
        description={cutDescription}
        voteAverage={voteAverage}
        genreIds={genreIds}
        ratingStar={ratingStar}
        movieId={movieId}
      />
    );
  });
  return <section className="movie-list">{elements}</section>;
}
export default MovieList;
