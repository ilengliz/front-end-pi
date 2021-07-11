import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Schedule } from '../schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
private scheduleUrl = 'http://localhost/pfe/public/api/schedules';
private deleteScheduleUrl = 'http://localhost/pfe/public/api/delete_schedule';
private   addScheduleUrl = 'http://localhost/pfe/public/new_schedule';
private   removeInstanceUrl = 'http://localhost/pfe/public/api/remove_schedule_from_instance';


  constructor(
    private http: HttpClient,
    private router: Router
              ) { }
  getSchedules () {
return    this.http.get<Schedule []>(this.scheduleUrl);
  }
  deleteSchedule (id) {
    console.log(id);
    this.http.post(this.deleteScheduleUrl, {
      'schedule': id,
      'email': localStorage.getItem('email')
    }).subscribe(data => console.log(data), error => console.log(error));
  }
  addSchedule ( projectName, day, name, description ) {
   return  this.http.post(this.addScheduleUrl, {
      'hours': projectName,
      'day': day,
      'name': name,
      'description': description
    });
  }
  removeInstance(id, name) {
console.log('id', id, 'name', name);
return this.http.post(this.removeInstanceUrl, {
  'name': name,
  'schedule': id
});
  }
}
