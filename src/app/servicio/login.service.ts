import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  api: string = 'http://127.0.0.1:5000';
  constructor(private http: HttpClient) { }

  public login(data: any): Observable<any> {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post<any>(`${this.api}/login`, data, { headers });

  }
  public saveToken(token: string) {

    localStorage.setItem('token', token);

  }

  public getToken() {

    return localStorage.getItem('token');

  }

  public isAuthenticated() {

    const token = this.getToken();

    // Verificar si el token existe y no ha expirado

    return token ? true : false;

  }

}
