import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  api: string = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  sendMail(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/send_email`, data);
  }

  updateMails(id: any): Observable<any> {
    return this.http.get(`${this.api}/update_status/${id}`);
    }
}
