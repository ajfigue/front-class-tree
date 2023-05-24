import { Component } from '@angular/core';
import { ServiceComunService } from '../servicio/service-comun.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  constructor (private comunServices:ServiceComunService) { }
  title = this.comunServices.titlesApp("logo");
}
