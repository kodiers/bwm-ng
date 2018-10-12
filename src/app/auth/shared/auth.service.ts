import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators/map';
import { JwtHelper } from 'angular2-jwt';
import * as moment from 'moment';

const jwt = new JwtHelper();

class DecodedToken {
  exp: number;
  username: string;
}

@Injectable()
export class AuthService {
  private decodedToken: DecodedToken;

  constructor(private http: HttpClient) {
    this.decodedToken = JSON.parse(localStorage.getItem('bwm_meta')) || new DecodedToken();
  }

  private saveToken(token: string): string {
    this.decodedToken = jwt.decodeToken(token);
    localStorage.setItem('bwm_auth', token);
    localStorage.setItem('bwm_meta', JSON.stringify(this.decodedToken));
    return token;
  }

  private getExpiration() {
    return moment.unix(this.decodedToken.exp);
  }

  public register(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/register', userData);
  }

  public login(userData: any): Observable<any> {
    return this.http.post('/api/v1/users/auth', userData).pipe(
      map((token: string) => {
        this.saveToken(token);
      })
    );
  }

  public logout() {
    localStorage.removeItem('bwm_meta');
    localStorage.removeItem('bwm_auth');
    this.decodedToken = new DecodedToken();
  }

  public isAuthenticated(): boolean {
    return moment().isBefore(this.getExpiration());
  }

  public getUsername(): string {
    return this.decodedToken.username;
  }

  public getAuthToken(): string {
    return localStorage.getItem('bwm_auth');
  }

}
