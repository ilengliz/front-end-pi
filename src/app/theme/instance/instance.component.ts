
import {
  ToastData,
  ToastOptions,
  ToastyService,
  ToastyConfig
} from 'ng2-toasty';
import {
  Component,
  ViewEncapsulation,
  OnInit,
  ViewChild,
  ChangeDetectorRef
} from '@angular/core';
import { User } from 'src/app/user';
import swal from 'sweetalert2';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Schedule } from 'src/app/schedule';
import { Project } from 'src/app/Project';
import { Instance } from 'src/app/instance';
import { InstanceService } from 'src/app/services/instance.service';
import { ProjectService } from 'src/app/services/project.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UserService } from 'src/app/services/user.service';

declare var $;

@Component({
  selector: 'app-instance',
  templateUrl: './instance.component.html',
  styleUrls: [
    './instance.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss/../icofont.scss'

  ],
  encapsulation: ViewEncapsulation.None
})
export class InstanceComponent implements OnInit {
  @ViewChild('dataTable') table;
  actualschedule = '';
  mySchedule = '';
  noSchedule: Array<boolean> = [];
  schedules: Schedule[] = [];
  dataTable: any;
  dtOption: any = {};
  switchDisable = true;
  terminated: Array<boolean> = [];
  users: User[] = [];
  src: string;
  role: string;
  editModeProject: Array<boolean> = [];
  projects: Project[] = [];
  allprojects: Project[] = [];
  userRole: string;
  isclicked = false;
  isAdmin = false;
  isTeamLeader = false;
  isUser = false;
  authorized: boolean;
  editMode: Array<boolean> = [];
  selectedOption = '-1';
  toConnect: Array<boolean> = [];
  instances: Array<Instance> = [];
  selectedProject = '';
  test: any;
  checkProject = true;
  projectId = 'useful-academy-236717';
  position = 'bottom-right';
  title: string;
  msg: string;
  showClose = true;
  closeOther = false;
  constructor(
    private instanceService: InstanceService,
    private chRef: ChangeDetectorRef,
    private projectService: ProjectService,
    private userService: UserService,
    private scheduleService: ScheduleService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private router: Router
  ) {
    this.toastyConfig.theme = 'bootstrap';

    this.projectService.getProjects().subscribe(
      data => {
        this.projects = data;
      },
      error => console.log(error)
    );
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

  // for alert //
  openSuccessCancelSwal(i) {
    swal({
      title:
        'Are you sure you want to delete  ' + this.instances[i].name + ' VM ?',
      text: 'This action cannot be undone !',
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
        this.ondeleteInstance( this.instances[i].name);
        this.instances.splice(i, 1);
        this.addToast('VM instance stoped successfully', '', 'success');

        swal('Deleted!', 'Your VM instance has been deleted.', 'success');
      } else if (result.dismiss) {
        swal('Cancelled', 'Your  VM instance is safe :)', 'error');
      }
    });
  }
  ngOnInit(): void {
    this.userService.getUserInformation().subscribe(data => {
      this.role = data.roles[0];
      if (this.role === 'ROLE_USER') {
        this.isUser = true;
        this.instanceService.getInstanceByEmail().subscribe((ins: any[]) => {
          if (ins.length !== 0) {
            ins.forEach(instances => {
              instances.instances.forEach(element => {
                this.instances.push(element);
              });
            });
            for (let i = 0; i < this.instances.length; i++) {
              this.editMode[i] = false;
            }
            for (let j = 0; j < this.instances.length; j++) {
              this.editModeProject[j] = false;
            }
            for (let k = 0; k < this.instances.length; k++) {
              this.noSchedule[k] = false;
            }
          }
          // console.log(this.instances);
          for (let i = 0; i < this.instances.length; i++) {
            if (this.instances[i].state === 'RUNNING') {
              this.terminated[i] = true;
              this.toConnect[i] = true;
            } else {
              this.instances[i].externalIP = 'NULL';
              this.toConnect[i] = false;
              this.terminated[i] = false;
            }
          }
          //  jQuery DataTables :
          this.chRef.detectChanges();
          const table: any = $('#khaledmagiquesysteme');
          this.dataTable = table.DataTable();
          $('.dataTables_length').addClass('bs-select');
        });
      } else {
        this.isAdmin = true;
        this.instanceService.getInstances().subscribe(info => {
          this.instances = (info as unknown) as Instance[];
          for (let i = 0; i < this.instances.length; i++) {
            this.editMode[i] = false;
          }
          for (let j = 0; j < this.instances.length; j++) {
            this.editModeProject[j] = false;
          }
          for (let k = 0; k < this.instances.length; k++) {
            this.noSchedule[k] = false;
          }
          console.log(this.instances);
          for (let i = 0; i < this.instances.length; i++) {
            if (this.instances[i].state === 'RUNNING') {
              this.terminated[i] = true;
              this.toConnect[i] = true;
            } else {
              this.instances[i].externalIP = 'NULL';
              this.toConnect[i] = false;
              this.terminated[i] = false;
            }
          }
          //  jQuery DataTables :
          this.chRef.detectChanges();
          const table: any = $('#khaledmagiquesysteme');
          this.dataTable = table.DataTable();
          $('.dataTables_length').addClass('bs-select');
        });
      }
    });
    this.scheduleService.getSchedules().subscribe(
      data => {
        this.schedules = data;
      },
      error => console.log(error)
    );
  }

