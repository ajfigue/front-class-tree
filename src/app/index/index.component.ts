import { Component } from '@angular/core';
import { ServiceComunService } from '../servicio/service-comun.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ContactService } from '../servicio/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  contactForm = this.formBuilder.group({
    nombre: [''],
    email: ['', [Validators.required, Validators.email]],
    apellido: [''],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required]
  })
  router: any;

  get email() {
    return this.contactForm.controls.email;
  }

  get nombre() {
    return this.contactForm.controls.nombre;
  }

  get apellido() {
    return this.contactForm.controls.apellido;
  }

  get asunto() {
    return this.contactForm.controls.asunto;
  }

  get mensaje() {
    return this.contactForm.controls.mensaje;
  }

  constructor(private comunServices: ServiceComunService, private formBuilder: FormBuilder, private contactService: ContactService) { }
  title = this.comunServices.titlesApp("logo");

  sendContact() {
    const data = {
      email_user: this.email.value,
      email_to: 'learningmachine119@gmail.com',
      subject: this.asunto.value,
      email_content: this.mensaje.value,
      user_send_contact: true,
    }

    if (this.contactForm.valid) {
      this.contactService.sendMail(data).subscribe({
        next: (userData) => {
          // console.log(userData);
          Swal.fire({ icon: 'success', title: 'Hemos recibido tu solicitud'})
        },
        error: (errorData) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: errorData.error.message })
        },
        complete: () => {
          console.info("complete");
          this.router.navigateByUrl('');
          this.contactForm.reset();
        }
      });
    }
    else {
      this.contactForm.markAllAsTouched();
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'empty fields' })
    }
  }
}
