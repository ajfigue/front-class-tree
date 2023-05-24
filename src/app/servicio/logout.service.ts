import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {
  api: string = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  logout(): Observable<any> {
    return this.http.get(`${this.api}/logout`);
    }
}
