import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  apiUrl = 'https://localhost:3000';
  errorRegister = new EventEmitter<boolean>();

  constructor(private http: HttpClient,
                private authService: AuthService,
                private loginService: LoginService) {}

  registrar(email: string, password: string, name: string,  surname:string){
    this.authService.registrar(email, password, name, surname).subscribe(
        response => {
          console.log(response);
          console.log("Las credenciales son: " + email + " y " + password);
          this.loginService.login(email, password);
          this.errorRegister.emit(false);
        },
        error => {
          console.log(error);
          this.errorRegister.emit(true);
        }
      );
  }
}
