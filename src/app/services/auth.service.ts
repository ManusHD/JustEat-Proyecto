import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private apiUrl = 'https://localhost:3000'; // la URL de la API del servidor
  private loggedIn = false;
  
  
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body, { headers });
  }

  getPerfil(token: string): Observable<any> {
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });  
    return this.http.get(`${this.apiUrl}/perfil`, { headers });
  }

  registrar(email: string, password: string, name: string, surname: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = {email, password, name, surname};
    return this.http.post(`${this.apiUrl}/registro`, body, { headers });
  }
    
  isLoggedIn(){
    const token = localStorage.getItem('token');
    if(token){
      this.loggedIn = true;
    }
    return this.loggedIn;
  }





}
