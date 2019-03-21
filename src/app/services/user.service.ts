import { User } from 'src/app/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private getUsersUrl = 'http://localhost/pfe/public/api/users';
  private userInformationUrl = 'http://localhost/pfe/public/api/user';
  private userEditPasswordUrl = 'http://localhost/pfe/public/api/editpass';
  private editUserUrl = 'http://localhost/pfe/public/api/edituser';
  private deleteUserUrl = 'http://localhost/pfe/public/api/deleteuser';
  private confirmationEditUrl = 'http://localhost/pfe/public/api/verifpass';
  private removeUserFromProjectUrl = 'http://localhost/pfe/public/api/delete_user_from_project';
  userEmail = '';
  verifPass: boolean;
  refereshedData: User [];
  constructor(private http: HttpClient) { }
  getUsers() {
return this.http.get<User []>(this.getUsersUrl);
  }

getUserInformation() {
  return this.http.post<User>(this.userInformationUrl, {
    'email': localStorage.getItem('email')
  } );
}
editUserPassword(oldPassword: any, newPassword: any) {
  this.http.post(this.userEditPasswordUrl, {
    'email': localStorage.getItem('email'),
    'old_password': oldPassword,
    'new_password': newPassword
  }, {headers: new HttpHeaders().set('Content-Type', 'application/json'),
  responseType: 'text' }).subscribe ( data  => {

    console.log('Post Request is successful ', data);
    },

    error  => {

    console.log('Rrror', error);

    }

    );
}
editUser(firstname, lastname, email, phoneNum, jobpost, profilPic, gender) {
    console.log(profilPic);
    this.http.put(this.editUserUrl, {
      'email': email,
      'firstname': firstname,
      'lastname': lastname,
      'phone_num': phoneNum,
      'profil_pic': profilPic,
      'sex': gender,
      'job_post': jobpost

    }).subscribe ( data  => {

      console.log('PUT Request is successful ', data);
      },

      error  => {

      console.log('Rrror', error);

      }

      );



}
deleteUser(email) {
  console.log(email);
    this.http.post(this.deleteUserUrl, {
    'email': email
    }).subscribe ( data  => {
    this.getUsers().subscribe( users => {
        this.refereshedData = users;
        console.log(this.refereshedData);
      }

    );
    console.log(data);
    console.log('delete user Request is successful ', data);
    },

    error  => {

    console.log('Rrror', error);

    }

    );


}

editConfirmation(password) {
 return  this.http.post(this.confirmationEditUrl, {
    'email': localStorage.getItem('email'),
    'password': password
  }, {headers: new HttpHeaders().set('Content-Type', 'application/json'),
  responseType: 'text' });
  }
  deleteUserFromProject(projectId, email) {
this.http.post(this.removeUserFromProjectUrl, {
  'project_id': projectId,
  'email': email
}).subscribe(data => {
console.log(data);
}, error => console.error('error', error)
);
  }
}
