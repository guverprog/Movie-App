import { Component } from 'react';
import { Alert, Spin, Pagination } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import 'antd/dist/antd.min.css';

import MovieList from '../MovieList';
import MovieDbService from '../../services/MoviDbService';
import './App.css';
import MovieSearch from '../MovieSearch';
import { GenresProvider } from '../Genres-context/Genres-context';
import MovieHeader from '../MovieHeader';

export default class App extends Component {
  movieDbService = new MovieDbService();

  state = {
    movies: [],
    loading: true,
    error: false,
    totalPages: 1,
    query: 'return',
    currentPage: 1,
    genres: [],
    filter: 'search',
  };

  componentDidMount() {
    this.onLoadMovies();
    this.onLoadGenres();
    this.onLoadSessionId();
  }

  componentDidUpdate(_, prevState) {
    const { currentPage, query, filter } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      if (filter === 'search') this.onLoadMovies();
      else this.onGetRated();
    }
  }

  onSearchMovies = (term) => {
    this.setState({ query: term, loading: true, error: false });
  };

  onCurrentPage = (page) => {
    this.setState({ loading: true, error: false, currentPage: page });
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onFilterChange = (name) => {
    if (name === 'search') {
      this.onLoadMovies();
      this.setState({ currentPage: 1 });
    } else {
      this.onGetRated();
    }
    this.setState({ loading: true, filter: name });
  };

  onGetRated() {
    const guestSessionId = localStorage.getItem('guestSessionId');
    const { currentPage } = this.state;
    this.movieDbService
      .getMovieRating(guestSessionId, currentPage)
      .then((res) => {
        console.log(res);
        this.setState({
          movies: res.results,
          loading: false,
          totalPages: res.total_pages,
        });
      })
      .catch(this.onError);
  }

  onLoadSessionId() {
    this.movieDbService
      .getSessionMovie()
      .then((res) => {
        console.log(res);
        localStorage.setItem('guestSessionId', res.guestSessionId);
      })
      .catch(this.onError);
  }

  onLoadMovies() {
    const { query, currentPage } = this.state;
    if (query.length >= 1) {
      this.movieDbService
        .getSearchMovie(query, currentPage)
        .then((res) => {
          this.setState({
            movies: res.results,
            loading: false,
            totalPages: res.total_pages,
          });
        })
        .catch(this.onError);
    } else {
      this.setState({ query: 'return' });
    }
  }

  onLoadGenres() {
    this.movieDbService
      .getGenresMovie()
      .then((res) => {
        this.setState({
          genres: res.genres,
        });
      })
      .catch(this.onError);
  }

  render() {
    const { movies, loading, error, totalPages, currentPage, genres, filter } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <Alert className="error" message="Error" type="error" showIcon /> : null;
    const spinner = loading ? <Spin className="spinner" size="large" /> : null;
    const content = hasData ? <MovieList movies={movies} /> : null;
    const search = filter === 'search' ? <MovieSearch onSearchMovies={this.onSearchMovies} /> : null;
    const pagination = (
      <Pagination
        className="pagination"
        showSizeChanger={false}
        current={currentPage}
        total={totalPages * 10}
        onChange={this.onCurrentPage}
      />
    );
    return (
      <GenresProvider value={genres}>
        <section className="container">
          <Online>
            <MovieHeader onFilterChange={this.onFilterChange} />
            {search}
            <main className="main">
              {errorMessage}
              {spinner}
              {content}
            </main>
            {pagination}
          </Online>
          <Offline>
            <h1 className="offline">You are not online!</h1>
          </Offline>
        </section>
      </GenresProvider>
    );
  }
}
