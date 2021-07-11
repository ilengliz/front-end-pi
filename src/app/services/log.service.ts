import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LogService {
private listeLogUrl = 'http://localhost/pfe/public/api/logs';

  constructor(private http: HttpClient, private router: Router) { }

getLog() {
return this.http.get(this.listeLogUrl);
}


}
