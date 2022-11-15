function transformDate(movie) {
  return {
    id: movie.id,
    originalTitle: movie.original_title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
    overview: movie.overview,
    totalPages: movie.total_pages,
  };
}
export default transformDate;
