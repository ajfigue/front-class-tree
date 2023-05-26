import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IndexComponent } from './index/index.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ServiceComunService } from './servicio/service-comun.service';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { HipotenusaComponent } from './redneuronal/hipotenusa/hipotenusa.component';
import { CalidadVinoComponent } from './vinos/calidad-vino/calidad-vino.component';
import { AdminComponent } from './admin/admin/admin.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { BandejaEntradaComponent } from './bandeja-entrada/bandeja-entrada.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    IndexComponent,
    HeaderComponent,
    FooterComponent,
    HipotenusaComponent,
    CalidadVinoComponent,
    AdminComponent,
    HeaderAdminComponent,
    BandejaEntradaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [ServiceComunService],
  bootstrap: [AppComponent]
})
export class AppModule { }
