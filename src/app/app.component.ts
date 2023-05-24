import { Component } from '@angular/core';

@Component({
  selector: 'index-principal',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Aurora Medical Center';

  usuario = 'Pruebando';
  private pass = 'Tu password';

  getpass() {
    return this.pass;
  }
}
