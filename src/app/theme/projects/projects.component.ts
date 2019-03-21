import { Project } from './../../Project';
import {Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import set = Reflect.set;
declare var $;
import { UserService } from './../../services/user.service';
import swal from 'sweetalert2';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss',
  '../../../assets/icon/icofont/css/icofont.scss'
]
})
export class ProjectsComponent implements OnInit {
  showDialog = false;
  visible: boolean;
  @ViewChild('dataTable') table;
  dataTable: any;
  dtOption: any = {};
  projects: Array<Project> = [];
  constructor(private projetService: ProjectService, private chRef: ChangeDetectorRef) {
  this.projetService.getProjects().subscribe(data => {
    console.log(data);
    console.log(typeof data);
    this.projects = data ;
    console.log('project', this.projects);
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
openSuccessCancelSwal() {
swal({
  title: 'Are you sure you want to delete ?',
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

openBasicModal(event) {
  this.showDialog = !this.showDialog;
  setTimeout(() => {
    document.querySelector('#' + event).classList.add('md-show');
  }, 25);
}

closeBasicModal(event) {
  ((event.target.parentElement.parentElement).parentElement).classList.remove('md-show');
  setTimeout(() => {
    this.visible = false;
    this.showDialog = !this.showDialog;
  }, 300);
}

}

