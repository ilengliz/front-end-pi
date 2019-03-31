import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ForgotService {
private resetpasswordUrl = 'http://localhost/pfe/public/forgotten_password';
private changePasswordUrl = 'http://localhost/pfe/public/reset_password';

  constructor(private http: HttpClient) { }
  resetPassword (email) {
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});

    this.http.post(this.resetpasswordUrl, {
      'email': email
    }, {
      headers: reqHeader
    } ).subscribe(data => {
      console.log(data);
    }, error => console.log(error));
  }
  changePassword(password, token) {
    const url = `${this.changePasswordUrl}/${token}`;
 this.http.post(url, {
  'password': password
}).subscribe(data => {console.log(data);
},
error => console.log(error));
  }
}
