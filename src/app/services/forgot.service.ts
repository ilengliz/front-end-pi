import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
  private resetpasswordUrl = 'http://localhost/pfe/public/forgotten_password';
  private changePasswordUrl = 'http://localhost/pfe/public/reset_password';
  reqHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(private http: HttpClient, private router: Router) {}
  resetPassword(email) {

    this.http
      .post(
        this.resetpasswordUrl,
        {
          email: email
        },
        {
          headers: this.reqHeader
        }
      )
      .subscribe(
        data => {
          console.log(data);
        },
        error => console.log(error)
      );
  }
  changePassword(password, token) {
    const url = 'http://localhost/pfe/public/reset_password/' + token;
    return this.http.post(url, {password: password}, {
      headers: this.reqHeader,
      responseType: 'text'
    });
  }
}
