import { Component } from 'react';
import { Alert, Spin, Pagination } from 'antd';
import { Offline, Online } from 'react-detect-offline';
import 'antd/dist/antd.min.css';

import MovieList from '../MovieList';
import MovieDbService from '../../services/MoviDbService';
import './App.css';
import MovieSearch from '../MovieSearch';

export default class App extends Component {
  movieDbService = new MovieDbService();

  state = {
    movies: [],
    loading: true,
    error: false,
    totalPages: 1,
    query: 'return',
    currentPage: 1,
  };

  componentDidMount() {
    this.onLoadMovies();
  }

  componentDidUpdate(_, prevState) {
    const { currentPage } = this.state;
    if (prevState.currentPages !== currentPage) {
      this.onLoadMovies();
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

  render() {
    const { movies, loading, error, totalPages, currentPage } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <Alert message="Error" type="error" showIcon /> : null;
    const spinner = loading ? <Spin className="spinner" size="large" /> : null;
    const content = hasData ? <MovieList movies={movies} /> : null;
    return (
      <section className="container">
        <Online>
          <MovieSearch onSearchMovies={this.onSearchMovies} />
          <main className="main">
            {errorMessage}
            {spinner}
            {content}
          </main>
          <Pagination
            className="pagination"
            showSizeChanger={false}
            current={currentPage}
            total={totalPages * 10}
            onChange={this.onCurrentPage}
          />
        </Online>
        <Offline>
          <h1 className="offline">You are not online!</h1>
        </Offline>
      </section>
    );
  }
}
