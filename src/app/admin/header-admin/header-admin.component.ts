import { Component } from '@angular/core';
import { LogoutService } from 'src/app/servicio/logout.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  title = "WineCMP"

  constructor(private logout: LogoutService, private router: Router) { }

  logOut() {
    this.logout.logout().subscribe((res: any) => {
      console.log(res);
      this.logout.removeToken();
      this.router.navigate(['/']);
    });
    //this.logout.logout();
  }
}
