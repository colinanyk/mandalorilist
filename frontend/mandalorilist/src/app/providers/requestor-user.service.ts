import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import { environment } from "../../environments/environment";
import { LocalStorageWrapper } from "../utilities/local-storage-wrapper";
import { Observable } from "rxjs";

const BASE_URL = environment.MAN_API;

@Injectable({
  providedIn: 'root'
})
export class RequestorUserService {

  constructor(public http: HttpClient) { }

  login(userDetails: any): Observable<{}> {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/user/login';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, userDetails, httpOptions);
  }

  create(userDetails: any): Observable<{}> {
    const localStorageWrapper = new LocalStorageWrapper();
    const url = BASE_URL + '/api/v1/user/create';

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post(url, userDetails, httpOptions);
  }
}
