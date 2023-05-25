import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../servicio/login.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private loginService: LoginService) { }

  canActivate(): boolean {

    if (this.loginService.isAuthenticated()) {

      return true;

    } else {
      this.router.navigate(['/']);
      Swal.fire({
        title: '¿Desea iniciar sesión?',
        showDenyButton: true,
        confirmButtonText: 'Sí'
      }).then((result) => {
        if (result.isConfirmed) {
          this.router.navigate(['/login']);
        }
        else if (result.isDenied) {
        }
      });
      return false;
    }

  }

}