  onClickOutsideButton(p) {
    console.log(p);
  }
  onConnect(instance) {
    this.instanceService.connect(instance);
  }
  onstartInstance(instance, i) {
    this.addToast('Starting VM instance in progress', '', 'wait');

    this.instanceService.startInstance(instance).subscribe(
      (data: any) => {
        this.instances[i].externalIP = data.externalIP;
        // this.toConnect[i] = true;
      this.toastyService.clearAll();
        this.addToast('VM instance started successfully', '', 'success');
      },
      error => {console.log(error);
        this.terminated[i] = false;
        this.toConnect[i] = false;
        this.toastyService.clearAll();
        this.addToast('Something went wrong', '', 'error');

      }
    );
  }
  onstopInstance(instance, i) {
    this.addToast('Stoping VM instance in progress', '', 'wait');

    this.instanceService.stopInstance(instance).subscribe(
      data => {
        this.instances[i].externalIP = 'NULL';
        this.toastyService.clearAll();
        this.addToast('VM instance stoped successfully', '', 'success');

      },
      error => {console.log(error);
        this.toastyService.clearAll();

        this.addToast('Something went wrong', '', 'error');
    }
    );
  }
  ondeleteInstance( instance_name) {
    this.instanceService.deleteInstance(instance_name);
  }

  disableSwitch() {
    this.switchDisable = true;
  }

  enableSwitch() {
    this.switchDisable = false;
  }
  updateStatus(i) {
    if (this.terminated[i] === true) {
      this.toConnect[i] = false;

      this.onstopInstance(this.instances[i].name, i);
    } else {
      this.toConnect[i] = true;

      this.onstartInstance(this.instances[i].name, i);
    }
    this.terminated[i] = !this.terminated[i];
  }
  affectProject(i, form: NgForm) {
    this.selectedProject = this.projects[i].name;
    this.toastyService.clearAll();
    this.addToast('Updating project in progress', '', 'wait');
    if (this.editModeProject[i] === true) {
      const project = form.value['actualProject'];
      const found = this.projects.find(function(element) {
        return element.name === project;
      });
      this.editModeProject[i] = ! this.editModeProject[i];

      const index = this.projects.indexOf(found);
     this.instanceService.updateProject(this.projects[index].id, this.instances[i].name)
      .subscribe(data => {console.log(data);
        this.toastyService.clearAll();
        this.addToast('Project updated successfully', '', 'success');
      }, error => {console.log(error);
        this.toastyService.clearAll();
        this.addToast('Project could not be updated', '', 'error');
         });

    }
  }
  onredirectTo() {
    this.router.navigate(['/newInstance']);
  }
  affecteSchedule(form: NgForm, i) {
    if (this.editMode[i] === true) {
      const schedule = form.value['actualschedule'];
      const found = this.schedules.find(function(element) {
        return element.name === schedule;
      });
      this.editMode[i] = ! this.editMode[i];

      const index = this.schedules.indexOf(found);
      // before sending the http post request, we add a toast of adding
      this.instanceService.setScheduleToInstance(
        this.instances[i].name,
        this.schedules[index].id
      ).subscribe(data => {console.log(data);
        this.toastyService.clearAll();
        this.addToast('Schedule affected successfully', '', 'success');
      }, error => {
        this.toastyService.clearAll();
        this.addToast('Schedule could not be added', '', 'error');
        console.log(error);
      });

    }
  }
  changeMode(i) {
    console.log(this.instances[1].CreatedBy);

    this.editMode[i] = !this.editMode[i];
    this.actualschedule = ' ';

  }
  profile(email) {
    const profileUrl = `/profile/${email}`;
    this.userService.profilEmail = email ;
    this.router.navigate([profileUrl]);
  }
  checkSchedule(i) {
    if (this.instances[i].schedule === null) {
  this.noSchedule[i] = true;
    } else {
      this.noSchedule[i] = false;
    }
  }
  changeModeProject(i) {
    this.editModeProject[i] = ! this.editModeProject[i];
  }
removeSchedule(i) {
  this.scheduleService.removeInstance(this.instances[i].schedule.id, this.instances[i].name)
  .subscribe(data => {console.log(data);
  this.noSchedule[i] = true;
  this.toastyService.clearAll();
  this.addToast('Schedule removed successfully', '', 'success');
  }, error => {console.log(error);
    this.toastyService.clearAll();
    this.addToast('Schedule could not be removed ', '', 'danger');

  } );
}
}
