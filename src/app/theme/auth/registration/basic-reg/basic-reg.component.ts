import { CustomValidators } from 'ng2-validation';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SignUpService } from 'src/app/services/sign-up.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-basic-reg',
  templateUrl: './basic-reg.component.html',
  styleUrls: ['./basic-reg.component.scss']
})
export class BasicRegComponent implements OnInit {



mygender: String = '';
file = null;
// tslint:disable-next-line:max-line-length
profilePicture = 'data:image/png;base64,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';

classDanger = false;
validatingForm: FormGroup;

  constructor(private signUpService: SignUpService)  {

   }
  ngOnInit() {
    const firstName = new FormControl('', Validators.required);
    const lastName = new FormControl('', Validators.required);
    const cin = new FormControl('');
    const jobPost = new FormControl('', Validators.required);
    const mobileNumber = new FormControl('', Validators.required);
    const customFile = new FormControl('');
    const email = new FormControl('', [Validators.required, Validators.email]);
    const password = new FormControl('', Validators.required);
    const confirmPassword = new FormControl('', [Validators.required, CustomValidators.equalTo(password)]);
    const gender = new FormControl('', Validators.required);
    const recaptcha = new FormControl(null, Validators.required);

    this.validatingForm = new FormGroup({
      firstName,
      lastName,
      cin,
      jobPost,
      mobileNumber,
      customFile,
      email,
      password,
      confirmPassword,
      gender,
      recaptcha
    });
    console.log(this.validatingForm);
  }
  get input() { return this.validatingForm.get('required'); }

  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });

  }
onFileSelected(event) {
  this.file = event.target.files[0];
  this.getBase64(this.file).then(data => this.profilePicture = data as string);
}



  onSignUp(form: NgForm) {
    this.signUpService.signUp (this.validatingForm.get('firstName').value, this.validatingForm.get('lastName').value,
    this.validatingForm.get('email').value, this.validatingForm.get('cin').value, this.validatingForm.get('jobPost').value,
     this.validatingForm.get('mobileNumber').value, this.profilePicture, this.validatingForm.get('gender').value,
    this.validatingForm.get('password').value);
  }

}
