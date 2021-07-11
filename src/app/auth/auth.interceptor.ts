import { UserService } from './../services/user.service';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest, HttpUserEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';
@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  if (req.headers.get('No-Auth') === 'True') {
  return next.handle(req.clone());
  }
  if (localStorage.getItem('userToken') != null) {
    const clonedreq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('userToken'))
    });
    return next.handle(clonedreq).do(
      succ => { },
      err => {
        // tslint:disable-next-line:no-debugger
        if (err.status === 401) {
          this.router.navigate(['/auth/login/simple']);
        }
      }
    );
  } else {
    this.router.navigate(['/auth/login/simple']);
  }


  }
}
