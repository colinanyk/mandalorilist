import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LocalStorageWrapper } from "../utilities/local-storage-wrapper";
import {Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { MovieDetails } from '../models/movie-details';

const BASE_URL = environment.MAN_API;

@Injectable({
  providedIn: 'root'
})
export class RequestorMovieService {

  constructor(public http: HttpClient) { }

  searchForMovies(searchCriteria) {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movie/search?title=' + searchCriteria.title + '&page=' + searchCriteria.page;

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(url, httpOptions);
  }

  getMovieDetails(imdbId): Observable<MovieDetails> {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movie/' + imdbId + '/details';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get<MovieDetails>(url, httpOptions);
  }

  addMovieToLists(movieObj) {

    let requestBody =  {
      title: movieObj.movieDetails.title,
      year: movieObj.movieDetails.year,
      rated: movieObj.movieDetails.rated,
      genre: movieObj.movieDetails.genre,
      poster: movieObj.movieDetails.poster,
      plot: movieObj.movieDetails.plot,
      imdbId: movieObj.movieDetails.imdbId,
      totalRating: movieObj.movieDetails.totalRating,
      listIdArray: movieObj.movieLists
    };

    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movielists/movie/add';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(url, {movieObj: requestBody}, httpOptions);
  }

  removeMovieFromList(movieObj) {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movielist/movie/remove';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(url, {movieObj}, httpOptions);
  }
  ratemovie(movieId, rating) {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movie/' + movieId + '/rate';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.put(url, {rating: rating}, httpOptions);
  }
}
