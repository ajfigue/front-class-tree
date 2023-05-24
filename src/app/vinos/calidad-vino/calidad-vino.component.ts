import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Component, OnInit } from "@angular/core";

import { FormGroup, FormBuilder } from "@angular/forms";
import { ListContactService } from "src/app/servicio/list-contact.service";
import Swal from "sweetalert2";




@Component({

  selector: "app-calidad-vino",

  templateUrl: "./calidad-vino.component.html",

  styleUrls: ["./calidad-vino.component.css"],

})

export class CalidadVinoComponent implements OnInit {

  fileForm: FormGroup;
  datas = [];

  ngOnInit(): void {
    this.listContact.listContact().subscribe({
      next: (userData) => {
        this.datas = userData.data;
      },
      error: (errorData) => {
        Swal.fire({ icon: 'error', title: 'Oops...', text: errorData.error.message })
        return;
      }
    });
    //this.logout.logout();
  }


  constructor(private formBuilder: FormBuilder, private http: HttpClient, private listContact: ListContactService) {

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




  private downloadFile(data: Blob) {

    const blob = new Blob([data], { type: "application/pdf" }); // Crear un objeto Blob con el tipo de archivo correcto

    const url = window.URL.createObjectURL(blob); // Crear una URL para el objeto Blob

    const link = document.createElement("a"); // Crear un enlace de descarga

    link.href = url;

    link.download = "report.pdf"; // Nombre del archivo de descarga

    link.click(); // Hacer clic en el enlace para iniciar la descarga

    window.URL.revokeObjectURL(url); // Liberar la URL del objeto Blob

  }

}
