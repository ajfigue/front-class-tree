import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HipotenusaService } from 'src/app/servicio/hipotenusa.service';
import { Route, Router } from '@angular/router';
import { SweetAlertOptions } from 'sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hipotenusa',
  templateUrl: './hipotenusa.component.html',
  styleUrls: ['./hipotenusa.component.css']
})
export class HipotenusaComponent {
  divVisible = false;
  resultado: string = "";
  urlImg: string = "";

  hipotenusa = this.formBuilder.group({
    hick: ['', Validators.required],
    hick2: ['', Validators.required]
  })

  get hick() {
    return this.hipotenusa.controls.hick;
  }

  get hick2() {
    return this.hipotenusa.controls.hick2;
  }
  constructor(private formBuilder: FormBuilder, private hipotenusas: HipotenusaService, private router: Router) { }

  calc() {
    const data = {
      hick: this.hick.value,
      hick2: this.hick2.value,
    }
    if (this.hipotenusa.valid) {
      this.hipotenusas.hipotenusa(data).subscribe({
        next: (userData) => {
          console.log(userData);
          this.divVisible = true;
          this.resultado = 'La hipotenusa es ' + userData.data.toString();
          this.urlImg = userData.img.toString();
        },
        error: (errorData) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: errorData.error.message })
          return;
        },
        complete: () => {
          console.info("Login Completo");
          this.hipotenusa.reset();
        }
      });
    }
    else {
      this.hipotenusa.markAllAsTouched();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'empty fields' })
    }
  }
}
