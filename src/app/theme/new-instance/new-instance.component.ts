import {
  Component,
  OnInit,
  Directive,
  ElementRef,
  HostListener,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { InstanceService } from 'src/app/services/instance.service';
import {
  ToastData,
  ToastOptions,
  ToastyService,
  ToastyConfig
} from 'ng2-toasty';
import { User } from 'src/app/user';
import { Project } from 'src/app/Project';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-new-instance',
  templateUrl: './new-instance.component.html',
  styleUrls: [
    './new-instance.component.scss',
    '../../../assets/icon/icofont/css/icofont.scss/../icofont.scss'
  ],
  encapsulation: ViewEncapsulation.None
})
export class NewInstanceComponent implements OnInit {
  @ViewChild('alert') alert: ElementRef;
  GPUtype = '';
  gpuNumber = '';
  change = false;
  region = '';
  model: any;
  zones: string[] = [''];
  autocompleteItems: string[] = [''];
  familyname = '';
  regionresult = '';
  imageDisk = '';
  diskType = 'pd-standard';
  defaultSize = '10';
  defaultImage = 'debian-cloud debian-9-stretch-v20190326';
  errorMessage: boolean;
  usertable: User[];
  projects: Project[] = [];
  myProjects: Project[] = [];

  defaultMachineType = 'n1-standard-1';
  other: boolean;
  role = '';
  constructor(
    private projectService: ProjectService,
    private instanceService: InstanceService,
    private toastyService: ToastyService,
    private toastyConfig: ToastyConfig,
    private router: Router,
    private userService: UserService
  ) {
    this.userService.getUserInformation().subscribe(data => {
      console.log('service0', data.roles[0]);
      this.role = data.roles[0];
    });
    this.errorMessage = true;
    this.other = false;
    setTimeout(() => {
      this.projectService.getProjects().subscribe(data => {
        this.projects = data;
        if (this.role === 'ROLE_USER') {
          this.projects.map(project => {
            if (project.TeamLeader.email === localStorage.getItem('email')) {
              this.myProjects.push(project);
              console.log(this.myProjects);
            }
          });
        } else if (this.role === 'ROLE_ADMIN') {
          this.myProjects = data;
        }
      });
    }, 500);
    this.toastyConfig.theme = 'material';
  }

