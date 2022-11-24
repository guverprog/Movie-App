import { transformSession } from '../Handlers/transformDate';

export default class MovieDbService {
  apiBase = 'https://api.themoviedb.org/3';

  apiKey = '5aa8374939155cc72394c70a539b43f9';

  async getResource(url) {
    try {
      const res = await fetch(`${this.apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${this.apiBase}${url}`);
      }
      return await res.json();
    } catch (err) {
      throw new Error(err);
    }
  }

  async PostRate(url, metod, data) {
    try {
      const res = await fetch(`${this.apiBase}${url}`, {
        method: metod,
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error(`Could not fetch ${this.apiBase}${url}`);
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  async getSearchMovie(query, page) {
    const res = await this.getResource(
      `/search/movie?api_key=${this.apiKey}&language=en-US&query=${query}&page=${page}&include_adult=false`
    );
    return res;
  }

  async getGenresMovie() {
    const res = await this.getResource(`/genre/movie/list?api_key=${this.apiKey}&language=en-US`);
    return res;
  }

  async getSessionMovie() {
    const res = await this.getResource(`/authentication/guest_session/new?api_key=${this.apiKey}`);
    return transformSession(res);
  }

  async getMovieRating(guestSessionId, page) {
    const res = await this.getResource(
      `/guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&language=en-US&page=${page}&sort_by=created_at.asc`
    );
    return res;
  }

  async setMovieRating(value, movieId, guestSessionId) {
    await this.PostRate(`/movie/${movieId}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`, 'POST', {
      value,
    });
  }
}
