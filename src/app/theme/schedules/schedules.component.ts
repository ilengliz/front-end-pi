import { Instance } from '../../instance';
import { User } from '../../user';
import { Schedule } from '../../schedule';
import { ViewChild, Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { NgForm } from '@angular/forms';
import { ProjectService } from 'src/app/services/project.service';
import { Project } from 'src/app/Project';
// import { UserService } from 'src/app/services/user.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { InstanceService } from 'src/app/services/instance.service';
import { NgForm } from '@angular/forms';


declare var $;


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: [
    './schedules.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss/../icofont.scss'
  ]
})
export class SchedulesComponent implements OnInit {
  @ViewChild('dataTable') table;
  noSchedule = false;
  schedules: Schedule[] = [];
  dataTable: any = null;
  selectedInstance = '';
  switchDisable = true;
  terminated: Array<boolean> = [];
  editModeInstances: Array<boolean> = [];

  users: User[] = [];
  src: string;
  role: string;
  projects: Project[] = [];
  allprojects: Project[] = [];
  userRole: string;
  isclicked = false;
  isAdmin = false;
  isTeamLeader = false;
  isUser = false;
  authorized: boolean;
  selectedOption = '-1';
  instances: Array<Instance> = [];
  test: any;
  checkProject = true;
  projectId = 'useful-academy-236717';
  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private chRef: ChangeDetectorRef,
    private instanceService: InstanceService
  ) {
    this.instanceService.getInstances().subscribe(data => {
      console.log(data);
      this.instances = data as any;
    }, error => console.log(error));
  }

  // for alert //
  openSuccessCancelSwal(i) {
    swal({
      title:
        'Are you sure you want to delete  ' + this.schedules[i].name + ' VM ?',
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
        console.log(this.schedules[i].id);
        this.scheduleService.deleteSchedule(this.schedules[i].id);
        this.schedules.splice(i, 1);
        swal('Deleted!', 'Your VM instance has been deleted.', 'success');
      } else if (result.dismiss) {
        swal('Cancelled', 'Your  VM instance is safe :)', 'error');
      }
    });
  }
  ngOnInit(): void {
    this.scheduleService.getSchedules().subscribe(
      data => {
        console.log(data);
        this.schedules = data;
        for (let k = 0; k < this.schedules.length; k++) {
          this.editModeInstances[k] = false;
        }
        this.chRef.detectChanges();
        //  jQuery DataTables :
        console.log(this.dataTable);
        this.dataTable = $('#dtBasicExample').DataTable();
        $('.dataTables_length').addClass('bs-select');
      },
      error => console.log(error)
    );
  }
  onredirectTo() {
    this.router.navigate(['/newSchedule']);
  }
  onRemoveInstance(i, j) {
    this.scheduleService.removeInstance(this.schedules[i].id, this.schedules[i].Instance[j].name).subscribe(data => {console.log(data);
      this.schedules[i].Instance.splice(j, 1);
      }, error => console.log(error));
  }
  changeModeSchedule(i) {
    this.editModeInstances[i] = ! this.editModeInstances[i];
  }
  affectInstance( i, form: NgForm) {
    const instance = form.value['actualInstance'];
    const found = this.instances.find(function(element) {
      return element.name === instance;
    });
    // this.editMode[i] = ! this.editMode[i]
    const index = this.instances.indexOf(found);
    this.instanceService.setScheduleToInstance(
      this.instances[index].name,
      this.schedules[i].id).subscribe(data => {console.log(data);
        this.editModeInstances[i] = ! this.editModeInstances[i];
        this.schedules[i].Instance.push(found);

}, error => {console.log(error); });
  }
}
