import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { LoginComponent } from './login/login.component';
import { HipotenusaComponent } from './redneuronal/hipotenusa/hipotenusa.component';
import { AdminComponent } from './admin/admin/admin.component';
import { CalidadVinoComponent } from './vinos/calidad-vino/calidad-vino.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: 'hipotenusa', component: HipotenusaComponent },
  {path: 'logAdmin', component: AdminComponent},
  {path: 'vinoCalidad', component: CalidadVinoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
