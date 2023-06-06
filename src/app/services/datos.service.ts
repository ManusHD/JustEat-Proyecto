import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CabeceraService } from './cabecera.service';

@Injectable()
export class DatosService {
  private apiUrl = 'https://localhost:3000';
  private token = localStorage.getItem('token') as string;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private cabeceraService: CabeceraService
  ) {}

  editar(nombre: string, apellidos: string, contraseña: string) {
    const id = Number.parseInt(localStorage.getItem('idUser')!);
    if (id) {
      if (nombre && apellidos && contraseña) {
        const registro = {
          campo1: contraseña,
          campo2: nombre,
          campo3: apellidos,
        };

        console.log('Datos a insertar: ' + nombre + apellidos + contraseña);

        const headers = new HttpHeaders({
          Authorization: `Bearer ${this.token}`,
        });
        this.httpClient
          .put(`${this.apiUrl}/usuario/${id}`, registro, { headers })
          .subscribe(
            (response) => {
              localStorage.removeItem('username');
              localStorage.removeItem('surname');
              localStorage.setItem('username', nombre);
              localStorage.setItem('surname', apellidos);
              this.router.navigate(['/perfil']);
              console.log(response);
              window.location.reload();
            },
            (error) => {
              console.log(error);
            }
          );
      } else {
        console.log('Hay algun campo vacío');
      }
    } else {
      console.log('No hay id en localStorage');
    }
  }

  eliminarCuenta(id: number) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.httpClient
      .delete(`${this.apiUrl}/usuario/${id}`, { headers })
      .subscribe(
        (response) => {
          console.log('Usuario eliminado correctamente');
          this.cabeceraService.logout();
          window.location.reload();
          this.router.navigate(['/']);
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
