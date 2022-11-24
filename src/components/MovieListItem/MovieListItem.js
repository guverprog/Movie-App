import './MovieListItem.css';
import format from 'date-fns/format';

import { GenresConsumer } from '../Genres-context/Genres-context';
import RateMovie from '../RateMovie';
import poster from '../MovieList/poster.jpeg';
import cutText from '../../Handlers/CutText';

function MovieListItem(props) {
  const { movieId, releaseDate, posterPath, overview, ...itemProps } = props;
  let posterMovie = `https://image.tmdb.org/t/p/w500/${posterPath}`;
  if (!posterPath) {
    posterMovie = poster;
  }
  let dateFns = 'unknown date';
  if (releaseDate) {
    dateFns = format(new Date(releaseDate), 'MMMM d, yyyy');
  }
  const cutDescription = cutText(overview, 80);
  const elementAverageRating = (ratingAverage) => {
    if (ratingAverage > 7) {
      return 'max';
    }
    if (ratingAverage > 5) {
      return 'norm';
    }

    if (ratingAverage > 3) {
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
      <img src={posterMovie} alt="movie_image" />
      <div className="movie-list__item-right">
        <div className="item__header">
          <h1 className="item__title">{itemProps.originalTitle}</h1>
          <div className={`item__average-vote ${elementAverageRating(itemProps.voteAverage)}`}>
            {itemProps.voteAverage}
          </div>
        </div>
        <p className="item__data">{dateFns} </p>
        <div>
          <GenresConsumer>{(genres) => concatIds(genres, itemProps.genreIds)}</GenresConsumer>
        </div>
        <p className="item__description">{cutDescription}</p>
        <RateMovie ratingStar={itemProps.rating} movieId={movieId} />
      </div>
    </div>
  );
}
export default MovieListItem;
