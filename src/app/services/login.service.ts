import { EventEmitter, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { CabeceraService } from './cabecera.service';

@Injectable()
export class LoginService {
  token: string = '';
  user: User = new User();

  logeado: boolean = false;
  log = new EventEmitter<boolean>();
  errorLogin = new EventEmitter<boolean>();

  constructor(
    private authService: AuthService,
    private router: Router,
    private cabeceraService: CabeceraService
  ) {}

  login(email: string, password: string) {
    this.authService.login(email, password).subscribe(
      (response) => {
        this.token = response.token;
        this.user = response.user;
        console.log('El valor username es: ' + this.user.surname);
        localStorage.setItem('token', this.token);
        console.log('El token es: ' + this.token);
        localStorage.setItem('username', this.user.name);
        localStorage.setItem('surname', this.user.surname);
        localStorage.setItem('email', this.user.email);
        localStorage.setItem('idUser', this.user.id.toString());
        this.errorLogin.emit(false);
        this.getPerfil();
        this.router.navigate(['/']);
      },
      (error) => {
        console.log('Error en consola: ');
        console.log(error);
        this.errorLogin.emit(true);
      }
    );
  }

  getPerfil() {
    this.authService.getPerfil(this.token).subscribe(
      (response) => {
        this.user = response.user;
        this.cabeceraService.cambiarLogeado();
        this.log.emit(this.cabeceraService.cambiarLogeado());
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getLogedUser() {
    return this.user.name;
  }

  getLogeado() {
    return this.logeado;
  }
}
