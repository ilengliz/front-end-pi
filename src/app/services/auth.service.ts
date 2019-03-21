import { JwtResponse } from './../auth/jwt-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLoginInfo } from '../auth/login-info';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private loginUrl = 'http://localhost/pfe/public/api/login_check';
constructor(private http: HttpClient) { }
signIn(credentials: AuthLoginInfo): Observable<JwtResponse> {
  console.log(credentials);
  const headers = new HttpHeaders({'No-Auth': 'True'});
    headers.append('Content-Type', 'application/json');

  return this.http.post<JwtResponse>(this.loginUrl, credentials, {headers: headers} );
}


  /*
  signIn(email, password) {
    const signinUrl = '';
    this.http.post<any>(signinUrl, {
      'email': email,
      'password': password
    }).subscribe(response => this.isAuth = response);
  }
  signOut() {
    const signoutUrl = '';
    this.http.get(signoutUrl);
    this.isAuth = false;
  }*/
}
