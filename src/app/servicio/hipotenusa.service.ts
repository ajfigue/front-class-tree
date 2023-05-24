import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HipotenusaService {
  api: string = 'http://127.0.0.1:5000';

  constructor(private http: HttpClient) { }

  hipotenusa(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/get_hypotenuse`, data);
  }

}
