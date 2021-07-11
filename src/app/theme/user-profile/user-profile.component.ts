import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { animate, style, transition, trigger } from '@angular/animations';
import swal from 'sweetalert2';
import {
  NgbDateStruct
} from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { Project } from 'src/app/Project';
const URL = 'https://evening-anchorage-3159.herokuapp.com/api/';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss'
  ],
  animations: [
    trigger('fadeInOutTranslate', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease-in-out', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translate(0)' }),
        animate('400ms ease-in-out', style({ opacity: 0 }))
      ])
    ])
  ]
})

export class UserProfileComponent implements OnInit {
  editProfile = true;
  editProfileIcon = 'icofont-edit';
  modelPopup: NgbDateStruct;
  profilePicture;

  editAbout = true;
  editAboutIcon = 'icofont-edit';

  public editor;
  public editorContent: string;

  public data: any;
  public rowsOnPage = 10;
  public filterQuery = '';
  public sortBy = '';
  public sortOrder = 'desc';
  profitChartOption: any;

  rowsContact = [];
  loadingIndicator = true;
  reorderable = true;
  jobpost: string;
  firstname: string;
  lastname: string;
  profilePic: string;
  gender: string;
  phoneNum: string;
  projects: Project [];
src: string;
file = null;
userEmail = '';
email = '';
  qrcode: string;
  constructor(private userService: UserService, private route: ActivatedRoute) {
      this.userEmail = this.route.snapshot.params['email'];
      console.log('userEmail   from user -profile', this.userEmail);
  }

  ngOnInit() {
    console.log(this.userEmail);
    this.userService.getProfile(this.userEmail).subscribe(
      data => {
        console.log(data);
        this.jobpost = data.jobpost;
        this.firstname = data.firstname;
        this.lastname = data.lastname;
        this.profilePic = data.profilPic;
        this.src =  this.profilePic;
        this.projects = data.projects;
        this.gender = data.sex;
        this.phoneNum = data.phoneNum;
        this.qrcode = data.qrcode ;
        this.email = this.userEmail;
        console.log(this.profilePic);
      },
      err => console.log(err)
    );

  }


  // end for design

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
  this.getBase64(this.file).then(data => this.profilePic = data as string );
}




}
