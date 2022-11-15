export default class MovieDbService {
  apiBase = 'https://api.themoviedb.org/3';

  apiKey = '5aa8374939155cc72394c70a539b43f9';

  async getResource(url) {
    try {
      const res = await fetch(`${this.apiBase}${url}`);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}`);
      }
      return await res.json();
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
}
