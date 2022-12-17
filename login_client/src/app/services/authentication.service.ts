import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor (
    private http: HttpClient
  ) {}

  public Login (email: string, password: string) {
    return this.http.post(environment.apiHost + '/login', {'email': email, 'password': password});
  }

  public Signup (email: string, password: string, name: string) {
    return this.http.post(environment.apiHost + '/signup', {'email': email, 'password': password, 'name': name});
  }

  public ForgotPassword (email: string) {
    return this.http.post(environment.apiHost + '/forgotpassword', {'email': email});
  }
}
