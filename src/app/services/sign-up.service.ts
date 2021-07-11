import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient, private router: Router) { }



  signUp(firstname, lastname, email, cin, jobPost, mobileNumber, profilePicture, gender) {
    const urlAddUser = 'http://localhost/pfe/public/register';
    const myUser = {

      email: email,
      firstname: firstname,
      lastname: lastname,
       profilPic: profilePicture,
       cin: cin,
       phone_num: mobileNumber,
       jobPost: jobPost,
       sex: gender
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
   return this.http.post<User>(urlAddUser, myUser, {
      headers: reqHeader
    } );
  }

}
