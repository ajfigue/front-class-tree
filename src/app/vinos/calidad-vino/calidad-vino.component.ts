import { HttpClient, HttpHeaders } from "@angular/common/http";

import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import Swal from "sweetalert2";




@Component({

  selector: "app-calidad-vino",

  templateUrl: "./calidad-vino.component.html",

  styleUrls: ["./calidad-vino.component.css"],

})

export class CalidadVinoComponent implements OnInit {
  fileForm: FormGroup;
  report: any;
  badWines: string;
  goodWines: string;
  matrixConf = [];
  f1Score = 0.0;
  precision = 0.0;
  recalcScore = 0.0;
  performance = 0.0;
  valoresUnicos = [];
  images1 = [];
  images2 = [];
  imagen3: string;
  imagen4: string;
  divVisible = false;

  ngOnInit(): void {
  }

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

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
          Swal.fire({ icon: 'success', title: 'Exito...', text: 'Pdf generado exitosamente' })
          this.downloadFile(response); // Descargar el archivo

        },

        (error) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: error.message })
          console.error(error);

        }

      );
  }

  generateReport(){
    const formData = new FormData();
    formData.append("file", this.fileForm.get("file").value);
    this.http.post("http://127.0.0.1:5000/generate_report", formData, {

      headers: new HttpHeaders().append("Content-Disposition", "attachment"),

    })

      .subscribe(

        (response) => {
          Swal.fire({ icon: 'success', title: 'Exito...', text: 'Reporte generado exitosamente' });
          this.divVisible = true;
          this.report = response; // Descargar el archivo
          this.badWines = this.report.data.bad_wines;
          this.goodWines = this.report.data.good_wines;
          this.matrixConf = this.report.data.conf_matrix;
          this.f1Score = this.report.data.f1_score;
          this.precision = this.report.data.precision;
          this.recalcScore = this.report.data.recall_score;
          this.performance = this.report.data.roc_score;
          this.valoresUnicos = this.report.data.unique_vals;
          this.images1 = this.report.img_graph.bargraph_routes;
          this.images2 = this.report.img_graph.boxplot_routes;
          this.imagen3 = this.report.tree;
          this.imagen4 = this.report.img_class;
        },

        (error) => {
          Swal.fire({ icon: 'error', title: 'Oops...', text: error.message })
          // console.error(error);

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
