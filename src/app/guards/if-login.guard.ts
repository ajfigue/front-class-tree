import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicio/login.service';

@Injectable({
  providedIn: 'root'
})
export class IfLoginGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate():boolean {
    if (this.loginService.isAuthenticated()) {
      this.router.navigate(['/logAdmin']);
      return false;
    }
    else {
      return true;
    }
  }

}
