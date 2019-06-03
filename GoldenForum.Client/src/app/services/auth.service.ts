import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private router: Router) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getTokenExpirationDate(): Date {
    const decoded = jwt_decode(this.getToken());
    if (decoded.exp === undefined) 
      return null;

    const date = new Date(0); 
    date.setUTCSeconds(decoded.exp);

    return date;
  }

  get isTokenExpired(): boolean {
    const date = this.getTokenExpirationDate();
    if (date === undefined) 
      return false;

    return !!(date.valueOf() > new Date().valueOf());
  }

  get isAuthanticated(): boolean {
    return !!(this.getToken() && this.isTokenExpired);
  }

  get currentUser() {
    let token = this.getToken();
    if (!token) 
      return null;

    return jwt_decode(token);
  }

  login(input: any): Observable<any> {
    return this.httpClient.post<any>(environment.url + '/accounts/login', input);
  }

  passwordResetLink(input: any): Observable<any> {
    return this.httpClient.post<any>(environment.url + '/accounts/password-link', input);
  }

  passwordReset(input: any): Observable<any> {
    return this.httpClient.post<any>(environment.url + '/accounts/password-reset', input);
  }

  register(input: any): Observable<any> {
    return this.httpClient.post<any>(environment.url + '/accounts/register', input);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/login');
  }
}
