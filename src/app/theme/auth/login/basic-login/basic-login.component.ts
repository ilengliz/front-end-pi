import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from './../../../../auth/login-info';
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss']
})
export class BasicLoginComponent implements OnInit {
private loginInfo: AuthLoginInfo;
loginForm: FormGroup;

isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    const email = new FormControl('', [Validators.required, Validators.email]);
    const recaptcha = new FormControl(null, Validators.required);
    const password = new FormControl('', Validators.required);
    this.loginForm = new FormGroup({
     email,
     password,
     recaptcha
    });

    console.log(this.loginForm);
  }

onSignIn(form: NgForm) {

  this.loginInfo = new AuthLoginInfo(this.loginForm.get('email').value, this.loginForm.get('password').value);
  this.authService.signIn(this.loginInfo).subscribe((data: any) => {
console.log(data);
localStorage.setItem('userToken', data.token);
localStorage.setItem('email', this.loginForm.get('email').value);
this.router.navigate(['/instances']);
this.isLoginFailed = false;

    },
    error => {
      console.log(error);
      this.isLoginFailed = true;


    });
}

}
