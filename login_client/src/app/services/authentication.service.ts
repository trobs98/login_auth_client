import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

/*
const AUTH_HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': environment.apiHost})
};
*/

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (
    private http: HttpClient
  ) {}

  public login (email: string, password: string) {
    return this.http.post(environment.apiHost + '/session/login', {'email': email, 'password': password});
  }

  public signup (email: string, password: string, firstName: string, lastName: string) {
    return this.http.post(environment.apiHost + '/session/signup', {'email': email, 'password': password, 'firstName': firstName, 'lastName': lastName});
  }

  public forgotPassword (email: string) {
    return this.http.post(environment.apiHost + '/session/forgotpassword', {'email': email});
  }
}
