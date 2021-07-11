import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      console.log('Is it working my friend?');
      if (localStorage.getItem('userToken') !== null) {
    return true;
      } else {
        this.router.navigate(['/auth/login/simple']);
       // this.router.navigate(['/instances'])
        return false;
      }
  }
}
