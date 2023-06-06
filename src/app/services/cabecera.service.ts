import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class CabeceraService {
  login: boolean = true;
  logeado: boolean = false;

  constructor(private router: Router) {}

  getLogin() {
    return this.login;
  }

  cambiarLogin(event: MouseEvent) {
    event.preventDefault(); //Hace que no se recargue la página al cambiar de ruta
    if (this.login) {
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/registro']);
    }
    this.login = !this.login;
    return this.login;
  }

  cambiarLogeado() {
    if (localStorage.getItem('token')) {
      console.log('Hay token');
      return (this.logeado = true);
    } else {
      console.log('No hay token');
      return (this.logeado = false);
    }
  }

  logout() {
    this.logeado = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('surname');
    localStorage.removeItem('email');
    localStorage.removeItem('idUser');
    localStorage.removeItem('misRestaurantes');
    localStorage.removeItem('restauranteActual');
    localStorage.removeItem('restaurantesBusqueda');
    localStorage.removeItem('platosRestaurante');
    localStorage.removeItem('cesta');
    localStorage.removeItem('pedidos');
    localStorage.removeItem('categoriasRestaurante');
    localStorage.removeItem('categorias');
    localStorage.removeItem('totalCesta');
    console.log('Haciendo logout');
  }
}
