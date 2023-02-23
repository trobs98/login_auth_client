import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map, tap } from 'rxjs';
import { ApiResponse } from '../classes/api-response';
import { UserAccount } from '../classes/user-account';
import { CookieService } from 'ngx-cookie-service';

const SUCCESS_RESPONSE_STATUS = 'success';
const FAILURE_RESPONSE_STATUS = 'fail';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user: UserAccount | null = null;

  constructor (
    private http: HttpClient,
    private cookieService: CookieService
  ) {
    if (this.cookieService.check(environment.userDataCookieName)) {
      this.setUserFromToken(this.cookieService.get(environment.userDataCookieName));
    }
  }

  public login (email: string, password: string) {
    return this.http.post(environment.apiHost + '/session/login', {'email': email, 'password': password})
      .pipe(map((response: any) => new ApiResponse(response?.data, response?.status)))
      .pipe(tap(response => {

        if (response.getStatus() === SUCCESS_RESPONSE_STATUS) {
          this.setUserFromToken(this.cookieService.get(environment.userDataCookieName));
        }
      }));
  }

  public signup (email: string, password: string, firstName: string, lastName: string) {
    return this.http.post(environment.apiHost + '/session/signup', {'email': email, 'password': password, 'firstName': firstName, 'lastName': lastName})
      .pipe(map((response: any) => new ApiResponse(response?.data, response?.status)));
  }

  public forgotPassword (email: string) {
    return this.http.post(environment.apiHost + '/session/forgotpassword', {'email': email})
      .pipe(map((response: any) => new ApiResponse(response?.data, response?.status)));
  }

  public isLoggedIn(): boolean {
    if (this.user === null) {
      return false;
    }
    
    return true;
  }

  private decodeJWTToken(token: string) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }

  private setUserFromToken(token: string) {
    let tokenJSON = this.decodeJWTToken(token);
    let tokenJSONData = tokenJSON?.data;
    this.user = new UserAccount(tokenJSONData?.firstName, tokenJSONData?.lastName, tokenJSONData?.email);
  }
}
