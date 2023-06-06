import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user.model';
import { CabeceraService } from 'src/app/services/cabecera.service';
import { LoginService } from 'src/app/services/login.service';
import { RestaurantsPerfilService } from 'src/app/services/restaurantes-perfil.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  login?: boolean;
  logeado?: boolean;
  userName?: any;
  token?: any;

  constructor(private cs: CabeceraService, private loginService: LoginService) {
    this.loginService.log.subscribe((logeado: boolean) => {
      this.logeado = logeado;
      this.userName = this.loginService.getLogedUser();
    });
  }

  ngOnInit(): void {
    this.login = this.cs.getLogin();
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.logeado = true;
      this.userName = localStorage.getItem('username');
    }
  }

  onCambiarLogin(event: MouseEvent) {
    console.log('Paso por aqui');
    this.login = this.cs.cambiarLogin(event);
  }

  onLogout() {
    this.logeado = false;
    this.cs.logout();
  }
}
