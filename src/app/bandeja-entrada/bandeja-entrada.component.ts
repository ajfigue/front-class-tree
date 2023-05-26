import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ListContactService } from '../servicio/list-contact.service';
import { ContactService } from '../servicio/contact.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bandeja-entrada',
  templateUrl: './bandeja-entrada.component.html',
  styleUrls: ['./bandeja-entrada.component.css']
})
export class BandejaEntradaComponent implements OnInit {
  emails: string;
  ids: string;
  datas = [];
  correoGuardado : String;
  idGuardado : number;

  private idEmail: number = 0

  sendForm = this.formBuilder.group({
    email: [''],
    asunto: ['', Validators.required],
    mensaje: ['', Validators.required]
  })

  get email() {
    return this.sendForm.controls.email;
  }

  get asunto() {
    return this.sendForm.controls.asunto;
  }

  get mensaje() {
    return this.sendForm.controls.mensaje;
  }

  ngOnInit(): void {
    this.list_contact()
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private listContact: ListContactService, private contactService: ContactService, private router: Router) {}

  public guardarCorreoTemporal(email){
    this.correoGuardado = email;
  }

  public recuerarCorreoTemporal(){
    return this.correoGuardado;
  }

  public guardarIdTemporal(id){
    this.idGuardado = id;
  }

  public recuperarIdTemporal(){
    return this.idGuardado;
  }

  idstring() {
    console.log(this.ids);
  }

  list_contact(){
    this.listContact.listContact().subscribe({
      next: (userData) => {
        this.datas = userData.data;
        this.emails = userData.data.email;
      },
      error: (errorData) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: errorData.error.message })
        return;
      }
    });
  }

  sendContact() {
    const data = {
      email_user: this.recuerarCorreoTemporal(),
      email_to: this.recuerarCorreoTemporal(),
      subject: this.asunto.value,
      email_content: this.mensaje.value,
      user_send_contact: false,
    }

    console.log(this.recuperarIdTemporal());

    if (this.sendForm.valid) {
      this.contactService.sendMail(data).subscribe({
        next: (userData) => {
          this.contactService.updateMails(this.recuperarIdTemporal()).subscribe();
          console.log(userData);
          Swal.fire({ icon: 'success', title: 'Hemos recibido tu solicitud' });
          // this.list_contact()
        },
        error: (errorData) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: errorData.error.message })
        },
        complete: () => {
          console.info("complete");
        }
      });
    }

    else {
      Swal.fire({ icon: 'error', title: 'Oops...', text: 'Valide los campos' })
    }
  }
}
