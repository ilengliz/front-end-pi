import { JwtResponse } from './../../../../auth/jwt-response';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { AuthLoginInfo } from './../../../../auth/login-info';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
private loginInfo: AuthLoginInfo;
isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {

  }

onSignIn(email, password) {
  this.loginInfo = new AuthLoginInfo(email, password);
  this.authService.signIn(this.loginInfo).subscribe((data: any) => {
console.log(data);
localStorage.setItem('userToken', data.token);
localStorage.setItem('email', email);
this.router.navigate(['/instances']);
this.isLoginFailed = false;

    },
    error => {
      console.log(error);
      this.isLoginFailed = true;
      return Observable.of(false);


    });
}

}
