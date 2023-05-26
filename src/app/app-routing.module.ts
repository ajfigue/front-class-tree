import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { HipotenusaComponent } from './redneuronal/hipotenusa/hipotenusa.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CalidadVinoComponent } from './vinos/calidad-vino/calidad-vino.component';
import { AuthGuard } from './guards/auth.guard';
import { IfLoginGuard } from './guards/if-login.guard';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';

const routes: Routes = [
  { path: '', component: IndexComponent, canActivate: [IfLoginGuard] },
  { path: 'login', component: LoginComponent, canActivate: [IfLoginGuard] },
  { path: 'hipotenusa', component: HipotenusaComponent, canActivate: [AuthGuard] },
  { path: 'logAdmin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'vinoCalidad', component: CalidadVinoComponent, canActivate: [AuthGuard] },
  { path: 'entradaMens', component: BandejaEntradaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
