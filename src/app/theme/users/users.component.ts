import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../services/user.service';
import {Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, ViewEncapsulation} from '@angular/core';
import { User } from 'src/app/user';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/Project';
import {
  ToastData,
  ToastOptions,
  ToastyService,
  ToastyConfig
} from 'ng2-toasty';


declare var $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'
],
encapsulation: ViewEncapsulation.None

})
export class UsersComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {};
users: User [] = [];
src: string;
editMode: Array <boolean> = [] ;
role = '';
projects: Project [] = [];
allprojects: Project [] = [];
userRole = '';
isclicked = false;
isAdmin = false;
isTeamLeader = false;
isUser = false;
selectedOption = '-1';
  constructor(private userService: UserService,
     private chRef: ChangeDetectorRef,
     private projectService: ProjectService,
     private route: ActivatedRoute,
     private toastyConfig: ToastyConfig,
     private toastyService: ToastyService,
     private router:  Router) {
      this.toastyConfig.theme = 'material';

    this.userService.getUsers().subscribe(data => {
      this.users = data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('#dtBasicExample');
      this.dataTable = table.DataTable();
    }
    ,
    err => console.log(err));
    $('#dtBasicExample').DataTable();
$('.dataTables_length').addClass('bs-select');
this.projectService.getProjects().subscribe(data => {
  this.projects = data ;
}, error =>
console.log(error)

);

if (this.userRole === 'ROLE_USER') {
  this.isUser = true;
} else {
  this.isAdmin = true;
}

  }

// for alert //
openSuccessCancelSwal(email, firstname) {
  swal({
    title: 'Are you sure you want to delete ' + firstname + '?',
    text: 'You not be able to revert this!',
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'No, cancel!',
    confirmButtonClass: 'btn btn-success',
    cancelButtonClass: 'btn btn-danger mr-sm'
  }).then((result) => {
    if (result.value) {
      this.userService.deleteUser(email).subscribe(data => {
        console.log(data);
        const found = this.users.find(function(element) {
          return element.email === email;
        });
        const index = this.users.indexOf(found);
        swal(
          'Deleted!',
          'Your user has been deleted.',
          'success'
        );
        this.users.splice(index, 1);
      }, error => { console.log(error);
        this.addToast('Something went wrong', 'Could not delete a Team leader ', 'error');
      });


    } else if (result.dismiss) {
      swal(
        'Cancelled',
        'Your  user is safe :)',
        'error'
      );
    }
  });
}
  ngOnInit(): void {

  }


  onDeleteUser(email) {
    this.userService.deleteUser(email).subscribe(data => {
      console.log(data);
      const found = this.users.find(function(element) {
        return element.email === email;
      });
      const index = this.users.indexOf(found);
      this.users.splice(index, 1);
    }, error => { console.log(error);
      this.addToast('Something went wrong', 'Could not delete a Team leader ', 'error');
    });

  }

  getUserByEmail(email: string) {
    const found = this.users.find(function(element) {
      return element.email === email;
    });
    return found;
  }
  addToast(title, message, type) {
    console.log('adding toast');
    // Or create the instance of ToastOptions
    const toastOptions: ToastOptions = {
      title: title,
      msg: message,
      showClose: true,
      timeout: 5000,
      theme: 'material',
      onAdd: (toast: ToastData) => {
        console.log('Toast ' + toast.id + ' has been added!');
      },
      onRemove: function(toast: ToastData) {
        console.log('Toast ' + toast.id + ' has been removed!');
      }
    };
        switch (type) {
      case 'default': this.toastyService.default(toastOptions); break;
      case 'info': this.toastyService.info(toastOptions); break;
      case 'success': this.toastyService.success(toastOptions); break;
      case 'wait': this.toastyService.wait(toastOptions); break;
      case 'error': this.toastyService.error(toastOptions); break;
      case 'warning': this.toastyService.warning(toastOptions); break;
    }




  }
intializeProjects (i, userProjects) {
  console.log(userProjects);
    this.editMode = new Array<boolean>(this.users[i].projects.length);
  for (let k = 0 ; k < this.users[i].projects.length ; k++) {
    this.editMode[k] = true;
  }
  for (let k = 0 ; k < this.users[i].projects.length - 1 ; k++) {
    if (this.projects[k].id !== userProjects[k].id) {
      let j = 0;
      console.log('this.projects[k]', this.projects[k].id);
      console.log('userProjectsk', userProjects[k]);
this.allprojects[j] = this.projects[k];
j++;
    }
  }
  console.log('allprojects table', this.allprojects);
}
getRole(i, j) {
if (  this.projectService.isAteamLeader(this.users[i].email, this.users[i].projects[j]) === true) {
  this.role = 'TeamLeader';

} else {
  this.role = 'Collaborator';
}

}
  changeMode( j) {

    this.editMode[j] = !this.editMode[j];
  }
  onEditUserProject(form: NgForm, j) {
// if role = true and teamLeader = true => le role est teamLeader
    const projectName = form.value['projectName'];
const role = form.value['role'];
console.log('role', role);
console.log('project NAME', projectName);
this.changeMode(j);
  }

  getProjectById(id) {
    const found = this.projects.find(function(element) {
      return element.id === id;
    });
    return found;
  }
  showList() {
  this.isclicked = ! this.isclicked;
}
removeProject (i, j) {
  this.userService.deleteUserFromProject(this.users[i].projects[j].id, this.users[i].email);
  this.users[i].projects.splice(j, 1);

}
affectProject(i, form: NgForm) {
  this.isclicked = ! this.isclicked;
const adedProject = this.getProjectById( this.selectedOption);
this.users[i].projects.push(adedProject);
this.editMode[this.users[i].projects.length] = false;
// this.projectService.addUserToProject(this.selectedOption, this.users[i].email);
this.userService.affectProject( this.users[i].email, form.value['select']);
}
profile(email) {
  const profileUrl = `/profile/${email}`;
  this.userService.profilEmail = email ;
  this.router.navigate([profileUrl]);
}
}
