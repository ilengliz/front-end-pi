import { Instance } from './../instance';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { Schedule } from '../schedule';
import { projectionDef } from '@angular/core/src/render3/instructions';


@Injectable({
  providedIn: 'root'
})
export class InstanceService {
  test;
message = false;
private instancesUrl = 'http://localhost/pfe/public/api/instances';
private startinstanceUrl = 'http://localhost/pfe/public/api/start';
private stopinstanceUrl = 'http://localhost/pfe/public/api/stop';
private deleteInstanceUrl = 'http://localhost/pfe/public/api/delete_instance';
private createInstanceUrl = 'http://localhost/pfe/public/api/new_instance';
private scheduleToInstanceUrl = 'http://localhost/pfe/public/api/add_schedule_to_instance';
private project = 'useful-academy-236717';
private instanceUserUrl = 'http://localhost/pfe/public/api/get_instance_of_user';
private projectInstanceUrl = 'http://localhost/pfe/public/api/update_project_of_instance';



  instances: Array<Instance> = [];

  constructor(private http: HttpClient, private router: Router) {
  }
  getInstances () {
   return this.http.get<Instance>(this.instancesUrl);
  }
startInstance(name) {
  return this.http.post(this.startinstanceUrl, {
    'name': name,
    'email': localStorage.getItem('email')
  });
}
stopInstance(name) {
  return this.http.post(this.stopinstanceUrl, {
    'name': name,
    'email': localStorage.getItem('email')
  });
}
deleteInstance(name) {
  return this.http.post(this.deleteInstanceUrl, {
'name': name,
'email': localStorage.getItem('email')
  }).subscribe(data => console.log(data), error => console.log(error));
}
createInstance(name, diskType, diskSize, machineType, image, project, region, zone) {
return   this.http.post(this.createInstanceUrl, {
    'name': name,
    'image': image,
    'DiskSize': diskSize,
    'MachineType': machineType,
    'zone': zone,
    'region': region,
    'DiskType': diskType,
    'project': project,
    'email': localStorage.getItem('email')
  });
}

setScheduleToInstance(name , schedule) {
 return this.http.post(this.scheduleToInstanceUrl , {
    'name': name,
    'schedule': schedule
  });
 }
 connect(instance) {
  // tslint:disable-next-line:max-line-length
  const sshUrl = `https://ssh.cloud.google.com/projects/${this.project}/zones/${instance.zone}/instances/${instance.name}?authuser=0&hl=fr&projectNumber=147527932261`;
window.open(sshUrl);
 }
 getInstanceByEmail() {
 return  this.http.post(this.instanceUserUrl, {
     'email': localStorage.getItem('email')
   });
 }
 updateProject(projectId, name) {
   return this.http.post(this.projectInstanceUrl, {
    'project_id': projectId,
    'email': localStorage.getItem('email'),
    'name': name

   });
 }
}
