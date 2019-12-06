export class MovieDetails {
  title: string;
  year: string;
  rated: string;
  genre: string;
  poster: string;
  plot: string;
  imdbId: string;
  totalRating: number;

  constructor(Title, Year, Rated, Genre, Poster, Plot, imdbId, totalRating) {
    this.title = Title;
    this.year = Year;
    this.rated = Rated;
    this.genre = Genre;
    this.poster = Poster;
    this.plot = Plot;
    this.imdbId = imdbId;
    this.totalRating = totalRating
  }
}
