import { InstanceService } from './../../../../services/instance.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from './../../../../services/auth.service';
import { Router } from '@angular/router';
import { AuthLoginInfo } from './../../../../auth/login-info';
import { Component, OnInit, Directive, ElementRef, HostListener } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-basic-login',
  templateUrl: './basic-login.component.html',
  styleUrls: ['./basic-login.component.scss',
  '../../../../../assets/icon/icofont/css/icofont.scss'
]
})
export class BasicLoginComponent implements OnInit {
private loginInfo: AuthLoginInfo;
loginForm: FormGroup;

isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private router: Router,
    private userService: UserService, private instanceService: InstanceService) {
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

  }

onSignIn(form: NgForm) {

  this.loginInfo = new AuthLoginInfo(this.loginForm.get('email').value, this.loginForm.get('password').value);
  this.authService.signIn(this.loginInfo).subscribe((data: any) => {
localStorage.setItem('userToken', data.token);
localStorage.setItem('email', this.loginForm.get('email').value);
// set role in user service
this.userService.getUserInformation().subscribe(user =>  {
  this.userService.setAdmin(user.roles[0] === 'ROLE_ADMIN');
});
this.router.navigate(['/instances']);
this.isLoginFailed = false;

    },
    error => {
      console.log(error);
      this.isLoginFailed = true;


    });
}

}

@Directive({
  selector: '[appRemoveAlert]'
})export class RemoveAlertDirective {
  alert_parent: any;
  constructor(private elements: ElementRef) {}

  @HostListener('click', ['$event'])
  onToggle($event: any) {
    $event.preventDefault();
    this.alert_parent = (this.elements).nativeElement.parentElement;
    this.alert_parent.remove();
  }
}
