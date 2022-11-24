function transformDate(movie) {
  return {
    movieId: movie.id,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
    overview: movie.overview,
    totalPages: movie.total_pages,
    voteAverage: movie.vote_average,
    genreIds: movie.genre_ids,
    rating: movie.rating,
  };
}
function transformSession(session) {
  return {
    guestSessionId: session.guest_session_id,
  };
}
export { transformDate, transformSession };
