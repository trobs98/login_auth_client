import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const AUTH_HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (
    private http: HttpClient
  ) {}

  public login (email: string, password: string) {
    return this.http.post(environment.apiHost + '/login', {'email': email, 'password': password}, AUTH_HTTP_OPTIONS);
  }

  public signup (email: string, password: string, name: string) {
    return this.http.post(environment.apiHost + '/signup', {'email': email, 'password': password, 'name': name}, AUTH_HTTP_OPTIONS);
  }

  public forgotPassword (email: string) {
    return this.http.post(environment.apiHost + '/forgotpassword', {'email': email}, AUTH_HTTP_OPTIONS);
  }
}
