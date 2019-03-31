import { Component, OnInit, Directive, ElementRef, HostListener  } from '@angular/core';
import { ForgotService } from 'src/app/services/forgot.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss',
  '../../../../assets/icon/icofont/css/icofont.scss'
]
})
export class ForgotComponent implements OnInit {
  emailsent = false ;
  constructor(private forgotService: ForgotService) { }

  ngOnInit() {
  }
onResetPassword(form: NgForm) {
  console.log(form.value['email']);
this.forgotService.resetPassword(form.value['email']);
this.emailsent = !this.emailsent;

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

