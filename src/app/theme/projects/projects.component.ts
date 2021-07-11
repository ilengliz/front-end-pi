import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Project } from 'src/app/Project';
import { User } from 'src/app/user';
import { ProjectService } from 'src/app/services/project.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import set = Reflect.set;
declare var $;
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: [
    './projects.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss/../icofont.scss'
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
  users: User[] = [];
  projectName = '';
  projectBudget;
  emailCollaborator = '';
  extrabudget;
  addMode = false;
  selectedOption: string;
  teamleader = '';
  isUser = false;
  isnotTeamLeader: Array<boolean> = [];
  isAdmin = false;
  role: string;
  constructor(
    private projetService: ProjectService,
    private chRef: ChangeDetectorRef,
    private userService: UserService,
    private router: Router
  ) {
    $('#dtBasicExample').DataTable({
      destroy: true,
      searching: false,
      paging: true,
      ordering: true
    });
    this.userService.getUserInformation().subscribe(data => {
      console.log('service0', data.roles[0]);
      this.role = data.roles[0];
    });
    this.userService.getUsers().subscribe(
      data => {
        console.log(data);
        this.usertable = data;
      },
      error => console.log(error)
    );
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
        this.projects.splice(index, 1);
        swal('Deleted!', 'Your project has been deleted.', 'success');
      } else if (result.dismiss) {
        swal('Cancelled', 'Your  project is safe :)', 'error');
      }
    });
  }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.users = data;
    }, err => console.log(err));
    setTimeout(() => {
      // getting all the projects
      this.projetService
        .getProjects()
        .subscribe(
          data => {
            // if he is a user
            if (this.role === 'ROLE_USER') {
              this.isUser = true;
              for (let i = 0; i < data.length; i++) {
                data[i].Users.map(user => {
                  if (user.email === localStorage.getItem('email')) {
                    this.projects.push(data[i]);
                  }
                });
              }
            } else if (this.role === 'ROLE_ADMIN') {
              // if he is an admin
              this.isAdmin = true;
              this.projects = data;
              console.log('else');
            }
            this.chRef.detectChanges();
            //  jQuery DataTables :
            const table: any = $('#dtBasicExample');
            this.dataTable = table.DataTable();
            $('.dataTables_length').addClass('bs-select');
          },
          err => console.log(err)
        )
        .add(then => {
          // edit project permissions
          if (this.role === 'ROLE_USER') {
            this.isUser = true;
            for (let j = 0; j < this.projects.length; j++) {
              this.isnotTeamLeader[j] = true;
            }
            for (let k = 0; k < this.isnotTeamLeader.length; k++) {
              if (
                this.projects[k].TeamLeader.email ===
                localStorage.getItem('email')
              ) {
                this.isnotTeamLeader[k] = false;
              } else {
                this.isnotTeamLeader[k] = true;
              }
            }
          } else {
            for (let j = 0; j < this.projects.length; j++) {
              this.isnotTeamLeader[j] = false;
            }
          }
        });
    }, 600);
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
        this.projectCollaborators = data.Users;
        console.log('data', data);
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
    this.projetService
      .addUserToProject(project.id, form.value['email'])
      .subscribe(
        data => {
          this.projectCollaborators.push(found);
          this.addMode = !this.addMode;
        },
        error => console.log(error)
      );
      }
  initialization(i) {
    this.teamleader = this.projects[i].TeamLeader.email;
  }
  onEditProject(i, form: NgForm, modal) {
    const projectName = form.value['projectName'];
    const projectBudget = form.value['projectBudget'];
    const extrabudget = form.value['extrabudget'];
    const teamleader = form.value['teamleader'];
    this.projetService.editProjet(
      this.projects[i].id,
      projectName,
      projectBudget,
      extrabudget,
      teamleader
    );
    this.projects[i].name = projectName;
    this.projects[i].budget = projectBudget;
    this.projects[i].extraBudget = extrabudget;
    this.projects[i].TeamLeader.email = teamleader;
    modal.hide();
  }
  removeUserFromproject(email, project, j, i) {
    this.projetService.removeuser(email, project);
    this.projectCollaborators.splice(j, 1);
  }
  onredirectTo() {
    this.router.navigate(['/newProject']);
  }
  profile(email) {
    const profileUrl = `/profile/${email}`;
    this.userService.profilEmail = email;
    this.router.navigate([profileUrl]);
  }
}
