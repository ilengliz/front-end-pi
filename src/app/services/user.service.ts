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
  private addprojectUrl = 'http://localhost/pfe/public/api/add_user_to_project';
  userEmail = '';
  myUserRole: string;
  collaborator = 'collaborator';
  teamLeader = 'teamLeader';
  profilEmail = ' ';
  verifPass: boolean;
  refereshedData: User [];
  isUserAdmin: boolean;
  constructor(private http: HttpClient) {

   }
getUsers() {
return this.http.get<User []>(this.getUsersUrl);
  }

getUserInformation() {
  return this.http.post<User>(this.userInformationUrl, {
    'email': localStorage.getItem('email')
  } );
}

setAdmin(admin) {
  this.isUserAdmin = admin;
}

isAdmin()  {
  return this.isUserAdmin;
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
   return  this.http.post(this.deleteUserUrl, {
    'email': email
    });


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
  affectProject(email, id) {
    console.log('id', id);
    this.http.post(this.addprojectUrl, {
'email': email,
'project_id': id
    }).subscribe(data => console.log(data), error => console.log(error));
  }
  getProfile(email) {
    return this.http.post<User>(this.userInformationUrl, {
      'email': email
    } );  }

}
