import { Component } from '@angular/core';
import { LogoutService } from 'src/app/servicio/logout.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.css']
})
export class HeaderAdminComponent {
  title = "WineCMP"
  router: any;

  constructor(private logout: LogoutService) { }

  logOut() {
      this.logout.logout().subscribe((res: any) => {
      console.log(res);
      });
    //this.logout.logout();
  }
}