  ngOnInit() {}
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
      case 'default':
        this.toastyService.default(toastOptions);
        break;
      case 'info':
        this.toastyService.info(toastOptions);
        break;
      case 'success':
        this.toastyService.success(toastOptions);
        break;
      case 'wait':
        this.toastyService.wait(toastOptions);
        break;
      case 'error':
        this.toastyService.error(toastOptions);
        break;
      case 'warning':
        this.toastyService.warning(toastOptions);
        break;
    }
  }
  updateZone() {
    this.zones = [''];
    if (this.region === '1') {
      this.zones.push('asia-east1-a');
      this.zones.push('asia-east1-b');
      this.zones.push('asia-east1-c');
      this.regionresult = 'asia-east1';
    }
    if (this.region === '2') {
      this.zones.push('asia-east2-a');
      this.zones.push('asia-east2-b');
      this.zones.push('asia-east2-c');
      this.regionresult = 'asia-east2';
    } else if (this.region === '3') {
      this.zones.push('asia-northeast1-a');
      this.zones.push('asia-northeast1-b');
      this.zones.push('asia-northeast1-c');
      this.regionresult = 'asia-northeast1';
    } else if (this.region === '4') {
      this.zones.push('asia-south1-a');
      this.zones.push('asia-south1-b');
      this.zones.push('asia-south1-c');
      this.regionresult = 'asia-south1';
    } else if (this.region === '5') {
      this.zones.push('asia-southeast1-a');
      this.zones.push('asia-southeast1-b');
      this.zones.push('asia-southeast1-c');
      this.regionresult = 'asia-southeast1';
    } else if (this.region === '6') {
      this.zones.push('australia-southeast1-a');
      this.zones.push('australia-southeast1-b');
      this.zones.push('australia-southeast1-c');
      this.regionresult = 'australia-southeast1';
    } else if (this.region === '7') {
      this.zones.push('europe-north1-a');
      this.zones.push('europe-north1-b');
      this.zones.push('europe-north1-c');
      this.regionresult = 'europe-north1';
    } else if (this.region === '8') {
      this.zones.push('europe-west1-b');
      this.zones.push('europe-west1-c');
      this.zones.push('europe-west1-d');
      this.regionresult = 'europe-west1';
    } else if (this.region === '9') {
      this.zones.push('europe-west2-a');
      this.zones.push('europe-west2-b');
      this.zones.push('europe-west2-c');
      this.regionresult = 'europe-west2';
    } else if (this.region === '10') {
      this.zones.push('europe-west3-a');
      this.zones.push('europe-west3-b');
      this.zones.push('europe-west3-c');
      this.regionresult = 'europe-west3';
    } else if (this.region === '11') {
      this.zones.push('europe-west4-a');
      this.zones.push('europe-west4-b');
      this.zones.push('europe-west4-c');
      this.regionresult = 'europe-west4';
    } else if (this.region === '12') {
      this.zones.push('europe-west6-a');
      this.zones.push('europe-west6-b');
      this.zones.push('europe-west6-c');
      this.regionresult = 'europe-west6';
    } else if (this.region === '13') {
      this.zones.push('northamerica-northeast1-a');
      this.zones.push('northamerica-northeast1-b');
      this.zones.push('northamerica-northeast1-c');
      this.regionresult = 'northamerica-northeast1';
    } else if (this.region === '14') {
      this.zones.push('southamerica-east1-a');
      this.zones.push('southamerica-east1-b');
      this.zones.push('southamerica-east1-c');
      this.regionresult = 'southamerica-east1';
    } else if (this.region === '15') {
      this.zones.push('us-central1-a');
      this.zones.push('us-central1-b');
      this.zones.push('us-central1-c');
      this.zones.push('us-central1-f');
      this.regionresult = 'us-central1';
    } else if (this.region === '16') {
      this.zones.push('us-east1-a');
      this.zones.push('us-east1-b');
      this.zones.push('us-east1-c');
      this.regionresult = 'us-east1';
    } else if (this.region === '17') {
      this.zones.push('us-east4-a');
      this.zones.push('us-east4-b');
      this.zones.push('us-east4-c');
      this.regionresult = 'us-east4';
    } else if (this.region === '17') {
      this.zones.push('us-west1-a');
      this.zones.push('us-west1-b');
      this.zones.push('us-west1-c');
      this.regionresult = 'us-west1';
    } else if (this.region === '18') {
      this.zones.push('us-west2-a');
      this.zones.push('us-west2-b');
      this.zones.push('us-west2-c');
      this.regionresult = 'us-west2';
    }
    return this.regionresult;
  }
  onAddInstance(form: NgForm) {
    const zone = form.value['zone'];
    const name = form.value['name'];
    const region = this.regionresult;
    const project = form.value['project'];
    const machineType = form.value['machineType'];
    const diskType = form.value['diskType'];
    const diskSize = form.value['diskSize'];
    this.getFamily(form);
    const image = `projects/${this.familyname}/global/images/${this.imageDisk}`;
    const found = this.projects.find(function(element) {
      return element.name === project;
    });
    const index = this.projects.indexOf(found);
    this.instanceService
      .createInstance(
        name,
        diskType,
        diskSize,
        machineType,
        image,
        this.projects[index].id,
        region,
        zone
      )
      .subscribe(
        data => {
          console.log(data);
          this.addToast('VM instance created successfully', '', 'success');
          this.router.navigate(['instances/instances']);
        },
        error => {
          console.log(error);
          this.addToast(
            'Something went wrong',
            'Could not create new VM instance',
            'error'
          );
        }
      );
  }
  getFamily(form) {
    this.imageDisk = form.value['image'];
    const index2 = this.imageDisk.lastIndexOf('images');
    const index1 = this.imageDisk.lastIndexOf('oud');
    if (index2 === -1) {
      this.familyname = this.imageDisk.substring(0, index1 + 3);
      this.imageDisk = this.imageDisk.substring(index1 + 4);
    } else {
      this.familyname = this.imageDisk.substring(0, index2 + 6);
      this.imageDisk = this.imageDisk.substring(index2 + 7);
    }
  }
}
@Directive({
  selector: '[appRemoveAlert]'
})
export class RemoveAlertDirective {
  alert_parent: any;
  constructor(private elements: ElementRef) {}

  @HostListener('click', ['$event'])
  onToggle($event: any) {
    $event.preventDefault();
    this.alert_parent = this.elements.nativeElement.parentElement;
    this.alert_parent.remove();
  }
}
