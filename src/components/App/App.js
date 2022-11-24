/* eslint-disable react/destructuring-assignment */
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
import ArrModify from '../../Handlers/ArrModify';

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
    this.onLoadAll();
    this.onLoadGenres();
  }

  onSearchMovies = (term) => {
    if (term.length >= 1) {
      this.setState({ query: term, loading: true, error: false });
      this.onLoadAll(term, this.state.currentPage, this.state.filter);
    } else {
      const world = 'return';
      this.setState({ query: world, loading: true, error: false });
      this.onLoadAll(world, this.state.currentPage, this.state.filter);
    }
  };

  onPageChange = (page) => {
    this.setState({ currentPage: page, loading: true, error: false });
    this.onLoadAll(this.state.query, page, this.state.filter);
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  onFilterChange = (name) => {
    if (name === 'search') {
      this.onLoadAll('return', 1, 'search');
      this.setState({ currentPage: 1 });
    } else {
      this.onLoadAll('return', 1, 'rated');
    }
    this.setState({ loading: true, filter: name, currentPage: 1 });
  };

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

  async onLoadAll(query = 'return', page = 1, filter = 'search') {
    try {
      let sessionId = localStorage.getItem('guestSessionId');
      if (!sessionId) {
        const { guestSessionId } = await this.movieDbService.getSessionMovie();
        await localStorage.setItem('guestSessionId', guestSessionId);
        sessionId = guestSessionId;
      }
      const res = await this.movieDbService.getSearchMovie(query, page);
      const ratedRes = await this.movieDbService.getMovieRating(sessionId, page);
      const newArr = ArrModify(res, ratedRes);
      this.setState({
        movies: filter === 'search' ? newArr : ratedRes.results,
        loading: false,
        totalPages: filter === 'search' ? res.total_pages : ratedRes.total_pages,
      });
    } catch (err) {
      throw new Error(err);
    }
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
        onChange={this.onPageChange}
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
