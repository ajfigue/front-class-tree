import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ContactService } from "src/app/servicio/contact.service";
import { ListContactService } from "src/app/servicio/list-contact.service";
import Swal from "sweetalert2";




@Component({

  selector: "app-calidad-vino",

  templateUrl: "./calidad-vino.component.html",

  styleUrls: ["./calidad-vino.component.css"],

})

export class CalidadVinoComponent implements OnInit {
  disabled = true;
  fileForm: FormGroup;
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


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private listContact: ListContactService, private contactService: ContactService, private router: Router) {

    this.fileForm = this.formBuilder.group({

      file: [""],

    });

  }


  onFileSelected(event) {

    const file = event.target.files[0];

    this.fileForm.get("file").setValue(file);

  }

  onUpload() {
    const formData = new FormData();
    formData.append("file", this.fileForm.get("file").value);
    this.http.post("http://127.0.0.1:5000/generate_pdf", formData, {

      responseType: "blob", // Indicar que la respuesta es un archivo Blob

      headers: new HttpHeaders().append("Content-Disposition", "attachment"),

    })

      .subscribe(

        (response) => {

          this.downloadFile(response); // Descargar el archivo

        },

        (error) => {

          console.error(error);

        }

      );

  }

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


  private downloadFile(data: Blob) {

    const blob = new Blob([data], { type: "application/pdf" }); // Crear un objeto Blob con el tipo de archivo correcto

    const url = window.URL.createObjectURL(blob); // Crear una URL para el objeto Blob

    const link = document.createElement("a"); // Crear un enlace de descarga

    link.href = url;

    link.download = "report.pdf"; // Nombre del archivo de descarga

    link.click(); // Hacer clic en el enlace para iniciar la descarga

    window.URL.revokeObjectURL(url); // Liberar la URL del objeto Blob

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

  updateLista () {
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
