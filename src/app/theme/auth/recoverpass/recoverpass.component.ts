import { ForgotService } from './../../../services/forgot.service';
import { Component, OnInit, Directive, ElementRef, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.scss']
})
export class RecoverpassComponent implements OnInit {
  validatingForm: FormGroup;
resetToken: any;
  constructor( private router: Router, private route: ActivatedRoute, private forgotService: ForgotService) {
    route.queryParams.subscribe(params => {
      this.resetToken = params['token'];
    });
   }

  ngOnInit() {
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);

    this.validatingForm = new FormGroup({
     password,
     confirmPassword
    });

    console.log(this.validatingForm);
  }


  onRecoverpass(form: NgForm) {
    console.log('password is: ', this.validatingForm.get('password').value);
this.forgotService.changePassword(this.validatingForm.get('password').value, this.resetToken).subscribe(data => {
  console.log(data);
  this.router.navigate(['auth/login/simple']);
}, err => {
  console.log(err);
});

  }
}
