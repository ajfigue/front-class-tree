import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api: string = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post<any>(`${this.api}/login`, data);
  }

}
