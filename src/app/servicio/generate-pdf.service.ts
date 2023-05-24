import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeneratePDFService {

  api: string = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  generatePDF(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/generate_report`, data);
  }
}
