import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListContactService {
  api: string = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  listContact(): Observable<any> {
    return this.http.get(`${this.api}/list_contact`);
    }
}
