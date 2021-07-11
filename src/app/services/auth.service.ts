import { Instance } from './../instance';
import { JwtResponse } from './../auth/jwt-response';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthLoginInfo } from '../auth/login-info';
import { Observable, Subject } from 'rxjs';
// import { User } from '../user';
 declare var gapi: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  instances: Array<Instance> = [];
  terminated: Array<boolean> = [];
  test: any;


private loginUrl = 'http://localhost/pfe/public/api/login_check';
constructor(private http: HttpClient) {



}
signIn(credentials: AuthLoginInfo): Observable<JwtResponse> {
  const headers = new HttpHeaders({'No-Auth': 'True'});
    headers.append('Content-Type', 'application/json');

  return this.http.post<JwtResponse>(this.loginUrl, credentials, {headers: headers} );
}


}
