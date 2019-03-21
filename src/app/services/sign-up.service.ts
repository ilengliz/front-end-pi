import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../user';
@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  constructor(private http: HttpClient, private router: Router) { }



  signUp(firstname, lastname, email, cin, jobPost, mobileNumber, profilePicture, gender, password) {
    const urlAddUser = 'http://localhost/pfe/public/register';
    console.log(profilePicture);
    const myUser = {

email: email,
firstname: firstname,
lastname: lastname,
       password: password,
       profilPic: profilePicture,
       cin: cin,
       phone_num: mobileNumber,
       jobPost: jobPost,
       sex: gender
    };
    console.log(profilePicture);
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    this.http.post<User>(urlAddUser, myUser, {
      headers: reqHeader
    } ).subscribe(data => console.log(data));
    this.router.navigate(['/auth/login/simple']);
  }

}
