import { Injectable } from '@angular/core';
import { LoggingService } from '../LoggingService';
import { DataServices } from '../data.services';
import { Restaurant } from '../model/restaurant.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Dish } from '../model/dish.model';
import { Router } from '@angular/router';
import { Category } from '../model/category.model';
import { RestaurantCategories } from '../model/restaurantCategories.model';
import { ValoracionesComponent } from '../componentes/valoraciones/valoraciones.component';
import { Review } from '../model/review.model';
import { Observable } from 'rxjs';

@Injectable()
export class RestaurantService {
  restaurant: Restaurant = new Restaurant();
  dishes: Dish[] = [];
  categorias: Category[] = [];
  restauranteCategorias: RestaurantCategories[] = [];
  valoraciones: Review[] = [];
  private apiUrl = 'https://localhost:3000';
  private token = localStorage.getItem('token') as string;

  constructor(
    private httpClient: HttpClient,
    private ls: LoggingService,
    private dataServices: DataServices,
    private router: Router
  ) {}

  getRestaurante() {
    return this.restaurant;
  }

  setRestaurante(r: Restaurant) {
    this.restaurant = r;
    localStorage.setItem('restauranteActual', JSON.stringify(r));
  }

  deleteRestaurante(id: number) {
    this.dataServices.borrarRestaurante(id);
  }

  getPlatos() {
    return this.dishes;
  }

  addDish(name: string, price: number, description: string, idr: number) {
    const registro = {
      name: name,
      price: price,
      description: description,
      idr: idr,
    };
    console.log('Restaurante en el que se inserta el plato: ');
    console.log(this.restaurant);
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.httpClient
      .post(`${this.apiUrl}/platos`, registro, { headers })
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/perfil']);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  setPlatos(id: number) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.httpClient
      .get(`${this.apiUrl}/platos/${id}`, { headers })
      .subscribe((data: Object) => {
        if (Array.isArray(data)) {
          this.dishes = data as Dish[];
          localStorage.setItem(
            'platosRestaurante',
            JSON.stringify(this.dishes)
          );
        } else {
          this.dishes.push(data as Dish);
          localStorage.setItem(
            'platosRestaurante',
            JSON.stringify(this.dishes)
          );
        }
      });
  }

  setRestauranteCategorias(id: number) {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.httpClient
      .get(`${this.apiUrl}/restaurantCategorie/${id}`, { headers })
      .subscribe(
        (data: Object) => {
          if (Array.isArray(data)) {
            console.log('Estableciendo RestauranteCategorias');
            this.restauranteCategorias = data as RestaurantCategories[];
            console.log(this.restauranteCategorias);
            this.setCategorias();
          } else {
            console.log('Estableciendo RestauranteCategorias');
            this.restauranteCategorias.push(data as RestaurantCategories);
            console.log(this.restauranteCategorias);
            this.setCategorias();
          }
        },
        (error) => {
          console.log('Este restaurante no tiene ninguna categoria: ' + error);
          this.restauranteCategorias = [];
          this.categorias = [];
        }
      );
  }

  setCategorias() {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.httpClient.get(`${this.apiUrl}/categorias`, { headers }).subscribe(
      (data: Object) => {
        if (Array.isArray(data)) {
          this.categorias = data as Category[];
          this.categorias = this.categorias.filter((category) => {
            return this.restauranteCategorias.some(
              (restaurantCategory) => restaurantCategory.idct === category.id
            );
          });
          console.log('Estableciendo Categorias');
          console.log(this.categorias);
        } else {
          this.categorias.push(data as Category);
          this.categorias = this.categorias.filter((category) => {
            return this.restauranteCategorias.some(
              (restaurantCategory) => restaurantCategory.idct === category.id
            );
          });
          console.log('Estableciendo Categorias');
          console.log(this.categorias);
        }
      },
      (error) => {
        console.log('Este restaurante no tiene ninguna categoria: ' + error);
        this.categorias = [];
      }
    );
  }

  getCategorias() {
    return this.categorias;
  }

  editarRestaurante(
    name: string,
    address: string,
    telephone: string,
    city: string,
    contactemail: string,
    bikeFriendly: number,
    available: number,
    idRest: number
  ) {
    const registro = {
      campo1: name,
      campo2: address,
      campo3: telephone,
      campo4: city,
      campo5: contactemail,
      campo6: bikeFriendly,
      campo7: available,
    };
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.httpClient
      .put(`${this.apiUrl}/restaurante/${idRest}`, registro, { headers })
      .subscribe(
        (response) => {
          console.log('Restaurante edoitado correctamente');
          console.log(response);
          this.router.navigate(['/perfil']);
        },
        (error) => {
          console.log('Error al editar el restaurante');
          console.log(error);
        }
      );
  }

  obtenerValoraciones(id: number): Observable<Review[]> {
    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    return this.httpClient.get(`${this.apiUrl}/reviews/${id}`, {
      headers,
    }) as Observable<Review[]>;
  }

  publicarValoracion(idr: number, review: string, grade: number) {
    const registro = {
      idr: idr,
      idu: localStorage.getItem('idUser'),
      review: review,
      grade: grade,
    };

    const headers = new HttpHeaders({ Authorization: `Bearer ${this.token}` });
    this.httpClient
      .post(`${this.apiUrl}/reviews`, registro, { headers })
      .subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/']);
        },
        (error) => {
          console.log('Error al crear la valoracion' + error);
        }
      );
  }
}
