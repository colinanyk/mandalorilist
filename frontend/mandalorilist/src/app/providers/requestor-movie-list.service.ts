import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LocalStorageWrapper } from "../utilities/local-storage-wrapper";
import { Observable } from "rxjs";

const BASE_URL = environment.MAN_API;

@Injectable({
  providedIn: 'root'
})
export class RequestorMovieListService {

  constructor(public http: HttpClient) { }

  //TODO: Add movieList model
  getMovieLists() {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movielists';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(url, httpOptions);
  }

  getMovieList(movieListId: string) {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movielist/' + movieListId;

    console.log('URL: ' + url);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.get(url, httpOptions);
  }

  createMovieList(movieListObj: any) {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/' + localStorageWrapper.getValue(localStorageWrapper.USER_ID) +'/movielist/create';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, {movieListObj: movieListObj} ,httpOptions);
  }

}
