import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { NgForm } from '@angular/forms';
import { Project } from './../../../project';
import { ProjectService } from './../../../services/project.service';
import { User } from './../../../user';
import { ChangeDetectorRef } from '@angular/core';
import swal from 'sweetalert2';
import { Component, OnInit, ViewChild } from '@angular/core';
import set = Reflect.set;
declare var $;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [
    './projects.component.scss',
    '../../../../assets/icon/icofont/css/icofont.scss'
  ]
})
export class ProjectsComponent implements OnInit {
  showDialog = false;
  visible: boolean;
  @ViewChild('dataTable') table: { nativeElement: any };
  dataTable: any;
  dtOption: any = {};
  projects: Array<Project> = [];
  projectCollaborators: User[];
  model: any;
  autocompleteItems: string[] = [''];
  usertable: User[];
  projectName = '';
  projectBudget;
  extrabudget;
  addMode = false;
  selectedOption: string;
  teamleader = '';
  isUser = false;
  isTeamLeader = false;
  isAdmin = false;
  role: string;
  myProjectsAsTeamLeader: Project[];
  constructor(
    private projetService: ProjectService,
    private chRef: ChangeDetectorRef,
    private userService: UserService,
    private router: Router
  ) {
    this.projetService.getProjects().subscribe(
      data => {
        this.projects = data;
        this.chRef.detectChanges();

        // Now you can use jQuery DataTables :
        const table: any = $('table');
        this.dataTable = table.DataTable();
      },
      err => console.log(err)
    );
    $('#dtBasicExample').DataTable();
    $('.dataTables_length').addClass('bs-select');
    this.userService.getUsers().subscribe(data => {
   this.usertable = data;
    },
    error => console.log(error)).add(then => {
        for (let i = 0 ; i < this.usertable.length ; i ++) {
          this.autocompleteItems[i] = this.usertable[i].email ;
        }
      }
      );
  /*    if (this.userService.getRole()  !== 'ROLE_USER' ) {

this.isUser  = true;
console.log(this.projects);
for ( let i = 0 ; i < this.projects.length ; i ++) {
  console.log(this.projects[i].TeamLeader.email, 'teamleader email ');

}
console.log('myprojects', this.myProjectsAsTeamLeader);
} else {
  console.log('je suis dans le else' );

  this.isAdmin = true;
}*/
     }

  // for alert //
  openSuccessCancelSwal(project, i) {
    swal({
      title: 'Are you sure you want to delete ' + this.projects[i].name + '?',
      text: 'You not be able to revert this!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger mr-sm'
    }).then(result => {

      if (result.value) {
        this.projetService.deleteProject(project.id);
        const index = this.projects.indexOf(project);
        this.projects.splice(index);
        swal('Deleted!', 'Your project has been deleted.', 'success');
      } else if (result.dismiss) {
        swal('Cancelled', 'Your  project is safe :)', 'error');
      }
    });
  }
  ngOnInit(): void {
    this.dtOption = {
      paging: true,
      ordering: true,
      info: true
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
    event.target.parentElement.parentElement.parentElement.classList.remove(
      'md-show'
    );
    setTimeout(() => {
      this.visible = false;
      this.showDialog = !this.showDialog;
    }, 300);
  }
  getUsers(i) {
    this.projetService.getProjectCollaborators(this.projects[i].id).subscribe(
      data => {
        console.log('data', data);
    this.projectCollaborators = (data.Users  as User[]) ;
      },
      error => console.log(error)
    );
  }
  getUser(email) {
    const found = this.usertable.find(function(element) {
      return element.email === email;
    });
    return found;
  }
  changeMode() {
    this.addMode = !this.addMode;

  }
  addUser(form: NgForm, project, i) {
 const found = this.getUser(form.value['email']);
    this.projetService.addUserToProject(project.id, form.value['email']).subscribe(data => {
  this.projectCollaborators.push(found);
  this.addMode = !this.addMode;

}, error => console.log(error));

  }
  initialization(i) {
    this.teamleader = this.projects[i].TeamLeader.email ;
    console.log('teamleader', this.teamleader);

  }
  onEditProject(i, form: NgForm, modal) {
    const projectName = form.value['projectName'];
    const projectBudget = form.value['projectBudget'];
    const extrabudget = form.value['extrabudget'];
    const teamleader = form.value['teamleader'];
    console.log(teamleader);
   this.projetService.editProjet(this.projects[i].id, projectName, projectBudget, extrabudget, teamleader);
   this.projects[i].name = projectName;
   this.projects[i].budget = projectBudget;
   this.projects[i].extraBudget = extrabudget;
   this.projects[i].TeamLeader.email = teamleader;
   modal.hide();

  }
  removeUserFromproject(email, project, j , i) {
  this.projetService.removeuser(email, project);
 this.projectCollaborators.splice(j, 1);
 }
 onredirectTo() {
   this.router.navigate(['/project/newProject']);
 }
}
