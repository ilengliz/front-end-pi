import { UserService } from './../../services/user.service';
import {Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import set = Reflect.set;
import { User } from 'src/app/user';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
// tslint:disable-next-line:import-spacing
import { FormsModule }   from '@angular/forms';


declare var $;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'
]
})
export class UsersComponent implements OnInit {
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {};
users: User [];
src: string;
editMode: Array <boolean> = [] ;
  constructor(private userService: UserService, private chRef: ChangeDetectorRef) {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
      this.chRef.detectChanges();
      // Now you can use jQuery DataTables :
      const table: any = $('table');
      this.dataTable = table.DataTable();
    }
    ,
    err => console.log(err));
    $('#dtBasicExample').DataTable();
$('.dataTables_length').addClass('bs-select');
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
      this.onDeleteUser(email);
      swal(
        'Deleted!',
        'Your user has been deleted.',
        'success'
      );
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
    this.dtOption = {
      'paging':   true,
      'ordering': true,
      'info':     true
  };
  this.dataTable = $(this.table.nativeElement);
  this.dataTable.DataTable(this.dtOption);

  }


  onDeleteUser(email) {
    this.userService.deleteUser(email);
    const found = this.users.find(function(element) {
      return element.email === email;
    });
    const index = this.users.indexOf(found);
    this.users.splice(index, 1);
  }

  getUserByEmail(email: string) {
    const found = this.users.find(function(element) {
      return element.email === email;
    });
    return found;
  }
intializeProjects (i) {
  this.editMode = new Array<boolean>(this.users[i].projects.length);
  for (let k = 0 ; k < this.users[i].projects.length ; k++) {
    this.editMode[k] = true;
  }
}
  changeMode( j) {

    this.editMode[j] = !this.editMode[j];
  }
  onEditUserProject(form: NgForm, j) {
const projectName = form.value['projectName'];
const role = form.value['role'];
console.log('role', role);
console.log('project NAME', projectName);
this.changeMode(j);
  }
  openSuccessCancelSwal2(i, j) {
    console.log('firstname', this.users[i].firstname);
    console.log('project name', this.users[i].projects[j]);
    swal({
      title: 'Are you sure you want to remove ' + this.users[i].firstname + ' from ' + this.users[i].projects[j].name + ' project ?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then((result) => {
      if (result.value) {
        console.log(this.users[i].projects[j].id, this.users[i].email);
        this.userService.deleteUserFromProject(this.users[i].projects[j].id, this.users[i].email);
        swal(
          'Removed!',
          'Your user has been removed.',
          'success'
        );
      } else if (result.dismiss) {
        swal(
          'Cancelled',
          '',
          'error'
        );
      }
    });
  }
}
