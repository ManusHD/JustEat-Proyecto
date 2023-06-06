import { Restaurant } from "../model/restaurant.model";
import { Injectable } from "@angular/core";
import { LoggingService } from "../LoggingService";
import { DataServices } from "../data.services";
import { RestaurantService } from "./restaurante.service";
import { Category } from "../model/category.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class RestaurantsService{

    restaurantes: Restaurant[] = [];
    categorias: Category[] = [];
    private apiUrl = 'https://localhost:3000';
    private token = localStorage.getItem('token') as string;

    constructor(private ls: LoggingService, 
                private dataServices: DataServices,
                private restaurantService: RestaurantService,
                private httpClient: HttpClient){}

    cargarRestaurantes(){
        this.ls.enviarMensajeAConsola("Estamos obteniendo los restaurantes");
        this.dataServices.cargarRestaurantes().subscribe(
            (data: Object) => {
              this.restaurantes = data as Restaurant[];
              console.log("Restaurantes obtenidos");
              console.log(this.restaurantes);
            }
          );
    }

    setRestaurantes(r: Restaurant[]){
        this.restaurantes = r;
    }

    crearNuevoRestaurante(r: Restaurant){
        this.dataServices.postRestaurantes(r);
    }

    actualizarRestaurante(r: Restaurant){
        this.dataServices.putRestaurante(r);
    }

    borrarRestaurante(id: number){
        this.dataServices.borrarRestaurante(id);
    }


    getRestaurantes(){
        return this.restaurantes;
    }

    visitarRestaurante(r:Restaurant){
        console.log("Visitando");
        this.restaurantService.setRestaurante(r);
    }

    filtrarRestaurantes(filtro: string) {
        const filtroLowerCase = filtro.toLowerCase().replace(/\s/g, ''); // Convertir el filtro a minúsculas y quitar los espacios en blanco
      
        this.restaurantes = this.restaurantes.filter(restaurante => {
          const restauranteLowerCase = restaurante.name.toLowerCase().replace(/\s/g, ''); // Convertir el nombre del restaurante a minúsculas y quitar los espacios en blanco
      
          return (
            restauranteLowerCase.includes(filtroLowerCase) ||
            restaurante.address.toLowerCase().includes(filtroLowerCase) ||
            restaurante.city.toLowerCase().includes(filtroLowerCase) ||
            restaurante.telephone.toLowerCase().includes(filtroLowerCase) ||
            restaurante.available.toString().toLowerCase().includes(filtroLowerCase) ||
            restaurante.minPrice.toString().toLowerCase().includes(filtroLowerCase) ||
            restauranteLowerCase.normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filtroLowerCase) ||
            restaurante.address.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filtroLowerCase) ||
            restaurante.city.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').includes(filtroLowerCase)
          );
        });
      
        localStorage.setItem('restaurantesBusqueda', JSON.stringify(this.restaurantes)!);
      }
      

    cargarCategorias(){
        if(this.categorias.length < 1){
            const headers = new HttpHeaders({ 'Authorization': `Bearer ${this.token}` }); 
            this.httpClient.get(`${this.apiUrl}/categorias`, { headers }).subscribe(
                (data: Object) => {
                    this.categorias = data as Category[];
                    console.log("Categorias obtenidas");
                    console.log(this.categorias);
                    localStorage.setItem('categorias',JSON.stringify(this.categorias));
                },
                (error) => {
                    console.log(error);
                }
                );
        }else{
            localStorage.setItem('categorias',JSON.stringify(this.categorias));
            console.log("Categorias obtenidas por el else: ");
            console.log(JSON.stringify(this.categorias));
        }
    }

    ordenarRestaurantes(){
        const restaurantes: Restaurant[] = this.restaurantes;

        restaurantes.sort((a, b) => {
          const gradesAverageA = typeof a.gradesAverage === 'string' ? parseFloat(a.gradesAverage) : a.gradesAverage;
          const gradesAverageB = typeof b.gradesAverage === 'string' ? parseFloat(b.gradesAverage) : b.gradesAverage;
        
          return gradesAverageB - gradesAverageA;
        });
        
        console.log("Restaurantes ordenados:");
        console.log(restaurantes);
        
        localStorage.setItem('restaurantesBusqueda', JSON.stringify(restaurantes));
        console.log("Devolviendo ordenados");
        console.log(restaurantes);
        return restaurantes;
    }

}